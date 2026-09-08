# Consumer site handoff (blabberly.com)

Written 2026-09-07 by command center for Jake Alvarez. Everything here was checked against the repo and the live site that day. Jake Ross owns the business side (partner site, dashboard, claim flow) and every deploy. This document is the consumer side: the pages a person sees when they go to blabberly.com without an account.

## 1. What is live right now

- **Repo:** `github.com/JakeAlvarez711/blabberly`, branch `main`. Create React App (`react-scripts`), React 18, `react-router-dom`, Firebase JS SDK, `lucide-react` icons. Scripts: `npm start` (local, port 3000), `npm run build`, `npm test`.
- **Hosting:** Firebase Hosting, project `blabberly-website`, serves the `build/` folder. Every path rewrites to `index.html` (single-page app) except the static folders under `public/`.
- **The root URL:** `/` renders `WaitlistPage` for a visitor without an account and the web app's feed for a signed-in user (`src/App.js`, `RootRoute`). The web app behind sign-in (feed, explore, map, profile, messages, create) is the older React port of the mobile app. It is not the priority and not your surface; the landing page is.
- **The landing page today:** `src/pages/WaitlistPage.jsx`. Logo lockup, rotating slogan, one phone-number field, footer links to privacy, terms and support. That is the whole consumer site.
- **Static pages under `public/`:** `/privacy`, `/terms`, `/guidelines`, `/support`, `/list-invite`, plus `/.well-known/apple-app-site-association` (universal links into the app) and `security.txt`. These are copied into the build untouched.
- **What arrives Wednesday 2026-09-09 (Jake Ross deploys):** a full legal rewrite (privacy, terms, guidelines, new `/disclosures`), generated from Markdown sources in `docs/legal/` by `scripts/build-legal-pages.js`; and four hosting rewrites that send `/p/*`, `/place/*`, `/event/*`, `/u/*` to a preview function so links shared from the app unfurl with the real place, post or profile instead of the logo.

## 2. One live bug you should know about before touching the form

The waitlist form writes the phone number straight into the app's database (`waitlist/{phone}` in Firestore). The database's security rules no longer allow that write, so since late August every submission has failed with "Couldn't save your number. Try again in a sec." Jake Ross is fixing it on the rules side; nothing in the page needs to change for that. If you redesign the form, keep the same write shape (`phone` in E.164, `source: "web"`, `createdAt`, `lastSeenAt`, `userAgent`, `referrer`) so the rule keeps matching, or ask before changing it. Do not add fields without asking: the privacy policy lists exactly what the form collects.

## 3. The split

| Yours (consumer) | Jake Ross (business and platform) |
| --- | --- |
| `/` for signed-out visitors, and every consumer page in the V1 plan: `/download`, `/about`, `/support` copy, `/404`, `/why-the-scores-are-real`, `/taste-quiz`, `/places`, `/guides`, `/nights-out` | `/business`, `/claim`, `/dashboard`, `/team`, `/api/*` (these live in a separate repo, `blabberly-website`, and must not be built here) |
| Copy, layout, images, the waitlist experience, the "what is Blabberly" story | Firebase rules, functions, hosting config (`firebase.json`), the legal pages, `.well-known`, anything that touches the app's data |
| Branches and pull requests into `main` | Merging and deploying |

## 4. How to work

1. `git clone`, `npm install`, ask Jake Ross for the `.env` (seven `REACT_APP_FIREBASE_*` values; it is not in git and must never be committed), `npm start`.
2. One branch per change, named for the change (`consumer/home-hero`, `consumer/about-page`). Push the branch and open a pull request into `main`. Jake Ross reviews, merges, builds and deploys.
3. **Never run `firebase deploy` from any checkout.** Two repos deploy to the same site and whichever deploys last wins; a deploy from the wrong one takes the other site down. Deploys are Jake Ross's.
4. Never edit by hand: `public/privacy`, `public/terms`, `public/guidelines`, `public/disclosures` (generated from `docs/legal/*.md`; edit the Markdown and rebuild if legal copy must change, then say so), `public/.well-known/*`, `firebase.json`, `src/firebaseConfig.js`.
5. Do not add analytics, tracking pixels, chat widgets or ad SDKs. The privacy policy says the site has none. If you want measurement, ask first; it is a policy change, not a script tag.
6. New routes go in `src/App.js`. Keep the consumer pages outside the signed-in shell so they render for visitors without an account.

## 5. The plan you are building against

`docs/WEBSITE-MASTER-PLAN.md` (copied here from the product repo) is the site's bible: competitive teardowns, the sitemap, page-by-page blueprints, the visual direction, the copy voice, the asset list. Read Part 4 first: §2 (sitemap and the V1 subset), §4.1 (homepage), §5 (visual direction), §6 (copy voice and the banned list).

The V1 subset, in the order that matters during beta:

1. **Homepage `/`** (§4.1). Six beats: hero with the taste-chip grid and a live venue card computing a % match, recognition strip of real rated posts, the five-chapter guided night, the building-in-public strip, the proof wall of tester quotes, the closing ask. The only place the email field renders is the close and the footer.
2. **`/download`**, **`/about`**, **`/support`** (five FAQs plus support@blabberly.com), **`/404`**.
3. **`/why-the-scores-are-real`**, **`/taste-quiz`**, **`/my-matches`** (needs a place-data snapshot from Jake Ross).
4. **`/places`**, **`/places/{neighborhood}`**, **`/guides`** (needs the same snapshot and a build step; plan it, do not start it alone).

During the beta the landing page has two jobs: get invited testers into the app (the TestFlight link is `https://testflight.apple.com/join/YEcMBSkH`, capped at 65, invite-only in practice, so it does not go on the public page) and collect the launch waitlist. Write for both.

## 6. Brand, in the app's own words

- **Tagline:** "See what's happening." with the period, verbatim, always.
- **Colors** (from the app's single source, `src/theme/colors.js` in the product repo): brand orange `#FF6B35`, brand dark `#E85A24`, brand soft `#FFF5EF`, brand gradient `#FF6B35` to `#FF8F5E`, sunset gradient `#FF6B35` to `#EC4899` to `#F43F5E`, text `#1a1a1a` on white. The site is sunset-warm light; no dark mode.
- **Type:** SF Pro Display is in `src/assets/fonts/` (Light to Black). Match the plan's type scale rather than inventing one.
- **Logo:** `public/logo512.png`, `public/logo192.png`, and `src/assets/logo.png.png` (the lockup used on the page). Ask Jake Ross for the source files if you need a vector.
- **Voice:** the fifteen rules and the banned list in §6 of the plan. Short version: a San Diego friend who always knows the spot; product words are the site's words; "ratings" and "posts", never "reviews" or "content"; name real places; concrete numbers only; the one verb per page is "Find your % match" before launch and "Get the app" after.

## 7. Real material you can use

- Photos and clips: only from testers who gave written consent, per §9 of the plan. Ask Jake Ross before using any post.
- Numbers that survive an audit today: about 11,200 places in the catalog, about 4,950 checked for closure, about 1,000 places with fully written descriptions and tags, 30 testers on the public link, first beta update shipped 2026-09-07. Use them where the plan says small-and-real reads as momentum, never inside a cold trust claim.
- Place data for the hero widget, matches page and directories: Jake Ross can export a JSON snapshot of the enriched catalog (name, neighborhood, photo, tags, blended rating). Ask for it when you reach the homepage hero.

## 8. Ask Jake Ross for

The `.env`, the logo source, a place-data snapshot, tester quotes with consent, and a review on every pull request. Anything touching the database, rules, functions, the hosting config or the legal pages goes through him.
