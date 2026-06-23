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
