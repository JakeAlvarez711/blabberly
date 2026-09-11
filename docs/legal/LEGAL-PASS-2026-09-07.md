# Legal pass, 2026-09-07

Branch `legal/full-pass-2026-09-07` in the web repo (`/Users/jakeross/blabberly`). Two commits: the first captures the legal pages and well-known files that were live on blabberly.com (byte-identical to the uncommitted edits in the main checkout); the second is this pass.

Everything below was written against the mobile source in worktree `integration-2026-09-02` (head `0fee596`), the Cloud Functions in that worktree, the deployed-equivalent Firestore and Storage rules there, and this web repo. No claim about the product was taken from an older document or a template.

## What changed, per page

| Page | File | Before | After |
|---|---|---|---|
| Privacy Policy | `public/privacy/index.html` (source `docs/legal/privacy-policy.md`) | 8 short sections, dated Aug 24. Named Firebase, Expo, Google Places, Sentry, and Contacts. Claimed gamification and hotspot features; did not mention taste vector, location details, messages, usage events, Anthropic, Resend, Cloud Vision, retention, deletion scope, California rights, or that profiles are public without an account. | Version 3. 14 sections: every data category with its purpose; who can see what (table); every processor and what it receives; retention (table); what deletion removes and what remains; export and other choices; CCPA/CPRA section with Do Not Track and Shine the Light; children (13, attestation, no birthday); international; security (no over-claims); version history. |
| Terms of Service | `public/terms/index.html` (source `docs/legal/terms-of-service.md`) | 12 short sections, dated Aug 24. No beta clause, no Apple terms, no DMCA process, no safety or place-information disclaimers, no dispute clause. | Version 3. 25 sections: eligibility 13+ with parental permission under 18; beta program and feedback license; content license with its end conditions; moderation, reports, appeals; place information disclaimer incl. allergens and no paid placement; routes and driving; plans and meetups; alcohol 21+; messaging facts; prohibited conduct; IP; DMCA with counter-notice (agent placeholders); third-party terms incl. Google's; Apple minimum EULA terms; termination; disclaimers; liability cap; indemnity; disputes placeholder (interim San Diego courts); California law; changes with version history; California consumer notice. |
| Community Guidelines | `public/guidelines/index.html` (source `docs/legal/community-guidelines.md`) | 6 sections, dated Aug 24, generic. | Version 2. Honest ratings and disclosure of paid or personal relationships; no fake accounts; decency and hate rules; privacy incl. no sharing others' locations and consent for tagging; appropriate content incl. alcohol and sound-library rules; safety; the real reporting path (long-press, profile, email), what happens (human review, automated media scan, no auto-removal, aim of one day), actions, NCMEC statement, blocking, appeals. |
| Disclosures (new) | `public/disclosures/index.html` (source `docs/legal/disclosures.md`) | Did not exist. | Version 1. What text is AI-generated (place descriptions, tags and search terms, some events and specials, structured menus), what is not, what goes into the AI, how to flag errors; location use; beta status; businesses and paid placement (none today, "Featured" label when live, counts-only data for partners); where place information comes from with Google's terms linked; how to report a security problem. |
| Support | `public/support/index.html` | Linked Terms, Privacy, Guidelines. | Adds a link to Disclosures. Otherwise unchanged. |

Also added:

- `scripts/build-legal-pages.js`: regenerates the four HTML pages from the Markdown sources with the existing page shell (same fonts, colors, `.updated` line, orange summary box) plus a policies nav line at top and bottom, table styles, and a yellow mark for `[PLACEHOLDER: …]` text. Run `node scripts/build-legal-pages.js` after editing any source. No dependencies.
- `docs/legal/APP-PRIVACY-LABELS.md`: App Store Connect privacy answers, category by category, with code references.
- `docs/legal/LAWYER-REVIEW-CHECKLIST.md`: every placeholder and judgment call.

## Placeholders still in the live pages

Seven, all highlighted in yellow: mailing address (Privacy 14; Terms 14, 16, 25), DMCA agent name and phone (Terms 14), and the dispute-resolution decision (Terms 21). Find them with `grep -rn PLACEHOLDER public docs/legal`. They can ship highlighted for the beta, but should be resolved before the public App Store release.

## Deploy note for command center

- **Deploy hosting from this repo only.** `firebase.json` here sets `public: build`, so run `npm run build` first (Create React App copies `public/` through to `build/`, including `.well-known/`, `privacy/`, `terms/`, `guidelines/`, `disclosures/`, `support/`), then `firebase deploy --only hosting --project blabberly-website`. Verify afterwards with `curl -sI https://blabberly.com/disclosures/` (expect 200 and `text/html`) and `curl -s https://blabberly.com/privacy/ | grep -c "Version 3"` (expect at least 1).
- **The partner repo deploys to the same hosting site.** A deploy from that repo would overwrite these pages with whatever it carries. Either bring these files into the partner repo's public directory before its next deploy, or make this repo the only source of hosting deploys. Do not let both deploy independently.
- **Main-checkout drift.** The main checkout at `/Users/jakeross/blabberly` still carries uncommitted edits (`.gitignore`, `package-lock.json`, `src/pages/WaitlistPage.jsx` removing the sign-in footer link, untracked `.firebase/`, `CLAUDE.md`, an empty `src/config/featureFlags.js`). This branch does not touch those files, so merging is clean, but a deploy from a clean checkout of this branch would re-add the "Have an account? Sign in" footer link that the live site currently lacks. Merge or commit the main-checkout `WaitlistPage.jsx` change first.
- **Effective dates** on all four pages are September 7, 2026. If deployment slips more than a few days, update the `Effective:` line in each `docs/legal/*.md`, rebuild, and commit.
- **Not touched, worth knowing:** `public/.well-known/security.txt` points its Policy field at `https://blabberly.com/security`, which does not exist (it falls through to the waitlist). Either add a `public/security/index.html` or point the field at `/disclosures`. The SPA footer (`src/pages/WaitlistPage.jsx`) links only Privacy and Terms; adding Guidelines and Disclosures there is a one-line change but was left alone because of the uncommitted main-checkout edit to that file.
- **Firestore TTL policies** on `usageEvents.expiresAt` (90 days) and `partnerEvents.expiresAt` (400 days) must exist in the `blabbery-3010a` console for the retention table to be true. Check before deploy; create them if missing.

## In-app follow-up: "we updated our terms" acknowledgement (design only, not built)

Store a single constant in the mobile app, `LEGAL_VERSION = "2026-09-07"`, and a per-user field `legalAcceptedVersion` on `users/{uid}` (add it to the create and update allowlists in `firestore.rules`). On app start, after sign-in resolves and only when `onboardingCompleted` is true, compare the two. If they differ, present a non-dismissable bottom sheet over the feed titled "We updated our Terms and Privacy Policy" with two sentences of plain English on what changed (a link to blabberly.com/terms and /privacy, each opening in the in-app browser), and one button, "I agree," which writes `legalAcceptedVersion` and `legalAcceptedAt: serverTimestamp()` and dismisses the sheet; a secondary "Delete my account instead" text link routes to Settings, then Your Data. New signups write the current version during `ensureUserDoc`, so they never see the sheet, and the existing "By continuing, you agree to Blabberly's Terms & Privacy" line at signup stays. Bumping `LEGAL_VERSION` is the entire release step for future policy changes, and the stored version and timestamp give Blabberly a record of acceptance that does not exist today.

## Open decisions for Jake

1. Mailing address and DMCA agent (placeholders A1, A2 in the checklist), and whether to register the DMCA agent now.
2. Arbitration or courts (A3).
3. Age posture: keep 13+ with browsable bar content, or raise to 18 (B1, B2). Related: the App Store age-rating answer for alcohol references.
4. Whether to move dietary restrictions, notification settings, and privacy settings off the publicly readable profile document (B6). The policy currently discloses that they are public; fixing the data model would let us remove that sentence.
5. The commitment that restaurants will only ever see counts, not per-user activity (B8). This binds the partner dashboard design.
6. Whether to keep sending public caption excerpts to Anthropic for place descriptions (B9), or drop captions from the prompt to simplify the disclosure.
7. A fixed retention period for reports and moderation records (B11), and an engineering task to enforce it.
8. TCPA consent language on the website waitlist before any launch text goes out (B19).

## Claims I was least sure about

1. **Sentry sends device model and OS version.** The code does not set these explicitly; they are standard event context added by the Sentry React Native SDK. If Jake's Sentry project shows no device context on events, remove "your device model and iOS version" from Privacy 2 and from the Crash Data row in the labels document.
2. **Raw usage events are deleted after 90 days and partner counters after 400 days.** The client writes `expiresAt` for both, and comments in `functions/index.js` say the TTL policies exist, but TTL policies are console settings I could not read. If they are not configured, either configure them or change the retention table.
3. **"Featured" will be the label for paid placement.** The consumer UI already renders a "Featured" badge on boosted items behind a flag that is off. The Disclosures page promises paid placements "will carry a visible 'Featured' label." If the product team renames it, update the page.
