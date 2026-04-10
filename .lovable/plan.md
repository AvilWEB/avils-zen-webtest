

## Plan: Update Gift Card in Brand Book

### Current State
- `ComponentTemplates.tsx` shows a gift card preview image (`gift-card-template-preview.jpg`) and links to an external GitHub release for the PSD download
- The old preview image lives at `src/assets/gift-card-template-preview.jpg`

### Steps

1. **Extract the uploaded zip** to get the new gift card files (PSD templates and any preview images)

2. **Delete old gift card asset** — remove `src/assets/gift-card-template-preview.jpg`

3. **Add new gift card assets**:
   - Copy new preview image(s) from the zip into `src/assets/`
   - Copy downloadable PSD file(s) into `public/downloads/` so they can be directly downloaded from the site

4. **Update `ComponentTemplates.tsx`**:
   - Replace the old preview image import with the new one(s)
   - Change the download link from the external GitHub URL to the local `/downloads/` path
   - If multiple gift card variants exist in the zip, display each with its own preview and download button

### Technical Details
- PSD files go in `public/downloads/` for direct download (not bundled by Vite)
- Preview images go in `src/assets/` for optimized bundling
- If the zip only contains PSDs (no preview JPGs), we'll convert or create preview images from them

