# CricPulse India — Matchday Control Room

CricPulse India is a mobile-first cricket web app built with Next.js App Router + TypeScript + Tailwind CSS. It runs in **demo mode by default** and upgrades to live provider data when server-side API credentials are added.

## 1) Windows + VS Code quick start

Open **PowerShell** inside VS Code and run commands one-by-one:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open: `http://localhost:3000`

### Production build check

```powershell
npm run build
```

## 2) Test on your phone (same Wi-Fi)

1. Keep `npm run dev` running.
2. Find your laptop IP:

```powershell
ipconfig
```

3. Use your IPv4 address and open on phone browser:

```text
http://<YOUR_IPV4>:3000
```

Example: `http://192.168.1.8:3000`

> Ensure both phone and laptop are on the same Wi-Fi network and firewall allows port 3000.

## 3) Environment variables

`.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
CRICKET_API_BASE_URL=
CRICKET_API_KEY=
CRON_SECRET=
```

### Live cricket provider setup (free tier)

- Set `CRICKET_API_BASE_URL` and `CRICKET_API_KEY` in `.env.local`.
- API key remains server-only. Never expose it via `NEXT_PUBLIC_*`.
- Provider mapping lives in `lib/cricket.ts` inside:
  - `mapProviderMatch`
  - `mapProviderPlayer`
  - `mapProviderStandings`

If your provider response shape is different, update only those mappers.

## 4) Demo mode behavior

When live credentials are missing/invalid:

- App remains fully usable with fallback demo data from `lib/data.ts`.
- UI shows demo/live state and last-updated timestamps.
- Reminders and player alert/follow toggles persist in browser localStorage.

## 5) API routes

- `GET /api/matches?status=live|upcoming|finished&scope=india`
- `GET /api/search?q=<term>`
- `GET /api/players/[id]`
- `GET /api/players/search?q=<term>`
- `GET /api/standings`
- `GET /api/status`
- `GET/POST /api/reminders`
- `GET /api/cron` (Authorization header with `CRON_SECRET`)

## 6) Supabase (optional)

Run `supabase/schema.sql` in Supabase SQL editor.

Helpers are provided:

- `lib/supabase/browser.ts`
- `lib/supabase/server.ts`

When not configured, app gracefully stays in local demo mode.

## 7) PWA notes

- Manifest: `public/manifest.webmanifest`
- Service worker base: `public/sw.js`
- Install prompt behavior varies by browser.
- Web Push limitations: requires HTTPS, user permission, stored subscriptions, and server-side push delivery.

## 8) Deploy to Vercel

1. Import repo into Vercel.
2. Set same env vars from `.env.local`.
3. Deploy.
4. Add cron schedule only after production reminder delivery is implemented.

## 9) Useful commands

```bash
npm run dev
npm run build
npm start
```
