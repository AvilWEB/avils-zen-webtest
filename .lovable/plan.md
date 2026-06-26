# Fix Gmail iOS dark-mode + sender avatar issues

Two separate problems with the same root cause family: **email clients (especially Gmail mobile) treat your email very differently from a browser**. Desktop Gmail respects your design; iOS Gmail force-inverts colors and ignores branding unless DNS-level signals are in place.

---

## Part A — Dark-mode rendering in Gmail iOS

### What's happening
Gmail's iOS app force-inverts light emails when the phone is in dark mode. Your cream "Milky" background (#E8E2D3) inverts to that olive/brown tone you see in the screenshot. Gmail desktop doesn't do this, which is why it looks correct there.

### Fix (edit the React Email template for the payment confirmation)
1. Add color-scheme meta tags inside `<Head>`:
   - `<meta name="color-scheme" content="light dark">`
   - `<meta name="supported-color-schemes" content="light dark">`
2. Restructure the email so the outer `<Body>` is **pure white #ffffff** (white survives Gmail's inversion much better than cream). Move the cream/milky background to an inner `<Container>` card only.
3. Add `!important` to background-color and color values on the main wrapper and the inner highlight card. Gmail mobile partially respects `!important`.
4. Add a `@media (prefers-color-scheme: dark)` block in `<Head>` that explicitly defines dark-mode versions of background, text, and card colors — so when Gmail does switch to dark, it uses *our* chosen dark palette (deep charcoal + cream text + gold accents) instead of olive.
5. Logo: ensure the AVIL's bathrooms logo PNG has a transparent background and enough contrast to remain readable on either white or dark backgrounds. If the current logo is gold-on-cream baked into the PNG, we should swap to a transparent-bg version (or add a subtle white/dark drop area behind it).

### What this won't do
We cannot fully disable Gmail iOS dark mode — Google removed that capability. But these changes make the dark-mode rendering intentional and on-brand instead of muddy.

---

## Part B — Missing sender profile picture (avatar)

### What's happening
Gmail picks the sender avatar from one of three sources, in order:
1. **BIMI** — a DNS record + hosted SVG logo that tells Gmail "this domain's verified brand logo is X."
2. **Google Workspace profile photo** tied to that exact sender address.
3. **Gravatar / personal contact photo** fallback.

When you email from your personal `info@avilsbathrooms.com` Google account, source #2 fires — your photo shows up. The automated confirmation email is sent via Lovable Cloud's email infrastructure (Mailgun) from a sending subdomain that has none of these signals, so Gmail shows a blank/letter avatar.

### Fix options (pick one)

**Option 1 — Quick, free, partial:** Change the visible "From" name to "Avil's Bathrooms" so at least a branded letter ("A") shows in a colored circle. No DNS changes. ~15 min.

**Option 2 — Proper, free, recommended:** Set up **BIMI**.
- Tighten DMARC policy on `avilsbathrooms.com` to `p=quarantine` or `p=reject` (currently likely `p=none`).
- Create a square SVG Tiny PS version of the AVIL's bathrooms logo (specific SVG profile required by BIMI).
- Host it at a public HTTPS URL.
- Add a BIMI DNS TXT record (`default._bimi.avilsbathrooms.com`) pointing to the SVG.
- After Gmail re-checks (24–48h), your gold logo will appear as the sender avatar on Gmail desktop and mobile.
- Cost: $0. Time: ~1 hour of work + DNS propagation.

**Option 3 — Premium, paid:** BIMI + **VMC certificate** (~$1,000–$1,500/year from Entrust or DigiCert). Same as Option 2 but adds the blue checkmark next to your name in Gmail. Most small/medium brands skip this.

---

## Recommendation

- **Do Part A immediately** — pure template work, no external dependencies, fixes the iOS dark look for everyone.
- **Do Part B Option 1 immediately** — 15-min from-name tweak so the avatar circle at least shows "A" in brand color.
- **Do Part B Option 2 next** — proper BIMI setup. I can prepare the SVG and tell you the exact DNS records to add at your registrar; you handle the DNS changes (DMARC tightening included).
- **Skip Part B Option 3** unless you specifically want the blue checkmark.

---

## Technical detail (for reference)

Files that will change in Part A:
- `supabase/functions/_shared/transactional-email-templates/payment-confirmation.tsx` (or whichever template is used for the "Payment received" email) — add color-scheme meta, restructure body/container, add `!important` on key styles, add `@media (prefers-color-scheme: dark)` block, swap logo image if needed.

No code changes needed for Part B Options 1/2 beyond the from-name string in the send-email Edge Function. BIMI is entirely DNS + a hosted SVG file.

Want me to proceed with Part A + Part B Option 1 now, and prepare the BIMI assets for Option 2 in a follow-up?
