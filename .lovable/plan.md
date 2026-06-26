## Plan: Hold current state for payment testing

Payment is confirmed working end-to-end ($5 charge → confirmation email from info@avilsbathrooms.com). Per your request, keep the evaluation fee at $5 so you can run more test cards and alternative payment methods.

### No code changes this round
- `supabase/functions/create-payment/index.ts` stays at `unit_amount: 500` ($5).
- `src/components/RequestEstimateModal.tsx` keeps the "Evaluation Fee: $5" copy and "Submit & Pay $5" button.
- Stripe live key, webhook secret, and the three deployed edge functions (`create-payment`, `stripe-webhook`, `verify-payment`) stay as-is.

### What I'll do when you're ready
When you finish testing, send a single message like "revert to $100" and I will:
1. Change `unit_amount` from `500` back to `10000` in `create-payment`.
2. Update the modal copy/button to "$100".
3. Redeploy `create-payment`.

### Notes
- Each test charge is a real live transaction — refund yourself in the Stripe dashboard afterward if you want the $5s back.
- If any test card fails or an email/Sheet/Telegram step misfires, paste the error and I'll diagnose against the webhook + verify-payment logs.