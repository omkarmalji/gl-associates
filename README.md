# Gayatri Lokesh Architects LLP

An image-led architectural portfolio built as a sequence of full-viewport scenes. Wheel, swipe, keyboard, and on-screen controls move one scene at a time; the document itself does not conventionally scroll.

## Local development

```bash
npm install
npm run images
npm run dev
```

The image build reads the client source material kept locally in `docs/` and writes optimized responsive WebP assets to `public/media/`. The original client files are intentionally ignored by Git.

## Verification

```bash
npm run typecheck
npm run build
npm run qa:routes
npm run qa:visual
```

The QA commands require Chrome at its standard Windows installation path and a local Vite server running at `http://127.0.0.1:5173/gl-associates/`.

## Deployment

Pushes to `main` deploy the `dist` build to GitHub Pages through `.github/workflows/deploy-pages.yml`.

The project inquiry form posts to FormSubmit for `projects@gl-associates.net`. The recipient must confirm FormSubmit's one-time activation email after the first submission.

## Preserved versions

- `templates/gl-editorial-v1/` — previous editorial website.
- `templates/gl-spatial-index-v2/` — reusable source snapshot of this fixed-viewport direction.
