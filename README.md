# ProfileApp (Expo + Expo Router)

A React Native app built with Expo Router that showcases a Profile screen, theming, authentication against a Classroom API, and full Book CRUD (list, detail, create, edit, delete) with auto-refresh.

## Features

- Theming
  - Light/Dark mode via `ThemeProvider` in `context/AppTheme.js`
  - Header toggle on every screen
- Authentication
  - Register (username, email, password) and Login (email, password)
  - Token persisted via `expo-secure-store`
  - Profile loaded with `/api/auth/profile`
  - Auto-logout and prompt when token expires (401)
- Books CRUD
  - List with search and pagination
  - Detail page with Edit/Delete actions
  - Create/Edit forms using only API-allowed fields
  - Auto-refresh after create/update/delete (event bus + focus reload)
- Navigation
  - `expo-router` stack with guarded screens using `<Redirect />` when not authenticated

## Stack

- Expo SDK 53, Expo Router ~5
- React Native 0.79, React 19
- `expo-secure-store` for token storage

Note: React 19 with Expo 53 may not be the officially recommended pairing for every template. If you encounter incompatibilities, consider aligning React to the version recommended by Expo SDK 53.

## Project structure (key parts)

- `app/_layout.js` — Root layout, Theme + Auth providers, Stack screens
- `app/login.jsx`, `app/register.jsx` — Auth screens
- `app/books/index.jsx` — Books list (search, pagination, +New)
- `app/books/[id].jsx` — Book detail (Edit/Delete)
- `app/books/[id]/edit.jsx` — Edit form
- `app/books/create.jsx` — Create form
- `context/AuthContext.js` — Auth state, token persistence, profile fetch, 401 handling
- `context/AppTheme.js` — Theme tokens and provider
- `lib/api.js` — API base URL + fetch helper
- `lib/events.js` — Tiny event bus for book list auto-refresh

## Prerequisites

- Node.js LTS
- A running backend (Classroom API) reachable from your device/emulator
  - It should expose the documented endpoints under `/api/auth/*` and `/api/books/*`
  - Swagger UI often at `/api-docs`

## Configuration

The app reads the backend base URL from the public Expo env var `EXPO_PUBLIC_API_BASE_URL` in `lib/api.js`:

- `export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000";`

When testing on a real device/emulator, avoid `localhost`. Use your machine's LAN IP (e.g. `http://192.168.1.10:3000`).

- Windows PowerShell (temporary for the current session):

```powershell
# Replace with your machine IP where the API runs
$env:EXPO_PUBLIC_API_BASE_URL="http://YOUR_PC_IP:3000"; npm run start
```

Android emulator tip: use `http://10.0.2.2:3000` for reaching the host machine.

Ensure your backend allows CORS for the Expo dev server origin.

## Install and run

1) Install dependencies

```powershell
npm install
```

2) Start the app

```powershell
npm run start
```

3) Choose a platform (Android/iOS/Web) from the Expo CLI.

## Using the app

- First launch: you’ll be redirected to Login if not authenticated.
- Register: requires username, email, password (only fields the API expects)
- Login: email, password
- Books:
  - List: search, pagination, tap a card for details
  - Create: tap "+ New" in the list
  - Edit/Delete: from the detail page
  - After create/update/delete, the list auto-refreshes
- Token expiry: if the server returns 401, you’ll be prompted and redirected to Login.

## Implementation notes

- Guards use `<Redirect href="/login" />` instead of imperative navigation to avoid duplicate navigations under Strict Mode.
- Auto-refresh combines a small event bus (`lib/events.js`) and focus-based reload in the list.
- Token is persisted via `expo-secure-store`; profile loads on app start when a token exists.

## Troubleshooting

- 401 Unauthorized
  - Check `EXPO_PUBLIC_API_BASE_URL`
  - Verify the API is reachable from your device/emulator and CORS is configured
- Network
  - Ensure the device and API server are on the same network
  - Use IP instead of `localhost` on real devices
- Build issues
  - Run `npm install` after pulling changes
  - If dependency/version conflicts occur, align React/React Native versions with Expo SDK 53 recommendations

## Scripts

- `npm run start` — start the Expo dev server
- `npm run android` — start on Android
- `npm run ios` — start on iOS
- `npm run web` — start on web

## License

This project does not include a license file by default. Add one if you plan to share/distribute.
