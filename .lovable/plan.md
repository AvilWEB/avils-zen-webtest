## Diagnosis

The payment behavior confirms the app is still using Stripe test/sandbox credentials:

- A real card was declined.
- The Stripe test card `4242 4242 4242 4242` succeeded.
- The connected Stripe account currently shows as `Avil's bathrooms sandbox`.
- The webhook logs show signature verification failure, so the saved webhook signing secret does not match the endpoint Stripe is calling.

Because the webhook is failing, the successful payment cannot trigger the client confirmation email.

## Plan

1. **Switch Stripe Dashboard to live mode**
   - In Stripe Dashboard, turn off **Test mode / Sandbox**.
   - Confirm you are viewing the live account, not the sandbox account.

2. **Replace the app payment secret**
   - Open Stripe live API keys.
   - Copy the live secret key that starts with `sk_live_`.
   - I will open the secure Lovable secret update form for `STRIPE_SECRET_KEY`; you paste the live key there.

3. **Create or verify the live webhook endpoint**
   - In Stripe live mode, go to **Developers → Webhooks**.
   - Endpoint URL must point to the existing webhook URL used by this app.
   - Event needed: `checkout.session.completed`.
   - Copy the live endpoint signing secret that starts with `whsec_`.
   - I will open the secure Lovable secret update form for `STRIPE_WEBHOOK_SECRET`; you paste the live webhook secret there.

4. **Deploy/reload backend functions**
   - After secrets are updated, redeploy the payment and webhook functions so they use the new live secrets.

5. **Run one live $5 verification payment**
   - Submit the form again with a real email and real card.
   - Expected result: real card succeeds, test card no longer works, confirmation email arrives, and Sheet/Telegram flow continues.

6. **Revert evaluation fee to $100 after success**
   - Change backend price from `$5` back to `$100`.
   - Change frontend labels back from `$5` to `$100`.
   - Deploy again.

## Important

Do not paste live Stripe keys into chat. They must only be entered through the secure secret update form.