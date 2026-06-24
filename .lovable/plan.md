## Goal

Fix two issues with the lead-capture automation, and upgrade Telegram notifications to display real inline photos instead of plain URLs.

1. Telegram receives lead text but photo links return `{"statusCode":"404","error":"Bucket not found"}`.
2. Google Sheets stays empty when leads are submitted without payment.
3. Photos in Telegram should render as actual inline images, not clickable links.

## Why this is happening

1. The `bathroom-photos` storage bucket is **private**. `getPublicUrl()` only works for public buckets, so Telegram (and anyone clicking) sees a 404.
2. Google Sheets sync lives **only** in `stripe-webhook` (runs after `checkout.session.completed`). Unpaid submissions never hit it.
3. The current Telegram code uses `sendMessage` with photo URLs in the body, which Telegram renders as text links — not images.

## Changes

### 1. Make `bathroom-photos` bucket public
- Call `supabase--storage_update_bucket(name="bathroom-photos", public=true)`.
- Existing `getPublicUrl()` links in `submissions.photos_folder_url` start working immediately.
- If the workspace blocks public buckets, fall back to 7-day signed URLs.

### 2. Render photos inline in Telegram (process-submission)
Replace the single `sendMessage` call with two Telegram API calls:

- **`sendMessage`** — the lead text only (name, email, phone, address, description, priorities). No photo URLs in the body.
- **`sendMediaGroup`** — sends the photos as an actual image album in the chat. Payload shape:
  ```
  { chat_id, media: [
      { type: "photo", media: <public_url>, caption: "Lead <submissionId> (1/N)" },
      { type: "photo", media: <public_url> },
      ...
  ] }
  ```
  - Telegram's `sendMediaGroup` accepts 2–10 items per album. Logic:
    - 1 photo → use `sendPhoto` instead.
    - 2–10 photos → one `sendMediaGroup` call.
    - >10 photos → chunk into multiple `sendMediaGroup` calls of up to 10 each (form max is 10, so in practice one call).
  - Telegram fetches each URL server-side, so the bucket MUST be public (fix #1) for this to work. If a URL is unreachable Telegram returns `wrong file identifier/HTTP URL specified` — we'll log that into `debug_telegram_log` like we already do.
- Whole block stays wrapped in try/catch; submission never fails because of Telegram.

### 3. Add Google Sheets sync for unpaid leads (process-submission)
After the submission is saved, append one row to `Sheet1!A:L` using the same service-account JWT flow as `stripe-webhook`:
- Reuses `GOOGLE_SHEETS_CREDENTIALS` + `GOOGLE_SHEET_ID` (already set).
- **F: Amount** → `"$0.00"`, **G: Stripe_session_id** → `""`, **H: Status** → `"pending_payment"`. Photos column uses the public storage URLs.
- Non-fatal; wrapped in try/catch.

### 4. Make `stripe-webhook` update the same row instead of duplicating
Currently `stripe-webhook` looks up existing rows by Stripe session ID (column G). Unpaid rows have empty G, so a paid event would append a second row. Add a secondary lookup: if no match by session ID, search column E (`submission_id`) and update that row in place. Each lead becomes a single row that flips from `pending_payment` → `paid`.

### 5. Deploy
Deploy both functions (`process-submission`, `stripe-webhook`).

### 6. Verify
- Confirm bucket is public.
- Submit a test lead → `debug_telegram_log` shows status 200 for both `sendMessage` and `sendMediaGroup`, and the Telegram chat shows an actual photo album.
- Confirm a `pending_payment` row appears in the Google Sheet.
- Complete the $100 payment → the same row updates to `paid` (no duplicate).

## Out of scope

- No UI / modal / validation changes.
- No new secrets — all already set.
- Bucket-level RLS unchanged; bucket becomes publicly readable by URL (required for Telegram to fetch the image).
