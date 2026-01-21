# LHWEB Analytics + Lead Intelligence Setup

## Required environment variables

### Firebase (client)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Firebase Admin (server)
Provide a service account JSON as either base64 or plain JSON:
- `FIREBASE_SERVICE_ACCOUNT_JSON_BASE64` (recommended)
- OR `FIREBASE_SERVICE_ACCOUNT_JSON`

### Admin allowlist
- `ADMIN_EMAILS` (comma-separated list of admin emails)

### GA4 Data API
Provide a GA4 service account JSON (base64 recommended):
- `GA4_SERVICE_ACCOUNT_JSON_BASE64`
- OR `GA4_SERVICE_ACCOUNT_JSON`
- `GA4_PROPERTY_ID`

### Home content
- No extra env vars required; uses Firestore Admin SDK.

## GA4 Data API setup
1) Go to Google Cloud Console and select the project linked to GA4.
2) Enable **Google Analytics Data API**.
3) Create a Service Account and generate a JSON key.
4) In GA4 Admin → Property Access Management, add the service account email as a **Viewer** (or Analyst).
5) Set `GA4_PROPERTY_ID` to the numeric GA4 property ID.
6) Add the service account JSON as `GA4_SERVICE_ACCOUNT_JSON_BASE64`.

Optional (for event parameter reporting):
- In GA4 Admin → Custom definitions, create custom event parameters for:
  - `placement`
  - `cta_id`
  - `cta_text`

## Firebase Auth setup
1) Enable **Google** provider in Firebase Authentication.
2) Add your domain to the Auth allowed domains list.
3) Add admin emails to `ADMIN_EMAILS`.

## Firestore setup
1) Enable Firestore in the Firebase console.
2) Suggested rules (deny public writes, allow admins only):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{doc} {
      allow read, write: if false;
    }
  }
}
```

The server-side API uses Admin SDK and bypasses rules.

## Storage rules (suggested)
Allow public read for content assets, write only via Admin SDK:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /content/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Home content storage
- Firestore document: `content/pages/home`
- Storage bucket folder: `content/home/*`

## Seed script
Upload current Home assets and content into Firestore/Storage:

```bash
node scripts/seed-home-content.ts
node scripts/seed-home-content.ts --force
```

If your Node version does not run `.ts` directly, use:

```bash
node --experimental-strip-types scripts/seed-home-content.ts
```

## Home editor
- Visit `/dashboard/content/home` (admin only).
- Edit text and upload images/videos, then click **Save**.

## Next.js image domains
- Firebase Storage domain is allowed via `next.config.ts` (firebasestorage.googleapis.com).

## DebugView (Firebase Analytics)
1) Install the Google Analytics Debugger extension (optional).
2) In Firebase console → Analytics → DebugView, confirm events appear after accepting consent.
