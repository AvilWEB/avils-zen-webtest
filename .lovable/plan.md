## Plan

1. **Upload logo to Supabase Storage**
   - Use `supabase--storage_upload` to upload `/mnt/user-uploads/email-logo.png` to the `bathroom-photos` bucket as `email-logo.png`.
   - Confirm public URL: `https://pvebnaivyegbywqdsbgm.supabase.co/storage/v1/object/public/bathroom-photos/email-logo.png`.
   - (The `bathroom-photos` bucket is already public, so no policy changes needed.)

2. **Swap text wordmark → image in `buildEmailHtml`**
   - Edit `supabase/functions/process-submission/index.ts`: replace the text "AVIL'S BATHROOMS" wordmark block at the top of the email with an `<img>` tag pointing to the public URL. Use width ~260px, `alt="Avil's Bathrooms"`, centered, with `display:block; margin:0 auto; max-width:100%; height:auto;` so it renders crisply in Gmail/Apple Mail/Outlook.
   - Make the identical edit in `supabase/functions/stripe-webhook/index.ts` so both senders show the logo.
   - Keep the gold divider, headline, body copy, button, and footer exactly as they are.

3. **Deploy both edge functions**
   - Deploy `process-submission` and `stripe-webhook` so the new template ships immediately.
   - No DB, no other files, no changes to Sheets / Telegram / payment logic.

4. **Verify**
   - Trigger the existing `CLAUDE EMAIL TEST` hook by submitting a test (or note that the user can) so info@avilsbathrooms.com receives the updated email with the embedded logo.

### Technical notes
- Public URL pattern: `${SUPABASE_URL}/storage/v1/object/public/bathroom-photos/email-logo.png`.
- Hardcoding the full URL in the email HTML is correct — email clients can't read env vars.
- No code changes outside the two edge function files.
