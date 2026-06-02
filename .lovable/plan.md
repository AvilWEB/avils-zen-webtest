## Plan: Technical SEO + Video Preload Fix

Fast wins only. No Semrush calls or copy rewrites yet.

### 1. `index.html`
- Update `<title>` and `<meta description>` to include local intent: "Bathroom Remodeling Bridgeport CT | Fairfield County | Avil's Bathrooms"
- Add `<link rel="canonical" href="https://avilsbathrooms.com/" />`
- Update `og:url` to `https://avilsbathrooms.com/`
- Add **LocalBusiness JSON-LD** with: name, address (259 Willow St, Bridgeport, CT 06610), phone (+1 475-351-0934), email, `areaServed` (Bridgeport, Fairfield, Stamford, Norwalk, Westport, Trumbull, Milford), `priceRange`, `geo` coordinates, `image`, and `url`

### 2. `public/sitemap.xml` (new)
Static file with public routes:
- `/` (priority 1.0, weekly)
- `/brand-book` (priority 0.5, monthly)

Omit `/payment-success` and `*` (NotFound).

### 3. `public/robots.txt`
Add at the bottom:
```
Sitemap: https://avilsbathrooms.com/sitemap.xml
```
Keep existing user-agent blocks.

### 4. Local keyword H2s
Add Bridgeport/Fairfield County phrasing to existing H2s without changing layout or copy intent:
- `WhyAvil` — work "Bridgeport, CT" into the H2
- `DirectConnection` — already mentions Bridgeport in body; tighten H2 to reference Fairfield County service area
- `Gallery` — H2 mentions "Bridgeport bathroom renovations"

Only H2 text changes, no structural edits.

### 5. Hero video preload fix (`src/components/Hero.tsx`)
- Change `preload="auto"` → `preload="metadata"` on the hero `<video>` (saves ~MBs on every page load)
- Add a `poster` attribute pointing to an existing hero still (or skip poster if no still exists — happy to generate one if you want)

### 6. Testimonial videos (`src/components/Testimonials.tsx`)
- Verify `preload="metadata"` (not `auto`) — adjust if needed

---

### Out of scope for this pass
- Semrush keyword research → next pass
- Body copy rewrites → next pass
- Image WebP conversion → separate pass if needed
- Backlinks → advisory only, no code
- Google Search Console submission → I'll point you to it after deploy

Approve to proceed.
