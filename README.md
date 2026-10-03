# CricPulse India

A free, student-friendly personalized cricket PWA starter built with Next.js App Router, TypeScript and Tailwind CSS.

## Run in VS Code

1. Install Node.js 20 LTS or newer.
2. Clone the repository and open it in VS Code.
3. In the VS Code terminal run:

```bash
npm install
cp .env.example .env.local
npm run dev
```

4. Open `http://localhost:3000`.

The app works immediately in **demo mode** without any API key or Supabase credentials. Demo matches and players are in `lib/data.ts`.

## Optional free integrations

### Cricket API
Set these in `.env.local`:

```env
CRICKET_API_BASE_URL=your_provider_base_url
CRICKET_API_KEY=your_key
```

Keep API calls in server route handlers. Never put the provider key in a `NEXT_PUBLIC_` variable. Replace the adapter in `lib/cricket.ts` with the response mapping for your chosen free provider.

### Supabase
Create a free Supabase project, copy the project URL and anon key into `.env.local`, then run `supabase/schema.sql` in the Supabase SQL editor. Auth can use email/password and Google from Supabase Dashboard > Authentication > Providers. The current UI remains usable in demo mode when these variables are empty; connect the forms to Supabase when you want real accounts.

### Reminders and cron
`/api/reminders` is the persistence hook and `/api/cron` is a secured Vercel Cron foundation. Add a `CRON_SECRET` environment variable in production. Browser notifications require HTTPS (localhost is allowed) and user permission. A true scheduled push system additionally needs stored push subscriptions and a server-side Web Push provider/library.

## Deploy to Vercel free tier

Import the GitHub repository into Vercel, set the same environment variables, and deploy. The free tier is suitable for a personal project, subject to provider/Vercel limits. Add a `vercel.json` cron schedule only after connecting a real reminder store.

## Useful commands

`npm run dev` — local development  
`npm run build` — production build check  
`npm start` — run production output
