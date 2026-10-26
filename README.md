# THE FOOD CO. — Cinematic 3D Scroll-Driven Website

A luxury, interactive 3D food advertisement website recreating the cinematic scroll-driven burger assembly experience for **THE FOOD CO.**

## Highlights

- **Scroll-Controlled Dual-Engine Burger Assembly**:
  - **Commercial 4K Film Scrub**: Frame-by-frame HTML5 Canvas scrub synchronized to scroll progress with zero stutter.
  - **Interactive 3D WebGL Studio**: Real-time Three.js scene with PBR materials, warm 3-point studio lighting, contact shadows, procedural textures (quinoa-lentil patty, folded cheese slice, ruffled lettuce, tomato slices, onion rings, glossy sauce, sesame seed crown bun), and an interactive **Exploded View slider** + 360° rotation.
- **8-Step Assembly Sequence**:
  1. Opening: Toasted Sesame Bun on reflective dark stone
  2. Artisan 100% Vegetarian Patty (lentils, quinoa, herbs, veggies)
  3. Molten Vegetarian Cheddar Slice
  4. Crisp Green Lettuce & Vine-Ripened Tomatoes
  5. Crisp Onion Rings & Signature Relish Sauce
  6. Golden Crown Bun with Sesame Seeds
  7. Commercial 360° Culinary Reveal
  8. Final Headline: “GOOD FOOD. GREAT CRAVINGS.”
- **Website Sections**:
  - **A. Cinematic Hero**: Pinned scroll-driven assembly scene with scrub slider, step markers, and mode toggle.
  - **B. Brand Story**: Headline “YOUR CRAVINGS DESERVE SOMETHING BETTER.”, 4 culinary pillars, and dedicated vegetarian pledge.
  - **C. Our Signature Bites**: Curated menu cards for artisanal vegetarian burgers, rolls, chowmein, and loaded fries with spice meters and ingredient modal.
  - **D. Freshness and Flavour**: Farm-to-kitchen harvest, daily small-batch bakes, and house reductions.
  - **E. Location and Contact**: Official address (`Plot No. 275/20, Shanti Nagar, Heera Nagar, Sector 11, Gurugram, Haryana 122001`) with functional Call, WhatsApp, and Google Maps direct links.
  - **F. Final Cinematic CTA**: “YOUR NEXT CRAVING STARTS HERE.” with dramatic close-up and “FIND US” button.
- **Procedural Web Audio API Sound Engine**: Zero-file audio cues for air whoosh, appetizing thud, and harmonic gold chimes.

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server on port 3000
npm run dev

# Run unit tests
./node_modules/.bin/tsx --test src/utils/assemblyLogic.test.ts

# Production build
npm run build
```

---

## GitHub Pages Deployment Instructions

This repository is already configured with relative asset resolution (`base: './'` in `vite.config.ts`) so it deploys seamlessly to GitHub Pages.

### Option A: Automatic Deployment via GitHub Actions (Recommended)

1. In your GitHub repository, create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Go to **Settings** > **Pages** in your GitHub repository and set **Source** to **GitHub Actions**.
3. Push to `main` — your site will build and publish automatically!

### Option B: Manual Deploy with `gh-pages`

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add deploy script to package.json:
# "deploy": "npm run build && gh-pages -d dist"

# 3. Deploy
npm run deploy
```
