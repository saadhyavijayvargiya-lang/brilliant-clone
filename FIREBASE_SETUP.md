# Firebase setup — brilliant-clone-5c11e

Project is configured and linked. **App Hosting is not enabled** (classic Hosting only).

## What's configured

| Feature | Status |
|---------|--------|
| Project | `brilliant-clone-5c11e` (`.firebaserc`) |
| Firestore | Database `(default)` in `nam5`, rules deployed |
| Hosting | Serves `dist/` SPA rewrites |
| Cloud Functions | `functions/` TypeScript (`ping`, `onUserCreate`) |
| Emulators | Ports in `firebase.json` (optional local use) |
| Web SDK | `src/lib/firebase.ts` + `.env.local` |

## Console checklist (you may still need)

1. **Authentication** → Sign-in method → Enable **Email/Password** and **Google**
2. **Authentication** → Settings → Authorized domains → ensure `localhost` is listed
3. **Functions** → Requires Blaze (pay-as-you-go) before first deploy

## Commands

```powershell
cd "c:\Users\hasto\Alpha AI\Week 2\brilliant-clone"

# Dev
npm run dev

# Deploy rules only
npm run firebase:deploy:rules

# Full deploy (hosting + functions + rules) — needs Blaze for functions
npm run firebase:deploy
```

## Files

- `firebase.json` — Firestore, Functions, Hosting, Emulators
- `.firebaserc` — default project
- `firestore.rules` — content public read; users scoped to own uid
- `.env.local` — Vite Firebase config (gitignored)

## AI Tutor (Firebase AI Logic / Gemini) — setup needed

The AI tutor is scaffolded in code (`src/lib/ai.ts`, `src/lib/aiTutor.ts`,
"Ask the AI tutor" button on wrong answers). It calls Gemini via Firebase AI
Logic. Until the backend is provisioned it shows a friendly "not enabled yet"
message instead of crashing.

To turn it on (do this once you've switched the Firebase CLI to the account that
owns `brilliant-clone-5c11e`):

```powershell
cd "c:\Users\hasto\Alpha AI\Week 2\brilliant-clone"

# 1. Make sure the right account/project is active
npx -y firebase-tools@latest login          # the brilliant-clone owner account
npx -y firebase-tools@latest use brilliant-clone-5c11e

# 2. Provision Firebase AI Logic (enables the Gemini Developer API)
npx -y firebase-tools@latest init ailogic

# 3. Run locally and test the "Ask the AI tutor" button on a wrong answer
npm run dev
```

What you should provide / confirm:
- You're logged into the Firebase CLI as the `brilliant-clone-5c11e` owner.
- After `init ailogic`, the Gemini Developer API shows enabled in the Firebase
  console (AI Logic / Build section). Its free tier is enough for prototyping.
- Recommended before sharing publicly: enable **App Check** (reCAPTCHA
  Enterprise) so your Gemini quota can't be abused from the public site.
- No API key goes in the code — Firebase AI Logic authorizes via the app config
  + the provisioned backend.

Config flags:
- `VITE_ENABLE_AI=true` (default) shows the tutor; set `false` to hide it.
- Model is `gemini-flash-latest` (changeable in `src/lib/ai.ts`).
