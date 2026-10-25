# VineCore Website

Public website for VineCore, the one-person industrial & embedded software consultancy.

- **Frontend:** Angular 22 (standalone components + signals), Tailwind CSS v4. A single-page site with anchored sections: Hero, About, Services, Projects, Contact.
- **Backend:** .NET 10 minimal API. One endpoint, `POST /api/contact`, that emails the message to `info@vinecore.com` over SMTP. No database.
- **Contact form:** name, email, optional subject, message, plus a honeypot field to catch bots.

## Structure

```
frontend/   Angular app
backend/    ASP.NET Core minimal API (VineCore.Api)
docs/       Agent documentation
GLOSSARY.md Domain vocabulary
```

## Prerequisites

- **Node.js 24+** (Angular 22 requires `^24.15`). Managed here with nvm-windows: `nvm use 24.22.1`.
- **.NET 10 SDK** (the project targets `net10.0`; pinned in `global.json`).

> If you installed the .NET 10 SDK via the `dotnet-install` script, it lives at
> `%LOCALAPPDATA%\Microsoft\dotnet`. Add that folder to your `PATH` *before* the
> system-wide `C:\Program Files\dotnet` so `dotnet` resolves the 10 SDK.

## Run locally

### Backend

```powershell
cd backend
dotnet run          # http://localhost:5000
```

### Frontend

```powershell
cd frontend
npm install
npm start           # http://localhost:4200
```

The frontend dev server proxies `/api/*` to `http://localhost:5000`
(see `frontend/proxy.conf.json`), so the contact form reaches the backend with
no CORS setup in development.

## Configure email (SMTP)

The contact form only works once SMTP is configured. Fill in `backend/appsettings.json`
(or environment variables / user-secrets for real credentials):

```json
{
  "Contact": { "Recipient": "info@vinecore.com", "From": "info@vinecore.com" },
  "Smtp": {
    "Host": "smtp.example.com",
    "Port": 587,
    "Username": "...",
    "Password": "...",
    "UseSsl": true
  }
}
```

Any SMTP relay works. A free option that can send from your own domain:

- **Brevo** (free, 300/day): host `smtp-relay.brevo.com`, port `587`,
  username = your Brevo login, password = your SMTP key. Verify the `vinecore.com`
  domain in Brevo (add the SPF/DKIM DNS records) so mail sends from
  `info@vinecore.com`.
- Your own email host (Combell, One.com, TransIP, Microsoft 365, …) already
  includes SMTP — check its settings.

> **TODO:** fill in real SMTP credentials. On Vercel, set them as environment
> variables instead — see [Deploy to Vercel](#deploy-to-vercel).

## Deploy to Vercel

The site deploys as a single Vercel project with two services (see `vercel.json`):

- **frontend** — the Angular app, built and served as static files.
- **api** — the .NET backend, built from `backend/Dockerfile.vercel` and run as a container.

Requests to `/api/*` are rewritten to the backend; every other path serves the
frontend. The contact form already posts to `/api/contact` on the same origin, so
no frontend changes are needed.

### One-time setup

1. Install the CLI and link the project from the repo root:

   ```powershell
   npm install -g vercel
   vercel link
   ```

2. Add the SMTP credentials as environment variables (Production and Preview).
   The `__` maps to a `:` in .NET config, so `Smtp__Host` becomes `Smtp:Host`:

   ```powershell
   vercel env add Smtp__Host
   vercel env add Smtp__Username
   vercel env add Smtp__Password
   vercel env add Smtp__Port    # optional, defaults to 587
   ```

3. Deploy:

   ```powershell
   vercel deploy --prod
   ```

   Or import the GitHub repo in the Vercel dashboard for automatic deployments on push.

The backend container binds `0.0.0.0:$PORT` (default 80) via `backend/Dockerfile.vercel`.

## Next steps / TODOs

- [ ] Fill in real SMTP credentials (see above).
- [ ] Run the Vercel deploy (see [Deploy to Vercel](#deploy-to-vercel)) and point a custom domain at it.
- [ ] Replace the placeholder copy with final text.
- [ ] Confirm the logo renders well — header uses the trimmed `vinecore-logo-trim.png` (1444×516) at `h-10`; favicon is a 488×488 VineCore icon.
