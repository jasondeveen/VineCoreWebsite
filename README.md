# VineCore Website

Public website for VineCore, the one-person industrial & embedded software consultancy.

- **Frontend:** Angular 22 (standalone components + signals), Tailwind CSS v4. A single-page site with anchored sections: Hero, About, Services, Projects, Contact.
- **Contact:** a `mailto:` link to `info@vinecore.com`. No form, no backend.
- **Deploy:** static build on Vercel.

## Structure

```
frontend/   Angular app (the whole site)
docs/       Agent documentation
GLOSSARY.md Domain vocabulary
```

## Prerequisites

- **Node.js 24+** (Angular 22 requires `^24.15`). Managed here with nvm-windows: `nvm use 24.22.1`.

## Run locally

```powershell
cd frontend
npm install
npm start           # http://localhost:4200
```

## Build

```powershell
cd frontend
npm run build       # outputs to frontend/dist/frontend/browser
```

## Deploy to Vercel

The site is a static Angular build — no backend, no database, no email service.
`vercel.json` points Vercel at the `frontend/` app:

| Setting | Value |
|---|---|
| install | `npm --prefix frontend ci` |
| build | `npm --prefix frontend run build` |
| output | `frontend/dist/frontend/browser` |

Deploy from the repo root:

```powershell
npx vercel --prod
```

Or import the GitHub repo in the Vercel dashboard.

## Next steps / TODOs

- [ ] Replace the About portrait placeholder in `frontend/src/app/components/about/about.html` (above the LinkedIn card, `aspect-[3/4]`) with a vertical photo — e.g. 900×1200 px at `frontend/public/about/portrait.jpg`.
- [ ] Replace the placeholder copy with final text.
- [ ] Replace the remaining project photos in `frontend/public/projects/` with real ones (any number per work, referenced from `components/projects/projects.ts`). Shipped photos are 1600px wide; full-resolution originals live in `frontend/originals/projects/` (git-ignored).
- [ ] Confirm the logo renders well — header uses `vinecore-logo-trim.png` at `h-10`; favicon is a 488×488 VineCore icon.
- [ ] Add more contact channels (phone, …) to the Contact section if desired.
