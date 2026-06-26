# Pathwise AI Tutor — Cloudflare Worker (OpenAI proxy)

This tiny Worker keeps your **OpenAI API key server-side**. The web app sends the
question context here; the Worker calls OpenAI and returns the structured
challenge JSON. The key never touches the browser, and this runs on Cloudflare's
**free** plan (no Firebase Blaze required).

## One-time setup

1. **Create a free Cloudflare account** at https://dash.cloudflare.com/sign-up

2. **Install deps** (from this `worker/` folder):

```bash
cd worker
npm install
```

3. **Log in to Cloudflare** (opens a browser):

```bash
npx wrangler login
```

4. **Set your OpenAI key as a secret** (you paste it when prompted — it is NOT
   stored in any file):

```bash
npx wrangler secret put OPENAI_API_KEY
```

5. **(Optional) lock down origins.** Edit `wrangler.toml` → `ALLOWED_ORIGINS` to
   your real site origins (comma-separated). Localhost is already included for
   dev. You can also change `OPENAI_MODEL` here (default `gpt-4o-mini`).

6. **Deploy:**

```bash
npx wrangler deploy
```

Wrangler prints a URL like:

```
https://pathwise-tutor.<your-subdomain>.workers.dev
```

## Point the app at the Worker

In the app's `.env.local` (in `brilliant-clone/`):

```env
VITE_ENABLE_AI=true
VITE_AI_PROVIDER=worker
VITE_AI_PROXY_URL=https://pathwise-tutor.<your-subdomain>.workers.dev
```

Then rebuild/redeploy the web app. The AI tutor now runs on OpenAI through this
Worker.

## Local development

Run the Worker locally with your secret:

```bash
npx wrangler dev
```

It serves at `http://localhost:8787`. For local app dev, set
`VITE_AI_PROXY_URL=http://localhost:8787`.

## Notes

- Updating the key later: just rerun `npx wrangler secret put OPENAI_API_KEY`.
- Cost: Cloudflare Workers free tier covers 100k requests/day. You still pay
  OpenAI for token usage on your own account.
