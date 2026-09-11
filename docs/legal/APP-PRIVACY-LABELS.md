# App Store Connect: App Privacy answers

Prepared 2026-09-07 for Blabberly 1.0.1 (bundle `com.blabberly.mobile`). Every answer below is traced to code in the mobile repo (worktree `integration-2026-09-02`) and matches the Privacy Policy version 3 (`docs/legal/privacy-policy.md`). Paths are relative to the mobile repo root.

Apple's definitions used throughout: data is "collected" if it is transmitted off the device in a way that lets Blabberly or a partner access it for longer than servicing the request in real time. "Linked to the user" means it is tied to the account or a user ID. "Tracking" means linking data with third-party data for advertising or measurement, or sharing it with data brokers.

## Top-level answers

| Question | Answer | Why |
|---|---|---|
| Do you or your third-party partners collect data from this app? | **Yes** | See the categories below. |
| Is any data used to track users? | **No** | No IDFA, no ad SDKs, no data brokers. `app.json:44` sets `NSPrivacyTracking: false`; `expo-tracking-transparency` is not a dependency; the only third-party telemetry SDK is Sentry (`package.json`), used for crash reporting only (`src/services/sentry.js`). |
| Privacy Policy URL | `https://blabberly.com/privacy` | Static page in the web repo, `public/privacy/index.html`. |
| Account deletion available in-app? | **Yes** | Settings, then Your Data, then Delete Account (`src/screens/Settings/YourDataScreen.jsx`; `src/data/accountDeletionService.js`; server backstop `functions/index.js` `onUserDeleted`). Sign in with Apple tokens are revoked on deletion (`src/services/authService.js` `performAccountDeletion`). |

## Data types, one by one

Purposes use Apple's vocabulary: App Functionality, Analytics, Product Personalization, Developer's Advertising or Marketing, Third-Party Advertising, Other Purposes.

### Contact Info

| Data type | Collected? | Linked to user | Tracking | Purposes | Evidence |
|---|---|---|---|---|---|
| Name | **Yes** | Yes | No | App Functionality | Display name on the user document (`src/data/userService.js` `updateProfile`); name received from Apple/Google sign-in (`src/screens/Auth/SignupScreen.jsx:189-195` requests FULL_NAME scope). |
| Email Address | **Yes** | Yes | No | App Functionality | Held by Firebase Authentication for every account; SHA-256 hash of the email stored at `users/{uid}/private/contact` for friend matching (`src/screens/Auth/CreateProfileScreen.jsx:278-289`, `src/data/userService.js:400-425`). |
| Phone Number | **Yes** (optional) | Yes | No | App Functionality | Optional field in Create Profile and Edit Profile; raw number plus SHA-256 hash stored at `users/{uid}/private/contact` (`src/screens/Settings/EditProfileScreen.jsx:479-500`, `src/data/userService.js:395-428`). |
| Physical Address | No | | | | Not found in code. Home city is a city name, declared under Coarse Location. |
| Other User Contact Info | No | | | | Not found in code. |

### Health & Fitness

| Data type | Collected? | Evidence |
|---|---|---|
| Health | **No** | Dietary restrictions (vegetarian, vegan, gluten-free, no pork, halal, kosher, dairy-free, nut-free) are food preferences used for ranking, not health or medical records (`src/screens/Auth/PreferencesScreen.jsx:31-40`). They are declared under Other Data Types below. See the judgment call in `LAWYER-REVIEW-CHECKLIST.md`. |
| Fitness | **No** | Not found in code. |

### Financial Info

All **No**. No purchases, no payment SDK, no Stripe in the app (`package.json`; repo-wide grep). Boosts are a read-only ranking input with no purchase path (`src/data/boostService.js`).

### Location

| Data type | Collected? | Linked to user | Tracking | Purposes | Evidence |
|---|---|---|---|---|---|
| Precise Location | **Yes** | Yes | No | App Functionality | Transmitted only when the user acts: live route sharing writes `lat`/`lng`/`accuracy` to `users/{owner}/routes/{id}/sessions/{uid}` (`src/data/routeSessionService.js:136-150`); DM location share writes `location: {lat, lng, …}` to the message (`src/data/dmService.js:403-410`); Places autocomplete forwards a `locationBias` to Google through `placesProxy` (`functions/index.js:2745-2747`). Foreground only; `isBackgroundLocationEnabled: false` (`app.json`). |
| Coarse Location | **Yes** | Yes | No | App Functionality, Product Personalization | `homeCity` (city name) backfilled once from a reverse geocode onto the public user document (`src/data/userService.js:41-63`, called from `src/screens/Explore/ExploreScreen.jsx:1418`). |

### Sensitive Info

**No** (recommended answer). Apple's category covers racial or ethnic data, sexual orientation, pregnancy, disability, religious or philosophical beliefs, trade union membership, political opinion, genetic and biometric data. Blabberly collects none of these directly. Halal, kosher, and no-pork dietary picks can hint at religion but are collected and used as food preferences only, the same way other food apps treat them. This is a judgment call; see `LAWYER-REVIEW-CHECKLIST.md`.

### Contacts

| Data type | Collected? | Linked to user | Tracking | Purposes | Evidence |
|---|---|---|---|---|---|
| Contacts | **Yes** (recommended, conservative) | **No** | No | App Functionality | During onboarding only, the user's contacts are read with permission, phone numbers and emails are SHA-256 hashed on device (`src/utils/contactHash.js`), and only the hashes are sent to the `matchContacts` callable, matched, and discarded (`src/services/contactMatch.js`, `functions/index.js:2923-3004`). Nothing about the contacts is stored, so the data is arguably exempt as "used in real time and not stored." Declaring it is the conservative choice and matches the `NSContactsUsageDescription`. |

### User Content

| Data type | Collected? | Linked to user | Tracking | Purposes | Evidence |
|---|---|---|---|---|---|
| Emails or Text Messages | No | | | | The app does not read the user's email or SMS. In-app direct messages are declared under Other User Content. |
| Photos or Videos | **Yes** | Yes | No | App Functionality | Post media to Storage `posts/{uid}/…` (`src/data/storageService.js`); avatars and covers; DM media `dm-media/…` (`storage.rules`). |
| Audio Data | **Yes** | Yes | No | App Functionality | Video audio tracks in posts; voice notes in DMs (`src/components/Messages/VoiceRecorder.jsx`). Caption transcription runs on device and is not transmitted (`modules/video-engine/ios/VideoEngine.swift:1268` `requiresOnDeviceRecognition = true`). |
| Gameplay Content | No | | | | Not a game. |
| Customer Support | **Yes** | Yes | No | App Functionality | Support and bug-report emails to support@blabberly.com from About & Support (`src/screens/Settings/AboutScreen.jsx:66-74`). |
| Other User Content | **Yes** | Yes | No | App Functionality, Product Personalization | Captions, dish names, ratings and notes, tags, comments, direct messages and polls, plans, routes, lists, place suggestions, profile bio (`src/data/postService.js`, `src/data/dmService.js`, `src/data/planService.js`, `src/data/routeService.js`, `src/data/placeRequestService.js`). |

### Browsing History

**No.** Not found in code. The app has no web browsing feature.

### Search History

**No.** The "search" usage event records only that the Search screen was opened, not the query (`src/hooks/useEngagementTracking.js:63`; `src/data/engagementService.js:96-125`). Recent searches are stored on the device only (`src/services/recentSearchesService.js`, AsyncStorage). Place-search text is sent to Google Places in real time through `placesProxy` and not stored by Blabberly.

### Identifiers

| Data type | Collected? | Linked to user | Tracking | Purposes | Evidence |
|---|---|---|---|---|---|
| User ID | **Yes** | Yes | No | App Functionality, Analytics | Firebase Auth UID on every record; Sentry `setUser({ id })` (`src/services/sentry.js:162-165`); usage events carry `uid` (`firestore.rules:1353-1359`). |
| Device ID | **Yes** (conservative) | Yes | No | App Functionality | Expo push token stored at `users/{uid}/pushTokens/{sha256(token)}` with `platform` (`src/services/notificationService.js:104-119`). No IDFA or IDFV is read. If counsel prefers to treat a push token as not a "device ID," change to No. |

### Purchases

**No.** Not found in code.

### Usage Data

| Data type | Collected? | Linked to user | Tracking | Purposes | Evidence |
|---|---|---|---|---|---|
| Product Interaction | **Yes** | Yes | No | Analytics, Product Personalization, App Functionality | `usageEvents` (app_open, session_end, feed_view, explore_view, search, place_view, post_view, post_created, plan_created, place_saved, place_rated, onboarding steps, screen_view) and `users/{uid}/usageDaily` counters (`src/data/engagementService.js:96-125`, `:423-451`); taste events and dwell signals (`src/data/tasteVectorService.js:508-511`, `src/hooks/useDwellTracker.js`); per-restaurant menu and dish counters (`src/data/analyticsService.js:112-146`). |
| Advertising Data | No | | | | No ads. |
| Other Usage Data | **Yes** | Yes | No | Analytics | Session ID, platform, app version on each event (`src/data/engagementService.js:371-372`, `:429-430`). |

### Diagnostics

| Data type | Collected? | Linked to user | Tracking | Purposes | Evidence |
|---|---|---|---|---|---|
| Crash Data | **Yes** | Yes | No | App Functionality | Sentry crash and error reports with user ID and username (`src/services/sentry.js:52-150`, `:162-165`). Sentry adds device model and OS version as standard event context. |
| Performance Data | **No** | | | | `tracesSampleRate: 0`, auto performance tracing, app-start, frames and stall tracking all disabled (`src/services/sentry.js:87-101`). |
| Other Diagnostic Data | No | | | | Not found in code. |

### Surroundings

**No.** No environment scanning. (Camera is used to record food videos, which are declared under Photos or Videos.)

### Body

**No.** Not found in code.

### Other Data Types

| Data type | Collected? | Linked to user | Tracking | Purposes | Evidence |
|---|---|---|---|---|---|
| Other Data Types: taste preferences, dietary restrictions, and the learned taste vector | **Yes** | Yes | No | Product Personalization, App Functionality | `tastePrefs` and `fineTune` (price range, dietary, aversions) on the user document (`firestore.rules:766-767`, `src/screens/Auth/FindFriendsScreen.jsx:335-345`, `src/screens/Settings/TastePreferencesScreen.jsx`); taste vector at `users/{uid}/tasteVector/current` (`src/data/tasteVectorService.js:203-236`). |

## Third-party partners and what they receive

Apple asks you to account for data collected by third-party SDKs and partners. The set is:

| Partner | Data | Declared under |
|---|---|---|
| Google Firebase / Google Cloud (Auth, Firestore, Storage, Functions, Cloud Vision) | Everything above; Cloud Vision receives post images and video frames | The categories above (Firebase is the storage layer, not a separate collector) |
| Google Maps Platform (Places API, server-side proxy) | Search text; optional location bias; place IDs | Precise Location (bias), not stored by Blabberly |
| Apple (Sign in with Apple, APNs via Expo, on-device Speech) | Name/email at sign-in; notification content; speech stays on device | Contact Info |
| Google Sign-In | Name/email at sign-in | Contact Info |
| Expo (push service, EAS Update) | Push token, notification title/body; update requests (IP, app version) | Device ID, Other Usage Data |
| Sentry | Crash reports with user ID, username, device model, OS, app version, navigation breadcrumbs | Crash Data, User ID |
| Anthropic (batch scripts run by staff, not the app) | Public captions and route notes excerpts, place data; no identifiers | Not app-collected data; disclosed in the Privacy Policy and Disclosures |
| Resend (server-side alert emails to staff) | Report and moderation alert contents | Not app-collected data; disclosed in the Privacy Policy |

None of these partners uses the data for tracking as Apple defines it.

## Privacy manifest and required-reason APIs

`app.json` already declares a privacy manifest with `NSPrivacyTracking: false` and required-reason API entries for UserDefaults (CA92.1), file timestamps (C617.1), system boot time (35F9.1), and disk space (E174.1). Third-party SDK manifests (Sentry, Expo modules, Firebase) ship inside those SDKs. Confirm at archive time that the merged manifest passes App Store Connect validation.

## Things to fix before or right after submission (consistency with these answers)

1. `NSPhotoLibraryUsageDescription` still mentions "stories," a feature that no longer exists (`app.json`). Update the string.
2. The App Store description in `app-store-assets.md` (mobile repo) describes Crew Cut, Stories, and gamification screens that are off or absent, and lists an age rating of 12+. Rewrite it against the current product before submission. The rating question about alcohol references should be answered accurately (bars, cocktails, and drink content are browsable), which may move the rating to 17+ or require the "Alcohol, Tobacco, or Drug Use or References" answer of "Infrequent/Mild."
3. If the Sensitive Info recommendation changes after counsel review, update both this file and the Privacy Policy's California section.
