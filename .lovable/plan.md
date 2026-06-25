## What I found

- The form submission is reaching the backend correctly: recent `submissions` rows exist with `pending_payment` status and photo URLs.
- Telegram is working, so the form pipeline and secrets are not generally broken.
- Google Sheets is failing inside `process-submission` with:
  ```text
  Unable to parse range: Sheet1!A1:L1
  ```
- This means authentication/secrets are likely OK enough to reach the Sheets API, but the write request is targeting a tab/range Google cannot parse for this spreadsheet.
- The paid-payment webhook still uses a different append range: `Sheet1!A:L:append`, so it should be made consistent with the final fix too.

## Fix plan

1. **Make the sheet tab name configurable and safer**
   - Add a small helper in both Sheets code paths to read `GOOGLE_SHEET_TAB_NAME`, defaulting to `Sheet1`.
   - Quote the tab name in A1 notation, so names with spaces or special characters work.
   - Build ranges like:
     ```text
     'Sheet1'!A:L
     'Sheet1'!A{row}:L{row}
     'Sheet1'!E:E
     'Sheet1'!G:G
     ```

2. **Fix unpaid lead append in `process-submission`**
   - Replace the failing append URL using `Sheet1!A1:L1:append` with the safer quoted full-column append range.
   - Keep unpaid rows exactly as planned: `$0.00`, empty Stripe session ID, `pending_payment`, photo URLs, notes.

3. **Improve logging for Sheets failures**
   - Log which tab/range is being used and whether credentials/sheet ID are present.
   - Log token and append response status/body when Sheets fails, without exposing private key content.
   - This will make the next failure actionable if the real tab is not named `Sheet1` or if the service account lacks access.

4. **Make paid webhook use the same range helper**
   - Update existing row lookup, row update, and append ranges in `stripe-webhook` to use the same quoted tab/range builder.
   - This prevents a lead from being appended unpaid but failing later when payment updates the same row.

5. **Optional if needed after logs**
   - If the spreadsheet tab is not actually named `Sheet1`, set `GOOGLE_SHEET_TAB_NAME` to the correct tab name instead of changing code again.
   - If logs show a permission error, the fix is sharing the spreadsheet with the Google service-account email already stored in the credentials.

## Files to change

- `supabase/functions/process-submission/index.ts`
- `supabase/functions/stripe-webhook/index.ts`

## Validation

- Deploy both backend functions.
- Submit one unpaid test lead.
- Confirm logs show `Sheets append OK`.
- Confirm the new row appears in the sheet with text and photo URLs.
- If a paid test is run, confirm the same row updates to `paid` instead of creating a duplicate.