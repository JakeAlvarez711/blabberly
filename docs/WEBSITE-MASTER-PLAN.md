# BLABBERLY WEBSITE MASTER PLAN

The complete, build-ready plan for blabberly.com — positioning, page-by-page blueprints, visual system, voice, SEO engine, tech stack, and asset list — pressure-tested in head-to-head judging against fourteen competitor websites.

Generated 2026-06-11 from a multi-agent competitive research operation. Blueprint for the build session — see docs/BLABBERLY-MASTER.md for product ground truth.

---

## Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. The Competitive Set](#2-the-competitive-set)
- [3. Gauntlet Scorecard](#3-gauntlet-scorecard)
  - [Unbeaten After Three Rounds: Duolingo](#unbeaten-after-three-rounds-duolingo)
- [4. The Blueprint](#4-the-blueprint)
- [5. Pattern Library](#5-pattern-library)
- [6. Exploit Map](#6-exploit-map)
- [7. Appendix: Competitor Teardowns](#7-appendix-competitor-teardowns)
  - [T01. Beli (beliapp.com)](#t01-beli-beliappcom)
  - [T02. Corner (corner.inc)](#t02-corner-cornerinc)
  - [T03. The Infatuation (theinfatuation.com)](#t03-the-infatuation-theinfatuationcom)
  - [T04. Eater (eater.com)](#t04-eater-eatercom)
  - [T05. Yelp (yelp.com)](#t05-yelp-yelpcom)
  - [T06. Resy (resy.com)](#t06-resy-resycom)
  - [T07. OpenTable (opentable.com)](#t07-opentable-opentablecom)
  - [T08. Partiful (partiful.com)](#t08-partiful-partifulcom)
  - [T09. Strava (strava.com)](#t09-strava-stravacom)
  - [T10. Cash App (cash.app)](#t10-cash-app-cashapp)
  - [T11. Opal (opalapp.com)](#t11-opal-opalappcom)
  - [T12. Phantom (phantom.com)](#t12-phantom-phantomcom)
  - [T13. Duolingo (duolingo.com)](#t13-duolingo-duolingocom)
  - [T14. Linear (linear.app)](#t14-linear-linearapp)

---

# 1. Executive Summary

**The positioning insight.** Lay fourteen competitor sites side by side and one pattern emerges: **every competitor sells one slice of the night, and nobody sells the night.** Beli sells list-keeping. Corner sells saving. The Infatuation and Eater sell one critic's answer, the same for everyone. Yelp sells pooled strangers' stars everyone resents. Resy and OpenTable sell the last 5% — the booking. Partiful gathers the people but can't say where to go. Three stories appear in **zero** of the fourteen sites, and Blabberly can tell all three structurally, not as marketing:

1. **"The score is real because the person actually went."** A star rating is required on every post — you can't talk about a place here without having been. No competitor can say this; Yelp's and OpenTable's inventory *is* the anonymous average, and Corner was so disgusted by broken ratings it amputated the number entirely. We didn't kill the rating — we made it earn itself.
2. **"The score is about *you*."** % match — computed against your taste profile, following every spot across feed, map, search, and place pages — has no competitor on the open web. Editorial brands have no user model; the booking giants can't reputationally touch it.
3. **"Discovery becomes a plan."** The 7pm problem — six people, one group chat, nobody can pick — is served by no one. Polls, plans, and multi-stop routes make Blabberly the only product in the set where watching a video ends with your friends standing somewhere together. And the frequency math is the wedge: hosting happens 3x a year; "where should we eat?" happens 3x a week.

The core positioning statement, one sentence, three verified holes: **Blabberly is the only place where San Diego's food scene is scored by people who actually went, matched to your personal taste, and turned into a night out with your people.** And it plays out on uncontested ground — Corner doesn't list San Diego, Beli's content engine stalled at two NYC guides, The Infatuation has ~4 SD guides, Eater SD gets national scraps.

**The verdict on the strategic lean.** Publish the 1,626 already-enriched place pages pre-launch as the SEO engine, with waitlist capture on every page. The blueprint's §3 ruling: **ship them pre-launch — this is not close.** The enrichment is already paid for (1,626 places, 0 failures), SEO compounds on calendar time so the pages rank *at* App Store launch when they convert at download intent, every page is an intent-tagged capture surface (the signup stores *which venue hooked them*), and the AI-answer flank is wide open while Yelp and Corner actively block AI crawlers. The risks (thin-content penalty, quality variance, dead-end teasing) are each answered with a mechanical quality gate, schema, the lattice, and the Notify inversion — see §3 of the Blueprint.

**The five biggest ways this site beats the competition** (each verified against the teardowns and upheld by the gauntlet judges):

1. **A tool, not a brochure.** The hero *is* the taste quiz's first step; the payoff is /my-matches — the visitor's personal ranking of all 1,626 enriched venues, computed live in the browser. Every food competitor's site converts only the already-convinced: Beli, Corner, and Partiful have zero email capture anywhere; Yelp's homepage assumes you already know Yelp. We hand the visitor the product, then ask.
2. **1,626 server-rendered place pages in a county where every competitor is structurally absent.** More unique structured content per page than Yelp exposes to crawlers, FAQ schema from anticipatedQueries, slug parity with the app's universal links — and half the competitive set has voluntarily exited the search/AI-answer channel behind bot walls.
3. **Appetite as the medium.** Real autoplaying food video — absent from every food website in the set ("not one of the fourteen sites shows a human being eating food on video") — inside a warm, sunset-token visual system inherited hex-for-hex from the shipping app, against a field split between utility-gray incumbents and the dark-SaaS monoculture. Percy, the personified % match dial, always wearing a real computed number.
4. **Mechanism-based trust.** "A rating is required on every post" gets its own URL (/why-the-scores-are-real), every public number routes through one auditable proof.json, and the voice guide bans trust adjectives. Against Yelp's resented averages, Corner's three contradicting user counts on one page, and editorial's one-critic-for-everyone, we argue a mechanism, not vibes.
5. **Conversion machinery wired for launch day, not just today.** One funnel verb sitewide, ?src attribution on every hard CTA, every signup tagged with venue/route/taste intent ("Campfire is live — your 91% match is ready"), App Store pre-order as the zero-friction commit, and a one-flag flip to "Get the app" at launch. Launch day is unlocking pages, not rebuilding — the CEO-locked doctrine.

**The gauntlet record: 13–1.** The blueprint was judged head-to-head against all fourteen live competitor sites on conversion, memorability, and story — with the explicit rule that vague specification loses to executed reality. It beat every food competitor and five of six craft references in round one, beat Partiful in round two, and lost only to Duolingo after three rounds and twelve integrated revisions (G-1…G-12). The full scorecard, and exactly what it would take to beat Duolingo, is in [Section 3](#3-gauntlet-scorecard).

**Recommendation: greenlight the build.** The completeness audit (2026-06-11) rates the Blueprint build-ready — every v1 page has drafted copy, every visual maps to a named asset or build rule, and the only items outside the document are the §8.4 runtime verifications and the §9.0 asset-capture sessions, both with owners and committed dates.

---

# 2. The Competitive Set

Fourteen sites, torn down 2026-06-11. **Tier A** = direct food-discovery competitors (sites doing our job). **Tier B** = best-in-class reference sites from outside food (the craft and conversion bar). Full teardowns in the [Appendix](#7-appendix-competitor-teardowns).

## Tier A — Food discovery

| Site | Why it's in the set |
|---|---|
| **Beli** (beliapp.com) | The closest direct competitor — social restaurant ranking with taste-match recs, ~$12M raised, ~75M reviews — whose entire web presence is a thin Squarespace brochure with zero capture. |
| **Corner** (corner.inc) | Gen-Z "social map" with a 300–400K-page programmatic SEO footprint — locked behind a robots.txt that blocks everyone but Googlebot; the anti-ratings manifesto we cure rather than copy. |
| **The Infatuation** (theinfatuation.com) | The best editorial voice in food and the methodology-as-trust model ("Show up unannounced. Pay for everything.") — with ~4 San Diego guides and footer-only conversion. |
| **Eater** (eater.com) | Vox Media's editorial authority network (the 38, James Beard wins) — zero personalization, zero UGC, and an app funnel that produced 48 ratings in 20 months. |
| **Yelp** (yelp.com) | The incumbent anonymous average and the trust collapse our positioning attacks — bot-walled, AI-crawler-blocked, and doctrinally conversion-free for cold visitors. |
| **Resy** (resy.com) | Premium booking; the category's best proof that a restaurant platform can feel brand-led — and the source of the Notify pattern we invert on every place page. |
| **OpenTable** (opentable.com) | Booking at scale; the named-moat ("verified diners") and freshness-stamping lessons — with no taste identity and coverage gated to contract venues. |

## Tier B — Craft & conversion references

| Site | Why it's in the set |
|---|---|
| **Partiful** (partiful.com) | Tool-first hero (create an invite in one click) and voice-as-moat — the event-layer adjacency, and the frequency wedge we attack by name. |
| **Strava** (strava.com) | The community-first hero, inline signup capture, and programmatic local SEO pages that compound — community claimed but never shown. |
| **Cash App** (cash.app) | Worldview headline + proof-strip discipline + brand-system confidence at 59M-user scale — and the vibes-without-explanation gap a zero-awareness brand can't afford. |
| **Opal** (opalapp.com) | The most realistic budget-class model: a small-team consumer iOS app punching premium, with the quiz-funnel conversion mechanic we correct and keep on-domain. |
| **Phantom** (phantom.com) | The craft ceiling for selling a consumer app in a trust-sensitive category, plus the category-rename move — with not one human being on the entire site. |
| **Duolingo** (duolingo.com) | Tool-not-form conversion (the lesson IS the landing page), the /efficacy proof-page move, and mascot-driven memorability. **The one site the blueprint never beat.** |
| **Linear** (linear.app) | The marketing-craft bar — typography, manifesto page, restrained motion — and the dark-SaaS monoculture the visual system is built to invert. |

---

# 3. Gauntlet Scorecard

Protocol: the gauntlet-hardened blueprint was judged head-to-head against each competitor's **live, executed site** on three axes — **conversion** (does the site convert its visitor toward its goal), **memorability**, and **story** — under the standing rule that *vague specification loses to executed reality*. Losses triggered revision rounds (the G-1…G-12 amendments integrated throughout the Blueprint), then a rematch, up to three rounds. Final record: **13 wins, 1 unbeaten opponent (Duolingo).** Verdicts below are the judges' reasoning in full.

### Beli
**Beli (Tier A): winner=blabberly, decided round 1.** I read the full blueprint (568 lines), the Beli teardown, and verified the teardown against the live beliapp.com homepage via fetch — the teardown is accurate, not a strawman: live hero is "Track and share your favorite restaurants with your friends," subhead is literally "Download now on the App Store and Play Store," zero email capture, zero social proof, no motion, a static map screenshot, three feature blocks, footer. That is the entire persuasion machine of a $12M company.

Judging on the stated rule — blueprint specification vs executed reality, vague sections lose — the blueprint still wins decisively, because it is not vague where it matters. The asymmetry I was prepared to punish (a plan beats nothing only if the plan is concrete) doesn't materialize: every v1 page has drafted headline/subhead copy in the document itself (e.g. homepage hero "Where are we going tonight?" with exact CTA microcopy; proof page S1–S6 fully scripted; place-page template with all 10 sections, data fields named per block, and the display-rule logic mirroring the app's displayScoreForPlace). The visual system ships exact hex tokens lifted from the app's src/theme/colors.js, a locked type stack with fallbacks and clamp() values, motion rules with durations, and rationing rules. The conversion machinery is specified to the parameter level: one hard verb, ?src={pageType}_{slug} tagging, trust-sandwich numbers sourced from a single data/proof.json, waitlist Cloud Function payload schema including stored venue/taste intent. This is execution-grade specification, not hand-waving.

On the three questions:

1. CONVERSION — blabberly, clearly. Beli's live site has exactly one conversion path (store badges) and loses every visitor not ready to download right now: no email field anywhere, no retargeting surface, and — inexcusably — none of the social proof they actually possess (Editors' Choice, 4.9★/15K, 75M reviews) appears on-site. The blueprint specifies omnipresent intent-tagged capture (every page including 404), a taste-quiz funnel whose payoff doubles as the % match demo with the signup storing the taste profile and matched venues for launch-day re-engagement, venue-tagged capture on 1,626 place pages (the Notify inversion), and a one-flag flip to "Get the app" at launch. The one honest caveat: Beli converts to an installable app today while Blabberly converts to a waitlist — but the question is which site does its job better, and Beli's site barely attempts its job (their own best lines, "Your Personal Restaurant Critic" and "Your top restaurants, ranked," never reach their hero).

2. MEMORABILITY — blabberly. Beli is a confessed stock Squarespace template ("<!-- This is Squarespace. -->"), white background, no motion, flat screenshots, brand color absent from the page system. The blueprint specifies a differentiated, semantic system: full-saturation sunset gradient rationed Linear-style, positional sunset-step section accents, match-tier colors that pre-teach the app's grammar, Bricolage Grotesque display (unused in the competitive set), live food-video "glow frames," mono-stamped receipts. Even discounting execution risk, the floor of this system beats Beli's ceiling.

3. STORY — blabberly, and it isn't close. Beli's homepage arc is hero → three pillars → footer; the teardown correctly notes their sharpest positioning is scattered across the App Store listing and the jobs page. The blueprint runs a six-beat emotional arc (appetite → recognition → trust mechanism → % match → the night → belonging) with three positioning claims no competitor site makes ("the score is real because the person went," "% match is about you," "discovery becomes a plan"), a proof page that owns the trust mechanism at its own URL, and a 15-rule voice guide with a banned-word list that includes the CEO-banned h-word.

Residual risks that keep this from being a shutout but don't flip it: (a) the load-bearing hero assets (R1 real tester clips, A1 hero food clips) don't exist yet and depend on an ~80-tester alpha corpus — the blueprint names this and budgets a founder shoot; (b) the placePhotos rights question and anticipatedQueries coverage are flagged as pre-build verifications, honestly, with fallbacks (quality gate to card template); (c) the hosting-topology/AASA coexistence is named as "the only genuinely risky integration point." A blueprint that pre-identifies its own failure modes with mitigations is the opposite of vague. Verdict: clean blabberly win on all three axes.

### Corner
**Corner (corner.inc) (Tier A): winner=blabberly, decided round 1.** VERDICT: BLABBERLY, and not narrowly. I went in expecting the usual plan-vs-reality mismatch — blueprints lose to live sites because they hide vagueness behind ambition. This one doesn't. It is judged on what it SPECIFIES, and it specifies almost everything: verbatim headline and body copy for every v1 page (§4), exact hex tokens lifted from the app's shipping colors.js (§5.3), named fonts with weights and letter-spacing (§5.2), per-section visuals tied to a 30+ item asset list with capture order and consent rules (§9), a locked URL scheme with slug-parity rules against the app's universal links (§3, §7.2), a waitlist Cloud Function payload spec (§8.3), and a build order (§8.6). The few genuinely unresolved items (photo rights, anticipatedQueries coverage, S15 capture) are named as pre-build checks with fallbacks, not hand-waved.

CONVERSION — blabberly. Corner's live site has exactly one conversion path: 'download now' → App Store. No email capture anywhere, so every not-now visitor is lost forever; the teardown documents this and it's Corner's structural choice, not an accident. The blueprint's machinery is categorically better-engineered: inline hero email capture with Apple/Google one-tap, omnipresent footer capture including the 404, a server-rendered taste-quiz funnel that personalizes BEFORE the ask, and 1,626 venue-tagged capture surfaces that store WHICH place hooked the visitor for launch-day re-engagement ('Campfire is live — your 91% match is ready'). Yes, Corner converts to a higher-value action (install of a real 4.5★ app) while Blabberly can only collect emails pre-launch — but judged as 'which site converts its visitor toward its goal,' Corner's homepage shows zero product UI, zero how-it-works, zero FAQ (the teardown's own finding: 'a visitor cannot picture the app before downloading'), and asks for the highest-friction action with no fallback. The blueprint converts the skeptic (proof page), the curious (quiz), the local (place/guide pages), and the not-now (capture everywhere). Corner converts only the already-convinced.

MEMORABLE — narrow blabberly win. Corner's lowercase zine identity (doodle font, ZERO ADS / ZERO INFLUENCERS stamps, 'our nyc HQ <3') is genuinely distinctive and executed — this is their strongest card. But the blueprint's specified system is more memorable for a FOOD product: a sunset-warm light site against both the dark-SaaS monoculture and gray food incumbents, live windows of real food video as the only moving thing on the page, % match tier colors taught pre-install by literal token inheritance from the app. Corner's site is photo-and-text in a sensory category — the teardown's weakness #2 ('No video, period') is fatal for memorability in food. Corner is memorable as an identity; the blueprint is memorable as an appetite. Appetite wins in this category.

STORY — clear Blabberly win. Corner's manifesto is real and quotable ('how 1,000 random people rated it?'), and 'GOOGLE MAPS BUT SOCIAL' is a great four-word hook. But their story self-amputates: having declared ratings broken, they offer no quality signal at all — only saves counts — and their proof numbers contradict each other on a single page (60K meta vs 125K hero vs 80K tastemakers), which the teardown flags as eroding the authenticity claim. The blueprint's story is a direct counter with a mechanism: 'we didn't kill the rating, we made it earn itself' — rating required on every post, % match computed against YOUR taste, then the night-out arc (poll → plan → route) that nobody in the category tells. It's drafted, not gestured at: the six-beat homepage arc has actual copy, the proof page owns 'is Blabberly legit' with FAQ schema, and every number routes through a single audited proof.json — a precise inversion of Corner's three-conflicting-numbers sloppiness.

VERIFICATION: my live fetch of corner.inc returned HTTP 429, confirming firsthand the teardown's claim that the site blocks everything but Googlebot/Twitterbot — their entire organic and AI-answer channel is forfeited while the blueprint explicitly welcomes AI crawlers. Also decisive: Corner has zero San Diego presence (not in their 35-city list), so on Blabberly's home turf the contest isn't close.

RESIDUAL RISKS (named, not verdict-changing): the blueprint's hero depends on real tester feed clips from an ~80-person alpha — if the corpus is thin, §9.3 A1's fallback (founders shoot 4–5 clips at real Carlsbad venues) must actually happen, or the APPETITE beat collapses into the same product-less hero Corner has. The quiz payoff requires computing real % match server-side at build/request time — specified as 'real computed value' but the porting of the match algorithm to web is the least-specified engineering item. And Corner's executed 300–400K-page content footprint dwarfs 1,626 pages in raw scale — but scale in cities Blabberly doesn't compete in, behind a robots.txt that blocks the future. None of these flip the three judgment axes.

### The Infatuation
**The Infatuation (Tier A): winner=blabberly, decided round 1.** Verified the teardown against the live site (2026-06-11): The Infatuation's homepage has zero above-the-fold CTA — headline "let us help you make a decision," three guide cards, and all conversion machinery (app badges, newsletter) deferred to the footer. The /san-diego hub has ~5 guides and ~14 visible reviews; North County gets one guide. The teardown's claims hold.

Judged on the three axes:

1. CONVERSION — clear blueprint win, and not on benefit of the doubt. The Infatuation's per-visitor conversion design is objectively passive (footer-only badges, no email capture above the fold, no waitlist, their /mobile-apps page is one screenshot; /app 404s). The blueprint SPECIFIES, in executable detail: inline hero waitlist capture with drafted microcopy, the omnipresent footer field on every page including 404, venue-tagged capture states on all 1,626 place pages (the Notify inversion — signup stores which venue hooked them), a taste-quiz funnel whose payoff writes tasteTokens into the waitlist record, sticky mobile CTA bars, one hard verb sitewide, ?src={pageType}_{slug} tagging, GA4 events named, and the Cloud Function payload schema down to the dedupe transaction. The Infatuation's cleverest mechanic (save-button → account) is real but converts readers into account holders over months; per visit, the blueprint's machinery is an order of magnitude denser, and every element is drafted, not gestured at.

2. STORY — clear blueprint win. The Infatuation's homepage deliberately tells no story; the brand is the proof (works for a 15-year-old brand, but it is the absence of narrative, not a stronger one). The blueprint runs a six-beat arc (APPETITE → RECOGNITION → TRUST → IT'S FOR YOU → THE NIGHT → BELONGING) with verbatim copy for every beat, a dedicated proof URL (/why-the-scores-are-real) that argues a mechanism instead of adjectives, and a manifesto page with a genuinely sharp declaration ("Reviews from people who never went are dead"). The positioning — required ratings + % match + the night-out layer — attacks the three documented gaps in the incumbent's model (no personalization, no UGC, no group-decision layer), and the copy is drafted to the sentence, so the story wins on specification, not promise.

3. MEMORABILITY — narrow blueprint win. The Infatuation's voice is the best in the category and battle-tested ("Where to eat with someone who likes you back"), but the site itself is a restrained black/white editorial grid — the memorability lives in 15 years of brand equity, not in the page. The blueprint specifies a distinctive sensory identity to the hex and the millisecond: full-saturation sunset tokens imported verbatim from the app, positional gradient steps so the page scrolls through a sunset, Bricolage Grotesque, real food video as the hero medium with a one-live-window-per-viewport discipline, and drafted lines ("It's 7pm. Six people. Nobody can pick.") that pass the same bar as the incumbent's. A first-time visitor remembers golden hour and moving birria over a gray card grid.

Residual risks I weighed and did not find verdict-flipping, because the document names them with mitigations: assets don't exist yet (capture logistics + founder-shoot fallback specified), Google Places photo rights (flagged as a pre-build gate in §8.4), hosting topology (named as the one risky integration), thin alpha content (honest-numbers voice rule absorbs it). One genuine under-specification — how the web quiz computes % match without the app's matching algorithm is asserted but not spec'd — is a build-session detail, not a strategy hole. The Infatuation wins on domain authority and immediate content utility at national scale, but those are traffic-acquisition advantages, not answers to the three questions asked; on its home turf of San Diego it fields ~5 guides against a specified 1,626-page latticed engine. Two clear wins and one narrow win is a clean verdict, not a coin flip.

### Eater
**Eater (Tier A): winner=blabberly, decided round 1.** Conversion: decisive blabberly win. Eater's executed site has no hero CTA (hero is an editorial story), an app funnel that is a bare App Store text link, and a documented outcome — 48 App Store ratings in ~20 months against millions of readers; its own teardown names 'no clear first-action… terrible for conversion.' The blueprint specifies (not gestures at) a single hard verb with drafted copy, inline hero capture with stored intent (placeId/tasteTokens in a defined Cloud Function payload with dedupe), a taste-quiz funnel with a specified payoff state, venue-tagged capture on every place page and the 404, and per-page ?src attribution wired to named GA4 events. Story: clear blabberly win. Eater performs authority but never explains itself to a first-timer and has zero personalization or product narrative; the blueprint has the six-beat arc with headlines actually written, a proof page quoting the app's own UI hint text as the mechanism, and contradictions pre-adjudicated (R-1..R-10). Its positioning attacks the exact gaps the teardown documents in Eater: no UGC ratings, no personalization, no night-out layer, no per-venue pages. Memorability: closest axis — Eater's institutional equity (Essential 38, James Beard awards, 20 years) is real, but its page experience is static, text-era, and app-invisible; the blueprint specifies a differentiated system (verbatim app-token color inheritance, semantic match-tier colors, named type system with exact sizes, motion rules with durations, video-as-motion-budget) plus a concrete asset capture run sheet with a fallback if alpha content is thin. The judging standard — vague sections lose to executed reality — doesn't bite because the blueprint is drafted-copy specific throughout and names its three genuine unknowns (photo rights, hosting topology, anticipatedQueries coverage) with verification steps rather than hand-waving. Eater's one decisive executed advantage, domain authority/SERP dominance, is traffic acquisition, outside the judged question of per-visitor conversion, memorability, and story; once a visitor lands, Eater's page routes value to OpenTable/DoorDash/Google Maps while the blueprint's page captures a tagged email. Residual risks noted (tester-content breadth at ~5 active alpha testers; 'Carlsbad 25' launch ranking leaning on Google-fallback blend vs the 'people who actually went' copy) are real but specified-around and do not flip a clear three-axis win.

### Yelp
**Yelp (Tier A): winner=blabberly, decided round 1.** VERDICT: BLABBERLY — a clear win on the question's three axes (conversion of its own visitor, memorability, story), with one axis honestly conceded to Yelp (raw content utility at scale) that falls outside those axes.

I judged the blueprint adversarially, on what it specifies — and the unusual thing is that it specifies nearly everything: drafted H1s/subheads/CTA microcopy per section, exact hex tokens lifted from the app's shipping theme file, a 15-rule voice guide with a banned-word list, per-page section orders, a locked URL scheme with slug-parity rules to the app's universal links, schema/robots/sitemap plans, a named tech stack with the rejected alternative argued, and a shot-by-shot asset list with capture logistics. Very little is left vague enough to "lose to executed reality." The genuinely soft spots are flagged inside the document itself (photo-rights posture of Google-derived placePhotos, anticipatedQueries coverage audit, hosting topology) — flagged risks with named verification steps, not hand-waving.

1) CONVERSION. The two sites have different jobs, so I judged each at its own job. Yelp's consumer site has, by its own published design rationale, no conversion design at all for a cold visitor: the hero is a search box, persuasion is explicitly reserved for business.yelp.com, and the homepage "assumes you already know what Yelp is." That works only because of 20 years of brand equity — which is precisely what "if both launched tomorrow" strips away. Cold, Yelp's site converts nobody it didn't already own; its mobile-web experience actively degrades toward app interstitials, and Sponsored Results sit above organic listings, eroding the trust it sells. The blueprint, by contrast, is conversion-obsessed in specified, auditable detail: one hard verb sitewide, omnipresent footer capture including the 404, venue/taste-tagged waitlist records powering launch-day re-engagement ("Campfire is live — your 91% match is ready"), a server-rendered quiz funnel as the soft converter, ?src tagging on every hard CTA, and the Notify inversion that turns "app isn't out" into stored intent. Yelp's one real conversion superpower — place pages that fully answer the query with reviews and photos — is conceded: pre-launch Blabberly place pages will have empty Posts sections and ~80 testers behind the trust sandwich, and a visitor researching "is Campfire good" gets a more complete answer from Yelp today. But the blueprint designs that gap honestly (capture state, mechanism-based trust, quality gate holding thin pages from the index) rather than ignoring it, and Yelp's bot wall + AI-crawler blockade means Yelp is voluntarily exiting the acquisition channel the blueprint is built to occupy.

2) MEMORABILITY. Yelp's consumer site is doctrinally forgettable — utility-gray density, no motion on web, design debt the teardown itself lists as a weakness ("dense, cluttered, ad-interrupted"). The blueprint specifies a distinct, coherent system: full-saturation sunset gradient rationed by explicit rules, positional sunset-step section accents, Bricolage Grotesque + mono "receipts" typography, real food video as the only living element per viewport, two in-code SVG illustrations and nothing else. Even discounted for execution risk, the specification is concrete enough (rationing rules, motion budget, exact tokens) that a competent build produces something visually distinct in a category that is uniformly utility-gray.

3) STORY. Not close. Yelp structurally cannot tell a story on its consumer site — its front door is a search box and breaking that breaks the product. The blueprint runs a fully drafted six-beat emotional arc with a mechanism-based trust claim ("rating required on every post") that attacks Yelp's core asset (pooled anonymous averages, the widely-resented Recommended Reviews filter), a proof page that pre-owns "is Blabberly legit," and a manifesto line. The copy is drafted, not promised.

What keeps this from being a coin flip: the blueprint's weakest surface (content-thin pre-launch place pages vs Yelp's review-rich ones) is a distribution/utility advantage for Yelp, not a win on conversion design, memorability, or story — and the blueprint's place-page spec (enriched narrative blocks, FAQPage schema from anticipatedQueries, lattice, freshness stamps) ships more unique structured content per page than Yelp exposes to most crawlers in 2026. Yelp wins "which site is more useful to a hungry person tonight." Blabberly's blueprint wins all three questions actually asked.

### Resy
**Resy (Tier A): winner=blabberly, decided round 1.** Scored on the three questions for the actual matchup scenario (a cold visitor landing on each site tomorrow). STORY: clear blueprint win. Resy's brand pitch is structurally buried — the root resolves to a search utility, the pitch lives at /welcome which nothing prominently links, and the teardown's own indictments (no ratings identity, no personalization story, no night-out layer, no video anywhere) were confirmed; a live fetch even reproduced the leaked `titles.skip_to_main` translation key in their shell. The blueprint specifies a six-beat emotional arc with verbatim drafted copy per section, a manifesto line, and a dedicated mechanism-not-adjectives proof page (/why-the-scores-are-real) — a story Resy structurally cannot tell (their inventory IS the anonymous average). MEMORABILITY: clear blueprint win. Resy's premium feel (Beatrice + photography) serves an editorial-utility page; the blueprint locks a full-saturation sunset system inherited verbatim from the app's token file, positional gradient steps, autoplaying real food video as the default hero medium (absent from Resy's entire web presence), Bricolage Grotesque, exact hexes, motion vocabulary, and rationing rules. CONVERSION: narrow blueprint win, and the closest call. Resy's machinery (time-slot CTAs, Notify, 694K-rating app funnel) is the category's best — for visitors with pre-existing booking intent. But for the cold visitor both sites must win, Resy never makes a pitch, while the blueprint specifies a complete capture machine in executable detail: one hard verb sitewide with ?src attribution, the Notify inversion on 1,626 venue-tagged place pages, a server-rendered taste-quiz that stores taste profiles for launch-day re-engagement, omnipresent footer capture including the 404, the Cloud Function payload/dedupe/rate-limit, GA4 events, and a one-flag launch flip. Critically, this blueprint does not lose on vagueness — copy is drafted verbatim, every page has section-by-section visuals named from real app screens, slug parity with universal links is specified to the character, and risks (thin AI pages, unbuilt assets, photo rights) are named with concrete mitigations rather than hedged. Its real weaknesses — assets R1-R14 and the photo shoot don't exist yet, ~80 testers vs 694K ratings, and an under-specified port of the % match algorithm for the quiz payoff — are scoped production work with fallbacks, not blueprint vagueness. Two clear wins plus a defensible conversion edge on the job that matters is a clear overall win, not a coin flip.

### OpenTable
**OpenTable (Tier A): winner=blabberly, decided round 1.** Judged the full 568-line blueprint against the OpenTable teardown (live-site verification attempted; opentable.com hard-blocks non-browser clients exactly as the teardown documents, corroborating its method note). On CONVERSION: OpenTable's homepage is a frictionless geo-personalized booking bar — the category's best transactional converter — but under the 'launched tomorrow' framing it runs entirely on pre-existing brand awareness: no persuasion until section 6, zero email capture on the diner side, and an app page the teardown calls 'notably thin and undersold.' The blueprint specifies a superior cold-visitor machine: one hard verb sitewide, auditable trust-sandwich numbers (data/proof.json), intent-tagged waitlist capture on every page including the 404, a server-rendered quiz funnel storing taste profiles for launch-day re-engagement, and ?src= GA4 attribution per page. On MEMORABILITY: not close — the teardown's own findings ('zero personality,' 'corporate, dated brand surface') vs the blueprint's locked system: verbatim app-token color inheritance, semantic tier colors, positional sunset steps, Bricolage display, glow frames around moving real food video, an enumerated motion vocabulary. On STORY: OpenTable sells by inventory, not copy; the blueprint drafts actual copy for a six-beat arc, a proof page, a manifesto, fifteen voice rules, and a banned-word list — and it steals OpenTable's best moves (freshness stamping, the page-type lattice, programmatic awards) while attacking its named structural gaps (no taste identity, contract-gated coverage, no night-out layer). The blueprint's real exposures — unshot assets, unverified photo rights, thin alpha UGC — are each named in-document with specified mitigations (shot-level capture plan, §8.4 rights check with post-media fallback, founder-shoot fallback in A1), so it does not lose on vagueness: it is build-ready, not hand-wavy. OpenTable wins only the visitor who already wants OpenTable. Two criteria won decisively, the third won on the question's own cold-launch terms — a clear blabberly win.

### Partiful
**Partiful (Tier B): winner=blabberly, decided round 2.** CONVERSION — blabberly. Partiful's executed funnel is superb for the ready-to-host visitor (Create invite → product in one click, pre-configured, no signup), but the teardown itself lists its structural holes: no waitlist, no homepage email capture, no urgency mechanics, nothing for the visitor not hosting today, and zero answer for discovery-side intent. The post-gauntlet blueprint runs Partiful's own tool-first pattern PLUS the capture layer Partiful never built: the hero IS the quiz's first step with a live client-side % match recomputing per chip tap (spec'd to the embedded tag vector, bb_taste localStorage contract, ~2KB island, mid-flow entry routing); email lands only at the Step-4 payoff after the dopamine; quiz completers see their real un-gated match on all 1,626 place pages so SEO traffic never hits a dead end; every signup is intent-tagged (placeId/routeId/tasteTokens/computedMatch) for launch-day re-engagement; routes, 404s, and footers all capture. Sitewide CTA discipline (one funnel verb, ghost-button convergence, ?src tagging, named GA4 events) is specified, not implied. Judged for each site's own conversion job, the blueprint's machinery is more complete than the live competitor's.

STORY — blabberly, clearly. Partiful's narrative is "Parties are back" + instant tool: charming, shallow, host-only. The blueprint runs a six-beat arc with fully drafted copy on every v1 page, a structural trust claim (rating required on every post — mechanism, not adjective), a manifesto with its own URL, and a frequency wedge aimed at Partiful by name in the strategy ("hosting happens 3x/year; 'where should we eat?' happens 3x/week"). The drafted headlines are real sentences ("It's 7pm. Six people. Nobody can pick."), governed by a 15-rule voice guide with a banned list.

MEMORABILITY — near-tie, slight Partiful edge on borrowed fame. Partiful's voice-as-moat is proven and press-laundered (NYT/Atlantic/WSJ quote wall, TIME100, "5.0 • 40K Ratings") — assets a pre-launch site cannot conjure; G-6 is only a pitch plan with a goal of one quote. Against that, the blueprint owns appetite (real food video as default hero medium — the one emotional asset Partiful's teardown concedes it cannot match), a semantic rather than decorative color system, and Percy: a specified recurring brand device with a defined motion vocabulary (reveal/tick/flare/idle/deflate), a recurrence map down to OG images, and a no-fake-numbers rule that fuses the brand device with the trust doctrine. Riskier than an owl, but specified, and more personally sticky for its actual visitor (the number is yours).

ADVERSARIAL CHECKS THAT COULD HAVE FLIPPED IT: (1) "Launched tomorrow" — the load-bearing hero assets (R1/A1/P-series) are unshot until 06-13/06-16; but §9.0 makes them pass/fail launch gates with committed dates and re-shoot windows, so the spec structurally prevents shipping the hero empty — a 5-day sequencing fact, not a design flaw. (2) Vagueness discount — I hunted for it and found almost none: drafted copy per section, verbatim app hex tokens, clamp() type scale, ms-level motion timing, slug-parity mapping, Cloud Function payload schema, sitemap chunking, schema rules (AggregateRating only where userRatingCount ≥ 1). This blueprint is build-ready, not aspirational. (3) Spec-vs-executed-reality — applied throughout; the verdict survives because the blueprint wins conversion on architecture the live competitor lacks entirely (capture, intent tagging, SEO engine, local-intent coverage Partiful structurally cannot contest), not on polish it hasn't earned.

Two of three axes are clear blabberly wins; the third is a near-tie tilting Partiful only on external validation a pre-launch company cannot buy. That is a clear overall win, not a coin flip. Residual watch items (not verdict-flipping, already gated in-spec): land the G-6 press quote before launch, and hold the §9.0 asset review honest — a weak R1 hero or flat A3 quotes would re-open the memorability axis.

### Strava
**Strava (Tier B): winner=blabberly, decided round 1.** Verified the teardown against the live site first: strava.com's hero today is "Community-Powered Motivation" with static photography, NO autoplay product demo, the stale "100 million" figure, and inline Google/Apple/Email signup; the /routes/hiking/.../san-diego programmatic page is real, server-rendered, and strong. So the comparison is against accurately-documented executed reality. CONVERSION: Strava's executed machine is proven and its ask (account creation) is deeper, but the blueprint SPECIFIES — with verbatim copy, exact CTA microcopy, a Cloud Function payload schema, and per-page ?src attribution — a tighter capture system for its own goal: inline hero waitlist (Strava's own best move, copied), 1,626 venue-tagged capture pages, a taste-quiz funnel that personalizes before the ask, stored-intent launch re-engagement, and a lighter ask (email vs account). Every documented Strava conversion weakness (no visceral demo, community asserted never shown, JS-empty /features//about, fossil /mobile, no browsable hub over the SEO pages) has a named, specific counter in the blueprint (video hero with real feed UI, named rated posts from real testers, static-render mandate, two-state /download template, the hub→neighborhood→place lattice). MEMORABILITY: clear blueprint win — full-saturation sunset system inherited token-for-token from the shipping app, food video as the default hero medium, "Reviews from people who never went are dead," Bricolage display + mono receipts; the live Strava page is clean but restrained photography on white, memorable mostly via pre-existing brand equity, which a head-to-head page judgment can't credit. STORY: blueprint win — a six-beat arc closing on a structural trust mechanism (rating required, Share button locked) given its own URL, versus Strava's good-but-asserted community story with stale proof numbers. This is not a vague blueprint losing to executed reality: it drafts headlines/subheads/CTAs/visuals for every v1 page, locks URLs, slug parity, schema, robots, build pipeline, and a 16-asset capture list with shoot order. Residual risks are execution-side (hero food clips don't exist yet; "~80 testers" is thin social proof vs "100M"), but both are explicitly named with contingencies (founder shoot this week; founding-San-Diegan honest-scarcity framing), and neither flips any of the three questions. Clear overall win, not a coin flip.

### Cash App
**Cash App (Tier B): winner=blabberly, decided round 1.** Verified the teardown against the live site before ruling: cash.app's hero ("The way money should work" → "Get started" → /login?su), its proof stack (59M+, 9.9M reviews, Editor's Choice, Trustpilot 4.5), the single anonymous quote, zero FAQ on the homepage, zero urgency, and — confirmed live — cash.app/download silently dumps the visitor back on the homepage. The teardown is accurate; Cash App's site is what it claims to be: a confident, beautifully branded billboard that assumes you already know the product.

STORY — blabberly, decisively. Cash App's narrative is a worldview headline plus stacked feature sections; the teardown itself concedes "brand carries everything; the site barely explains," and the live fetch confirms a cold visitor gets vibes and a feature list — no mechanism, no humans, no place. The blueprint specifies a complete narrative machine at copy level, not concept level: a six-beat emotional arc with every headline drafted verbatim, a manifesto with a named enemy ("Reviews from people who never went are dead"), trust argued as a mechanism shown in pixels (the Share button that stays locked until you rate), a dedicated proof page pre-owning "is Blabberly legit," and the 7pm group-decision situation no competitor narrates. Judged strictly on what's SPECIFIED, it is specified — section order, drafted copy, named app screens, and the exact asset (R1–R14) behind every visual. Nothing here is vague enough to lose to executed reality.

CONVERSION — blabberly on design, Cash App on borrowed weight; net blabberly for the job each site has. Cash App's machinery is real (two-speed CTAs, web-first signup, the repeated proof strip) but its conversion power is mostly 59M users of ambient awareness — an asset of the company, not the page. Strip the brand gravity (exactly Blabberly's situation tomorrow) and the page has verified holes: the highest-intent query (/download) dead-redirects, no homepage FAQ, one faceless quote, no urgency lever, no explanation for the unconvinced. The blueprint's machinery is more complete and smarter per visitor: one hard verb sitewide with ?src tagging, inline hero capture with one-tap OAuth, an auditable trust sandwich from a single proof.json, a server-rendered taste quiz that attaches a taste profile to the signup, and — the standout — venue-tagged waitlist capture across 1,626 place pages powering "Campfire is live — your 91% match is ready" launch re-engagement. That is a conversion system Cash App's playbook doesn't even model. Honest caveat: pre-launch proof numbers (~80 testers) are featherweight next to 59M, and the hero depends on tester clips not yet captured — but the blueprint names both risks and specifies mitigations (honest small numbers per V4; founders shoot dedicated clips if the corpus is thin, asset A1).

MEMORABILITY — closest category. Cash App's executed identity (fluorescent green, Cash Sans, the BUCK 3D library, cards shot like sneakers) is genuinely elite and built with brand budget Blabberly doesn't have. The blueprint counters with a fully specified system rather than a mood: the app's shipping color tokens imported hex-for-hex, semantic color (match tiers, sunset-step section indexing) where Cash App's green is arbitrary, warm-light positioning against both the dark-glow SaaS monoculture and gray food incumbents, and real food video as the only moving thing on the page — birria at golden hour is intrinsically more arresting to this visitor than 3D coin metaphors. Cash App edges on execution polish; blabberly edges on meaning and in-category distinctiveness. A wash, leaning blabberly for its target visitor.

The clincher: the blueprint demonstrably metabolized this opponent. It steals Cash App's verified best moves (worldview headline, repeated proof strip, two-speed CTAs, source-tagged campaigns, concrete-numbers voice, owning the scary query) and directly exploits its verified worst (a real /download with a waitlist fallback where Cash App dead-redirects; Restaurant/FAQPage schema where Cash App ships none; named locals with faces where Cash App has one anonymous quote; honest scarcity where a pre-launch product needs it and Cash App never has to). Two of three judgment axes go clearly to the blueprint and the third is at worst even — a clear overall win, not a coin flip.

### Opal
**Opal (Tier B): winner=blabberly, decided round 1.** Verified the Opal teardown against the live site (hero "Attention on autopilot.", "Try for free" → start.opalapp.com, ADA badge + 4.8/150k, dark glow-panel system) — the teardown is accurate, so the comparison stands on solid ground. Judged on what the blueprint SPECIFIES, this is a clear Blabberly win on all three axes. (1) Conversion: Opal's executed machinery is strong but carries verified flaws — an abstract hero that requires scrolling to learn what the product does, a primary CTA that exits the brand domain into a JS-opaque crawler-dead funnel, and a credibility-straining stat stack (94%/93%/6-years, a finalist badge ridden as a win). The blueprint specifies the corrected version of every one of Opal's moves: one hard verb sitewide with ?src attribution, inline hero email capture (a far lighter ask than Opal's trial), an on-domain server-rendered taste quiz whose payoff is a computed % match on five real venues (a stronger personalization hook than a guilt report), venue-tagged capture across 1,626 place pages plus the 404, and a trust sandwich sourced from one auditable proof.json. The asks differ in weight — waitlist email vs paid-trial install — and the blueprint's hero path (real food video + "Where are we going tonight?" + email field) is shorter and lower-friction. (2) Memorability: Opal is distinctive within the dark-glow monoculture, but the blueprint specifies a genuinely differentiated artifact — warm light pages, semantically rationed full-saturation sunset gradient, and real short-video food in the hero, the one asset Opal structurally cannot run (their own teardown concedes "the product is invisible in motion"). The video assets are concretely specified (R1/A1 with quality bar, consent rules, founder-shoot fallback, ≤2MB/one-live-window-per-viewport discipline), not hand-waved. (3) Story: Opal's fear-valenced movement story is good but its proof wobbles; Blabberly's trust claim is structural (rating required = mechanism, not adjective), positively valenced, locally rooted, and the six-beat arc is drafted verbatim page-by-page with a voice guide and banned list. The blueprint is unusually non-vague — copy written, hexes extracted from the shipping app's token file, slug parity locked to universal links, risks (thin-content penalty, photo rights, hosting topology, AASA) named with answers — so it does not lose the "vague loses to executed reality" tiebreaker. The one real Opal advantage, a proof stack (150k ratings, press, investors) that dwarfs ~80 testers, is neutralized by the lighter conversion ask and the honest-numbers doctrine appropriate to a ratings product. Clear win, not a coin flip.

### Phantom
**Phantom (Tier B): winner=blabberly, decided round 1.** I judged this adversarially, verifying Phantom's live site (homepage + /download via WebFetch) against the teardown — the teardown is accurate, and the live checks actually surfaced two things that hurt Phantom: its /download page shows zero social proof, ratings, or trust badges, and its only soft conversion is a payoff-free generic newsletter ("Sign up for our newsletter and join the growing Phantom community").

ON THE "VAGUE LOSES TO EXECUTED" RULE: this blueprint largely escapes the discount. It is specified to copy level — drafted H1s/subheads for every page ("Where are we going tonight?", "It's 7pm. Six people. Nobody can pick.", "This page must've closed early."), exact hex tokens imported verbatim from the app's src/theme/colors.js, a 10-section place-page template mapped to named Firestore fields, a 15-rule voice guide with a banned-word list, a numbered asset shopping list with capture order and consent rules, the waitlist Cloud Function payload, the GA4 event names, and the slug-parity constraint for universal links. Very few sections are hand-wavy; where risk exists (asset corpus thinness, hosting topology), the blueprint names it and specifies fallbacks. I judged the spec, not hopes — and the spec is dense enough to judge.

CONVERSION — blabberly. Phantom converts well for a live product, but its machinery as observed is exactly two moves: a Download button everywhere and a generic newsletter. The blueprint specifies strictly stronger machinery for its own visitor: one hard verb sitewide with per-page ?src measurement, a trust sandwich under every CTA fed from a single auditable proof.json, venue-tagged waitlist capture on 1,626 high-intent place pages (the Notify inversion — signups store which venue hooked them, powering "Campfire is live — your 91% match is ready" re-engagement), and a server-rendered taste-quiz funnel whose payoff is a personalized demo before the ask. Phantom's teardown itself concedes the catch-net weakness (#7) and shows no per-page attribution. A waitlist is a smaller ask than a download, but the question is which site converts its visitor toward its goal better — and the blueprint's capture system is categorically better engineered than Phantom's observed funnel.

STORY — blabberly, clearly. Phantom's story is one good move (the "money app" category rename) with admitted seams: SEO title still says "crypto wallet," perps/memecoin tables sit one click from "home for your money," and there is not one human being — face, name, or quote — on the entire marketing site of a 20M-user product. The blueprint runs a six-beat emotional arc with a structural trust claim ("a rating is required on every post" — a mechanism, not an adjective), a manifesto line with its own URL, real named locals ("Kaden, Oceanside" with consent on file as a spec requirement), and place-rooted specificity Phantom structurally cannot have. Mechanism-based trust beats vibes-based identity for a pre-launch product that must answer "is this legit."

MEMORABILITY — the closest call, and where Phantom genuinely scores: an executed, award-grade brand world (custom F37 typeface, commissioned illustration, a load-bearing mascot, a staffed motion designer) beats any spec on craft certainty. But two things narrow it: (1) Phantom's visual world is JS/Lottie-rendered — the teardown couldn't even observe the hero visuals in markup, and my live fetch saw a text skeleton; the blueprint mandates server-rendered pages where the hero is real food video, the one asset class that is viscerally memorable in this category and that Phantom's illustration approach can't counter. (2) The blueprint's identity is semantic, not decorative — full-saturation sunset rationed by Linear-grade rules, match-tier colors that teach the product, positional sunset-step scrolling. As specified, it is differentiated against both the dark-SaaS monoculture and gray food incumbents. I score memorability a narrow blabberly edge for its actual visitor (a hungry San Diegan), conceding Phantom wins on pure craft pedigree.

RESIDUAL RISKS I weighed and did not let flip the verdict: the hero depends on tester clip quality from a ~5-person alpha (fallback specified: founders shoot at real Carlsbad venues); the web-side % match computation for the quiz payoff is the one genuinely under-specified mechanism (it promises "computed % match" without specifying the scoring port); guide editorial bandwidth is asserted, not staffed. These are execution conditions, not blueprint defects large enough to lose to a competitor whose own teardown lists eight exploitable weaknesses the blueprint demonstrably exploits (humans, place, real UI, concrete-payoff capture, demo-first hero).

Net: 2 of 3 axes (conversion machinery, story) are clear blueprint wins; memorability is a narrow edge to even. That is a clear overall win, not a coin flip.

### Duolingo
**Duolingo (Tier B): winner=competitor, decided round 3.** Scoring the three axes against a blueprint that has already absorbed two gauntlet rounds (G-1…G-12) and is now unusually specific — drafted copy, hex tokens, motion timings, data-file budgets, analytics events, asset bars with committed dates.

STORY — Blabberly, clearly. Duolingo's homepage barely tells a story: promise → proof-link → mechanics → start, the same generic pitch for every visitor on earth (the teardown's own #3 weakness). The blueprint's six-beat arc (APPETITE → RECOGNITION → TRUST → FOR YOU → THE NIGHT → TESTIMONY → BELONGING) is drafted line-by-line, locally specific (Carlsbad to Chula Vista, named venues, named testers), and rests on a structural claim ("a rating is required, so every score comes from someone who went") that no adjective can fake. Best story in the matchup by a wide margin.

CONVERSION — Duolingo, narrowly but really. The blueprint now runs Duolingo's own pattern correctly: tool-not-form hero, payoff that ends in the product (/my-matches is a genuine use-the-product-in-the-browser surface), asks placed after the dopamine, one funnel verb sitewide. On paper it is the better-designed funnel FOR ITS VISITOR. But three executed-reality facts break the tie against it: (1) Duolingo's conversion is product activation, available free, today, with ten years of A/B optimization behind every pixel; the blueprint's terminal action tomorrow is still an email field, because its own §8.4 item 6 admits the G-12 pre-order badge — the claimed zero-friction commit path and the centerpiece of the /download argument — is gated behind an App-Review-approved build (A.9) that per project state has not shipped. Launched tomorrow, /download's hard CTA renders the waitlist state; the "visitor leaves with the product scheduled to arrive" narrative is not true on day one. (2) The entire G-1/G-8 magic rides on an unvalidated scoring function: §9.0 sets pass/fail bars for footage and quotes but none for the match numbers themselves — if quiz-tokens-vs-tag-vectors clumps 1,400 venues into 'Good Match 70-79', the funnel's one trick reads as fake and the real-number doctrine backfires. No QA row exists for output distribution. (3) The proof wall (G-2) requires 8–10 consented quotes with poster frames by Wed–Thu, from an alpha with roughly five active posters; the hero has an explicit re-scope clause if the corpus fails, the proof wall has none — the exact specified-but-uncollected flaw G-9 was written to kill, surviving in one section. Specified-but-contingent loses to executed-and-frictionless.

MEMORABILITY — Duolingo, clearly. Duo is an executed, culturally compounded device with a face and A/B-tested conversion lift; Percy is a well-specified paper device whose silhouette — a pill inside a fill-ring — collides head-on with Apple-ring/progress-dial conventions that every fitness and habit app already owns. The five named tier states, the recurrence map, and the real-number-only doctrine are genuinely good design, and /my-matches's 200-dials-wearing-your-own-numbers is a clever burn-in mechanism — but a generic geometry repeated often is still generic. The blueprint's strongest memorability asset is actually the EXPERIENCE ("the site ranked all 1,626 of my city's restaurants to my taste"), not the mark; against an owl, the mark loses. The blueprint's own round-2 history conceded memorability clearly; G-10 added a body, not a face, and two separate second-tier marks (dial + trail) instead of one ownable object.

OVERALL — competitor, narrowly. The site's stated job is conversion (waitlist/beta signups that become launch-day installs), so the conversion axis carries the most weight, and Duolingo takes it plus memorability; the blueprint takes story. This is the closest of the three rounds — the blueprint's funnel architecture is now arguably superior in design to what it imitates, and Duolingo's JS-shell marketing site (verified live: title tag and nothing else served to crawlers) would lose the SEO war to the blueprint's 1,626 server-rendered pages within months. But 'launched tomorrow' is the question, and tomorrow Duolingo's visitor leaves inside a working product while Blabberly's visitor leaves with a localStorage profile and an email receipt, holding a brand mark shaped like everyone's progress ring. Not a clean blabberly win; not a tie either — two of three axes, including the weightiest, go to the incumbent.

### Linear
**Linear (Tier B): winner=blabberly, decided round 1.** Verified the t14 teardown against linear.app live (hero, "Issue tracking is dead" banner, 1.0-5.0 chapters, 33,000-teams claim, "Built for the future. Available today." close — all accurate). Ruling on the three questions: (1) CONVERSION — each site judged at its own job. Linear's page-level machinery is thin (two CTAs; the free product does the converting). The blueprint specifies a denser, fully-instrumented capture machine: one hard verb sitewide with ?src={pageType}_{slug} attribution, an auditable trust sandwich from data/proof.json under every hard CTA, omnipresent footer capture including the 404, venue-tagged waitlist signups across 1,626 place pages with the launch re-engagement message already scripted ("Campfire is live — your 91% match is ready"), and a server-rendered taste-quiz funnel that attaches a taste profile to the email. The Cloud Function payload, dedupe scheme, and GA4 events are specified — this is not vagueness getting benefit of the doubt. Edge: blabberly. (2) MEMORABILITY — clearest win. The "Linear look" is now the SaaS monoculture (per the teardown's own sources), so it reads default, not special; the blueprint specifies the inverse palette at execution grade (verbatim hex tokens inherited from the app's src/theme/colors.js, Bricolage Grotesque with tracking values, positional sunset-step accents, semantic match-tier colors, real food video as the entire motion budget). Real birria at golden hour in the visitor's own county beats pixel-perfect UI of an abstract tool for a consumer audience. Clear blabberly. (3) STORY — Linear's is excellent but cold, insider-vocabulary, and about nowhere. The blueprint's six-beat arc is drafted verbatim (hero through closing ask), its manifesto line lands in one read without requiring incumbent-pain literacy, and its proof page argues a mechanism (rating required to post) rather than adjectives. It also steals Linear's best moves (manifesto banner, numbered chapters, changelog strip, two-beat taglines, QR bridge) and adds layers Linear structurally cannot have: place, faces, appetite. Clear blabberly. Honest residual weaknesses — social proof gap (~80 testers vs 33,000 teams + OpenAI logos; stage-appropriate and honestly framed), hero dependency on not-yet-captured tester clips (shot list, quality bar, and founder-shoot fallback are specified), and the web-side % match computation on the quiz payoff being specified by output rather than algorithm — are real but none rise to coin-flip territory. The blueprint wins 2.5–3 of 3 criteria and never loses on vagueness: it resolves its own contradictions in a table, locks URLs and slug parity, drafts page copy, and specifies the build pipeline down to lastmod logic. Clean blabberly win.

## Unbeaten After Three Rounds: Duolingo

Duolingo is the only opponent the blueprint never beat — it survived three rounds, forcing two full revision waves (G-1…G-7 after round one, G-8…G-12 after round two) and still took the round-3 verdict two axes to one. Per the CEO's instruction, here is exactly why it held, and what it would take to beat it, drawn strictly from the judges' reasoning.

**Why Duolingo held out — four load-bearing facts:**

1. **Its terminal action is the product; ours is still an email field on day one.** Duolingo's conversion is free product activation, today, with ten years of A/B optimization behind every pixel. The blueprint's answer — the G-12 App Store pre-order badge ("it installs itself on launch day") — is gated behind an App-Review-approved build (A.9), which has not shipped. So "launched tomorrow," /download renders the waitlist state and the judge's law applies: *specified-but-contingent loses to executed-and-frictionless.* And the judge weighted conversion heaviest because conversion is the site's stated job.
2. **The funnel's one trick rides an unvalidated scoring function.** §9.0 sets pass/fail bars for footage and quotes but none for the match numbers themselves. If the 53-token quiz scored against venue tag vectors clumps ~1,400 of 1,626 venues into "Good Match 70–79," the live % match reads as fake and the real-number doctrine backfires. No QA row exists for output distribution.
3. **The proof wall is the last specified-but-uncollected asset.** G-2 requires 8–10 consented tester quotes with poster frames, from an alpha with roughly five active posters. The hero has an explicit re-scope clause if the corpus fails; the proof wall has none — the exact flaw G-9 was written to kill, surviving in one section.
4. **An executed mascot beats a specified one.** Duo is a culturally compounded character with a face and A/B-tested conversion lift. Percy's silhouette — a pill inside a fill-ring — collides with the Apple-ring/progress-dial convention every fitness and habit app already owns; G-10 gave Percy a body, not a face, plus two second-tier marks (dial + trail) instead of one ownable object. "A generic geometry repeated often is still generic."

**What it would take to beat Duolingo (the rematch conditions, each traceable to the verdict):**

1. **Ship A.9 and land App Review approval for pre-order before the rematch.** The moment /download's hard CTA renders the live pre-order badge, the visitor leaves with the product scheduled to arrive — the terminal action stops being an email. This single fact removes the judge's decisive conversion argument.
2. **Add a §9.0 QA row for match-output distribution.** Run the quiz vocabulary against all 1,626 enriched tag vectors at build time; set a pass/fail bar on the distribution (meaningful spread across the five tiers, no single-band clumping) and fix the scoring curve if it fails — before launch, not after the funnel's credibility is spent.
3. **Give the proof wall the hero's re-scope clause.** Define the minimum viable wall (e.g. fewer quotes with heavier per-quote assets, or founder/venue quotes substituting per the G-11 substitution logic) so no launch-blocking slot depends on an uncollected corpus.
4. **Resolve the mascot question honestly.** Either give Percy a genuine face/character that escapes the progress-ring silhouette, or stop competing on mascot terms and invest the memorability budget where the judge said our real asset lives: the experience ("the site ranked all 1,626 of my city's restaurants to my taste"), made shareable.
5. **Let the calendar fight for us.** The judge's own concession: Duolingo's marketing site is a JS shell serving crawlers a title tag and nothing else — it "would lose the SEO war to the blueprint's 1,626 server-rendered pages within months." The loss is on "launched tomorrow" terms; every month of indexed authority narrows it.

**Strategic note for the CEO:** the loss is instructive, not damning. Duolingo held because it is a live, free, decade-optimized product — advantages no pre-launch site can specify its way around. Every condition above is already in our control, and three of the five (A.9, the QA row, the proof-wall clause) are days of work, not quarters.

---

# 4. The Blueprint

The gauntlet-hardened build specification, included in full. A build session works from this section alone, with docs/BLABBERLY-MASTER.md as product ground truth. (Blueprint parts b1–b3 are superseded by this integrated document.)

---

*One document. Positioning → sitemap → pages → visuals → voice → engine → stack → assets. Build-ready: the next session builds from this with zero re-research.*
*Integrated 2026-06-11 from b1 (sitemap & pages), b2 (visual & voice), b3 (engine & assets), s1–s3 (pattern library, exploit map, positioning), teardowns t01–t14, and the BLABBERLY MASTER (canonical product doc: `docs/BLABBERLY-MASTER.md` in this repo). The pattern library (s1), exploit map (s2), and teardowns (t01–t14) are included in full as Sections 5–7 of this master plan; b1–b3 are superseded by this integrated blueprint.*

**The doctrine (CEO-locked):** design the full post-launch master site as the north star; pre-launch v1 is a strict subset — same visual system, same architecture, same templates. Launch day is *unlocking pages and flipping CTA states*, never rebuilding.

---

## 0. INTEGRATION RESOLUTIONS (contradictions found and settled — both sides of each are fixed throughout this document)

| # | Conflict (b1 vs b2 vs b3) | Resolution |
|---|---|---|
| R-1 | Quiz URL: b1 `/taste-quiz` vs b3 `/taste` | **`/taste-quiz`** everywhere (descriptive, matches all cross-links in the page blueprints). |
| R-2 | Hub scheme: b1 `/places` + `/places/{neighborhood}` vs b3 `/san-diego` + `/san-diego/{city}` | **`/places` + `/places/{neighborhood}`** (matches nav label "Places" and every page blueprint). Geo keywords live in title tags + H1s ("Where to eat in Carlsbad — San Diego County"), not the path. |
| R-3 | Launch guide count: b1 "8–12" vs b3 "15–25" | **12–20 launch guides**: 1 flagship + 5–8 cuisine×city + 3–4 occasion + 3–6 neighborhood-adjacent. Programmatic draft + human editorial pass on every one. |
| R-4 | Named franchise ("The Carlsbad 25"): b1 v1 vs b3 v2 | **Split honestly.** v1 ships "The Carlsbad 25" as the flagship guide, ranked by the blended score (Bayesian community blend with Google fallback), freshness-stamped from enrichment/build dates. The **add/drop changelog strip ships dormant** and activates post-launch when real Blabberly rating velocity exists to report. Franchise *expansion* ("The Blabberly 25: North County" etc.) is v2. |
| R-5 | Illustration: b3 "deliberately none" vs b1's three illustration moments | **Exactly two in-code SVG spot illustrations** (proof-page dissolving star average; 404 tipped taco), drawn in code in sunset tones. Zero commissioned illustration assets. b1's "illustration for empty/utility states" rule is narrowed to these two; everything else is real video, real photography, CSS glow. |
| R-6 | Fonts: b2's locked three-role system vs b3's "extract app fonts and verify license" task | **b2 wins; b3's task is rewritten.** The app ships no custom fonts (renders system SF Pro) — there is nothing to extract. Asset task = self-host **Bricolage Grotesque** + **Spline Sans Mono** woff2 subsets (both Google Fonts, free); body is the native system stack. |
| R-7 | CTA tagging: b1 `?source=place-campfire` vs b3 `?src={pageType}_{slug}` | **`?src={pageType}_{slug}`** (e.g. `?src=place_campfire`, `?src=guide_carlsbad-25`) — one param, GA4-wired. |
| R-8 | Manifesto line: "Reviews…" (b1/b2) vs "Ratings…" (s3) | **"Reviews from people who never went are dead."** — per voice rule V6, "reviews" is the incumbent's word and appears only as the thing being buried. The s3 "Ratings…" variant is retired. |
| R-9 | Non-enriched places: b1 "not published until enriched" vs b3 "generated but noindexed" | **b3 wins:** ALL place pages generate (the app deep-links `/place/*` for the full catalog — every id must resolve, never 404), but only the ~1,626 enriched pages are indexed. The rest ship `noindex,follow` as universal-link landing targets + waitlist surfaces. |
| R-10 | Asset gaps (pages in b1 with no asset in b3) | Added: **S15** For Business stats grid (v2-deferred — flag-gated off in alpha), **B10** the two in-code SVG illustrations, **P3 note** (group shot doubles as the /about + /press founders photo), **build-generated** Taste Report data-viz + per-place OG images (no capture needed). |

Terminology unified throughout: "place pages" (never "venue pages"), "% match" (never "match score"), "waitlist" pre-launch / "Get the app" at launch, "blended score" for the Bayesian userRating-with-Google-fallback number, "the lattice" for the hub→guide→place internal-link architecture.

**GAUNTLET REVISIONS (2026-06-11, post-judging — integrated throughout, tagged G-1…G-7):** the blueprint was benched against Partiful's and Duolingo's live sites and lost the conversion axis to both for the same structural reason: *a specified-but-deferred payoff loses to an executed tool.* Seven fixes, all re-sequencing assets the blueprint already had:

| # | Revision | Where |
|---|---|---|
| G-1 | **Quiz-led funnel.** The hero (and /download) embed the taste quiz's first step as the hard CTA; email capture moves to the quiz payoff, where it already stores taste profile + matched venues. "Hand the visitor a tool, not a form." | §1, §4.1, §4.2, §4.4 |
| G-2 | **The proof wall.** 8–10 verbatim tester quotes — @handle, first name, neighborhood, ★ rating, poster frame of their actual post — as a named homepage section before the closing ask, excerpted on /download. Partiful's three-layer review stack, upgraded with faces and stars. | §4.1 S5, §4.2, §9.3 A3 |
| G-3 | **The un-gated match.** Quiz completers see their REAL computed % match on every place page (localStorage profile + a ~2KB island) instead of the blurred badge — one genuine taste of the magic across all 1,626 pages, waitlist CTA beneath it. | §4.8 item 4, §4.4 |
| G-4 | **/route/{routeId} pulled to full v1.** ~80 testers are already generating shareable routes; each share is three rated venues + a plan in front of a non-user. The UGC landing-page army ships during the authority-building window, not after it. | §2 row 18, §4.15, §8.2 |
| G-5 | **R1 / A1 / P-series reclassified as v1 launch blockers** with a pass/fail quality bar and the founders shoot scheduled as a committed date, not a contingency. The APPETITE beat may not rest on unshot footage. | §9.0 |
| G-6 | **External-validation lane.** The Taste Report "First Look" seed ships WITH a local-press pitch plan; goal is one third-party quote in the trust sandwich before launch. "~80 testers" leaves the cold-traffic sandwich. | §1, §4.18, §8.6 |
| G-7 | **Percy, the personified % match badge** — the site's ownable, recurring brand device (the answer to "what's your owl?"), with a defined motion vocabulary. Always a real computed number, never decoration. | §5.6-D, §5.5, §5.7 |

**GAUNTLET ROUND 2 REVISIONS (2026-06-11, post-rematch vs Duolingo live — lost conversion narrowly and memorability clearly; integrated throughout, tagged G-8…G-12):** the rematch confirmed the first round's law (*executed reality beats scheduled assets*) and added two more: *a payoff that ends in an email field loses to a payoff that ends in the product*, and *memorability cannot be delegated to a palette and a medium*. Five fixes:

| # | Revision | Where |
|---|---|---|
| G-8 | **/my-matches — the full-catalog payoff.** The quiz payoff no longer caps at five cards plus a blurred tease (a gate Duolingo doesn't have); it opens onto the visitor's PERSONAL ranking of all 1,626 enriched venues, computed client-side from the snapshot, persistent via `bb_taste`, shareable. The visitor *uses the product* — their own ranked San Diego — and the waitlist ask sits beneath the full list, never instead of it. G-3 conceded the un-gating principle on place pages; this finishes the thought at the payoff moment. | §2 row 4b, §4.4 Step 4, §4.4b, §4.8, §7.2, §7.6, §8.2, §8.3 |
| G-9 | **The launch-tomorrow asset rule.** Every launch-blocking slot must be fillable from assets that exist today, reviewed against its bar today. A named hero fallback (R1-F) is cut from the EXISTING alpha corpus and reviewed now; the corpus pull + A3 consent-DM session are committed before any ship date. Scheduled shoots upgrade the site; they never gate it. | §9.0, §9.3, §8.6 |
| G-10 | **Percy gets a body; the trail becomes the second signature.** Percy = the match pill wearing the **sunset dial** — a gradient ring filled to the real number — with five named tier states a visitor could sketch from memory, riding OG images, the 404, launch/waitlist emails (with the recipient's real stored match), and the favicon/icon ecosystem. The dashed sunset route trail is codified as the recurring second mark. The real-number-only doctrine is untouched. | §5.6-D/E, §5.5, §5.7, B4, B5 |
| G-11 | **Press quote: goal → launch blocker, with a substitution rule.** `pressQuote: null` against "world's #1" + 48.8M learner counts is the cold-traffic credibility gap. The G-6 pitch gets a committed pre-launch send date (§9.0 row Q1); if no third-party quote lands by ship day, the trust-sandwich lead slot renders the live total-ratings counter from real data. The lead slot is structurally never empty. | §1, §4.18, §9.0, B9 |
| G-12 | **App Store pre-order on /download.** Apple supports pre-orders up to 180 days out: *"Pre-order — it installs itself on launch day"* becomes the hard CTA beside the quiz payoff on the highest-intent page — converting download intent directly into committed launch-day installs with ZERO email friction. | §4.2, §2 row 2, §4.4 Step 4, §6 V12, §8.3, §8.4, B6 |

---

## 1. POSITIONING RECAP (the story the whole site executes)

Fourteen teardowns, one pattern: **every competitor sells one slice of the night; nobody sells the night.** Beli ends at a list, Corner at a save, The Infatuation/Eater at one critic's pick, Yelp at pooled strangers' stars, Resy/OpenTable at the booking (contract venues only), Partiful at the invite with a total food void. Three stories appear on **zero** of the fourteen sites:

1. **"The score is real because the person actually went."** A rating is *required* on every Blabberly post — the claim is structural, not marketing.
2. **"The score is about *you*."** % match — computed against your taste, following you across feed, map, search, and place pages — is structurally uncopyable by editorial (no user model) and reputationally uncopyable by Yelp/OpenTable (their inventory IS the anonymous average).
3. **"Discovery becomes a plan."** The 7pm group-decision problem is served by no one. Polls → plans → multi-stop routes. Frequency wedge vs Partiful: parties happen 3x/year; "where should we eat?" happens 3x/week.

**The positioning statement:**

> **Blabberly is the only place where San Diego's food scene is scored by people who actually went, matched to your personal taste, and turned into a night out with your people.**

**Footer boilerplate:** *"Real ratings. Your taste. Your people. San Diego."*
**The manifesto line (R-8):** *"Reviews from people who never went are dead."*
**The tagline (app canon, verbatim with the period):** *"See what's happening."*

**The homepage headline doctrine:** directions A–D are not competing options; they are the four beats of one page. **A** ("Where are we going tonight?") is the hero; **B** ("Rated by people who actually went.") is the manifesto banner; **C** ("San Diego, rated to your taste.") is the % match chapter + quiz CTA; **D** ("San Diego decides where San Diego eats.") is the waitlist close.

**The emotional arc, scroll by scroll:** APPETITE (real feed video) → RECOGNITION ("that's MY city") → TRUST (the mechanism, not adjectives) → IT'S FOR *YOU* (% match demoed) → THE NIGHT (poll→plan→route rendered) → TESTIMONY (the proof wall, G-2) → BELONGING + THE ASK (founding-San-Diegan waitlist, honest scarcity). In one line: **make them hungry, then make them believe, then make them feel known, then give them their people, then let them in.** Post-gauntlet amendment (G-1): the arc still scrolls in this order, but the hero now *opens a hand* — a live % match widget the visitor uses within five seconds — so FOR YOU is tasted in beat 1 and argued in beat 4. Posture vs Corner: they diagnosed broken ratings and amputated the number; we cured it — *"we didn't kill the rating, we made it earn itself."*

#### Global rules (apply to every page in §4)
- **One funnel sitewide (G-1).** Pre-launch the hard CTA on every cold-traffic surface is **"Find your % match"** — the site hands the visitor a tool, not a form (the Duolingo lesson-before-signup pattern, the Partiful instant-tool pattern; both beat our original email-first hero in judging, and our own teardown t13 named this fix before we failed to take it). **"Join the waitlist"** renders in exactly three slots: beneath the /my-matches full ranking that the quiz payoff opens onto (G-8 — the ask sits *under* the product the visitor is using, never instead of it; the signup already stores taste profile + matched venues), the closing ask of long pages (founding-500 framing), and the footer field. On the two hottest-intent surfaces — /download's hero and the quiz payoff — the **App Store pre-order badge (G-12)** renders as the zero-friction install path beside the email ask: a pre-order is a committed launch-day install Apple delivers and push-notifies for us, no field, no friction. At launch one config flag collapses the funnel verb to **"Get the app"** — same slots, same layout. Every hard CTA carries `?src={pageType}_{slug}` (R-7) so every page's contribution is measurable.
- **Soft CTAs are sensory, never informational** — and pre-launch they *converge*: every soft CTA except the proof-page link ("See why the scores are real") either resolves toward the quiz funnel or anchors on-page. Deep architecture links (/places, /guides, /nights-out) render as inline text links, never buttons — Duolingo's every-section-resolves-to-one-action discipline. The five-chapter homepage no longer fans out to five destinations before the close.
- **The trust sandwich** under every hard CTA: pre-launch `4,000+ venues mapped · 1,626 place guides written · a rating required on every post` — every number auditable, none self-flattering. **"~80 testers" never renders next to an ask** (honest but conversion-negative against a cold visitor; it moves to the building-in-public strip, §4.1 S4, where small-and-real reads as momentum, and to founding-500 scarcity at page closes only). The sandwich **lead slot is a launch blocker and is structurally never empty (G-11)**: it renders the third-party press quote the G-6 pitch exists to land (§9.0 row Q1, committed send date), and if no quote clears by ship day it renders the **live total-ratings counter from real data** — *"{N} ratings from people who actually went — and counting"* — computed at build from the snapshot's `userRatingCount` sum. `pressQuote: null` against "world's #1" + 48.8M learner counts is the cold-traffic credibility gap that decides skeptical visitors; an auditable live number is the one counter-asset an incumbent's superlative can't fact-check away. The render rule is mechanical: `proof.pressQuote ?? proof.ratings` (B9). Post-launch the App Store rating takes the lead position. Single source: `data/proof.json` (B9).
- **Omnipresent capture:** one email field in the footer of every page including the 404 — *"Be first when your neighborhood unlocks."* Signups store the page (placeId / guideSlug / neighborhood) they came from; that's the segmentation.
- **Voice:** every line passes the hungry-friend-at-7pm test (full guide in §6). The CEO-banned h-word never appears (§6 banned list).
- **Visual system:** warm light neutrals; full-saturation sunset gradient rationed to hard CTAs, % match moments, and brand punctuation; real app UI in glow panels; real food video as the default hero medium (full system in §5).
- **Engineering non-negotiables:** every page statically generated/server-rendered — marketing, place, guide, AND the quiz funnel. No JS-shell pages, ever. robots.txt welcomes all legitimate crawlers including AI answer engines. Schema from day one. Index the money pages, noindex thin surfaces.

---

## 2. THE MASTER SITEMAP (post-launch north star) + THE V1 SUBSET

**Nav (master):** Logo · Places · Guides · Nights Out · Why It's Real · **[Get the app]**
**Nav (v1):** identical, hard button reads **[Find your % match]** (G-1 — the nav ask is the tool, not the form; the footer field carries the bare email capture). For returning visitors holding a `bb_taste` profile the same button reads **[Your matches]** → /my-matches (G-8) — the nav remembers that this visitor already owns a ranking; the site behaves like a product on the second visit, not a brochure.
**Footer:** mega-directory (neighborhoods × cuisines × occasions — scoped to ~12 neighborhoods + 8 flagship guides, never a 400-link wall), company links, legal, the email field, the boilerplate line.

| # | URL | Page | v1 / v2 | One-line justification + v1 state |
|---|---|---|---|---|
| 1 | `/` | Homepage | **v1** | The guided tour of a night out — the one page that runs the full positioning arc. v1: quiz-led hero (G-1) + proof wall (G-2) + building-in-public strip (retired at launch). |
| 2 | `/download` | Download | **v1** | Highest-intent query a consumer app gets; the category botches it (Infatuation 404s, Cash App redirect). v1 ships the embedded-quiz state (G-1) **+ the App Store pre-order badge as the hard CTA (G-12)** — the highest-intent page converts directly into committed launch-day installs, never an apology; flips to the standard badge + QR with zero layout change. |
| 3 | `/why-the-scores-are-real` | Proof page | **v1** | The trust moat gets its own URL (Duolingo /efficacy move); pre-owns "is Blabberly legit" before the query has volume. Full page day one — it needs indexing lead time. |
| 4 | `/taste-quiz` | Taste quiz funnel | **v1** | The in-app taste onboarding on the web: personalize before the install ask; **the sitewide front door (G-1)** — the hero and /download embed its first step, every funnel verb resolves here. v1 result opens onto the /my-matches full ranking (G-8) with waitlist + pre-order beneath; the stored profile also unlocks the real % match on every place page (G-3). |
| 4b | `/my-matches` | Personal full-catalog ranking | **v1 (G-8)** | The quiz's true payoff surface: all 1,626 enriched venues ranked by THIS visitor's computed % match, client-side from the snapshot, persistent via `bb_taste`, shareable. The product, used in the browser, today — the structural answer to Duolingo's lesson-before-signup. `noindex` (personal surface; its SEO value flows through 1,626 outbound place links). v2 flip: every row deep-links into the app. |
| 5 | `/nights-out` | Pillar: the night-out layer | **v1** | The category-claim page no competitor can publish — polls → plans → routes. Works fully pre-launch; most shareable page we own. |
| 6 | `/discover` | Pillar: feed, Explore, Map, Search | v2 unlock | Deep page for the "what is this app" visitor. Its v1 job is done by the homepage Watch/Match chapters; publishes at launch when "go try it" is real. |
| 7 | `/match` | Pillar: % match | v2 unlock | The structurally uncopyable feature's named, glow-coded home — our Opal Score® page. v1 job done by `/taste-quiz`. |
| 8 | `/places` | Places directory hub | **v1** | The browsable human entry into the place-page lattice — the hub Corner and Strava both failed to build. |
| 9 | `/places/{neighborhood}` | Neighborhood hubs | **v1** (first ~10–12) | Intent-matched local landing pages; the spoke layer that makes 1,626 leaves compound. Launch set picked by enriched-venue density: Carlsbad, Carlsbad Village, Oceanside, Encinitas, North Park, Hillcrest, La Jolla, Gaslamp, Convoy, Chula Vista (verify at build). Rest added as coverage fills. |
| 10 | `/place/{slug}` | Place pages (full catalog) | **v1** | THE engine — verdict in §3. ~1,626 enriched pages indexed; remainder generated but `noindex,follow` (R-9). Universal links already point here. |
| 11 | `/guides` | Guides hub | **v1** | The shelf for every ranked list and occasion page; browsable cards (photo, count, updated stamp), never a link-wall. |
| 12 | `/guides/{slug}` | Ranked-list guides | **v1** (12–20, R-3) | "The Carlsbad 25" flagship (R-4) + cuisine×city + neighborhood lists. Programmatic draft, human pass, Yelp-formula title tags. |
| 13 | `/guides/perfect-for/{occasion}` | Occasion taxonomy pages | **v1** seed (3–4) → v2 scale | Generated from the enriched `anticipatedQueries` field; occasions that resolve into routes — a page type nobody else can publish. Full taxonomy waits for editorial bandwidth + head terms claimed. |
| 14 | `/taste-report` | The San Diego Taste Report | v2 unlock (v1 seed) | Data-as-marketing franchise from required-rating data nobody in SD food media has. v1 seed: one "First Look: what 80 San Diego testers rated highest" post under /guides. Own URL + quarterly cadence when the data is non-embarrassing. |
| 15 | `/about` | About / manifesto | **v1** | The declaration page — the manifesto line + four founders; earns links no feature page will. |
| 16 | `/u/{handle}` | Public profile pages | v2 unlock | UGC landing-page army layer 1. v1: branded teaser + waitlist (never 404 — the deep-link domain already receives these URLs). Needs privacy review + user mass. |
| 17 | `/p/{postId}` | Public post pages | v2 unlock | UGC army layer 2: every shared post is a branded page with a rated clip. v1: teaser + capture state. |
| 18 | `/route/{routeId}` | Public route pages | **v1 full template (G-4)** | UGC army layer 3, the richest artifact — and ~80 testers are ALREADY generating shareable routes. Each share puts three rated venues + a plan in front of a non-user during exactly the window we're building authority; deferring it wasted our equivalent of Partiful's /e/* army. v1: full template, venue-tagged waitlist capture as the logged-out CTA; private/unknown ids fall back to branded teaser + capture (never 404). |
| 19 | `/business` | For Business | v2 unlock | Partner pitch (claimed stats, live menus, boosts) feeding the existing blabberly.com dashboard. Partner features flag-gated off in alpha; v1 = one-screen "For restaurants — opening with the app." + email field. |
| 20 | `/claim` | Claim your restaurant | v2 unlock | App already links here from unclaimed place pages; v1 placeholder must resolve branded. |
| 21 | `/press` | Press kit | v2 unlock | Logos, screenshots, founder bios, Taste Report pulls. Publishes with the launch announcement. |
| 22 | `/support` | Support | **v1** | support@blabberly.com front door + 5 FAQs; Apple review + testers need it now. |
| 23 | `/terms`, `/privacy`, `/guidelines` | Legal | **v1** | Terms/privacy live today; `/guidelines` must publish (the app's About & Support screen links it). |
| 24 | `/404` | Not found | **v1** | Every dead end is a capture surface (search + email field + three links). `noindex`. |

**Deliberate omissions:** no `/careers` (a hiring line on /about suffices); no generic `/blog` (everything editorial pools under /guides or /taste-report — two authority engines, not three); no dark mode (brand is sunset-warm light; mirrors the app's v1.2 deferral).

**Launch-day checklist (pre-built, dormant):** flip the funnel verb sitewide to "Get the app" (one config flag) → unlock /discover, /match, /business, /claim, /press → switch /u, /p from teaser to full templates → flip /route's logged-out CTA from "Save this night" capture to "Steal this night" deep links (template already live, G-4) → swap place-page waitlist CTAs to "Open in Blabberly" deep links (quiz completers' un-gated match badge stays — it becomes the deep-link hook) → flip /my-matches rows to "Open in Blabberly" deep links with taste payload (G-8 — the visitor's web ranking becomes their app onboarding) → swap the pre-order badge for the standard download badge (G-12 — same slot; pre-orders need no flip at all: Apple auto-installs and push-notifies every pre-order holder on launch morning, the only launch-day channel we don't have to send) → retire the building-in-public strip → slot the App Store rating into the trust sandwich lead position → activate the guide changelog strips (R-4). Rebuild cadence is already daily pre-launch (G-4). No template changes, no redesign.

---

## 3. THE PLACE-PAGES VERDICT

**Verdict: SHIP THEM PRE-LAUNCH. All 1,626 enriched pages indexed; the full catalog generated (R-9). This is not close.**

**Why yes — five compounding reasons:**

1. **The engine is the category's only proven model, and the inventory is already paid for.** OpenTable and Resy built their acquisition machines on the place page as the atomic SEO + conversion unit. Our enriched pages carry content the giants don't have per-page — a written About narrative, the required-rating trust story, `anticipatedQueries` (a pre-computed occasion taxonomy), `searchableInventory` keywords — and the enrichment is **done** (1,626 places, 0 failures, confirmed 2026-05-22). Marginal cost is a template.
2. **The market is structurally uncontested.** Corner doesn't list San Diego. Beli's content engine stalled at 2 NYC guides. The Infatuation has ~4 SD guides; Eater SD gets national scraps; OpenTable covers only its ~836 contract venues vs our ~4,000-venue catalog. Nobody contests "best tacos Carlsbad," "[venue] rating," or "date night Encinitas." We out-cover every competitor combined, at home, on day one.
3. **SEO compounds on calendar time, and the calendar only moves if we ship.** Indexing, sandbox aging, and authority accrual take months. Publishing now means the pages rank *at* App Store launch — when they convert at download intent. Waiting converts our biggest asset into a launch-day liability.
4. **Pre-launch, every page is a capture surface, not a brochure — and for quiz completers, a demo.** The Resy Notify inversion makes "the app isn't out yet" a feature: each page's payoff moment inverts into a waitlist signup storing *which venue hooked them*. Launch-day re-engagement says "Campfire is live — your % match is ready," not "we launched." And the payoff is no longer uniformly deferred (G-3): a visitor who has taken the quiz sees their REAL computed % match on every page — the SEO traffic the engine exists to win gets one un-gated taste of the magic before any ask. No competitor captures anything; none demos anything either.
5. **The AI-answer flank is open right now.** Yelp and Corner actively block AI crawlers. Whoever is the deep, structured, crawlable source for San Diego food queries when answer engines settle their citation habits wins a durable channel. The window narrows monthly.

**The risks, named and answered (not hedged):**
- *"Thin programmatic content gets penalized."* It would, naked. Every indexed page ships the structured-opinion skeleton (unique enriched narrative in scannable blocks), FAQ blocks from `anticipatedQueries`, schema, freshness stamps, and the lattice with bidirectional cross-links. More unique content per page than Yelp or OpenTable serves.
- *"Quality variance across 1,626 AI-enriched pages."* One-pass quality gate before publish — mechanical, run at build: **index a place only if `aboutAI` ≥ 120 chars AND it has ≥1 usable image (Blabberly post media, else a `placePhotos` storageUrl) AND `isActive != false` AND `isChain != true`**; failures fall to the shorter card template with `noindex,follow` and graduate automatically on a later build when the data fills in. A filter, not a delay. (Spot-check 20 random passing pages by hand before the first index submission — the one human step.)
- *"Pages tease an app nobody can download — dead end."* That's the Notify pattern: pre-launch, every state is the sold-out state. Each page also delivers standalone value (the guide content itself), so it earns its ranking honestly.
- *"What about the other ~2,400 venues?"* Generated, `noindex,follow` (R-9): they resolve universal links and capture waitlist intent, spend zero crawl budget, and graduate to the index when they earn enrichment or rating volume. The site claims 1,626 *written guides*; the app claims 4,000+ venues mapped. Both true, both used.

**Conditions of the verdict (the "don't ship it naked" spec):** SSR/static only; the lattice live from day one (hub → neighborhood → place, with Included-In backlinks from guides); `Restaurant`/`LocalBusiness` + `FAQPage` schema; freshness stamps from real data; venue-intent waitlist capture; **slug parity with the app's universal links** — slug = `restaurants` doc id with underscores→hyphens (`jeune_et_jolie` → `/place/jeune-et-jolie`); App.js converts hyphens back to underscores, so the site's slug generator must mirror that mapping exactly or deep links break.

---

## 4. PAGE-BY-PAGE BLUEPRINTS

Format per page: section order → drafted copy → CTA strategy → the visual in each section (real app UI named from the BLABBERLY MASTER, photography, motion, or one of the two in-code illustrations — R-5).

Named app screens referenced (Screen & Navigation Map / Feature Encyclopedia): **FeedScreen** (FoodCard vertical pager, LOCAL/FRIENDS tabs), **PostDetailsScreen** (compose: "How was {place}?" half-star control), **ExploreScreen** (Trending Now / Top Spots rails with gradient % match badges), **MapScreen** (named-pill county map, preview-card carousel, "Planning Your Route" mode with dashed sunset trail), **PlaceDetail** (hero, match-tier banner, About, POSTS grid, hours), **Conversation** + **PollBuilder** ("Where should we eat?", "Lock it in"), **PlanDetail** + the **"I'm Going!"** sheet, **FinalizeRoute**, **ActiveRoute** (geofence check-offs, "Visited"), **RouteDetail**, **StoryViewer**, **TastePickerScreen** (taste chips — vocabulary ground truth in §8.2 item 1b), **CameraScreen** Dual Bite mode. Match tiers: "Made For You" ≥90 (magenta) · "Strong Match" 80–89 (orange) · "Good Match" 70–79 (amber) · "Fair Match" 50–69 (emerald) · "Worth a Try" <50 (gray).

### 4.1 Homepage `/` — v1
The six-beat arc; headline directions A/B/C/D deployed as beats of one page.

**Section 0 — Nav + manifesto banner.** Thin banner (Linear's "Issue tracking is dead" slot): **"Rated by people who actually went. →"** (links /why-the-scores-are-real). Text on warm neutral; sunset underline on hover. The nav's hard button beside it reads **"Find your % match"** (G-1) — the banner argues, the button hands over the tool; together they are the trust claim and its demo in one strip.

**Section 1 — Hero (Beat 1: APPETITE, with Beat 4 in the visitor's hands). Direction A, quiz-led (G-1).**
> # Where are we going tonight?
> Real videos, real ratings from people who actually went, and a % match that knows your taste — for 4,000+ spots across San Diego. Tap what you love and watch your first match compute, right here.

CTA: **the hero IS the quiz's first step.** No email field anywhere above the fold. Two elements working together:
- **The chip grid:** 8–10 real TastePickerScreen tokens (emoji + label pills — Birria, Rooftops, Matcha, Dive Bars, Margaritas, Omakase…) inline under the subhead, tappable immediately.
- **The live venue card:** one real enriched Carlsbad venue (photo, name, neighborhood, blended stars) beside the grid, wearing Percy (§5.6-D) at rest. **Selection rule (build-time, mechanical):** Campfire if it passes the gate, else the highest-blended-score enriched Carlsbad venue with ≥6 tags and a usable photo — ≥6 tags so the widget visibly reacts across many chip taps (§8.2 item 1b: tagless or thin-tagged venues make Percy inert). As the visitor taps chips, the % match **recomputes in real time** — Percy ticks up in small bounces, and when a tier threshold crosses, the label and color flip live ("Good Match · 74%" amber → "Strong Match · 86%" orange). All computation is client-side against the venue's embedded tag vector: a real number from real data, zero backend, the closest possible analog to Duolingo's lesson-before-signup. Pre-launch, **this widget IS the product demo.**

Button: **"Find your % match — 30 seconds"** → /taste-quiz with picks carried (query param + `bb_taste` localStorage), landing mid-flow on Step 2 — the visitor never repeats themselves. Microcopy under the button: *"No signup. Your matches first, your email after."* Trust sandwich beneath (the G-1 version — no tester count). Email capture happens only at the quiz payoff, where it stores taste profile + matched venues.
Visual: **motion** — muted, lazy-loaded loop of 3–4 real tester feed clips (asset R1, a §9.0 launch blocker) inside a bezel-less frame showing the real FeedScreen FoodCard UI, floating in a sunset glow field, anchoring the hero's left/top; chip grid + live venue card on the right third (mobile: clip frame leads, widget stacks directly beneath, sticky "Find your % match" bar). The first three seconds must make a visitor hungry — the asset no competitor site can run; by second five they're already using % match.

**Section 2 — Recognition strip (Beat 2: "that's MY city").**
> ## Carlsbad to Chula Vista, scored by the people who live here.

Visual: horizontally scrolling strip of **real rated post cards** — poster frame, @handle, first name + neighborhood ("Marco, North Park"), stars, recency stamp in mono ("4d ago"). Real tester content only (assets A1–A3). Each card links to its `/place/{slug}`. No CTA (soft section).

**Section 3 — The guided night (five numbered chapters, one verb + one real-UI proof + one deeper link each):**
1. **Watch.** *"A feed of what's actually good here — every post from a real visit."* Visual: FeedScreen pager mid-swipe (R1), orange glow. Soft CTA: "Watch the feed" → /discover (v2; pre-launch anchors to the hero video).
2. **Trust (Beat 3). Direction B:** *"Rated by people who actually went."* Sub: *"You can't post a spot on Blabberly without rating it. Every score is earned, on camera."* Visual: PostDetailsScreen compose — "How was Campfire?", half-star control, the real hint string *"Half-stars supported · Moves Campfire's public average."* (S5/R4). Soft CTA: "See why the scores are real" → /why-the-scores-are-real.
3. **Match (Beat 4). Direction C:** *"San Diego, rated to your taste."* Sub (jargon-then-translation): *"% match means the score is computed against your taste — not an average of strangers."* Visual: real PlaceDetail "Made For You" banner + fan of real badges (91%, 84%, 73%) in magenta glow (S3/S4); Percy counts up once (§5.5). CTA: **"Find your % match"** — for visitors who tapped hero chips, this button reads their picks and the copy acknowledges it (*"You're 3 taps in — see your ranking"*); for `bb_taste` holders it reads *"See your matches"* → /my-matches (G-8).
4. **Go.** *"From 'that looks unreal' to standing there."* Sub: *"Tap the place, see the hours, see who's going, make it a plan."* Visual: MapScreen preview-card carousel over the named-pill county map (R5) — the warm-orange-to-rose distance coloring is the brand painting itself. CTA: **"Find your % match"** (ghost style); *"or browse every neighborhood →"* as an inline text link to /places (G-1 convergence — the lattice entry survives, demoted from button to link).
5. **Plan the night (Beat 5).** *"It's 7pm. Six people. Nobody can pick."* Sub: *"Run a poll, lock it in, build the whole night — dinner, bar, dessert — as one route."* Visual: **motion** — poll filling with votes → "Lock it in" → MapScreen route mode drawing the dashed sunset trail through three numbered stops (R6/R7). CTA: **"Find your % match"** (ghost style); *"or see a Saturday route →"* inline to /nights-out.

(Chapter-CTA discipline, per G-1: chapters 3–5 all resolve to the one funnel verb — ghost buttons so the one-gradient-CTA-per-viewport ration in §5.3 holds; chapter 2's proof-page link is the single sanctioned exception. Pre-launch the homepage funnels to exactly two destinations before the close: the quiz and the proof.)

**Section 4 — Building-in-public strip (v1 only; retired at launch).**
> ## This week at Blabberly
> *47 new venues enriched · Dual Bite shipped · 12 new testers in North County · ~80 locals scoring spots*
Linear-style changelog ticker, plain type, real items, dated, hand-updated JSON — **`data/changelog.json`: `[{ date: "2026-06-09", text: "47 new venues enriched" }, …]`**, newest first, render the latest 4, stale-guard: if the newest entry is >14 days old the strip hides itself (a dead heartbeat is worse than none). **This is where the tester count lives (G-1)** — as momentum in a dated feed, small-and-real reads as a heartbeat; next to an ask it read as a warning label.

**Section 5 — The proof wall (Beat 6a: TESTIMONY) (G-2).**
> ## San Diego's already scoring it.

8–10 verbatim tester quotes — Partiful's three-layer review stack, upgraded with faces and stars. Each card: the quote, @handle, first name + neighborhood (*"Kaden — Oceanside"*), their ★ rating rendered as the app renders it (gold glyphs, half-stars), and the **poster frame of the actual post the quote is about** (tap = the clip plays, muted). Quotes stay deliberately unpolished — texted-a-friend register, zero copyediting beyond redaction: *"dude the tri-tip is stupid good"* beats anything we could write, exactly as *"I don't even hang out with my friends if they don't send me the partiful first"* beats any Partiful tagline. Handle + recency stamp in mono (the receipts voice). Layout: masonry wall, two rows desktop / swipe-strip mobile. Sourced per A3 (§9.3, expanded to 8–10) with written consent. One slot in the wall is reserved for the first third-party press quote when G-6 lands it — peer proof and external proof, same wall. No CTA inside the section; the wall hands its heat directly to the closing ask beneath.

**Section 6 — Closing hero (Beat 6: BELONGING + THE ASK). Direction D.**
> ## San Diego decides where San Diego eats.
> Join the locals scoring 4,000+ spots from Carlsbad to Chula Vista — every rating from someone who actually went. Your taste, your people, your night.

CTA: **the one place on the homepage the bare email field renders** (G-1) — waitlist capture with founding framing: *"Be one of the first 500 San Diegans in."* Visitors who finished the quiz see a personalized close instead: *"Your matches are saved. Be first in when {their top neighborhood} unlocks."* Trust sandwich. Honest scarcity only (launch window, neighborhood rollout — never fake countdowns).
Visual: **photography** — San Diego golden hour, a real patio or taco window (P1/P2, §9.0 launch blockers), with a floating FoodCard (video playing) and Percy composited in-scene (Resy composite pattern).

**Section 7 — Footer.** Mega-directory (every link real), boilerplate line, the email field, legal.

### 4.2 `/download` — v1 (embedded-quiz state) → v2 (live state)
One template, two states. Never a redirect, never a bare badge — **and never an anticlimax (G-1):** the original "# Almost." delivered an apology to the single highest-intent page on the site. The visitor who typed "blabberly download" gets the product's interactive payoff, not a consolation email field.
- **S1 Hero.** v2: **# Get Blabberly.** / *Free on iPhone. Built for San Diego County.* — store badge (B6) + QR (B7), platform-detected. v1 (G-12): **# Pre-order it now. It installs itself on launch day.** / *Free on iPhone the day San Diego unlocks. Tap once and Apple does the rest — no email, no reminder to set, the app just appears.* Hard CTA: the official **"Pre-Order on the App Store" badge** (B6 — Apple supports pre-orders up to 180 days out; a pre-order is a committed launch-day install that Apple delivers AND push-notifies, the one launch-day channel we don't have to send). This closes the structural gap the judging named: Duolingo's visitor leaves with the product; ours now leaves with the product *scheduled to arrive* — zero fields, zero friction. Beside the badge: **the full taste quiz embedded in the hero slot** (the same island as /taste-quiz, payoff opening the visitor's /my-matches ranking, G-8) — *"While you wait: find your % match in 30 seconds."* Microcopy under the badge: *"No iPhone yet, or want the launch email too? The waitlist is below."* Until App Review approves a build for pre-order (sequenced with the A.9 production build — §8.4 item 6), the badge slot renders the waitlist state and flips the day Apple clears it, no layout change. The v2 flip swaps pre-order for the standard badge + QR in the identical slot; the quiz moves to S2.5's position as "warm up your taste before you open it." Trust sandwich both states. Visual: one 15-second real feed clip in a frame (R14), sunset glow, beside the quiz island.
- **S2 What you get on day one.** Three cards: the feed ("every post a real visit"), % match ("scores computed against your taste"), the night ("polls, plans, 5-stop routes"). Small real-UI crops (S2, S3, S7).
- **S2.5 Proof strip (G-2).** Three cards excerpted from the homepage proof wall — quote, @handle + first name + neighborhood, ★ rating, poster frame. High-intent visitors get peer proof at the decision moment, Partiful-style.
- **S3 FAQ.** Four honest answers, FAQPage schema: *"Is it free?"* (*"Yes. Free to download, free to use. Restaurants can pay to be more visible — never to change a score."*) / *"What does pre-ordering actually do?"* (*"Nothing charges, nothing emails you — Apple installs the app on your phone the morning we launch and tells you it's there."*) / *"When does my neighborhood get it?"* (*"San Diego County, all at once, at launch — 4,000+ venues from Carlsbad to Chula Vista on day one. Join the waitlist and we'll email you that morning."*) / *"Android?"* (*"iPhone first. Android depends on how loudly San Diego asks — the waitlist form has a checkbox; check it and you're the vote."* — the form ships the `android: true` boolean in the §8.3 payload.)
- **S4 Footer.**

### 4.3 `/why-the-scores-are-real` — v1
The proof page; the positioning's own URL; the backlink magnet. Tone: declarative, three beats, zero adjectives.
- **S1 Hero.** **# Rated by people who actually went.** / *Every post on Blabberly requires a star rating — so every score on every San Diego spot comes from a real visit, not a stranger's grudge or a critic's one-size-fits-all take.* Hard verb + sandwich. Visual: PostDetailsScreen rating UI, large (S5) — the rule, in pixels.
- **S2 The problem (agree with the skeptic).** **## Star averages are broken. You already know it.** / *A 4.2 from a thousand strangers — tourists, grudges, owners' cousins — tells you almost nothing. Some apps' answer is to delete ratings entirely. Ours is to make the rating earn itself.* Visual: in-code SVG illustration #1 — a muted star-average dissolving (B10).
- **S3 The mechanism.** **## You went. You rated. It counts.** 1. Post a spot — a real photo or video from a real visit. 2. Rating required — the Share button stays locked until you've rated. No rating, no post. 3. Score earned — every rating moves the public average; recent visits count more; Google's number is only a fading starting point until real Blabberly ratings take over. Visual: three real-UI panels — CameraScreen capture → locked Share button unlocking as stars fill (R4) → PlaceDetail blended average with "N ratings from people who went."
- **S4 Why it can't be gamed.** **## And there's no single number to game.** / *Your % match is computed against your taste profile — so even if someone wanted to inflate a score, there's no one score to inflate. No one can buy a rating: scores come only from rated posts.* Visual: two PlaceDetail match banners side by side — same venue, "Made For You · 93%" vs "Fair Match · 58%" (S4).
- **S5 FAQ (owns the scary queries).** "Is Blabberly legit?" / "How is this different from Yelp?" / "Can restaurants pay for a better score?" (no — paid placement never touches a score) / "What stops fake accounts?" — FAQPage schema; the headers are the SERP strings.
- **S6 Close.** Hard verb + sandwich + footer.

### 4.4 `/taste-quiz` — v1 (R-1)
The Opal funnel, corrected: on-domain, server-rendered shell + one interactive island, delicious payoff. **Post-G-1 this is not a page, it's the sitewide funnel:** the homepage hero and /download embed its first step; the nav button, every chapter CTA, and every place page's locked state resolve here.
- **Step 0 Landing.** **# What's your taste?** / *Tap a few things you love. We'll rank all 1,626 written-up San Diego spots against your taste — before you ever download anything.* CTA: **"Start — 30 seconds"**. Visual: real taste chips (emoji + label pills from TastePickerScreen — Birria, Rooftops, Dive Bars, Matcha…) drifting in sunset glow (R13 for parity). **Entry routing (G-1):** visitors arriving from the hero widget or /download carry their picks (query param + `bb_taste` localStorage) and land mid-flow on Step 2 — nobody repeats a tap; Step 0 exists for direct, SEO, and shared-link entries. Visitors arriving from a place page's locked badge see that venue named in the landing copy: *"Tap a few things you love — we'll score Campfire against your taste."*
- **Steps 1–3 The picker.** Three steps mirroring the app exactly: Cuisines → Drinks → Vibe — the app's own token vocabulary (food 29 + drinks 11 + vibe 13 = 53 chips, copied from `TASTE_CATEGORIES` in the app's `src/data/onboardingChoices.js`; full data note §8.2 item 1b), minimum 3 picks, the app's own helper copy (*"No wrong answers, tap anything."*). A live Percy in the corner ticks upward against the session's best-matching venue as picks accumulate (the §5.6-D "tick") — progress rendered as appetite, not as a progress bar alone. The quiz IS the product demo.
- **Step 4 The payoff — the product, used (G-1, completed by G-8).** **## Your taste, scored against San Diego.** Five hero venue cards reveal first (photo, name, neighborhood, blended stars, computed % match — Percy's full reveal, staggered) — and then the page doesn't stop: **"See your full ranking — all 1,626 spots →"** opens /my-matches (§4.4b), the visitor's personal ordering of the entire enriched catalog, computed client-side from the same profile. **The blurred sixth card is dead** — judged correctly as a gate Duolingo doesn't have; the tease is replaced by the thing itself, with the asks placed beneath it. The reward chain no longer terminates in an email field: it terminates in the visitor *using the product* — their own ranked San Diego, tonight, in the browser. **The email ask lands under the payoff, after the dopamine, Duolingo-style:** CTA v1 **"Join the waitlist"** — signup stores taste profile + matched venues (launch email: "Campfire is live — your 91% match is ready") — with the **App Store pre-order badge beside it (G-12)** for visitors ready to commit the install with no email at all. Whether or not they hand over anything, the completed profile persists to `bb_taste` localStorage — which unlocks the visitor's REAL % match on every one of the 1,626 place pages (G-3) and re-opens their /my-matches ranking on every return visit (G-8): the quiz pays off across the entire site, forever, not in five cards once. If the funnel was entered from a place page, that venue renders as card #1 and a *"Back to {Place} — your match is live →"* link returns them to the now-unlocked badge. v2 flip: **"Get the app"** with taste payload deep-linked so onboarding pre-fills.

### 4.4b `/my-matches` — v1 (G-8: the full-catalog payoff; the product in the browser)
The structural answer to the judged gap: Duolingo's funnel ends in a lesson; ours ended in five cards, a blur, and a wait. Now it ends in the visitor's personal San Diego — every enriched venue, ranked by THEIR computed % match, usable tonight and waiting for them tomorrow.
- **S1 Header.** **# San Diego, ranked by your taste.** / mono stamp: *"1,626 spots scored against your {k} taste picks · computed on your device · {Month D}"* — the receipts voice; "computed on your device" is simultaneously a privacy line and a trust line (nothing was sent anywhere, nothing was curated for you — V-banned word and all). Returning `bb_taste` holders land here directly from the nav's **[Your matches]** state; the page is the site's product surface, the thing a visitor opens *again*.
- **S2 The ranking.** The full enriched catalog ordered by computed % match, **grouped under the app's exact tier headers in the app's exact tier colors** (Made For You → Strong Match → Good Match → Fair Match → Worth a Try) — the visitor learns the app's grammar by scrolling their own copy of it. Each row: rank · Percy wearing the real number in its true tier state (§5.6-D — at list scale the dial gets burned in: 200 scrolled rows wearing 200 real numbers is the brand-device exposure no hero section can buy) · name · neighborhood · blended ★ + *"N ratings from people who went"* · one-line WHAT TO GET pull → `/place/{slug}`. Every row feeds the lattice — the personal surface and the SEO engine are the same pages. Filters: neighborhood + category chips, client-side, instant.
- **S3 The share.** **"Share your top 5"** → `/my-matches?t={encoded taste tokens}`: the recipient's page recomputes the sender's matches live from the tokens (real numbers always — nothing baked, nothing faked) under a banner: *"Someone's top 5. What's yours? →"* (quiz CTA, their own ranking 30 seconds away). Every share sends the % match demo traveling person-to-person — the closest thing a pre-launch food site has to Partiful's event-page loop, and it costs one query param.
- **S4 The ask — beneath the list, never instead of it.** Sticky close card after meaningful scroll: *"This is your taste against 1,626 written guides — frozen the moment you tapped. The app scores all 4,000+ venues, live, and sharpens every time you save or watch."* CTA v1: **"Join the waitlist"** (stores taste profile + top-5 venue ids) with the **pre-order badge (G-12)** beside it. v2 flip: **"Get the app"** deep link with taste payload — the visitor's web ranking becomes their app onboarding.
- **Mechanics.** `noindex` (personal surface; SEO value flows through its 1,626 outbound place links). Server-rendered shell + one island reading `bb_taste` and fetching **`data/match-index.json`** — a build-generated slim catalog ({slug, name, neighborhood, category, stars, ratingCount, tag vector, what-to-get line} × 1,626; budget ≤300KB gzipped, immutable-cached, fetched once) — scored by **the same module as the hero widget, the quiz, and the G-3 place-page islands** (§8.2; one scoring function, four surfaces, zero drift). First ~50 rows render instantly, the rest virtualize on scroll. No profile → redirect to /taste-quiz Step 0. Empty filter states render Percy's Tipped state (§5.6-D), never a blank. Analytics: `my_matches_view`, `my_matches_share` (§8.3).

### 4.5 `/nights-out` — v1 (pillar)
Narrated as situations, never capabilities.
- **S1 Hero.** **# It's 7pm. Six people. Nobody can pick.** / *Blabberly is where the group decision actually gets made — polls your friends actually answer, one-tap plans, and a route for the whole night.* Hard verb + sandwich. Visual: **motion** — Conversation screen, "Where should we eat?" poll filling with live votes (R7).
- **S2 The poll.** **## Settle it in the chat.** / *Drop a "Where should we eat?" poll built from real Blabberly places. Votes fill live. When it's decided, the creator taps "Lock it in" — and the winner automatically becomes a plan.* Visual: PollBuilder + locked poll state ("{N} votes · locked in").
- **S3 The plan.** **## "I'm Going!" does the rest.** / *Pick Right Now or Later, choose who to tell, and the invite lands in their DMs with one button: "I'm In." RSVPs update live.* Visual: the "I'm Going!" sheet → DM invite card flipping to "You're going!" (R8) → PlanDetail with attendee tri-state + "HAPPENING NOW" ribbon (S9).
- **S4 The route.** **## Then make it a whole night.** / *Tap 2–5 spots on the map and watch them connect into one route — dinner, bar, dessert — with times, notes, and everyone's live progress. Arrive within a block and your stop checks off on its own.* Visual: **motion** — route mode drawing the dashed sunset trail → FinalizeRoute ("Campfire → Barrel Republic") → ActiveRoute with a stop flipping to "Visited" (R6/R9).
- **S5 The trophy.** **## Finished nights become routes worth stealing.** / *Complete a route and it lands on your profile. Make it public and it shows up in Popular Routes for the whole county — only finished nights make the shelf. No wishlists.* Visual: RouteDetail public page (S7) + Explore Popular Routes rail with "X saved" pills.
- **S6 Close.** *"Hosting a party happens three times a year. 'Where should we eat?' happens three times a week."* Hard verb + sandwich + footer.

### 4.6 `/places` — v1 (directory hub) (R-2)
- **S1 Hero.** **# Every spot in San Diego County. Actually covered.** / *1,626 written place guides and counting — from Carlsbad taco windows to Convoy late-night — each scored only by people who went.* Machine-stamped freshness line: *"As of {Month D, YYYY}: {n} spots with written guides · {n} rated this month."* CTA: search field ("Find a spot…") + hard verb in nav. Visual: MapScreen county map as stylized backdrop (S6) — named pills, warm-orange-to-rose by distance.
- **S2 Browse by neighborhood.** Grid of neighborhood cards (photo, place count, top-rated teaser) → `/places/{neighborhood}`.
- **S3 Browse by craving.** Cuisine rails (Tacos, Sushi, Coffee, Breweries…) → cuisine guides.
- **S4 Browse by occasion.** Occasion cards ("Date night," "Big group," "First stop of a crawl") → `/guides/perfect-for/*`.
- **S5 Footer** (the mega-directory earns its keep here).

### 4.7 `/places/{neighborhood}` — v1 (template, ~10–12 at launch)
- **S1 Hero.** Query-mirroring intro: **# Where to eat in {Neighborhood}** / *{n} spots covered, {n} rated by locals this month. Here's what people who actually went keep scoring highest.* Visual: **photography** — golden-hour establishing shot with a floating % match badge composite (P1). **Imagery fallback for hubs outside the P-series' Carlsbad/North County range (North Park, Hillcrest, Gaslamp, Convoy, Chula Vista…):** the neighborhood's strongest A2 still, else the top-blended venue's best `placePhotos` frame (rights posture per §8.4 item 5), else a P4 texture shot — same Percy composite either way; never stock, never another neighborhood's photo wearing the wrong name.
- **S2 The ranked teaser.** Top 10 by blended score: rank, name, stars, "N ratings from people who went," one-line WHAT TO GET pull, poster frame. Each row → `/place/{slug}`.
- **S3 Guides for this neighborhood.** Cross-link cards to every guide that includes it (bidirectional lattice).
- **S4 The map strip.** Static render of the neighborhood's pills (MapScreen aesthetic) linking into the directory.
- **S5 Capture.** **## Be first when {Neighborhood} unlocks.** Waitlist field, neighborhood stored. (v2 flip: "Get the app — {Neighborhood} is live.")

### 4.8 `/place/{slug}` — v1 (the atomic unit; ~1,626 indexed + catalog noindexed)
Every section earns one of three jobs: **rank** (SEO), **prove** (trust), or **capture** (conversion). Layout: 2-column ≥1024px — content left, sticky capture/CTA card right; sticky bottom CTA bar on mobile.

1. **Breadcrumb + hero.** `Places → {Neighborhood} → {Place}` (BreadcrumbList schema). Hero: best-rated post's poster frame with play glyph (the tease); fallback `placePhotos` storageUrl. Name, category, price, neighborhood.
2. **The score block.** Blended stars + trust line as standing copy: **★ 4.6 · 32 ratings from people who actually went** / *Every Blabberly score comes from a rated post made at a real visit. [How scores work →](/why-the-scores-are-real)*. Display rule mirrors the app's `displayScoreForPlace`: prefer `userRating`, fall back to Google `rating`; trust line renders only where `userRatingCount ≥ 1`; "New" badge state when unrated.
3. **Structured-opinion blocks** (Corner skeleton, our grounding) — built from `aboutAI`, `tags`, `topDishes`, `whyPeopleCome`, `anticipatedQueries`: **VIBE** (two sentences of enriched narrative) · **WHAT TO GET** (straight from `topDishes` / Must Try) · **THE MOVE** (insider one-liner: timing, ordering, seating) · **BEST FOR** (occasion chips → matching `/guides/perfect-for/*`). Where a rated post exists: *"@{handle} gave it ★★★★½ — watch their post"* + poster frame (v1 for the ~dozens with alpha posts; v2 for most).
4. **The % match module — the demo, then the gate (G-3).** **## What's *your* match with {Place}?** / *% match means the score is computed against your taste — not an average of strangers.* Two states, decided by one ~2KB island (the only JS on the page) reading the `bb_taste` localStorage profile:
   - **Quiz completer — the un-gated payoff:** their REAL computed % match renders. Percy counts up to the true number with the true tier label and color (*"Strong Match · 84%"*), computed client-side from the visitor's stored taste tokens against the page's embedded tag/dish vector. The web number is the app's onboarding-state model — quiz-tokens-vs-venue-tags, exactly what a brand-new app user would see, so it's honest; sub-line: *"Sharpens as you save and watch in the app."* Beneath it: an inline *"See where {Place} lands in your full ranking →"* (/my-matches, G-8 — the place page hands the visitor back to their own product surface) and *Your match with all 4,000+ spots is waiting.* CTA v1: **"Join the waitlist"** — signup stores venue + computed match, so the launch email writes itself: *"Campfire is live — your 84% match is ready."* This is the structural fix to the judged flaw: previously all 1,626 pages dead-ended the payoff moment into the same capture field; now the SEO visitor who took the quiz never hits a blurred dead end again — every page is a live demo with the ask placed *after* the magic.
   - **No profile:** blurred/locked badge in magenta glow. CTA v1: **"Find your % match"** → /taste-quiz (venue stored on the funnel; the payoff's return link brings them back here with the badge live).
   CTA v2 (both states): **"See your match in the app"** → deep link with place payload — the visitor's first in-app screen is this venue's PlaceDetail, not a cold feed.
5. **Posts from this spot.** Grid of rated-post poster frames (the app's POSTS-tab anatomy, each tile carrying its poster's rating). Pre-launch with no posts, the capture state renders instead: *Videos from {Place} land here when San Diego unlocks.* **Be first to see them →** (waitlist, venue-tagged — the Notify inversion).
6. **Practical.** Hours (Open/Closed + 7-day, via the app's `hoursUtils` normalization ported), address, map snippet, price.
7. **FAQ.** 3–5 Q&As from `anticipatedQueries` ("Is {Place} good for date night?") with answers grounded in tags/dishes/About — FAQPage schema; the AI-answer-engine feedstock.
8. **Included in.** Cross-links up to every guide and occasion page featuring this venue.
9. **Similar spots nearby.** 5 cards using the app's Similar Places scoring (+3 category / +1 tag overlap) — the sideways crawl layer.
10. **Capture close + footer.** **## Be first to see {Place}'s videos and your % match.** Waitlist, venue stored. Freshness stamp: v1 *"Profile written {aboutAIGeneratedAt month year} · Catalog updated {build date}"*; v2 rating-velocity stamps ("3 new rated posts this week") when true.

### 4.9 `/guides` + `/guides/{slug}` — v1 (hub + template)
**Hub:** **# Guides to eating like you live here.** / *Ranked lists scored only by people who went — updated as the ratings move.* Sections: flagship franchise card ("The Carlsbad 25") → cuisine guides → occasion guides → neighborhood guides. Every card: photo, count, updated stamp.

**The launch guide list (the concrete R-3 set — slugs locked; entries selected at build by blended score within each scope; any slug whose scope yields <8 qualifying enriched venues gets swapped for the next-densest candidate, decided at build, not re-debated):**
| Slug | Type |
|---|---|
| `carlsbad-25` | Flagship franchise ("The Carlsbad 25") |
| `best-tacos-carlsbad` · `best-sushi-carlsbad` · `best-pizza-carlsbad` · `best-tacos-oceanside` · `best-breweries-oceanside` · `best-brunch-encinitas` · `best-coffee-north-park` · `best-ramen-convoy` | Cuisine×city (8) |
| `best-restaurants-carlsbad-village` · `best-happy-hours-carlsbad` · `late-night-eats-gaslamp` · `best-patios-north-county` | Neighborhood-adjacent (4) |
| `/guides/perfect-for/date-night` · `/guides/perfect-for/big-groups` · `/guides/perfect-for/bar-crawl-starters` · `/guides/perfect-for/family-dinner` | Occasion seeds (4 — generated from `anticipatedQueries` clusters, human pass on each) |
That's 17 — inside the 12–20 band with swap room. The footer's "8 flagship guides" = the flagship + the 7 strongest of these by venue density.

**Guide template (e.g. "The Carlsbad 25"):**
- **S1 Hero.** Title tag (Yelp's SERP formula): *The 25 Best Restaurants in Carlsbad — Ranked by Locals (Updated June 2026)*. On-page: **# The Carlsbad 25** / **## Ranked by people who actually went.** / *Where should you eat in Carlsbad? Here's the answer from the locals scoring it — every entry's rating comes from required ratings on real visits, re-ranked as new ratings land.* Freshness: *"Updated {date}."*
- **S2 Changelog strip** (Eater's add/drop move): *"This update: Campfire ↑2 · two new entries · one dropped."* **Ships dormant in v1; activates post-launch when real rating velocity exists (R-4).**
- **S3 Ranked entries (×N).** Per entry: rank · name · blended stars + "N ratings" · neighborhood · WHAT TO GET line · @handle quote with stars (*"@kaden gave it ★★★★★ — 'the tri-tip is stupid good'"*) where a real post exists · poster frame → `/place/{slug}`.
- **S4 The map.** All entries as pills on a static MapScreen-style render.
- **S5 Capture close.** **## Your 25 won't be this 25.** / *This list is everyone's average. Your % match is yours.* **Find your taste →** (/taste-quiz). Hard verb + sandwich + footer.

**Occasion variant `/guides/perfect-for/{occasion}`:** same template; hero mirrors the situation (*"Big group, nobody agrees? These 12 places end the argument."*); entries can be **routes**, not just venues ("Where to start a Gaslamp crawl" resolves into a 3-stop itinerary) — the page type nobody else can publish. v1: 3–4 seed pages; v2: full taxonomy generated from `anticipatedQueries` clusters with editorial review.

### 4.10 `/about` — v1 (the manifesto)
- **S1 The declaration.** **# Reviews from people who never went are dead.** / *Every score on Blabberly comes from someone who was actually there — because you can't post a place here without rating it. That's the whole company.* Plain oversized type on warm neutral. No UI.
- **S2 The argument.** Three short paragraphs: the broken star average → why deleting ratings (the other answer) forfeits trust → the required rating as the cure. Pull-quote: *"Real ratings. Your taste. Your people. San Diego."*
- **S3 Who's building it.** Four co-founders, first names, neighborhoods, what they keep ordering. **Photography:** one real golden-hour group shot, not headshots (P3 — doubles as the /press founder photo, R-10).
- **S4 Building in public (v1).** Same changelog strip as the homepage. (v2: replaced by press mentions + the Taste Report card.)
- **S5 Close.** Hard verb + sandwich + footer.

### 4.11 `/404` — v1
> # This page must've closed early.
> The food's still good. Try a search — or get on the list and we'll bring San Diego to you.
Search field + email capture + three links (Places, Guides, Home). Visual: in-code SVG illustration #2 — a tipped-over taco in sunset tones (B10); the one place humor leads. `noindex`.

### 4.12 `/support`, `/terms`, `/privacy`, `/guidelines` — v1
Single utility template: title, body, footer. Index all but 404. No CTAs beyond the footer field — these pages' job is trust through plainness.

**/support — the five FAQs (drafted):** **# Need a hand?** / *Email support@blabberly.com — a founder reads every message.* Then:
1. *How do I delete my account?* — In the app: Profile → Settings → Account → Delete Account. It asks you to confirm with your password or your Apple/Google sign-in, then everything goes — posts, ratings, messages. No email required, no waiting period.
2. *How do I report a post or block someone?* — Long-press any post or message for Report; block from the person's profile. Reports go to a human.
3. *A place's info is wrong (hours, address, closed down).* — Email us the place name and what's off — we fix data fast. Own the place? See blabberly.com/claim.
4. *When does Blabberly launch in my neighborhood?* — San Diego County first, launching soon. Drop your email in the footer and we'll tell you the day your neighborhood unlocks.
5. *I found a bug.* — Tell us what you tapped and what happened (screenshots help): support@blabberly.com. Alpha testers: the TestFlight feedback button works too.

**/guidelines — full draft (the page does not exist yet anywhere; the app's About & Support screen links it, so this text IS the deliverable):** **# Community guidelines** / *Blabberly works because every score comes from a real visit. Keep it that way.* Sections, each 2–3 plain sentences: **Post what you actually ate** (real visits, your own photos and videos; no stock shots, no other people's clips) · **Rate honestly** (your rating moves a real business's public average — score the visit you had, not the mood you're in; never rate places you haven't been) · **No pay-for-praise** (accepting anything in exchange for a rating gets the rating removed and repeat offenders banned; restaurants can never buy a score — see /why-the-scores-are-real) · **Be a neighbor** (criticize the meal, not the people; no harassment, hate, doxxing, or spam) · **Keep it legal and safe** (nothing sexual involving minors, no violence, no illegal activity; 13+ per the Terms) · **Enforcement** (warnings → removal → ban; report anything with long-press → Report; appeals: support@blabberly.com). Closing line: *"Short version: go, eat, tell the truth."*

### 4.13 `/discover` — v2 unlock (pillar)
S1 Hero: **# See it before you go.** / *A feed of real San Diego visits — every post rated, every score earned.* "Get the app" + sandwich; motion: FeedScreen pager auto-advancing (R1). S2 The feed: LOCAL/FRIENDS in one breath; gesture vocabulary as charm ("double-tap saves it — the heart is the bookmark"); FoodCard anatomy callouts (S2). S3 Explore: *"Undecided is a feature."* — ExploreScreen rails (S11/R2). S4 The map: *"The whole county, one screen."* — MapScreen zoom-out motion (R5). S5 Search: *"Ask it like you'd text a friend: 'rooftop happy hour.'"* — real results grouped Walking distance / Quick drive / Worth the trip (R10/S12). S6 Close: hard verb + sandwich + footer.

### 4.14 `/match` — v2 unlock (pillar)
S1 Hero: **# San Diego, rated to your taste.** / *% match means the score is computed against your taste — not an average of strangers.* Five tier badges fanned in true colors, magenta glow (S4). S2 How it learns: *"You tell it a little. It learns the rest."* — the taste-chip picker, then saves/watches quietly sharpening the profile; TastePickerScreen chips → a badge ticking 78%→84% (R13). S3 Where it follows you: *"The same number, everywhere you decide."* — one venue's badge on four real surfaces: Map preview card, Explore Top Spots, Search result, PlaceDetail banner. S4 The honest line: *"Hard restrictions downrank. Aversions take a back seat. Your gluten-free is not a 'preference.'"* S5 Quiz CTA: *"Meet your taste in 30 seconds."* → /taste-quiz. Close: hard verb + sandwich + footer.

### 4.15 `/route/{routeId}` — **v1 FULL TEMPLATE (G-4)** (UGC template; the growth surface ships during the authority window, not after it)
Pulled forward from v2-teaser: ~80 alpha testers are already generating shareable routes, and each shared route page puts **three rated venues + a plan in front of a non-user** — the highest-density artifact the product produces. Partiful's single biggest growth asset is its /e/* landing-page army; deferring ours to v2 wasted it during exactly the months we're trying to build authority.
- **S1.** Route name as H1 (*"Campfire → Barrel Republic"*), creator @handle + avatar, *"{N} stops · {City} · {X} saved"* in mono; dashed sunset trail map render (S7 anatomy).
- **S2.** Per-stop cards — name, blended stars + *"N ratings from people who went,"* best rated clip poster, per-stop note — each linking to its `/place/{slug}` (every shared route feeds the lattice and hands the visitor three enriched guides).
- **S3 The recruit.** v1 logged-out CTA: **"Save this night"** → waitlist capture storing `routeId` + all stop venue ids (launch email: *"The route you saved is live — steal it."*). v2 flip: **"Steal this night"** → app deep link with route payload.
- **Build mechanics:** generated at build from a public-routes snapshot (public visibility only; private routes and unknown ids render the branded teaser + capture state — never 404, the domain already receives these links). Rebuild cadence is daily pre-launch so a route shared tonight resolves as a full page within 24h (§8.2). Ships `noindex,follow` until the privacy/consent review clears creator handles for indexing — the page's pre-launch job is share-landing conversion, not SERPs; the SEO value flows through its place-page links either way.

### 4.16 `/u/{handle}` + `/p/{postId}` — v2 unlock (UGC templates)
**Profile:** avatar, handle, "Tastes in Common"-style chips, poster-frame grid, "Follow them in the app" deep link. **Post:** the clip (muted, tap-for-sound), @handle + stars + place line → its `/place/{slug}`, "Watch the rest in the app." Pre-launch: teaser + capture. `noindex` profiles by default until privacy review; index posts whose authors are public.

**The shared v1 teaser template (drafted — one component serving /u/*, /p/*, and unknown/private /route/* ids; the deep-link domain already receives all three, so every one must resolve branded, never 404):** logo + Percy at rest, then per-type headline — /u: **# Someone's rating San Diego on Blabberly.** / /p: **# This post lives on Blabberly.** / /route fallback: **# This night out lives on Blabberly.** — shared sub: *Real videos, real ratings from people who actually went — opening soon across San Diego County.* CTA stack: **"Find your % match"** (→ /taste-quiz) + the footer-style email field (*"Be first in when it opens."*, sourcePath stored). `noindex`. No fabricated content, no fake blurred UI — the teaser admits it's a door.

### 4.17 `/business` + `/claim` — v2 unlock
/business S1: **# Own a restaurant in San Diego?** / *Your customers are already posting. Claim your page, see your numbers, reach people whose taste matches your menu.* S2: stats grid as proof (Views / Visitors / Saves / Directions — real For Business screen UI, asset S15, captured post-alpha when the flag flips). S3: live menus + Must Try. S4: boosts, honestly framed: *"Boosts move visibility, never scores. Ratings can't be bought — that's the point of the whole app."* CTA: **"Claim your restaurant"** → /claim (verification → existing blabberly.com dashboard). v1 placeholders: one screen each + email field (the app already links `/claim` and `/business#pricing` — they must resolve branded). **Drafted v1 placeholder copy:**
- **/business v1:** **# Own a restaurant in San Diego?** / *Blabberly opens with the app — live menus, a claimed page, and reach to people whose taste matches your menu. Leave your email and you're first in line when partner tools unlock.* Email field (sourcePath stored), `noindex` until the full page publishes. `#pricing` anchor resolves to this same screen.
- **/claim v1:** **# Claim {your restaurant} on Blabberly.** / *Claiming unlocks your page — hours, menu, Must Try dishes — when we launch. Tell us the restaurant and how to reach you; we'll verify and set you up first.* Two fields (restaurant name, email) posting to the same Cloud Function with `sourcePath: "/claim"`. `noindex`.

### 4.18 `/taste-report` — v2 unlock (v1 seed under /guides) **+ the external-validation lane (G-6)**
Quarterly: **# The San Diego Taste Report — {Quarter} {Year}** / *What this county actually rated highest — by neighborhood, by dish, by night.* Sections: headline stat → neighborhood splits (North County vs city) → "dishes people drive for" (distance-vs-rating) → methodology box (links /why-the-scores-are-real) → press-ready downloadable charts, credited. Visual: **data viz in the sunset palette, generated at build** (no capture asset needed) + real post poster frames as evidence. Every chart embeds the citation line — this page exists to be linked.

**The v1 seed ships WITH a press pitch, not just a page (G-6).** Partiful's proof stack opens with the NYT; ours currently opens with our own numbers and specified no path to anyone else's words until the v2 /press page. Fix: the week the *"First Look: what 80 San Diego testers rated highest"* seed publishes under /guides, it goes out as an exclusive-offer data pitch to local press — **Eater San Diego, Voice of San Diego, San Diego Magazine, the Union-Tribune food desk, and the local-TV food segments (KUSI / FOX5 / CBS8 mornings)**. The angle is theirs for the taking: *"what San Diego actually rated highest, from an app where you can't rate a place without having gone"* — a local data story no one else can source, with a methodology hook (the required rating) that IS our positioning. Pitch kit contents: 3 press-ready charts (build-generated, credited "Blabberly Taste Report"), 2 founder quotes, the P3 founders photo, the methodology link, and an offer of neighborhood-level cuts on request. **Reclassified from goal to launch blocker (G-11), exactly as G-5 did for assets:** one third-party quote in the §1 trust sandwich (and one proof-wall slot, §4.1 S5) before launch is row **Q1 in §9.0** — the seed publishes and the pitch sends in the **week of 2026-06-15 (owner: Jake)**, ahead of the homepage build, because press lead time is calendar time and calendar time is the asset. And because a pitch can be committed but an editor can't: **the substitution rule** — if no quote clears by ship day, the sandwich lead slot renders the live total-ratings counter from real data (B9 `ratings`, the `pressQuote ?? ratings` rule in §1), so the slot that answers "world's #1" ships full either way. The pitch lane keeps running post-ship; the first quote to land hot-swaps in.

### 4.19 `/press` — v2 unlock
One page: boilerplate paragraph (the §1 positioning statement verbatim), founder bios + the P3 photo, logo/screenshot kit zip (from B1 + S-row), latest Taste Report stats, contact. No CTA theatrics — journalists want the zip.

---

## 5. VISUAL DIRECTION

**The one-line direction:** *Warm, light, appetizing, disciplined.* The SaaS web converged on dark-mode-and-glow (the Linear monoculture); the food incumbents are utility-gray. A sunset-warm, light-background site with Linear's typographic discipline differentiates on both flanks. We are the first food site that looks like golden hour and reads like a friend.

### 5.1 Governing principle: the site inherits the app's design system
The app has a codified token file — `src/theme/colors.js` — with a gradient-first language, a five-step positional sunset palette, and a match-tier ramp. **The website does not get a new palette. It imports this one.** Every hex below is the app's shipping value. By the time a visitor opens the app, the site has taught them the color language: orange = brand/CTA, magenta = "Made For You," amber/gold = stars, the sunset wash = sections of a page. Zero brand-translation drift; app screenshots never clash with the page.

### 5.2 Typography — three roles, all free/self-hostable (R-6)
- **Display — Bricolage Grotesque** (Google Fonts, variable). Headlines, section titles, manifesto banner, guide titles, big numbers. Warm, characterful grotesque — "confident consumer brand," not "B2B dashboard"; optical-size axis (tight and punchy at 64–96px, calmer at 28px); nobody in the competitive set uses it. Weights 600–800; letter-spacing −0.02em at hero sizes, never below −0.03em; sentence case always (V9). Fallback: `"Bricolage Grotesque", "General Sans", -apple-system, "Helvetica Neue", sans-serif`.
- **Body & UI — native system stack.** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Why: (1) the app renders in SF Pro, so site body copy is continuous with the app screens floating inside it; (2) zero font-loading cost across 1,626 place pages; (3) quietly reads "software you'll install," not "brochure." 400 body / 600 emphasis; 16–18px; line-height 1.6 prose, 1.3 UI labels; 65–72ch max measure.
- **Data accent — Spline Sans Mono** (Google Fonts). The receipts: freshness stamps, proof-strip numbers, rating counts, the building-in-public strip, @handle + recency stamps. A mono face makes numbers look *recorded* rather than *claimed* — the typographic voice of "every number survives an audit." Tabular numerals always. Fallback: `"Spline Sans Mono", ui-monospace, "SF Mono", Menlo, monospace`.
- **Type scale (fluid):** `display-xl` clamp(44px, 8vw, 92px)/1.02 (homepage hero only) · `display-lg` clamp(34px, 5vw, 60px)/1.08 (page heroes, manifesto) · `display-md` clamp(26px, 3.5vw, 40px)/1.15 (section heads) · `title` 22–24px/1.25 (card titles, place names) · `body-lg` 18px/1.6 (leads, About copy) · `body` 16px/1.6 · `caption` 13–14px/1.4 (stamps, credits — mono where it's data).
- **Paid upgrade path (post-launch, optional):** a display face in the Beatrice/TWK Lausanne class. The system is face-agnostic — only the display role swaps.

### 5.3 Color system
**Doctrine: the sunset gradient is the brand and ships at full saturation** (committing to the loud version reads as confidence), then **rationed** with Linear's discipline so it never wallpapers into invisibility.

```css
/* Brand anchor (verbatim from src/theme/colors.js) */
--brand: #FF6B35;  --brand-dark: #E85A24;  --brand-soft: #FFF5EF;

/* THE gradient — CTAs, brand moments. 135deg diagonal, always. */
--g-brand:  linear-gradient(135deg, #FF6B35, #FF8F5E);
--g-sunset: linear-gradient(135deg, #FF6B35, #EC4899, #F43F5E); /* hero-grade */

/* Sunset steps — POSITIONAL section accents (the app's 5-step circuit:
   each step starts where the previous ended; a page scrolls like one
   continuous sunset). Sections pull color by INDEX, not by content. */
--sunset-0: linear-gradient(135deg, #FF6B35, #EC4899);
--sunset-1: linear-gradient(135deg, #EC4899, #F43F5E);
--sunset-2: linear-gradient(135deg, #F43F5E, #FB7185);
--sunset-3: linear-gradient(135deg, #FB7185, #F59E0B);
--sunset-4: linear-gradient(135deg, #F59E0B, #FF6B35);
/* Soft ambient variants: same hues at 8% alpha — the glow fields (5.6) */

/* Match tiers — already meaningful in-app; the site teaches them */
--match-soulmate: #EC4899; /* Made For You ≥90 */
--match-strong:   #FF6B35; /* Strong Match 80–89 */
--match-good:     #F59E0B; /* Good Match 70–79 */
--match-fair:     #10B981; /* Fair Match 50–69 */
--match-worth:    #9CA3AF; /* Worth a Try <50 */

--star-gold: #f5c518;  --success: #22C55E;  --danger: #EF4444;

/* Web-only supporting neutrals (the ONE addition the site makes) */
--paper: #FFFCF9;  --paper-warm: #FFF8F1;  --paper-deep: #FFF1E6;
--ink: #1A1A1A;  --ink-muted: #5C5650;  --ink-dim: #948C84;  --line: #F0E7DE;
```

**Dark exists only inside video.** Feed clips carry their own dark UI — bright warm page, vivid dark video windows, like windows into the app at night. No site dark mode at v1.

**Rationing rules:** (1) one gradient CTA per viewport — the hard CTA is the only `--g-brand` button on screen; soft CTAs are ink links or ghost buttons. (2) % match badges always wear their tier color exactly as in-app — the consistency IS the demo. (3) Section accents follow the positional sunset-step system — homepage beats pull `--sunset-0..4` by index; the page literally scrolls through a sunset. (4) Full-bleed gradient only for brand moments (hero sky, manifesto banner, closing ask); never behind body text longer than two lines. (5) Stars are `--star-gold`, period. (6) Soft 8%-alpha tints carry the glow fields — color as light, not as fill.

### 5.4 Spacing & layout
Base unit 4px; scale `4/8/12/16/24/32/48/64/96/128`. Section rhythm 96–128px between homepage beats (each beat is a scene), 48–64px inside. 12-col grid, max 1140px (prose 72ch). Place pages: 2-col split ≥1024px, content left + sticky capture card right. Radius family: `--r-card: 20px` (media, app frames), `--r-ui: 12px` (inputs), `--r-pill: 999px` (CTAs, chips, match badges — pills are the app's signature shape). Elevation: warm shadows only — `0 4px 24px rgba(255,107,53,.10)` floats, `0 12px 48px rgba(236,72,153,.12)` hero frames; never gray/black. Chips and stamps everywhere (the app's pill grammar, taught pre-install). **Mobile-first, seriously:** traffic is TikTok/IG in-app browsers and phone Google; hero, quiz, and place pages designed at 390px first; sticky bottom CTA bar on mobile place pages.

### 5.5 Motion principles
**Doctrine: video is the motion budget.** Everything that isn't food video stays nearly still so the food is the only thing alive on the page.

What animates: (1) **feed clips** — muted, looped, lazy, poster-first, `playsinline`, autoplay only in viewport via IntersectionObserver, pause off-screen (the same viewability rule the app shipped in commit `355537b`); (2) **Percy's vocabulary (§5.6-D)** — the % match count-up: 0→N once on first reveal, ≈700ms ease-out, the sunset dial's ring filling in sync with the count (G-10), never replays; in the hero widget and quiz only, the badge may *re-tick* upward when new chips are tapped (small bounce per recompute — a reaction, never a replay) and pulse 200ms when a tier threshold flips its label/color/ring state; (3) **scroll reveals** — opacity 0→1 + translateY 12px, 350ms, staggered ≤3 children, once per element — that's the entire reveal vocabulary; (4) **CTA hover** — gradient toward `--brand-dark` + 1px lift, 150ms; pills scale ≤1.02; (5) **the poll→plan→route vignette** — one scripted sequence (votes filling → "Lock it in" → route line drawing), the only choreographed moment on the site.

Restraint: **no** parallax, scroll-jacking, cursor effects, marquees, 3D, or animated gradient backgrounds — the gradient is the sky, not a screensaver. `prefers-reduced-motion`: reveals render settled, videos hold posters with tap-to-play, Percy renders his final number without counting. Performance is a motion principle: LCP is the hero poster frame (≤2.5s on 4G); place pages carry exactly one ~2KB island (the G-3 match-reveal) and nothing else. Muted always; no audio without a tap.

### 5.6 Presenting the app — three treatments, by job
Never stock photography, never mocked-up UI, never fake data: every screen is the shipping build, every % match a real computed value, every clip a real post.

- **A. The Glow Frame (primary).** App screens float in 8%-alpha sunset ambient fields, one hue per named mechanic, mapped to colors the app already assigns: **% Match glows magenta**, **the required rating glows amber→gold**, **Routes glows the full sunset sweep**, **Dual Bite glows coral**. Frames are minimal bezel-less rounded rectangles (`--r-card`, 1–2° tilt) — no iPhone hardware chrome. Inside hero/feature frames the screen is a **live window**: a muted feed clip playing. Opal glows because their product has nothing to show; we glow around moving birria.
- **B. The Golden-Hour Composite** (place pages, /nights-out, /about). Real San Diego photography — taco windows, patios, marine-layer sunsets — with real UI floating in-scene: a playing post card, a % match badge pinned to a storefront, a dashed sunset route line across a neighborhood shot. Photographer/creator credited in mono caption. San Diego golden hour IS the palette — the photography and the gradient are the same colors.
- **C. The Naked Clip** (place pages, guides, proof wall). No frame: the post's poster frame with a play affordance, @handle + ★ rating + recency stamp in mono beneath. The video is *evidence*, not product shot — pre-launch, the teaser layer above the waitlist gate.
- **D. Percy, the % match dial — the brand device (G-7; identity upgraded G-10; the answer to "what's your owl?").** Token inheritance gives the site consistency; it does not give it a *character* — and the second judging was right that "the personality is the number" plus four motion timings produced a device nobody could draw from memory a week later. Percy keeps the doctrine and gains a **body**: the magenta match pill wearing the **sunset dial** — a thin gradient ring (the `--g-sunset` sweep) that fills clockwise to exactly the displayed percentage, starting from a single notch at 12 o'clock. The silhouette — *a pill inside a partly-filled ring* — is the drawable mark: two shapes a visitor can reproduce with a pen, and an unclaimed object in the category (Yelp owns stars, Beli owns a list, Michelin owns a flower, Duo owns a face; nobody owns *the dial that fills to **your** number*). On-page he is still simply the badge — no eyes, no mascot kitsch; **the number is the personality, the ring is the body language.** Named **Percy** (from *percent*) in internal docs, components, and alt text.
  **Five tier states (G-10 — visual identity, not just motion timing; each is a drawn, named, static-capable mark reused in OG images, email headers, the 404, and print):**
  - **Full Bloom** — Made For You ≥90: ring nearly closes, magenta, a soft 8%-alpha halo breathing around it. The state every launch email leads with.
  - **Leaning In** — Strong Match 80–89: ring past three-quarters, orange, no halo — eager but not glowing.
  - **Warm** — Good Match 70–79: amber, ring past half.
  - **Level** — Fair Match 50–69: emerald, ring at half, perfectly even stroke — the polite state.
  - **Tipped** — Worth a Try <50 and all humor/empty states: gray ring barely begun, the pill rotated −8° (the one expressive liberty Percy ever takes) — the 404's deflate beside the tipped taco, the empty-filter state on /my-matches.
  Motion vocabulary (implemented once, reused everywhere; each motion now moves the ring too):
  - **The reveal** — 0→N count-up, ≈700ms ease-out, ring filling in sync, once per element (the §5.5 rule).
  - **The tick** — in interactive contexts (hero widget, quiz steps) the number recomputes upward in small bounces as chips are tapped (+3, +2, settle) — Percy *reacts to the visitor's taste*.
  - **The flare** — crossing a tier threshold flips label, color, AND ring state with one 200ms glow pulse ("Good Match" amber → "Strong Match" orange) — the five states taught as events, not a legend.
  - **The idle** — a 6s ambient glow breath (±4% alpha). Nothing translates, nothing loops visibly.
  - **The deflate** — the Tipped state, the one context where Percy is a joke.
  Recurrence map (a device recurs or it isn't one): hero widget · every quiz step + payoff · **every /my-matches row (G-8) — the dial at list scale is where the mark gets burned in: a visitor scrolls past 200 dials wearing 200 of their own real numbers, brand exposure no hero section can buy** · every place page's match module (G-3) · guide closers ("Your 25 won't be this 25") · the homepage close composite · the 404 (Tipped) · **the favicon + touch icon set (B4): the dial at rest — ring + pill, no number** · **launch + waitlist emails: the header renders the recipient's REAL stored `computedMatch` in its true tier state (§8.3 stores it at signup precisely so Percy never has to fake a number in an inbox — "Campfire is live" arrives wearing the recipient's own 91% in Full Bloom)** · **every build-generated OG image** (B5 carries the dial at rest — magenta pill reading *"your % match"*, empty ring, no number, because an anonymous share preview has no visitor to compute for and Percy never wears a fake one — beside the venue's real ★ score; Percy rides every shared link into iMessage). Offered upstream to the app as an ecosystem mark — alternate app icon + notification glyph (coordinate post-launch; the site proves the mark first). The discipline that keeps it a device and not a decoration is unchanged and absolute: **Percy always displays a real computed value in its true tier color — never a fake decorative number. At-rest renders (favicon, OG, pre-quiz) wear the empty ring and the words "your % match," never an invented digit.** The brand device and the trust doctrine are the same object. Duo converts because his expectant presence is personality with stakes; Percy converts because his number is *yours* — and now he has a body you can draw.

- **E. The trail — the second signature (G-10).** Belt and suspenders on memorability: the app's dashed sunset route line is promoted from feature illustration to a codified recurring mark. One SVG component (`<SunsetTrail>`: dashed `--g-sunset` gradient stroke, round caps, numbered sunset-colored stop dots) renders as — the homepage hero's section divider into Beat 2 · the hover underline on nav and inline architecture links · the connector drawing through the poll→plan→route vignette (§5.5's one choreographed moment) · the border accent on route OG images (B5) · the 404's short path-to-nowhere under the tipped taco · the rule line on press/print materials. Where Percy is *the score made personal*, the trail is *the night made visible* — the two marks map one-to-one onto the two halves of the positioning, and neither is a palette or a medium: both are drawable objects a visitor can carry out of the site in their head.

Production: poster frames generated at build; clips ≤15s, H.264 + WebM, ≤2MB, lazy; **one live window per viewport maximum** (the same thermal respect the app ships with); frame content refreshed by real posting activity, not a quarterly asset shoot. Illustration: only the two in-code SVGs (R-5).

### 5.7 How this system beats Tier B at their own game (the argument, compressed)
Opal's glow panels — beaten with motion (live windows of real food vs static screenshots; their funnel is crawler-opaque off-domain JS, ours is server-rendered on-domain). Linear's typographic restraint — beaten by changing the lighting (identical discipline, warm light, Bricolage not Inter; same bar, different planet). Cash App's full-saturation courage — beaten with meaning (their green is arbitrary; our sunset steps, tiers, and route colors are semantic — the color teaches the product's grammar). Partiful's typographic fashion + verbatim proof — beaten with faces and stars, now actually built, not claimed: the §4.1 proof wall renders quote + @handle + neighborhood + ★ + the poster frame of the real post (their proof is text on a page; ours has a face, a plate, and a ★ on camera, against a 3x/week decision not a 3x/year party). Strava's community-first hero — beaten by actually showing the community (our hero IS the feed) plus the launch heat every post-scale site leaves unpulled. Duolingo's brand-system-equals-product-system — answered on three layers, because consistency alone is not an owl and (per the rematch) neither is a palette plus a medium: token inheritance for coherence (the site imports `src/theme/colors.js` verbatim; even the app's microcopy is quoted as proof), **Percy the sunset dial (§5.6-D) for memorability** — a named, drawable, recurring device with five tier states, riding OG images, emails, the favicon, and every /my-matches row, whose number is the visitor's own (the one thing Duo can never be) — and **the trail (§5.6-E)** as the second signature, so the brand survives even in contexts where no real number can render. Phantom's jargon-then-translation — beaten by having only one term to teach (% match, whose translation IS the positioning). **The compounding point:** each Tier B site executes its signature pattern around a product that is invisible, abstract, or episodic; we execute all seven at once around the one asset none of them and no food incumbent possesses — short video of real food, star-rated by someone who actually went, in the visitor's own county.

---

## 6. COPY VOICE GUIDE

**The register:** a San Diego friend who always knows the spot — warm, quick, concrete, a little playful, zero edge. Desire-first, proof-backed, belonging-closed. Every line passes **the hungry-friend-at-7pm test**: would you say this sentence, out loud, to a hungry friend at 7pm? If it needs decoding, it dies.

**The vocabulary law:** the app's words are the site's words — the BLABBERLY MASTER glossary is canon; the site never invents a marketing synonym for something the product already names. The tagline is **"See what's happening."** — verbatim, with the period.

#### The fifteen rules
- **V1. Pass the 7pm test — appetite, not abstraction.** ✅ "Where are we going tonight?" ❌ "Reimagining how communities experience local dining."
- **V2. Use the product's real names; translate on first use.** ✅ "Your % match — the score computed against *your* taste, not an average of strangers — follows every spot across the map, search, and its page." ❌ "Our proprietary AI-powered recommendation engine." (% match's translation IS the differentiator. Dual Bite, Self Made, Routes, "I'm Going" plans, taste twins each get a one-line plain shadow on first mention.)
- **V3. Trust is a mechanism, never an adjective.** ✅ "A star rating is required on every post. You can't talk about a place here without having been." ❌ "Authentic, trustworthy reviews." (The app's own hint text is the model — quote it on the proof page: "Half-stars supported · Moves {place}'s public average." The UI copy is the receipt.)
- **V4. Concrete numbers over adjectives — every number survives an audit.** ✅ "4,000 venues mapped. 1,626 place guides written. A rating on every single post." ❌ "Thousands of amazing spots and a thriving community." (Pre-launch scale is small — say it plainly, in the right room: "~80 San Diego locals are already scoring spots" belongs in the building-in-public strip and founding-500 closes, where small-and-real is momentum; per G-1 it never renders inside a cold-traffic trust sandwich, where small-next-to-an-ask reads as a warning label. A ratings product cannot oversell; it also shouldn't undersell at the decision moment.)
- **V5. Features are social situations, never capability names.** ✅ "It's 7pm. Six people. Nobody can pick. Drop a 'Where should we eat?' poll, watch the votes fill, lock it in — it's a plan." ❌ "Group polling functionality with real-time vote aggregation."
- **V6. "Reviews" is the incumbent's word; ours is "ratings" (and "posts").** It appears only as the thing being buried: "Reviews from people who never went are dead." Blabberly has posts, ratings, and scores.
- **V7. People, not "users." Posts and videos, not "content." Locals, not "community members."** ✅ "Kaden in Oceanside rated it ★★★★½ — watch his post."
- **V8. Name the places. San Diego specificity is the proof of residence.** ✅ "From Carlsbad to Chula Vista — birria in National City, oat flat whites in North Park, the patio in Encinitas you always forget the name of." Neighborhoods, not "areas"; venue names, not "options."
- **V9. Sentence case, short lines, second person, present tense.** ✅ "Tag the place. Rate it. Share. That's the whole rule." Headlines are sentences a person would say. Exception: tiny mono stamps may use the app's label caps ("HAPPENING NOW").
- **V10. Punch at broken ratings, never at restaurants, never at people.** ✅ "They're right that ratings from 1,000 randoms are broken. So we didn't kill the rating — we made it earn itself." ❌ "Skip the tourist traps." Every venue is a potential partner and a neighbor's livelihood.
- **V11. Identity-granting, Strava-style.** ✅ "If you've ever driven 25 minutes for the right burrito, you're one of us."
- **V12. One verb per page.** Pre-launch the page verb is **"Find your % match"** — the tool ask, identical words everywhere (G-1). **"Join the waitlist"** is the capture ask and appears only beneath the /my-matches ranking at the quiz payoff, at page closes, and in the footer — always those exact words. The **pre-order badge (G-12)** is Apple's artwork, not our verb — it renders only beside payoffs (/download hero, the quiz payoff, the /my-matches close) and never replaces the funnel verb in copy; its one line of supporting microcopy is always *"it installs itself on launch day."* At launch everything collapses into **"Get the app."** Soft CTAs are sensory invitations. Never "Sign up" here, "Get early access" there, "Learn more" everywhere.
- **V13. Freshness claims come from real activity, or not at all.** ✅ "3 new rated posts this week" · "Updated Jun 2026 — 47 venues added." ❌ Fake countdowns, "Only 3 spots left!", evergreen "Updated today." Honest scarcity only: launch window, neighborhood rollout, founding-tester numbers.
- **V14. Write ratings the way the app renders them.** ✅ "★★★★½ from 32 people who went" — half-stars exist, glyphs gold, counts attached. ❌ "Rated 4.5/5.0 stars (32 reviews)."
- **V15. Close warm, never legal.** The last line of any page is appetite or belonging: "Your city's already rating tonight's spot. See what's happening."

#### The banned list (never appear anywhere, any page, any meta tag)
**the h-word** ("hyper" + "local" fused into one marketing word — absolute, CEO-locked, never spelled out even in internal docs; say "local," "San Diego County," "your neighborhood," or name the place) · **"foodie"** (the audience is people who eat; it gatekeeps) · **"curated" / "handpicked"** (our scores are earned by required ratings, not picked by editors — this word surrenders the differentiator) · **"authentic"** (cuisine-adjacent landmine + empty trust adjective; V3 makes it unnecessary) · **"hidden gem(s)" / "best-kept secret"** (name the place instead) · **"elevate(d)"** (menu-PDF language) · **"culinary" / "eatery" / "gastronomy"** (nobody hungry at 7pm says these) · **"mouthwatering" / "delectable" / "yummy"** (the video makes mouths water; the copy doesn't beg) · **"users" / "content" / "engagement"** in user-facing copy · **"revolutionary / disrupting / game-changing"** · **"Yelp killer"** or naming competitors in copy at all (comparisons live only on the proof page framed as questions people actually search).

Use with care: **"vibe"** allowed only as the product noun (Vibe tags, "RATE THE VIBE") — "good vibes only" is banned by vibes of its own. **"influencer"** only adversarially ("no influencers, no drive-bys — people who went").

---

## 7. SEO / CONTENT ENGINE

### 7.1 Data ground truth (from MASTER §07 + §15 — do not re-derive)
- Source collection: **`restaurants/{id}`** in the `blabbery-3010a` default database (NOT `places` — the enrichment scripts write to `restaurants`).
- Per-place fields: `name`, `category`, `type`, `city`, `neighborhood`, `address`, `lat`/`lng`, `priceLevel`, `rating` (Google), `userRating`/`userRatingCount` (Bayesian community blend, recency-weighted, 180-day half-life), `tags[]`, `topDishes[]` ({name, price, category}), `hours`, `descriptionAuthored`, `aboutAI` (+ `aboutAIGeneratedAt`/`aboutAIVersion`/`aboutAISignalCount`), `searchableInventory[]` (~24 keywords/place, 95% coverage), `anticipatedQueries[]` (12–35 phrases/place; v2 coverage unverified — audit at build, §8.4), `tier`/`dataTier`, `isChain`, `isActive`, `whyPeopleCome`.
- Photos: `placePhotos/{localId}` docs with `storageUrl` (Firebase Storage, cached by `scripts/cachePhotos.js`). Use these — never hotlink Google Places photos (ToS + cost). Verify the public-web usage posture before 1,626 pages go live (§8.4); prefer real Blabberly post media wherever it exists.
- **Slug convention fixed by the app:** doc id, underscores→hyphens. The site MUST mirror it exactly.

### 7.2 URL scheme (locked — R-1, R-2)
```
blabberly.com/place/{slug}                 ← atomic unit (catalog-wide; ~1,626 indexed)
blabberly.com/places                       ← directory hub
blabberly.com/places/{neighborhood}        ← neighborhood hubs (carlsbad, north-park…)
blabberly.com/guides                       ← guides hub
blabberly.com/guides/{slug}                ← e.g. /guides/best-tacos-carlsbad, /guides/carlsbad-25
blabberly.com/guides/perfect-for/{occasion}← occasion pages
blabberly.com/taste-quiz                   ← quiz funnel
blabberly.com/my-matches                   ← personal full-catalog ranking (noindex; G-8)
blabberly.com/why-the-scores-are-real      ← proof page
blabberly.com/nights-out                   ← night-out pillar
blabberly.com/download                     ← real download page w/ waitlist fallback
```

### 7.3 Title & meta patterns (the two-track trick: human story in H1, plain category in `<title>`)
- Place: `{Name} — {Category} in {Neighborhood|City}, San Diego County | Rated by people who went · Blabberly`. With ≥5 community ratings: `{Name}, {City} — {userRating}★ from {userRatingCount} real visits | Blabberly`.
- Guide: `TOP {N} Best {Category} in {City} — Updated {Month Year} | Blabberly` (Yelp's proven SERP formula; personality lives in H2s and entry blurbs).
- Hub: `{Neighborhood} Restaurants, Bars & Cafés — {count} spots rated by locals | Blabberly`.
- Meta description (machine-stamped freshness): `As of {Month Year}: {1-sentence aboutAI excerpt}. {userRating or rating}★ · {priceLevel} · {neighborhood}. Every Blabberly score comes from someone who actually went.`

### 7.4 The lattice (internal linking)
```
Homepage
  └─ /places (hub: neighborhood grid, cuisine + occasion rails, live counts)
       └─ /places/{neighborhood} (top-rated places, guides for that area)
            ├─ /guides/{slug} (ranked list: 10–25 entries, each → place page)
            └─ /place/{slug}  (links UP via breadcrumb + "Included in",
                               SIDEWAYS to 5 Similar Places)
```
Rules: **no orphan pages** (every indexed place reachable from ≥1 hub and the Similar rail); the footer carries the hub directory scoped to ~12 neighborhoods + 8 flagship guides (never Corner's 400-link wall); guides open with the query mirrored as the first sentence ("Where should I eat in Carlsbad tonight?"); guides link down to places, places link back up — bidirectional, built **before** the pages ship (scale without hubs fragments authority — Corner's and Strava's proven failure).

### 7.5 Sitemap, robots, schema
- **sitemap.xml** = index → `sitemap-core.xml` (marketing + hubs + guides) + `sitemap-places-{n}.xml` (chunked ≤5,000 URLs; **indexed places only**), each URL with `lastmod` = max(`aboutAIGeneratedAt`, `userRatingUpdatedAt`, build date).
- **robots.txt**: allow everything, **explicitly including AI crawlers** (GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Bingbot, CCBot) — Yelp and Corner block them; we become the citable source for the queries the giants opted out of. Disallow only `/api/`.
- **Schema (JSON-LD) day one**: `Restaurant`/`BarOrPub`/`CafeOrCoffeeShop` (by `type`) with address, geo, priceRange, openingHoursSpecification; `AggregateRating` **only where `userRatingCount ≥ 1`** (never fabricate from Google's number); `FAQPage` on place + product pages; `BreadcrumbList` everywhere; `ItemList` on guides; `Organization` + `WebSite` sitewide.
- **Noindex tier**: non-enriched places ship `<meta name="robots" content="noindex,follow">` — they resolve universal links and capture waitlist intent at zero crawl budget (R-9).

### 7.6 The distilled Tier-A lessons the engine is built on
1. The place page is the engine; everything else is scaffolding (OpenTable, Resy). We run it where they structurally can't: the no-contract long tail.
2. Scale without hubs fragments authority (Corner, Strava) — hence the lattice before the pages.
3. The SERP-winning title is boring and stamped (Yelp); save personality for H2s.
4. Put the full list on-page (Beli) — and, post-gauntlet, un-gate the computed payoff too (G-3/G-8): Google reads everything, and the visitor's % match renders real and free on every surface, including their full 1,626-venue ranking. What the app keeps is the *live* model (sharpening from saves and watches, all 4,000+ venues, the video library) — a better product, not a withheld number. Never cripple content to force the download; twice judged, twice true.
5. Freshness is a feature (OpenTable's dated metas, Eater's add/drop changelogs): machine-stamp everything; graduate to rating-velocity stamps at launch.
6. Server-render or it doesn't exist (Resy's prerender rescue; Duolingo/Strava/Opal's empty-shell graveyard).
7. Editorial brands can't defend the long tail; platforms can't do voice. The open lane: programmatic pages with structured opinion + a human-reviewed top layer — exactly the v1 guide plan.

### 7.7 v2 engine unlocks (post-launch)
CTA flip (one config flag) · occasion taxonomy at scale from `anticipatedQueries` clusters · franchise expansion + live changelog strips (R-4) · the Taste Report on its own URL, quarterly · rating-velocity freshness stamps + dynamic meta counts · UGC public pages indexed (consent/privacy-gated) · per-neighborhood waitlist/member counts on hubs once non-embarrassing · full /business + /claim build.

---

## 8. TECH STACK

### 8.1 Recommendation: **Astro 5, fully static output, deployed to Firebase Hosting (`blabberly-website` project)**
- **1,650+ static pages from Firestore at build time** is Astro's native shape: a build-time loader (Node + `firebase-admin`) pulls the `restaurants` snapshot once; `getStaticPaths` fans out place/hub/guide pages. ~1,700-page build: low single-digit minutes.
- **Zero-JS by default, islands for the heavy animation**: marketing pages get cinematic islands (GSAP/ScrollTrigger); the 1,626 place pages ship one ~2KB island (the G-3 match-reveal reading `bb_taste` localStorage against the page's embedded tag vector) and nothing else — exactly the SEO/performance split needed. Lighthouse-100 place pages remain achievable and matter for rank.
- **Server-rendered HTML guaranteed** — the pass/fail gate of the whole strategy. The `/taste-quiz` shell + first question render statically; the stepper is one island.
- **Firebase Hosting first-class**: static output = `firebase deploy --only hosting` — no Cloud Run, no server runtime. Matches the existing two-project setup (`blabberly-website` = public marketing hosting; `blabbery-3010a` = app/data).
- **React allowed where useful** (Astro React integration) — the team's RN/React fluency transfers for the quiz island.

**Considered alternative — Next.js 15: rejected.** (a) Static export disables the parts of Next that justify its weight (image API, ISR, server actions), leaving a heavier client runtime for the same HTML; (b) full-featured Next on Firebase requires App Hosting/Cloud Run — a server runtime and billing surface for a site whose only dynamic endpoint is one Cloud Function; (c) hydration-by-default fights the 1,626-page budget. Revisit only if the site grows truly dynamic surfaces — the snapshot-JSON + template layer ports cleanly. Also set aside: SvelteKit static (no familiarity dividend), Eleventy (weaker animated-island story), extending the partner web app's React SPA (instantly fails the server-render gate — the Resy/Duolingo trap).

### 8.2 Build pipeline
1. `scripts/fetch-places.mjs` (website repo): `firebase-admin` + read-only service account → query `restaurants` where `isActive != false`, project ~20 fields **including the tag/dish vector the G-1 hero widget and G-3 match islands score against**, write `data/places.snapshot.json` + `data/photos.json` (from `placePhotos`). Same script also pulls public routes → `data/routes.snapshot.json` (G-4: id, name, creator handle/avatar, stop venue ids + notes, save count) and emits **`data/match-index.json` (G-8)** — the slim client payload for /my-matches: {slug, name, neighborhood, category, stars, ratingCount, tag vector, what-to-get line} × the enriched catalog, budget ≤300KB gzipped, immutable-cached, fetched once per browser. It is the single dataset the hero widget, the quiz, the G-3 place-page islands, and /my-matches all score against — one scoring module, one data file, four surfaces, zero drift. ~5k doc reads per refresh — pennies. Commit/cache the snapshots so builds are deterministic and Firestore is off the deploy critical path.
1b. **The scoring module — ported from the app, never invented (the spec, so no session re-derives it).** One file (`src/lib/match.ts` in the website repo) used by all four surfaces. It is a direct port of two app functions — copy the logic, keep the constants:
   - **`scorePlaceLocal(place, profile)`** from `src/utils/placeAdapter.js` (app repo): partition the visitor's tokens and the venue's `tags[]` into vibe-class vs food-class using the app's `VIBE_TOKENS` set (port it verbatim from the same file). Weighted blend: **cuisine overlap 40% + vibe overlap 30% + price match 20% + dietary 10%** (web quiz collects no price/dietary fine-tune, so price and dietary take their neutral defaults: 0.5 and 1). Then the **direct-hit floor curve**: count venue tags the visitor explicitly picked; floors = `[0, 0.70, 0.80, 0.88, 0.95]` for 0/1/2/3/4+ hits; `score = max(rawScore, floor)`. Then micro-variation so numbers feel specific: `+ rating/100 + min(tagCount,6)/200 + (nameLength % 7)/100`, capped 0.99.
   - **`computeDisplayedMatch`** from `src/utils/personalizedRanking.js` (app repo): the displayed number = `signal × personalMatch + (1 − signal) × communityScore`. On the web there is no learned vector, so `personalMatch = scorePlaceLocal().score` and `signal = min(1, (picksCount/8) × 0.5)` (caps at 0.5 — exactly the app's brand-new-user state, which is why the web number is honest, §4.8). `communityScore = (userRating ?? rating ?? 4)/5`. Places with no tags force signal to 0 (pure community score — never render Percy on them in interactive surfaces; pick hero/quiz venues with ≥6 tags).
   - Tier mapping is §4 canon (≥90 / 80–89 / 70–79 / 50–69 / <50). Render as a whole percentage.
   - **The `bb_taste` localStorage contract** (shared by hero widget, quiz, place islands, /my-matches, nav state): `{ v: 1, tokens: string[], picksCount: number, createdAt: ISO, updatedAt: ISO }`. The share param `?t=` carries the comma-joined tokens, nothing else. `computedMatch` is never stored in `bb_taste` — always recomputed live (real numbers, never stale ones); it is sent once, with the waitlist payload, at signup.
   - **Vocabulary ground truth:** `TASTE_CATEGORIES` in `src/data/onboardingChoices.js` (app repo) — food 29 · drinks 11 · vibe 13 · dietary 6 · sourcing 5 · cooking 12 tokens (76 total; the MASTER's "62 chips" figure is stale — trust the file). The web quiz uses the **food + drinks + vibe subset (53 chips)** in the app's `CATEGORY_ORDER`; dietary/sourcing/cooking are app-only surfaces. Copy the token/label pairs from the file at build — never retype them.
2. `astro build` → `dist/` (pages + sitemaps + robots + per-place OG images). Build fails loudly on slug collision after underscore→hyphen mapping (two doc ids must never produce one URL).
3. **OG images at build** (satori or sharp + the B5 SVG template): place name, star score, "Rated by people who went," sunset gradient — one per indexed place + one default for marketing pages. Makes every shared link branded in iMessage/WhatsApp, feeding the UGC-share loop.
4. CI: GitHub Actions — deploy on push to main + **daily scheduled rebuild** (G-4: a tester route shared tonight must resolve as a full page within 24h; also refreshes freshness stamps + new enrichments — builds run low single-digit minutes, so daily costs nothing).

### 8.3 Waitlist backend + analytics
**Waitlist:** HTTPS Cloud Function `waitlistSignup` in the **existing `functions/` codebase in `blabbery-3010a`** (waitlist records must be usable by the app/CRM at launch, so they live in the app project, not the hosting shell).
- `POST https://us-central1-blabbery-3010a.cloudfunctions.net/waitlistSignup`; CORS allowlist `https://blabberly.com`, `https://www.blabberly.com`.
- Payload: `{ email, sourcePath, placeId?, guideSlug?, neighborhood?, utm?, tasteTokens?[], routeId?, computedMatch?, android? }` — `placeId` + `tasteTokens` are the stored-intent fields powering launch-day "Campfire is live — your % match is ready" re-engagement and the quiz funnel; `routeId` powers the G-4 "the route you saved is live" email; `computedMatch` (the G-3 number shown at signup) lets the launch email quote the visitor's own match back to them.
- Writes `waitlist/{autoId}`; lowercased-email dedupe via transaction on `waitlistEmails/{sha256(email)}` guard docs; server timestamp; validation + honeypot + per-IP rate limit (alpha-scale simple).
- Firestore rules: `waitlist` is **no client read/write** (admin SDK only; the static site never touches Firestore directly).
- **Post-submit state (every capture field, sitewide):** the field swaps in place for *"You're in. We'll email you the day {neighborhood/venue name, else "San Diego"} unlocks."* in mono — no redirect, no modal, no confirmation email at v1 (the launch email is the first email they get). Duplicate email returns the same success state (the dedupe is silent). Error state: *"That didn't go through — try again?"* with the field intact.

**Analytics:** GA4 via gtag, `defer`. Free, native UTM attribution (every hard CTA carries `?src={pageType}_{slug}` — R-7), conversion events, Search Console linkage (load-bearing for an SEO-led site). Day-one events: `waitlist_submit` (with sourcePath/placeId), `hero_chip_tap` + `hero_widget_threshold` (the G-1 widget's engagement + tier-flip moments), `quiz_start`, `quiz_complete`, `match_reveal` (G-3 un-gated render on place pages — the metric that proves or kills the un-gating bet), `my_matches_view` + `my_matches_share` (G-8 — depth of the full-ranking payoff and whether the person-to-person share loop actually spins), `appstore_preorder` (G-12 — the zero-friction conversion the whole /download bet rides on; measured against `waitlist_submit` it answers which ask wins at high intent), `route_save` (G-4), `video_play`, `outbound_appstore`. Add Search Console + Bing Webmaster verification at deploy. (Plausible considered — costs money, weaker attribution, no Search Console tie-in.)

### 8.4 Pre-build verification checklist (30 minutes, do FIRST)
1. **Hosting topology** — confirm which Firebase Hosting site serves `blabberly.com` and where the partner web app's routes live (`/claim`, `/business`, `/api/logEvent`, `/terms`, `/privacy`, dashboard). Hosting serves exact-file matches before rewrites, so the likely end-state: static marketing+place files on the `blabberly.com` site with the SPA rewrite scoped to partner-app paths; if the partner app deploys from a different repo, coordinate one shared `firebase.json` or split the dashboard to a subdomain. **The only genuinely risky integration point in the build.**
2. **AASA** — `/.well-known/apple-app-site-association` must keep serving after the hosting change (universal links). Test post-deploy.
3. **`anticipatedQueries` coverage audit** — run a one-off count (`restaurants` where `facetsAIVersion == 2`); determines how many place pages get the FAQ block at v1.
4. **Service account** — mint read-only (Datastore Viewer) in `blabbery-3010a` for the build fetcher; store as a GitHub Actions secret.
5. **Photo rights spot-check** — `placePhotos` storageUrls originate from Google Places photos; verify the public-web posture before 1,626 pages go live; prefer real Blabberly post media wherever it exists.
6. **App Store pre-order eligibility (G-12)** — pre-order requires an App-Review-approved build attached to the App Store Connect entry (the entry exists, A.1), so it sequences behind the A.9 production build + first review pass; the toggle supports release dates up to 180 days out. Until Apple clears it, /download's badge slot renders the waitlist state (the flip is content, not layout). Owner: Jake — confirm the toggle the same week A.9 ships.

### 8.5 Animation implementation (so "cinematic" doesn't fight "fast")
GSAP + ScrollTrigger in islands for the homepage six-beat arc (scroll-pinned glow panels, the SVG route-line draw-on, proof-strip counter roll-ups). CSS-only for everything repeatable (gradient glows, hovers). Video discipline: every clip `muted loop playsinline preload="none"` + poster, IntersectionObserver play/pause, ≤2MB (720×1280 H.264 + WebM/AV1), lazy below the fold; the hero clip is the ONE eagerly-loaded video. `prefers-reduced-motion` honored globally.

### 8.6 Build order for the next session
1. **The shell:** design system (tokens from §5, type scale, glow panel, card anatomy, trust sandwich, capture field) **+ the Percy component with its full §5.6-D motion vocabulary** (it's load-bearing in steps 2–4), nav + footer, Astro scaffolding on `blabberly-website`. Run the §8.4 checklist. AASA coexistence + hyphen↔underscore slug parity verified.
2. **The engine:** `/place/{slug}` template + quality gate + the lattice (/places hub, first 10–12 neighborhood hubs) + **`/route/{routeId}` template with the routes snapshot (G-4)** + schema + sitemaps. Ship and submit for indexing immediately — calendar time is the asset.
3. **The converter — before the story, because the hero depends on it (G-1):** /taste-quiz island with taste-profile-attached waitlist records (Cloud Function live), the `bb_taste` localStorage contract, the hero mini-widget, the place-page match-reveal island (G-3), and **/my-matches + `data/match-index.json` (G-8 — the payoff surface the whole funnel now terminates in)**. One scoring module shared by all four surfaces.
4. **The story:** homepage (quiz-led hero + proof wall — gated on the §9.0 FALLBACK rows passing (G-9), never on the scheduled shoots), /why-the-scores-are-real, /nights-out, /about, /download (embedded-quiz + pre-order state, G-12), 404, utility pages.
5. **The compounders:** 12–20 guides incl. "The Carlsbad 25" + 3–4 occasion pages; **the Taste Report "First Look" seed + the G-6 press pitch kit — seed publishes and pitch sends week of 2026-06-15 (owner: Jake; per G-11 this is launch-blocker row Q1 in §9.0, not a someday)**; building-in-public strip wiring; UTM scheme + GA4 + Search Console.
6. **Launch-day flip (pre-built, dormant):** the §2 checklist.

---

## 9. ASSET SHOPPING LIST

**Global capture rules:** real iPhone (not simulator) for anything with camera/map/video performance; iOS screen recording max resolution, 60fps; light mode; a fully-dressed test account (rich taste profile heavy on Tacos/Rooftops/Margaritas so match tiers render high, ≥5 follows, seeded DMs); clean content (no profanity, no tester PII without written OK — get consent from any tester whose handle/face/post appears; we WANT names: "Kaden, Oceanside" style, with permission). For stills without camera needs, iOS Simulator + `xcrun simctl status_bar override --time 9:41 --batteryLevel 100`. Export raw; compression happens in the build pipeline.

### 9.0 v1 LAUNCH BLOCKERS (G-5, amended G-9/G-11) — not shopping-list items; the site does not ship with any of these SLOTS empty
The entire APPETITE beat — the claimed differentiator over all fourteen competitors — runs on R1, A1, and the P-series; the trust sandwich's lead slot runs on Q1. The original list filed the assets alongside nice-to-haves; the first judging reclassified them with quality bars and dates. **The rematch then failed the dates themselves:** R1 on 06-13 and the founders shoot on 06-16 are both *after* "tomorrow" — a blueprint whose first three seconds are unshot loses the hero to a site whose hero exists, however good the calendar looks.

**The launch-tomorrow rule (G-9), permanent:** every launch-blocking slot must be fillable from assets that exist **today**, reviewed against the slot's quality bar **today**. Scheduled shoots *upgrade* a slot; they never *gate* the ship. Concretely: the alpha-corpus pull and the A3 consent-DM session move to today — they are a review session and a DM thread, not shoots; nothing about them needs a calendar — and the hero gets a named fallback cut from that corpus, reviewed now. If the site ships before 06-13/06-16, it ships on the fallbacks and hot-swaps the upgrades behind the same bar. The original discipline survives intact: a weaker asset still never *quietly* slides into the hero — the fallback passes the same bar at review, or the beat is consciously re-scoped before ship, decided in daylight rather than discovered at launch.

| Slot | Asset | Quality bar (pass/fail at review) | Committed date |
|---|---|---|---|
| HERO (fallback) | **R1-F** hero feed scroll cut from the 3–4 strongest EXISTING alpha posts (the corpus is live in Firebase Storage today; screen-record the real feed surfacing them) | Same bar as R1: food identifiable AND appetizing within 1s of each card landing at 390px; overlay legible; steady cadence, no dead frames. **If today's corpus cannot pass, the hero re-scopes before ship** (A2-still + chip-grid-led layout — the quiz widget carries beat 1 alone, which G-1 already makes viable) | **Cut + reviewed Wed 2026-06-11 — today** |
| CORPUS + QUOTES | **A1-F/A3** alpha-corpus pull + consent-DM session — clips, stills, quotes, and releases collected in ONE conversation per tester | ≥3 clips clearing the A1 bar; ≥8 verbatim quotes with @handle + first name + neighborhood + ★ + poster frame; written consent recorded at collection, never retrofitted | **Wed–Thu 2026-06-11/12 — before any committed ship date.** The proof wall (G-2) may not rest on uncollected quotes for the same reason the hero may not rest on unshot footage |
| HERO (upgrade) | **R1** hero feed scroll | 3–4 consecutive posts; identifiable + appetizing ≤1s/card; overlay legible at 390px; ~2s/post cadence; 60fps | Capture **Fri 2026-06-13**; re-shoot window Sun 06-15; **replaces R1-F on pass — never blocks ship** |
| APPETITE (upgrade) | **A1** 6–10 hero food clips | Golden-hour or rich light; motion in frame (cheese pull, pour, birria dip); food ≥60% of frame; ≤15s usable; consent per clip | Corpus gaps shot at the **06-16** founders shoot |
| PHOTOGRAPHY | **P1–P4** golden-hour photography | Per §9.4 specs; ≥4 usable P1 frames with right-third overlay room; ≥1 P3 founders frame; faces released | **Founders shoot: Tue 2026-06-16, ~7:45pm, 4–6 Carlsbad/Village venues — on the calendar.** Pre-shoot fallback: the homepage close runs the strongest A2 still + Percy composite (named, reviewed with R1-F); the shoot's output hot-swaps in |
| TRUST LEAD (G-11) | **Q1** third-party press quote | One named outlet, one attributable sentence, link live | Taste Report "First Look" seed publishes + G-6 pitch sends **week of 2026-06-15 (owner: Jake)**. **Substitution rule:** if no quote by ship day, the sandwich lead renders the live ratings counter (B9 `ratings` — `pressQuote ?? ratings`, §1) so the slot ships full either way; the pitch lane keeps running post-ship and the first quote to land hot-swaps in |

**Review gate (amended G-9):** the homepage build (§8.6 step 4) begins when the **fallback rows** (R1-F, A1-F/A3) pass their bars — not when the shoots happen. Upgrade assets hot-swap behind the same bars. Everything in §9.1–9.5 below remains shopping-list priority: capture in the §9.6 order, but nothing below this table blocks launch.

### 9.1 Screen recordings (the load-bearing assets)
| # | Asset | Screen & state | Spec / used by |
|---|---|---|---|
| R1 | **Hero feed scroll** | FeedScreen, LOCAL tab: 3–4 consecutive strong food posts, card overlay legible (author, place, stars, caption, tags), ~2s/post swipe cadence | 15–20s, 9:16. Homepage hero, /discover. |
| R2 | **% match in the wild** | ExploreScreen → Top Spots rail slow scroll; gradient badges ("Made For You" 90%+, "Strong Match") on ≥4 cards | 8–12s. Homepage Beat 4, /match. |
| R3 | **Place page top-to-bottom** | PlaceDetailScreen for a hero enriched Carlsbad venue: hero, match banner, About expand, hours, POSTS grid, one slow scroll | 15–20s. Place-page "what unlocks in the app" demo. |
| R4 | **The required rating** | PostDetailsScreen: place tagged → "How was {place}?" → drag to 4.5 (half-star!) → hint line "Half-stars supported · Moves {place}'s public average" legible → Share flips enabled | 10–15s. THE trust demo for /why-the-scores-are-real. |
| R5 | **Map county → pill → preview** | MapScreen: county zoom (area cluster labels) → Carlsbad pills (orange-near/rose-far) → tap pill → preview card → swipe 2–3 cards | 15–20s. Homepage Beats 2+4 ("Go"). |
| R6 | **Route building** | Map route mode: sparkles → "Planning Your Route" → tap 3 places → numbered sunset stops + dashed trail + live totals → FinalizeRoute with smart name ("Campfire → Barrel Republic") | 20–25s. Beat 5 + /nights-out hero. |
| R7 | **The poll resolving** | ConversationScreen, staged 4-member group chat with believable banter: "Where should we eat?" poll → votes fill live (2 other devices voting) → "Lock it in" → plan auto-created | 15–20s. The "It's 7pm" money shot. |
| R8 | **Plan invite RSVP** | Conversation: plan invite card → "I'm In" → "You're going!" | 5–8s. /nights-out S3. |
| R9 | **Active route night** | ActiveRoute mid-route: live map, one "Visited" check, "Next: {place}" pill | 10s. Stills acceptable if logistics fail (needs physical proximity or mock location). |
| R10 | **Full-sentence search** | SearchScreen: "rooftop happy hour" → grouped Walking distance / Quick drive / Worth the trip; second take "best birria" | 8–10s. /discover S5; echoes the FAQ-block magic. |
| R11 | **Dual Bite** | CameraScreen Dual Bite: capture food + reaction → composed PiP | 8–10s. Nice-to-have garnish. |
| R12 | **Story with star sticker** | StoryViewer: story carrying star-rating sticker + place chip | 5–8s. Nice-to-have. |
| R13 | **Taste onboarding picker** | TastePickerScreen: tap 4–5 chips across pages, counter, progress dots | 8–10s. /taste-quiz design parity. |
| R14 | **15-second /download loop** | Best 15s cut of R1 | Derivative. |

### 9.2 Screenshots / stills
| # | Asset | Screen & state |
|---|---|---|
| S1 | Welcome screen | SignupScreen: sunset hero, logo, "See what's happening.", Continue buttons. Brand-source-of-truth shot. |
| S2 | Feed card, frozen | One FeedScreen card, everything legible — for glow-frame composites. |
| S3 | Taste Match banner close-up | PlaceDetail: "Made For You · 93%" + "Matches your love of Tacos, Rooftops, Margaritas." Crop-ready. |
| S4 | Match-tier set | Five captures, one per tier (magenta/orange/amber/emerald/gray) — the /match color system + proof-page S4. |
| S5 | Compose rating state | PostDetailsScreen, 4.5 stars + hint line — still version of R4. |
| S6 | Map full-county | Zoomed-out pill field + area cluster labels. /places backdrop. |
| S7 | Route detail | RouteDetail of a finished public route: ordered stops, sunset trail, "X saved" pill. |
| S8 | Routes trophy case | Profile → Routes tab, 2–3 completed routes ("PUBLIC" chip on one). |
| S9 | Plans calendar | Profile → Plans tab, week strip, one "HAPPENING NOW" ribbon. |
| S10 | Group chat texture | Conversation: shared place card, 🔥 food-emoji reaction, voice note row. Inhabited-app proof. |
| S11 | Explore overview | Trending Now + Top Spots rails + sticky pill bar in one frame. |
| S12 | Search result groups | PLACES/PEOPLE/POSTS headers + distance buckets. |
| S13 | Notification inbox | Today/This Week sections, bundled-likes row. Optional. |
| S14 | Stories bar | Map top stories bar, 3+ bubbles. Optional. |
| S15 | **For Business stats grid** | Views / Visitors / Saves / Directions UI — **v2-deferred: partner features flag-gated off in alpha; capture when the flag flips, before /business publishes** (R-10). |

All stills: device-native resolution, PNG, notch-cropped + full-frame versions.

### 9.3 Real post media (the appetite layer)
- **A1 — 6–10 hero-grade food clips (§9.0 launch blocker):** vertical 9:16 originals exported from Firebase Storage (not screen-recorded), from the best tester/founder posts. Bar per §9.0. **Written consent per poster; record handle + first name + neighborhood** ("@kaden — Oceanside") — these double as the testimonial layer. Gaps are filled at the **committed 06-16 founders shoot** — the shoot happens regardless; the corpus review only sets its shot list.
- **A2 — 12–20 food stills:** exported post photos for guide entries + place-page fallback heroes, same consent rule.
- **A3 — 8–10 tester quotes (the proof wall, G-2):** verbatim, **@handle + first name + neighborhood + their ★ rating + the poster frame of the post the quote references** — the full card anatomy of §4.1 S5, captured at collection time so nothing is retrofitted. From Day-2 alpha feedback / DMs, with the same written release as A1 (one consent conversation per tester covers clip, quote, and name). 8–10 because the homepage wall seats 8 and /download's proof strip takes 3 with overlap; collecting them is a DM session, not a shoot — **committed Wed–Thu 2026-06-11/12 per §9.0 (G-9), before any ship date**: the proof wall may not depend on uncollected quotes any more than the hero may depend on unshot footage.

### 9.4 Photography (the golden-hour composite layer — §9.0 launch blocker, shoot committed Tue 2026-06-16)
One golden-hour shoot, 1 evening, 4–6 Carlsbad/North County venues (phones acceptable, mirrorless better):
- **P1** — Exterior/patio at sunset ×4 (wide, room for floating-UI overlay on the right third). Homepage close, neighborhood hubs.
- **P2** — Taco window / counter close-up ×2 (the "venues no reservation platform covers" argument in one image).
- **P3** — Group-at-table, faces lit, food center ×2. **Doubles as the /about founders shot and the /press founder photo (R-10)** — make one of the two frames the four founders.
- **P4** — 2–3 SD texture shots (coastline at dusk, neon bar sign, string lights) for section backgrounds.
- All: landscape 3:2 + vertical crop; RAW/HEIF max quality; venue okay if interior; signed releases for recognizable faces.

### 9.5 Brand & generated assets
- **B1** — Logo: SVG wordmark + mark (source from app repo; `app.json` 1024px icon exists).
- **B2** — Sunset gradient tokens: the §5.3 CSS block IS the deliverable — extracted verbatim from `src/theme/colors.js`, not redesigned.
- **B3** — Fonts (R-6): self-host **Bricolage Grotesque** + **Spline Sans Mono** woff2 subsets (Google Fonts, free, no CDN render-blocking). Body is the system stack — nothing to license or extract (the app ships no custom fonts).
- **B4** — Favicon/touch-icon set + `site.webmanifest`: **the Percy dial at rest (G-10)** — ring + pill silhouette, no number — not the wordmark; the drawable mark earns the smallest, most-repeated slot the brand owns. Wordmark variants from B1 for contexts that need the name.
- **B5** — OG image template (SVG): sunset gradient, logo, slots for {place name, star score, "Rated by people who went"} + the Percy dial at rest (magenta pill, empty ring, *"your % match"*, no fabricated number — §5.6-D) — rendered per-place at build + per-route for G-4 pages ({route name, N stops, creator handle} bordered by the `<SunsetTrail>` mark, §5.6-E) + 1 static default. Percy and the trail ride every shared link into iMessage.
- **B6** — Apple badges, official artwork (G-12): the **"Pre-Order on the App Store"** badge pre-launch and the standard **"Download on the App Store"** badge at launch — same slot, one swap. Until the pre-order toggle clears App Review (sequenced with A.9 — §8.4 item 6), the slot renders the waitlist state.
- **B7** — QR code: generated at build; target = waitlist anchor pre-launch, App Store URL at launch.
- **B8** — Device frame: pure-CSS bezel-less frame preferred (zero asset weight) per §5.6.
- **B9** — Proof-strip numbers file `data/proof.json`: `{ venues: 4000, guides: 1626, testers: 80, ratings: <live>, pressQuote: null }` — single source so every trust sandwich stays consistent and auditable. Per G-1, `testers` renders only in the building-in-public strip and founding-500 closes, never in a cold-traffic sandwich; `pressQuote` fills the reserved sandwich slot the day G-6 lands one (quote + outlet + link).
- **B10** — The two in-code SVG spot illustrations (R-5): the dissolving star average (/why-the-scores-are-real S2) and the tipped taco (/404). Drawn in code, sunset tones. **No other illustration exists anywhere on the site.**
- **B11** — `<PillMap>` build-generated map renders: an SVG component drawing the MapScreen aesthetic (warm-paper ground, named pills colored orange-near→rose-far by distance, optional `<SunsetTrail>` route overlay) from lat/lng data at build. Serves every "static MapScreen-style render" in §4: the /places hub backdrop (§4.6 S1), neighborhood-hub map strips (§4.7 S4), guide maps (§4.9 S4), and route-page maps (§4.15 S1). **No capture needed** — S6 is the visual reference, not the asset; never embed Google Map tiles on these pages (cost + ToS + brand).
- Taste Report data viz + per-place OG images: **build-generated, no capture needed** (R-10).

### 9.6 Capture-session logistics (one page for whoever holds the phone)
1. Dress the test account: complete taste profile heavy on Tacos/Rooftops/Margaritas (guarantees high tiers on Carlsbad spots), avatar, 6+ follows.
2. Stage the group chat: 4 accounts, 10 messages of believable banter, then run R7 live with 2 devices voting.
3. Pre-create: one public completed route (S7/S8), one "HAPPENING NOW" plan (S9), one story with star sticker (R12/S14).
4. Capture order minimizing re-staging: S1 → R13 → R1/S2 → R2/S11 → R3/S3/S4 → R4/S5 → R10/S12 → R5/S6 → R6 → S7/S8/S9 → R7/R8/S10 → R9 → R11/R12/S14 → S13.
5. Known flags: Crew Cut is flag-gated OFF (skip); partner features OFF so "Featured"/"Popular pick" badges won't render and **S15 cannot be captured yet** (don't chase either); PlacePostsGrid videos render poster-only by design (not a capture bug).
6. Deliver raw to a shared folder organized `R##_name/`, `S##_name/`, `A#/`, `P#/`; the build session owns compression (H.264+WebM ≤2MB clips, AVIF/WebP stills).

---

### THE CORE BET, IN ONE PARAGRAPH

Ship the post-launch master site's strict subset now, with the 1,626 already-written enriched place pages as a pre-launch SEO engine — indexed, latticed under a /places hub and 12–20 human-reviewed guides, schema'd, AI-crawler-open — and **lead every visitor with a tool, not a form (G-1):** the taste quiz fronts the hero, the % match computes live before any ask, quiz completers see their real number on every place page (G-3), and tester routes resolve as full shareable pages from day one (G-4) — every surface capturing waitlist signups tagged with the exact venue, route, or taste profile that hooked them. So that on App Store launch day the pages are already ranking at download intent, every funnel verb flips to "Get the app" with one config flag, and the universal links the app already fires resolve to pages that have spent months earning authority — and converting visitors — in a county no competitor contests.

---

# 5. Pattern Library

Every steal-worthy website pattern found across the 14 teardowns (Beli, Corner, The Infatuation, Eater, Yelp, Resy, OpenTable, Partiful, Strava, Cash App, Opal, Phantom, Duolingo, Linear), named, attributed to its best executor, and re-engineered for Blabberly. The rule for every entry: **steal the mechanism, not the surface** — Blabberly's version must exploit at least one asset the original lacks (real short-video, required ratings from people who actually went, % match, the night-out layer, San Diego County depth, or the 1,626 enriched place pages).

Organized by purpose: **A. Hero · B. Storytelling · C. Conversion · D. Trust & Social Proof · E. Visual & Motion · F. Content/SEO Engine.**

---

## A. HERO PATTERNS

### 1. The Community-First Hero (with the Hook-Then-Moat section)
**Best executor:** Strava — "Community-Powered Motivation" headline, the GPS tracker demoted to the subhead ("Track your progress and cheer each other on. Join over 100 million active people on Strava for free"), then an explicit homepage section that names the retention model out loud: "Join for the tracking, stay for the community."
**Why it works:** It kills the two universal objections — "is anyone on this?" and "what does it cost?" — in one sentence, and sells the network (the moat) instead of the feature (the commodity). Naming the hook and the moat as page architecture is the most honest community-app pitch on any marketing site.
**Blabberly's upgrade:** Strava *asserts* community ("100 million") but never *shows* it — no faces, posts, or kudos threads on the homepage. Blabberly leads with people deciding where to eat together — and proves it with real tester posts and real food video playing in the hero. Our hook-then-moat line writes itself: "Come for the honest ratings, stay for the crew." The video feed lets us show the community Strava can only count.

### 2. The Worldview / Category-Claim Headline
**Best executors:** Cash App — "The way money should work" (a belief, not a feature) — and Phantom — "The money app that'll take you places" (renames the category in the headline while the SEO title tag quietly keeps ranking for the old one, "crypto wallet").
**Why it works:** A worldview headline frames every feature below it as evidence of a philosophy rather than a list of capabilities, and a category rename lets you compete on a board you defined. Phantom's two-track trick (new story for humans, old story for Google) means repositioning costs zero rankings.
**Blabberly's upgrade:** Both of these are vibes-only — the product never demos in the first screenful, which a 20M/59M-user brand can afford and a pre-launch app cannot. Blabberly pairs the belief statement ("Scores from people who actually went") with the product *working* under it — a live feed clip and a real % match — so the worldview is demonstrated within three seconds, not just declared. SEO title tags keep ranking for the plain category ("San Diego food discovery app") Phantom-style.

### 3. The Positioning-by-Analogy Kicker
**Best executor:** Corner — "GOOGLE MAPS BUT SOCIAL." as the overline above the hero, flanked by "ZERO ADS / ZERO INFLUENCERS" trust stamps.
**Why it works:** Four words deliver instant comprehension by borrowing a mental model everyone already has, then pick a fight with the incumbent. The purity stamps pre-answer "what's the catch?"
**Blabberly's upgrade:** Corner's analogy leads to a dead end — they reject ratings entirely, so they offer no quality signal at all. Blabberly's kicker picks the same fight and *wins it with a number*: something in the family of "TikTok energy. Yelp's job. Ratings you can actually trust." — and our stamps are falsifiable rather than vibey: "Every post rated · Only by people who went." We agree strangers' star averages are broken AND still hand users a trustworthy score, which is the move Corner's dogma forbids them.

### 4. The Inline-Capture Hero
**Best executor:** Strava — the primary hero CTA is not a button to the App Store; it's an actual signup module (Google / Apple / Email) on the marketing page itself. Account captured before the store is ever involved.
**Why it works:** It removes the costliest step in the funnel — the context-switch to the App Store — and converts the relationship at the moment of peak intent. Everyone else in the food category (Beli, Corner, The Infatuation) bounces non-ready visitors forever with a naked badge.
**Blabberly's upgrade:** Pre-launch, this maps 1:1 to **the waitlist form living IN the hero** — one email field, one tap. Post-launch it converts to download CTAs without moving (the master-site doctrine: launch day unlocks, never rebuilds). Improvement over Strava: our capture promises something concrete and scarce ("Be first in your neighborhood when San Diego unlocks"), where Strava's free signup has no launch energy to harness.

### 5. The Trust Sandwich Under the CTA
**Best executor:** Opal — Apple Design Award badge + "4.8 · 150k+ App Ratings" sitting directly beneath the "Try for free" button.
**Why it works:** It de-risks the click at the exact pixel where hesitation happens. Proof placed at the point of decision outperforms proof in a section three scrolls down.
**Blabberly's upgrade:** Opal's badge oversells (2025 finalist, implied winner) — a credibility strain a *ratings product* cannot afford. Blabberly's sandwich uses only verifiable, local numbers that improve over time: pre-launch "~80 San Diego testers · 4,000 venues mapped · 1,626 place guides written"; post-launch the App Store rating slots in. Every number on our site must survive an audit — credibility is the product.

---

## B. STORYTELLING PATTERNS

### 6. The Guided-Tour Homepage
**Best executors:** Linear — numbered chapters (1.0 Intake → 5.0 Monitor) that walk a unit of work through the product's own loop, form mirroring function — and Phantom's lighter variant: three teaser sections, each with exactly one "See more" into a deep pillar page (/trade, /cash, /security), so the homepage never over-explains.
**Why it works:** The homepage becomes a demo of the product's logic instead of a feature grid. The pillar variant keeps the homepage fast while giving every major concept a deep, linkable URL.
**Blabberly's upgrade:** Linear's tour is emotionally cold and tours a workflow; ours tours *a night* — the product loop is a story everyone has lived: **Watch → Match → Go → Rate → Plan the night.** Each chapter is one verb, one promise, one real UI proof (a real clip, a real % match badge, a real multi-stop route), each linking to a pillar page (/discover, /real-ratings, /nights-out). Nobody in the food set (Beli's three flat pillars are the closest attempt) has ever walked a visitor through an actual evening.

### 7. Features as Social Situations
**Best executor:** Partiful — "Running late, need more drinks, 10 people texting you asking how to get in? Send updates to everyone at once." Every feature introduced by the lived moment of pain it kills, never by its capability name.
**Why it works:** The reader recognizes their own life before they're asked to evaluate software. It's the difference between "Text Blast" and being seen.
**Blabberly's upgrade:** Partiful's situations are episodic (hosting happens 3x/year); ours is the most universally recurring decision in social life: **"It's 7pm. Six people. Nobody can pick."** → polls, plans, multi-stop routes. Eating out happens 3x/week — we get to run this pattern against a higher-frequency, higher-recognition moment, and close it with appetite (real food video) instead of a meme poster.

### 8. The Manifesto Page
**Best executors:** Linear — /next, "Issue tracking is dead," linked straight from the hero — and Corner — "so why do we decide where to go based on how viral it is? how aesthetic? how 1,000 random people rated it?"
**Why it works:** Declaring the incumbent category obsolete reframes every comparison before it happens, earns links/shares no feature page ever will, and gives believers a flag to rally to. Corner proves the food category is emotionally ready for this argument.
**Blabberly's upgrade:** Corner asks the right question, then refuses to answer it (no scores at all). Linear's provocation needs insider decoding. Blabberly's manifesto lands the punch both pulled, in one plain-read sentence: **"Reviews from people who never went are dead."** Then — unlike both — the answer is concrete and checkable: every score on Blabberly comes from a required rating attached to a real visit and a real video. A consumer manifesto with receipts. (And it must be felt at 7pm by a hungry friend, not decoded.)

### 9. Jargon-Then-Translation Copy Discipline
**Best executor:** Phantom — "Self-custodial means you control your funds. We never have access." Every technical term is translated in the next sentence; jargon is quarantined to /learn.
**Why it works:** It lets a brand keep its proprietary vocabulary (which builds equity) without ever leaving an outsider behind. Linear's failure mode — "Intake," "Diffs," vocabulary walls — is the cautionary twin.
**Blabberly's upgrade:** We have exactly one piece of jargon that matters and it deserves this treatment everywhere it appears: **"% match means the score is computed against *your* taste — not an average of strangers."** Our translation isn't just clearer, it's the differentiator stated as a definition. Every named feature (Dual Bite, Crew Cut, Routes) gets one-line plain-English shadows on first mention.

---

## C. CONVERSION PATTERNS

### 10. The Two-Speed, One-Verb CTA System
**Best executors:** Cash App — soft "Explore X" links everywhere for depth, every hard CTA converging on ONE campaign-tagged funnel (`?source=fallrelease2025-branded`) — combined with Duolingo/Opal's single-verb discipline ("GET STARTED" / "Try for free" in nav, hero, and close; nothing else competes).
**Why it works:** Soft CTAs serve the curious without leaking conversions; one repeated hard verb eliminates decision fatigue; source tagging makes every page's contribution measurable from day one.
**Blabberly's upgrade:** One hard verb sitewide — pre-launch **"Join the waitlist,"** flipping to **"Get the app"** at launch with zero architectural change — UTM-tagged per page (place pages, guides, manifesto all attributable). Soft CTAs are sensory where Cash App's are informational: "Watch the feed," "See a Saturday route." The Beli lesson hard-coded: no visitor on any of our 1,600+ pages should ever be unsure what the ask is.

### 11. The Quiz-Funnel Primary CTA
**Best executor:** Opal — "Try for free" routes to a personalization quiz (start.opalapp.com) that generates a personal "Focus Report" before the install ask.
**Why it works:** It personalizes the pitch before requesting commitment, captures intent data either way, and gives cold traffic a payoff for clicking. The install ask arrives after the dopamine, not before.
**Blabberly's upgrade:** Blabberly's in-app taste-profile onboarding IS this quiz — we just run it on the web: **"What's your taste? → here's your % match with 5 real San Diego spots → join the beta to unlock the rest."** Two improvements over Opal: the result is *delicious and local* (real venues, real video) instead of a guilt report, and we fix both of Opal's execution sins — the quiz stays on blabberly.com (no domain jump) and renders server-side (their most important page is invisible to crawlers).

### 12. The Dead-End Inversion (the "Notify" pattern)
**Best executor:** Resy — when a table isn't available, the CTA becomes "Notify": every sold-out state converts into lead capture with re-engagement rights, then gets resold as a premium perk.
**Why it works:** It turns the site's most common failure state into its best acquisition surface. Nothing on the site is allowed to dead-end.
**Blabberly's upgrade:** Pre-launch, **every state is the "sold-out" state** — which makes this our master pattern, not an edge case. Every place page's payoff moment ("watch the videos from this spot," "see your % match here") inverts into the waitlist with a stored intent: we know which venue hooked them, so launch-day re-engagement says "Campfire is live on Blabberly — your % match is ready," not "we launched." Resy captures a table preference; we capture a taste profile.

### 13. The Pre-Configured Deep-Link CTA
**Best executor:** Partiful — template tiles deep-link to `/create?theme=karaoke&effect=sunbeams&poster=…`: the marketing page hands you a half-finished creation, no signup wall. Corner runs the SEO version: Branch links carrying `intent=save&placeId=` so organic visitors land in-app mid-action.
**Why it works:** It collapses the distance between interest and action to zero. The user's first product moment is already personalized with the thing that attracted them.
**Blabberly's upgrade:** Our `/place/*` universal links are **already configured** — the infrastructure exists before the pattern. Every place page and shared route CTA carries the place/route payload, so a new user's first in-app screen is the taco shop that brought them, not a cold feed. Pre-launch, the same payload attaches to the waitlist record (see #12). Partiful pre-loads a party theme; we pre-load a craving.

### 14. The Omnipresent Single-Field Capture
**Best executor:** Eater — one email field, repeated on every page including the 404, segmented into 28 city/persona newsletters.
**Why it works:** The ask is so small and so ubiquitous that capture becomes ambient. Segmentation makes the followup relevant enough to survive.
**Blabberly's upgrade:** Same omnipresence (every place page, every guide, the 404), but with a concrete promise where Eater's is generic and Phantom's is payoff-free ("sign up for our newsletter"): **"Be first when your neighborhood unlocks."** Segmentation by neighborhood/craving instead of city/persona — data we harvest from which of the 1,626 pages they signed up on. This is also the direct exploit of the category's biggest shared hole: Beli, Corner, and The Infatuation capture nothing; their non-ready visitors evaporate.

### 15. Content-as-Teaser App Gating
**Best executor:** Beli — guide pages put the full ranked list on-page (SEO-readable, skimmer-satisfying) while gating the interactive payoff: "See the full ranked list and map on the Beli app."
**Why it works:** Google gets everything it needs to rank the page; the human gets enough value to trust the brand; the *best* part stays behind the download. Content converts without being crippled.
**Blabberly's upgrade:** Our gate-able payoff is structurally better than Beli's map: the place page shows the enriched About, the score, and a poster-frame of the videos — **the videos themselves, the % match, and route-building are the app's** (pre-launch: the waitlist's). Beli ran this play twice in one city and stopped; we run it 1,626 times in our home county at launch, with a fresher tease every time someone posts.

### 16. The Real /download Page with the QR Bridge
**Best executor:** Linear — /download detects platform and bridges desktop visitors to phones with QR codes. The anti-pattern is everywhere else: Cash App's /download silently redirects to the homepage; Eater's app funnel is a bare store link; The Infatuation's /app literally 404s.
**Why it works:** "Download {app}" queries are the highest-intent traffic a consumer app gets, and most of this set squanders them. A QR code is the only zero-typing desktop→phone handoff.
**Blabberly's upgrade:** /download exists from day one as a real page — store badges, QR, a 15-second feed clip, the trust sandwich (#5) — with a **waitlist fallback state pre-launch**, so the page never wastes a visitor regardless of launch status. The incumbents prove app-first companies habitually botch this page; ours is designed before the app ships.

---

## D. TRUST & SOCIAL PROOF PATTERNS

### 17. The Three-Layer Proof Stack
**Best executor:** Partiful — elite press quotes chosen as arguments ("Evites are so last decade"), a hard number ("5.0 • 40K Ratings"), and raw verbatim user reviews with handles and dates ("I don't even hang out with my friends if they don't send me the partiful first" — r3boi).
**Why it works:** Each layer covers a different skeptic: authority (press), scale (number), and authenticity (unpolished peers). The unpolish is load-bearing — it reads like screenshots of real life.
**Blabberly's upgrade:** Pre-launch we're light on press and scale, so we invert the stack's weight onto the layer we own outright: **named local humans with video.** Real tester quotes with first name + neighborhood ("Kaden, Oceanside"), attached to their actual posts. As press and ratings arrive, the upper layers slot in. Improvement: Partiful's proof is text; ours has a face, a plate, and a star rating on camera.

### 18. Proof Inside the Decision UI
**Best executor:** Duolingo — learner counts printed on each language card ("Spanish — 48.8M learners"); the social proof lives inside the choice itself, not in a logo bar.
**Why it works:** Proof at the moment of choice does double duty: it validates the platform and guides the decision. No separate "testimonials" section can do that.
**Blabberly's upgrade:** Every place card and guide entry carries its proof natively: **"32 ratings from people who went · 91% match for taco lovers."** Our counts are better than Duolingo's because they're not just popularity — they're *verified-visit* counts, which is the brand argument restated on every card, thousands of times across the site.

### 19. The Identity Testimonial Wall
**Best executor:** Opal — ~28 testimonials with full identity (name, job title, employer, city, country flag), and the section headline is itself a quote: "This app has changed my life."
**Why it works:** Identity converts an anonymous star into a person you could be. The quote-as-headline lets users write the copy.
**Blabberly's upgrade:** Opal's wall skews coastal-elite tech (Instagram engineers, VCs) — aspirational but distancing. Ours looks like actual San Diego: students, nurses, surfers, couples — **with their food videos embedded**, not just their job titles. The headline-quote will be something a tester actually said about a real place. Specific beats senior.

### 20. Own the Doubt (proof pages + scary queries)
**Best executors:** Duolingo — /efficacy ("Duolingo Really Works"), turning skepticism into a destination and backlink magnet; Cash App — /outsmart-scams, 9 pages owning their worst search neighborhood; The Infatuation — methodology as the entire trust story ("Show up unannounced. Pay for everything. Call it like we see it."); Yelp — a whole trust subdomain.
**Why it works:** Every brand has a doubt users will Google. Owning that page means you write the answer, earn the links, and convert the skeptic — instead of a Reddit thread doing it for you.
**Blabberly's upgrade:** Our central doubt is also our central differentiator, which makes this page a weapon, not defense: **"Why Blabberly scores can't be faked"** — rating required on every post, posts come from real visits, % match is personal so there's no single number to game. Three-beat methodology, Infatuation-style: "You went. You rated. It counts." Pre-empt "is Blabberly legit" and "Blabberly vs Yelp" before either query has any volume.

### 21. The Data-as-Marketing Flywheel
**Best executor:** Strava — Year in Sport (12th annual) and the Metro Commute Report turn proprietary user data into an annual press cycle plus shareable personal recaps; OpenTable's variant turns review data into recurring award "news" (Diners' Choice monthly, Icons) that earns press links per city.
**Why it works:** Original data is the only content journalists can't get elsewhere. Recurring formats compound: the franchise earns links on a schedule.
**Blabberly's upgrade:** Required ratings + venue coverage = a dataset nobody in San Diego food media has: **"The San Diego Taste Report"** — what locals actually rated highest by neighborhood, the dishes people drive for, North County vs. city taste splits. OpenTable's awards skew fine-dining and critic-panel; ours crowns taco shops and counters because our data sees the venues reservation platforms structurally can't. At alpha scale it starts as a quarterly blog post; the format is built to grow into the press franchise.

---

## E. VISUAL & MOTION PATTERNS

### 22. Product-UI-in-Glow (the cinematic screenshot)
**Best executor:** Opal — no stock photography anywhere; real app screens floated in ambient gradient glows, one hue per feature concept (Score yellow, Rules ice-blue), making flat screenshots feel cinematic and giving each named feature a color-coded scroll panel.
**Why it works:** It solves the "screenshots look like a settings page" problem with light instead of lies, and the one-color-per-concept system doubles as wayfinding and brand equity (Opal Score®, Focus Gems®).
**Blabberly's upgrade:** This pattern was practically designed for the sunset gradient — **Blabberly screens floating in sunset glows**, each named asset owning a hue within the gradient family (% Match, the star rating, Routes, Dual Bite). And we hold the card Opal structurally lacks: our screens have something delicious *moving* in them. A muted, lazy-loaded feed clip inside the glow frame beats any static mockup in the set — Opal glows because their product has nothing to show; we glow around real food video.

### 23. One Ownable Color at Full Saturation
**Best executors:** Strava — one orange for every CTA and accent, recognizable at thumbnail size — and Cash App — fluorescent green + custom type + playful 3D, "brand-forward anti-minimalism": they refused to look like a bank. Linear is the discipline reference: one accent rationed on a tight monochrome scale so every CTA is unmissable.
**Why it works:** Total color discipline makes the brand legible at any size and every CTA findable by reflex. Cash App proves committing to the loud version reads as confidence, not noise.
**Blabberly's upgrade:** The sunset gradient is our orange/green — committed at full saturation, never sanded down to look "credible," deployed Linear-style: warm light neutrals everywhere, the gradient reserved for CTAs, % match badges, and brand moments so it never wallpapers into invisibility. Strategic bonus: the entire "Linear-style" dark-glow SaaS monoculture means **a sunset-warm, light, appetizing site with the same typographic discipline is instant differentiation** — and the food category's incumbents (Yelp, OpenTable) are utility-gray, so the lane is empty on both sides.

### 24. Photography-with-Floating-UI Composites
**Best executor:** Resy (B2B pages) — real restaurant photography with product-UI cards hovering inside the scene (a reservation card floating over a patio shot); credited photographers; premium feel bought with typography + photo discipline (Beatrice + GT America), not animation.
**Why it works:** It shows the software living inside the life it serves — context no naked device-frame can carry — and proves "premium" is a typography-and-photography budget, not a motion budget.
**Blabberly's upgrade:** San Diego golden hour IS our brand palette — sunset photography of real local patios and taco windows with the feed card, a % match badge, or a route line floating in-scene. Two upgrades on Resy: our floating UI contains *video* (a playing post, not a static card), and our scenes are venues no reservation platform covers — the composite itself argues coverage depth. One display face + disciplined type ports the Resy premium-feel playbook onto the gradient.

---

## F. CONTENT/SEO ENGINE PATTERNS

### 25. The Place Page as the Atomic SEO + Conversion Unit
**Best executors:** OpenTable — millions of /r/ pages, each simultaneously a booking widget, review hub, and landing page, compounding for 25+ years — and Resy — prerendered venue pages with About narrative, booking widget, events, and cross-linked editorial all on one URL.
**Why it works:** One template serves search engines, social proof, and the conversion CTA at once; every venue added to the database is a new landing page added to the funnel. It is the proven engine of the entire category — and the validation of the pre-launch lean.
**Blabberly's upgrade:** Our 1,626 enriched pages ship with content the giants don't have per-page: a written About narrative (theirs is operator boilerplate), a *required-rating* score, video poster frames, and a % match tease — plus Restaurant/LocalBusiness + FAQ schema from day one (Cash App's under-exploited gap). The conversion unit is the waitlist-with-intent (#12) instead of a booking widget, flipping to the app deep link (#13) at launch. And we cover the ~4,000-venue long tail that OpenTable's $149-499/mo contract gate and Resy's reservation gate structurally exclude — the taco stands ARE our inventory.

### 26. The Structured-Opinion Block Template
**Best executor:** Corner — every place page carries four scannable, opinionated blocks: **VIBE / WHAT TO GET / THE MOVE / BEST FOR**, each AI-synthesized blurb anchored by a verbatim user quote with @handle and recency stamp ("@giannab, 4w ago").
**Why it works:** Structure makes an AI-enriched page read like a friend's text instead of a database row; the verbatim quote grounds the synthesis in a real human; the recency stamp keeps it alive. Authenticity and scale simultaneously.
**Blabberly's upgrade:** Our enriched About data restructures into the same scannable skeleton, but our grounding material outclasses Corner's text quotes: **rated video posts.** The quote block becomes "@handle gave it ★★★★½ — watch their post," with a poster frame. Corner's anti-rating dogma means their blocks can never answer "but is it good?"; every Blabberly block carries a score from someone who went. Add the structured blocks as FAQ/Review schema and these pages feed AI answer engines — which Corner and Yelp literally block (their robots.txt walls forfeit Bing/DDG/AI search; we stay maximally crawlable and become the citable source for "best birria in Carlsbad").

### 27. The Page-Type Lattice
**Best executors:** OpenTable — city → neighborhood → cuisine → "open now" → award pages, all generated from one database, all interlinked, with the homepage footer as a mega-directory — and The Infatuation's hub-and-spoke skeleton: city hub → five taxonomies → review pages with bidirectional "Included In" cross-links, so every new page strengthens every list page.
**Why it works:** A small number of templates multiplied across one dataset produces thousands of intent-matched pages, and dense interlinking makes authority compound instead of fragment. Corner's failure (a wall of hundreds of undifferentiated guide links) shows the lattice needs browsable hubs, and Strava's (/routes directory 404s) shows it needs human entry points.
**Blabberly's upgrade:** One county, full depth — neighborhood hubs (Carlsbad, North Park, Encinitas...) × cuisine × occasion rails → 1,626 place pages, every place page linking up to its guides and sideways to its neighbors. Where every competitor spreads thin across 23-425 cities, we out-cover all of them at home: more San Diego surfaces than Eater, The Infatuation, Corner, and Beli combined, with a browsable /places directory none of them built.

### 28. The Occasion Taxonomy
**Best executor:** The Infatuation — "Perfect For" pages indexing restaurants by *situation* (Date Night, Cheap Eats, Impressing Out Of Towners), matching how people actually search and decide, multiplying SEO surfaces per venue.
**Why it works:** Real decisions are situational, not cuisine-shaped. "Romantic restaurants North Park" out-converts "Italian restaurants" because it mirrors the actual question — and each venue earns 4-6 indexed surfaces instead of one.
**Blabberly's upgrade:** The Infatuation hand-writes these with staff; we generate them from data — the enriched places' `anticipatedQueries` field is literally a pre-computed occasion taxonomy waiting to be templated. And our occasions extend past dinner into the whole night, which their single-restaurant frame can't express: "Date night with a second stop," "Big group, nobody agrees," "Where to start a Gaslamp crawl" — occasion pages that resolve into multi-stop routes, a page type no one in the set can publish.

### 29. The Ranked-List Engine (franchise + template + title formula)
**Best executors:** Eater — the Essential 38: a capped, named, ownable list restaurants brag about making — Beli — the repeatable guide template ("NYC's 56 Best Burgers, Ranked": score + neighborhood + photo + recommended dish per entry) — Yelp — the programmatic title formula ("TOP 10 BEST {category} in {City} - Updated {Month Year}") — and Eater again for query-mirroring intros that open with the user's literal question ("Where should I eat in San Diego?").
**Why it works:** The named cap signals curation and becomes a noun; the entry template is infinitely repeatable per cuisine/neighborhood; the freshness-stamped superlative title is the proven SERP-winning string; the query-mirror is both SEO and empathy.
**Blabberly's upgrade:** All four layers, one engine, with a trust spine none of them have: **"The Carlsbad 25 — Ranked by People Who Actually Went."** Scores from required ratings (Beli's "Beli rating 9.0" move, but our number is defensible), video per entry (no one in the set has any), updated stamps from live rating velocity rather than an editor's quarterly pass. Beli validated the template and stalled at two guides in one city; our enrichment pipeline runs it per-neighborhood and per-cuisine across SD County from week one.

### 30. The Living Page (freshness stamps, changelogs, velocity)
**Best executors:** OpenTable — machine-scale freshness ("Updated 6/5/2026" on carousels, "As of Mar 23, 2026 there are 836 restaurants in San Diego" in meta descriptions) — Eater — explicit add/drop changelogs ("five added, five removed") that turn a static list into a product with return visits built in — Corner — social velocity ("527 saves, +28 this week," "🏅 6th in the area," "HOT LISTS THIS WEEK") — and Linear's homepage changelog strip proving shipping momentum.
**Why it works:** Freshness is simultaneously an SEO ranking signal, an urgency mechanic, and a credibility claim ("this is alive, bookmark it"). Velocity converts raw activity into social proof without a single testimonial.
**Blabberly's upgrade:** Our freshness is *organic* — every stamp is driven by real posting/rating activity, not an editorial calendar: "3 new rated posts this week," "Climbing in North County," dynamic counts in meta descriptions ("X spots rated by San Diego locals this month"). Pre-launch, a Linear-style **building-in-public strip** ("This week: 47 new venues enriched · Dual Bite shipped") gives a waitlist site a heartbeat — the launch-energy layer that Strava, Cash App, and Partiful (all post-scale) never had to model and therefore never built.

### 31. The UGC Landing-Page Army
**Best executor:** Partiful — every shared invite (/e/<id>) is a public, branded landing page placed in front of non-users by their own friends; the real sitemap is thousands of user-generated recruitment pages. Corner runs the SEO flank: public profile and list pages at scale.
**Why it works:** Product-led distribution that no homepage can match — the content does the marketing, the sender provides the trust, and the page count grows with usage instead of budget.
**Blabberly's upgrade:** The rails already exist: `/place/*` universal links are configured today. Every shared post, place, and **route** becomes a branded public page — and a shared multi-stop route is a richer recruitment artifact than an invite (it shows taste, plans, and three venues per share, each with rated video). Partiful's army recruits hosts a few times a year; ours recruits around a decision people share weekly.

### 32. Server-Render Everything (the engineering pattern)
**Best executor:** Resy — a client-rendered Angular SPA that nonetheless ships full prerendered HTML to crawlers (~97KB of real content per venue page, visible prerender-status-code meta): they refused to let their framework cost them SEO. The graveyard proves the stakes: Duolingo's homepage serves crawlers a title tag and nothing else, Strava's /features and /about are empty shells, Opal's most important funnel page is crawler-opaque.
**Why it works:** The entire place-page strategy is worthless if the pages don't render for bots and answer engines. This is the silent pass/fail gate under every content pattern above.
**Blabberly's upgrade:** Don't retrofit Resy's prerender workaround — build static/SSR from day one, place pages AND marketing pages AND the quiz funnel (every page in the master plan is in the index or it doesn't ship). Plus the 2026 twist the incumbents are fumbling: Yelp and Corner actively block AI crawlers and non-Google engines; we stay open to all of them and become the source AI answer engines cite for San Diego food queries the giants opted out of.

---

## The meta-pattern

Read across all 32 entries and one composite emerges that no single competitor runs: **Resy/OpenTable's place-page lattice (25, 27, 30, 32) + Strava's inline capture and community-first hero (1, 4) + Corner's structured-opinion warmth (26) + Partiful's situation copy and UGC army (7, 31) + Opal's glow-and-quiz polish (11, 22) — all wrapped around the one asset none of the fourteen possess: short video with a required rating from someone who actually went.** Every pattern above is currently executed by a company missing at least one of Blabberly's four structural advantages (video, verified ratings, % match, the night-out layer). The master site doesn't need to invent a single new pattern; it needs to be the first place all of these proven ones meet.

---

# 6. Exploit Map

*Where the competitive set's websites are collectively weak, and exactly how blabberly.com wins on each front.*

Synthesized 2026-06-11 from teardowns t01–t14 (Tier A food: Beli, Corner, The Infatuation, Eater, Yelp, Resy, OpenTable; Tier B craft/conversion: Partiful, Strava, Cash App, Opal, Phantom, Duolingo, Linear).

---

## How to read this map

Fourteen teardowns produce one headline finding: **the food category's web presence is split between data giants with no soul and soul brands with no data — and not one of the fourteen sites shows a human being eating food on video.** The giants (Yelp, OpenTable, Resy, Eater) own programmatic SEO architecture but are anonymous, text-first, and emotionally inert. The challengers (Beli, Corner) own voice and authenticity but have either abandoned the web entirely (Beli: 75M reviews invisible to Google) or walled it off (Corner: robots.txt blocks everyone but Googlebot). Nobody in either camp does video, personalization, group planning, San Diego depth, or pre-launch capture mechanics.

The exploits below are ranked in three bands:

- **Band 1 — Structural exploits.** Gaps competitors *cannot* close because their product or business model forbids it. These are permanent.
- **Band 2 — Category-wide blind spots.** Gaps everyone *could* close but no one has — collective negligence we can claim before anyone notices.
- **Band 3 — Craft and conversion exploits.** Execution standards proven by Tier B that no Tier A food site meets. These are won with discipline, not invention.

Each exploit: the gap → the evidence → the move.

---

## BAND 1 — STRUCTURAL EXPLOITS (they can't follow us here)

### Exploit 1: Video. The category's most visceral medium is absent from every food website on earth.

**The gap.** Food is decided on TikTok and Reels in 2026, yet the entire Tier A web surface is photographs and prose. A short-video place page is not an incremental improvement — it's a different sensory league, and Blabberly is the only player whose product generates this content natively.

**The evidence.**
- Resy: "Zero video anywhere on the web presence despite food being the most video-native category" (t06).
- Corner: "Zero video content in a sensory category — photo-and-text only" (t02).
- The Infatuation: "In 2026 their entire surface is still photos+text while the audience decides where to eat on TikTok/Reels" (t03).
- Eater: "Static photography-and-blurb presentation, no video on map pages despite Eater's video muscle" (t04).
- Yelp: "video only arrived in-app in 2026 and not on web" (t05). OpenTable: "Text-only reviews… can't show the dish or the room" (t07).
- Even the Tier B craft champions are structurally barred: Linear is UI-only ("real short-video of real plates is content they structurally cannot have," t14), Opal has "nothing delicious to show," Duolingo is all illustration, Phantom all mascot.

**The move.** The site IS the feed. Muted, lazy-loaded, autoplay-on-scroll loops of real Blabberly posts — on the homepage hero, on every place page, in every guide entry. The hero's job is to make a visitor hungry within three seconds, something no competitor's homepage has ever attempted. Strava's miss ("no autoplay feed video… a short-video app like Blabberly can make the site itself feel like the feed," t09) is the explicit instruction. Every place page leads with the venue's best-rated clip; the enriched About copy supports the video, never replaces it. This is also the trust exploit in disguise: video of the actual dish from an actual visit is proof no star average can fake.

### Exploit 2: Personalization. Nobody on the web tells you what YOU will like — "% match" has no competitor.

**The gap.** Every quality signal in the category is one-size-fits-all: the same Top 10 for everyone (Yelp), the same 38 for everyone (Eater), the same critic score (Infatuation), an anonymous pooled average (Resy, OpenTable), or no number at all (Corner). Not one site even *gestures* at taste-matching on its web surface. Blabberly's % match is the single feature the entire set is structurally unequipped to copy — the giants because their data model is pooled averages, Corner because its brand dogma rejects scores entirely.

**The evidence.**
- Yelp: "Zero taste personalization on web — same 'Top 10' list for everyone; no slot for a '% match' concept" (t05).
- Eater: "the 38 is the same 38 for everyone… Blabberly's '% match' is a direct, demonstrable counter ('your 38, not theirs')" (t04).
- Resy: "'% match' is structurally uncopyable for them" (t06). OpenTable: "nothing equivalent to Blabberly's % match" (t07).
- Corner is the sharpest tell: their App Store copy says "the more you use corner, the more it learns your unique taste" — but "the taste-learning algorithm is invisible on the website — buried in App Store copy, never sold or demoed" (t02). The one competitor that HAS the mechanic doesn't know it's their best web asset.

**The move.** Make % match the visible, demo-able hero mechanic of the site, borrowing Opal's two best patterns: (1) the **named, color-coded feature panel** — % Match gets its own scroll panel and sunset hue, alongside the required rating, Routes, and Dual Bite (Opal Score®/Focus Rules® template, t11); and (2) the **quiz funnel**: a web taste-profile quiz on blabberly.com ("What's your taste? → here's your % match with 5 real San Diego spots → join the beta") that personalizes BEFORE asking for the install — Opal proved this converts cold traffic far better than a store badge, and Duolingo proved goal-first conversion ("I want to learn…" before any form, t13). Critically, keep it on-domain and server-rendered — Opal's funnel jumps off-domain to a crawler-opaque JS page, their single biggest leak (t11). Phantom supplies the copy discipline: jargon-then-translation — "% match means scores are computed against *your* taste, not an average" (t12).

### Exploit 3: The night-out layer. Every competitor's job ends where the actual decision begins.

**The gap.** The universal terminal state across all fourteen sites is single-player: pick one restaurant (Infatuation, Eater), save to a list (Corner, Beli), book one table (Resy, OpenTable), verify one business (Yelp). The real-life decision — six people, three opinions, one night, multiple stops — is served by nobody. Partiful proves the inverse gap: they own the gathering but have "zero food/place dimension… the 'where should we eat' decision is a structural void" (t08). Blabberly's plans, polls, group chats, and multi-stop routes occupy the empty middle of the entire map.

**The evidence.**
- Yelp: "Abandoned the fun/social discovery layer (Talk/Events are robots-Disallowed ghost towns) — night-out planning is whitespace" (t05).
- OpenTable: "Booking a table is the last 5% of a night out. No group planning, no polls, no multi-stop routes, no chat" (t07).
- Resy: "their web social feature set is 'Make a Resy List'" (t06). Corner: "ends at save-to-list" (t02). Beli: "No web narrative for group/night-out planning" (t01). Infatuation: "nothing for the group decision, the poll, the multi-stop plan" (t03).
- Partiful's frequency wedge cuts our way: "Events are episodic (3x/year) while eating out is recurring (3x/week)" (t08).

**The move.** A dedicated night-out pillar page (Phantom's pillar architecture, t12: homepage teaser → one "See more" → deep page) that narrates the feature the Partiful way — as a lived social situation, not a capability: *"It's 7pm. Six people. Nobody can pick a spot."* → poll → plan → route (t08's exact prescription). Shared routes and plans become public landing pages the way Partiful's `/e/` invites do — "every shared route or place is a recruitment page" (t08) — and Blabberly's `/place/*` universal links are already configured for this. No competitor has a page like this because no competitor has the product behind it.

### Exploit 4: San Diego County. 1,626 written pages against, at best, a few dozen.

**The gap.** The home market is structurally uncontested. Every Tier A player is either global-thin (Corner: 35 cities, San Diego entirely absent), flagship-city-biased (Beli: 2 guides, both NYC), gated by business model (Resy reservation-only; OpenTable: only 836 SaaS-paying venues in SD vs Blabberly's ~4,000), or staffed too thin to go deep (Infatuation SD: ~4 guides; Eater SD: shared national resources, "Carlsbad/North County get scraps"). Blabberly publishes 1,626 enriched place pages into queries — "best tacos Carlsbad," "[venue] rating," "date night Encinitas" — that nobody is seriously contesting.

**The evidence.**
- Beli: "Content engine stalled at 2 guides in 1 city (NYC) — zero content gravity in any other market, including San Diego" (t01).
- Corner: "San Diego entirely absent — Blabberly's ~4,000-venue SD County depth is uncontested" (t02).
- Infatuation: "Blabberly out-covers SD County 1,626-to-dozens on day one" (t03). Eater: "a restaurant off the maps is invisible; the long tail is structurally uncovered" (t04).
- OpenTable: "taco stands, counter-service gems, and most of a real food scene don't exist on the platform" because coverage requires a $149–499/mo contract (t07).
- Strava is the proof-of-concept that this works pre-scale: programmatic, data-backed local pages ("The Best Hiking Trails in San Diego, CA") with member photos and 100+ internal links each are among their strongest acquisition assets (t09).

**The move.** This is the verdict on the strategic lean: **publish the 1,626 pages pre-launch — every teardown confirms it.** But don't ship them naked. Eater's teardown spells out the scaffolding (t04): wrap place pages in a hub-and-spoke lattice — city/neighborhood hubs → occasion and cuisine guide rails → place pages, with bidirectional "Included In" cross-links (Infatuation's exact skeleton, t03). Use Corner's place-page anatomy (VIBE / WHAT TO GET / THE MOVE / BEST FOR structured-opinion blocks, anchored by verbatim @handle quotes from real posts — t02), Yelp's title formula ("TOP 10 BEST {x} in {city} — Updated {Month Year}," t05), OpenTable's machine-stamped freshness ("As of {date} there are {n} spots rated by San Diego locals," t07), and Eater's named-franchise move — a capped, branded, recurring list ("The Blabberly 25: North County," updated with explicit add/drop changelogs, t04). One dataset, four page layers, all interlinked, all funneling to one waitlist CTA.

---

## BAND 2 — CATEGORY-WIDE BLIND SPOTS (nobody bothered)

### Exploit 5: Trust has no face anywhere. The required-rating-from-people-who-went story is sitting unclaimed.

**The gap.** The category's core currency — "can I trust this score?" — is broken at every incumbent and unanswered by every challenger. Yelp's pooled anonymous averages and resented review filtering are "exactly what Blabberly's required-rating-from-real-visits attacks" (t05). Resy shows "(32K) reviews" with "zero credibility story (who rated? did they go?)" (t06). Corner's answer is to abolish scores entirely, forfeiting any quantified signal (t02). OpenTable's "verified diners" is the only named trust mechanic in the set — and it's text from faceless strangers (t07). Nobody has built the page that says: *here is why our number can't be lied to.*

**The evidence (the playbook already exists, outside food).**
- Duolingo gives proof its own URL: /efficacy, "Duolingo Really Works" — "turns skepticism into a destination and backlink magnet" (t13).
- Phantom designs trust as a product surface: /security with falsifiable specifics, headlined warmly (t12).
- Yelp runs a whole trust subdomain and an annual report — "trust as a marketing destination" (t05).
- The Infatuation manufactures trust through methodology, not testimonials: "Show up unannounced. Pay for everything. Call it like we see it." (t03).

**The move.** Blabberly's methodology writes itself in one sentence — **"Every score comes from someone who actually went. A star rating is required on every post."** — and it deserves three deployments: (1) the homepage hero or its immediate subhead, because it's the sharpest differentiator line in the category (Beli's cautionary tale: their best lines never reached their hero, t01); (2) a dedicated proof page — "Why Blabberly scores are real" — in the /efficacy mold, which also pre-owns the scary queries ("are Blabberly ratings real," "is Blabberly legit") the way Cash App owns /outsmart-scams (t10); (3) a branded, proprietary name said everywhere, the OpenTable "verified diners" move executed harder — because our proof of visit is a video of the meal, not a booking record.

### Exploit 6: No food site converts a not-ready visitor. Waitlist and capture mechanics are absent across Tier A.

**The gap.** The consumer food challengers lose every visitor who doesn't download on the spot: Beli has "no email/waitlist capture anywhere; non-ready visitors bounce with zero retargeting path" (t01); Corner is "iOS-only with no email capture or waitlist — every not-now or Android visitor is lost forever" (t02); Partiful has "no urgency/waitlist/email-capture mechanics on the homepage" (t08); the Infatuation's conversion is "passive… CTAs buried in the footer" (t03). For a pre-launch product whose entire site job is *capture now, convert at launch*, this is the most directly monetizable gap on the map.

**The evidence (the winners' patterns).**
- Strava puts the signup form IN the hero — Google/Apple/Email inline, "account captured on the marketing site before the App Store is ever involved… maps 1:1 to a waitlist-in-hero for Blabberly" (t09).
- Eater's newsletter field is omnipresent — "one email field, 28 flavors, even on the 404 page" (t04).
- Resy's Notify is the masterstroke: "inverting every sold-out dead end into lead capture with re-engagement rights — the model for Blabberly's place-page waitlist CTA" (t06).
- Phantom's site-wide newsletter is the catch-net pattern, weakened only by having "no stated payoff" (t12).

**The move.** One hard conversion event, everywhere: the waitlist. (1) **Hero:** inline email/Apple/Google capture, Strava-style — not a store badge. (2) **Every one of the 1,626 place pages:** a Notify-style CTA with a concrete promise — "Be first to see [venue]'s videos and your % match at launch" — so each SEO page is a capture surface, not a brochure. (3) **Omnipresence:** footer, guide pages, 404, Eater-style. (4) **Concrete payoff:** Phantom's generic newsletter is the anti-pattern; ours states what you get and when. Post-launch, the same slots flip to Download — the master-site doctrine means we design both states now.

### Exploit 7: Nobody models launch energy. Scarcity, founding-member status, and city-rollout heat are unplayed levers.

**The gap.** Every site in the set is post-scale, so none demonstrates pre-launch mechanics: "No urgency/scarcity mechanics at all" (Cash App, t10); "zero launch energy — no scarcity/founding-member playbook" (Strava, t09); "essentially none" (Partiful, Linear, Phantom, Eater). The incumbents replaced urgency with confidence — correct for them, unavailable to us. A pre-launch app gets to pull levers nobody on this map has ever needed.

**The evidence.** Strava's teardown names it explicitly: "we take their trust mechanics and add launch heat ourselves" (t09). Cash App: "founding-member framing, neighborhood-by-neighborhood rollout, and 'join the first 500 San Diego tastemakers' mechanics are levers Cash App never has to pull — and we should" (t10). Phantom's only accidental scarcity ("Launching first in the United States, except in New York") "reads as rollout heat" (t12) — proof the mechanic works even unintentionally.

**The move.** Honest scarcity, never fake countdowns (Strava's trust-over-urgency lesson stands): San Diego County first — named as a privilege, not a limitation; founding-tester framing with a real number; per-neighborhood waitlist counts once they're non-embarrassing ("Duolingo puts learner counts inside the decision UI," t13 — ours go on neighborhood and place cards). The launch window itself is the urgency: "rate your first spot the week we open."

### Exploit 8: The web-to-app bridge is broken everywhere — even at app-first companies.

**The gap.** The category's app funnels are an embarrassment: The Infatuation's /app literally 404s and the real page has one screenshot (t03); Eater's flagship app earned 48 App Store ratings in ~20 months because the site funnel is a bare store link (t04); Cash App's /download silently redirects to the homepage (t10); OpenTable's app page is "a QR code + one line of copy" (t07); Corner "never shows the product — no screenshots, no phone mockups, no feature tour" (t02); Beli shows flat screenshots with no motion (t01). For an app-only product, the bridge IS the business — and nobody has built a good one.

**The evidence (what good looks like).** Linear's /download: platform detection + QR-code desktop→phone handoff (t14). Corner's two genuinely clever plumbing moves: the TikTok in-app-browser escape hatch built for where traffic actually originates, and Branch deep links carrying `intent=save&placeId=` so organic visitors land in-app mid-action (t02). Partiful's CTA-to-product-in-one-click with state pre-loaded via URL params (t08).

**The move.** /download is a real, designed page from day one: store badges, QR code, app rating once live, a 15-second feed video — and pre-launch, it gracefully degrades to the waitlist (Cash App's redirect trap is the named anti-pattern, t10). Place-page CTAs carry deep-link payloads so a visitor who reads about a venue lands in the app with that venue open (Corner's `intent=save` pattern on our already-configured `/place/*` universal links). And the product is *shown working* throughout the site — real UI, real % match, real route — because "a visitor cannot picture the app before downloading" is the Tier A epitaph (t02).

### Exploit 9: Crawl hostility and JS shells. Half the set is invisible to the search and AI-answer layer — be the citable source they refuse to be.

**The gap.** The category is actively retreating from machine-readable surfaces at the exact moment AI answer engines become a referral channel. Yelp "blocks nearly all AI crawlers/answer engines… opting out of AI-era search visibility a young site can claim" (t05). Corner's robots.txt allows only Googlebot and Twitterbot while Vercel 429s everything else — "forfeits Bing/DDG/AI answer engines and breaks link previews" (t02). Beli's 75M reviews are "completely invisible to Google" (t01). And the JS-shell disease infects even the giants: Duolingo's homepage "serves crawlers a title tag and nothing else" (t13); Strava's /features, /about, /maps are "near-empty HTML" (t09); Resy had to build a prerender layer to rescue its own SPA (t06).

**The move.** Server-render or statically generate every page — marketing, place, guide, funnel — no exceptions (Resy's prerender discipline as the floor, t06). Welcome every legitimate crawler including AI answer engines: when someone asks an assistant "best birria in North County," the only deep, structured, crawlable source should be us. Ship Restaurant/LocalBusiness + FAQ schema from day one — Cash App, FAQ-rich and schema-poor, proves even giants leave this on the table (t10). Yelp's one transferable lesson here is crawl-budget sculpting: index the money pages, keep thin surfaces out (t05).

---

## BAND 3 — CRAFT & CONVERSION EXPLOITS (the bar nobody in food clears)

### Exploit 10: No human beings. The entire set markets community without showing a single member.

**The gap.** Strava asserts "100 million" and shows zero real posts or faces (t09). Phantom has 20M users and "no faces, names, quotes, or stories anywhere" (t12). Cash App's proof is badges, "never named humans" (t10). Beli sits on Editors' Choice, 4.9★/15K, and major press and displays *none of it* (t01). The Infatuation and Eater are staff-only voices. The only sites that feel inhabited are Corner (handle-stamped quotes, "SAVED ON CORNER BY" walls) and Partiful (verbatim username-and-date reviews) — and neither is in San Diego.

**The move.** Blabberly's proof should look like actual San Diego (Opal's anti-pattern: testimonial walls of "Instagram engineers and VCs" are "aspirational but distancing," t11). Concretely: real tester quotes with first name + neighborhood ("Marco, North Park"), real @handle-stamped clips embedded site-wide (Corner's UGC-grounding pattern, t02), the Partiful three-layer proof stack adapted to our scale — press/credibility line + hard numbers (4,000 venues, 1,626 written guides, every post star-rated, ~80 testers) + raw human voices (t08). Cash App's repeated proof-strip discipline packages it: one identical bar, stamped near the close of every page (t10). Concrete numbers ARE the voice — "3.25%, $2B+, 59M" becomes "4,000 venues, 1,626 guides, every score from someone who went."

### Exploit 11: The food giants can't tell a story; the storytellers have no food. Own the warm, concrete, appetizing voice.

**The gap.** Yelp's homepage is "pure utility that assumes existing intent — a challenger can out-narrate it completely; Yelp literally cannot ship a 'why we exist' homepage without breaking its utility front door" (t05). Resy buries its only pitch page at an unlinked /welcome (t06). OpenTable "assumes you already know what you want" (t07). Meanwhile the great voices are pointed elsewhere: Partiful's edgelord ceiling "caps restaurant partnerships" (t08), Linear is "emotionally cold — zero warmth, appetite, or human faces" (t14), Opal sells fear and guilt (t11), Duolingo is generic-global (t13). Nobody combines narrative warmth WITH food. The lane is open for desire-driven, concrete, locally rooted storytelling.

**The move.** A worldview hero in the Cash App/Phantom mold ("The way money should work" / category-rename headline, t10/t12) but concrete the way a consumer product must be — Opal's abstract hero is the named risk (t11). Working register: a belief statement about real ratings + tonight's plan, with the subhead doing the literal explaining. Steal structurally, not tonally: Infatuation's decision-relief framing ("let us help you make a decision," t03), Corner's positioning-by-analogy compression ("GOOGLE MAPS BUT SOCIAL," t02), Linear's two-beat tagline construction ("Built for the future. Available today.," t14), Strava's identity-granting copy ("If you sweat, you're an athlete" — admit the reader to a club, t09). Every line passes the hungry-friend-at-7pm test (t14). Playful-warm, sunset-toned, zero edgelord tax — and never the word the brand forbids.

### Exploit 12: Programmatic SEO with a soul. The giants' templated pages are voiceless; the one voiced player locked theirs in a closet.

**The gap.** Strava's route pages are "competent but voiceless" (t09); Yelp's and OpenTable's templates are ruthless and personality-free; Eater's blurbs have voice but no per-venue permanence and no user signal (t04). Corner alone cracked programmatic-with-personality — guide titles like "Worth the Resy Notification" and "Main Character Energy" (t02) — then blocked every crawler except Google from reading them. The combination of scale + voice + crawlability exists nowhere.

**The move.** Blabberly's enriched About copy and anticipatedQueries data already exist — the differentiator is editorial treatment at programmatic scale: Corner's structured-opinion blocks and personality-forward guide titles (t02), the Infatuation's "Perfect For" occasion taxonomy multiplying SEO surfaces per venue and matching how people actually search (t03), Eater's query-mirroring intros — open the page on the user's literal question: "Where should I eat in Carlsbad tonight?" (t04). Each guide entry grounded by a real @handle quote and a real clip, which is unique content Google rewards and no competitor can synthesize (Yelp's review-derived-content moat, rebuilt on stronger raw material, t05).

### Exploit 13: Brand-system discipline. The food category's design floor is low enough to step over in one release.

**The gap.** The closest direct competitor runs "a stock Squarespace template — feels rented, not designed" (t01). Yelp is "cluttered, ad-interrupted" (t05); OpenTable "reads a generation older" (t07); Resy is three stacks with visible seams and an untranslated template string leaking into the page shell (t06). Meanwhile Tier B proves what total discipline buys: Cash App's fluorescent green styled like a streetwear drop (t10), Strava's one orange at full saturation (t09), Duolingo's brand-system-equals-product-system (t13), Linear's one rationed accent (t14), Resy's typography-bought premium feel (t06).

**The move.** The sunset gradient is Blabberly's neon green — committed at full saturation, not sanded down for "credibility" (Cash App's explicit lesson, t10). One great display face + food video + photographer/creator credits buys the premium feel the Resy way — typography and imagery discipline, not animation budget (t06). Opal's glow system maps directly: product UI floating in sunset-gradient ambient fields, one hue per named feature (t11). And the deliberate contrarian position: the entire SaaS aesthetic has converged on dark-mode-and-glow — "a sunset-warm light site with the same typographic discipline is instant differentiation" (t14). Warm, light, appetizing — the visual register nobody in EITHER tier occupies.

### Exploit 14: Template and CTA discipline. One page machine, one verb, one funnel — a standard no food site meets.

**The gap.** Eater greets a new visitor with "an editorial firehose, a shop, and three sibling brands but no single conversion path" (t04). Yelp splits across search, review, business, and app asks. Beli is single-minded but has only one ask available (download) and no fallback (t01). Nobody in food runs the conversion machine Tier B treats as table stakes.

**The move.** Cash App's product-page template, adopted wholesale: hero → benefit blocks → trust section → FAQ → proof strip → one hard CTA — designed once, inherited by every feature page (feed, % match, routes, plans) and adapted for all 1,626 place pages (t10). The two-speed CTA system on top: soft "Explore" links for depth, every hard CTA converging on the one waitlist funnel, campaign-tagged per page (t10). Duolingo's homepage discipline as the ceiling to aim at: minimal nav, every section CTA resolving to the same action (t13). Opal's single verb everywhere (t11). FAQ blocks on every product page doing double duty as objection handling and long-tail SEO — with the schema markup the giants forgot (t10).

---

## The compounding play

These exploits are one system, not fourteen options. The place pages (E4) carry the video (E1), the % match teaser (E2), the trust story (E5), the structured voice (E12), and the waitlist capture (E6) — each page is simultaneously an SEO asset, a proof surface, and a conversion surface, which is exactly the Resy/OpenTable atomic-unit model executed with the soul they lack. The guides lattice cross-links the place pages (E4, E12) and feeds the named-franchise freshness loop (E4). The night-out pillar (E3) and shared-route public pages (E3, E8) recruit through the social graph the way Partiful's invites do. The brand system (E13) and template discipline (E14) make all of it ship as one designed thing instead of accreted pages. And because every one of these is either structurally closed to competitors (Band 1) or demonstrably neglected by all of them (Bands 2–3), the site doesn't need to out-spend anyone — it needs to be the first food site that is simultaneously crawlable, watchable, personal, local, and capturing.

**The single sentence version:** every competitor's website makes you read about food someone else liked; blabberly.com shows you food *you'll* like, on video, from your own county, from people who actually went — and writes your name down before launch day.

---

# 7. Appendix: Competitor Teardowns

The fourteen full teardowns as researched 2026-06-11, included unabridged. [NOT DIRECTLY OBSERVED] tags mark findings triangulated from sources other than a live page fetch and are preserved intact.

---

## T01. Beli (beliapp.com)
*Researched 2026-06-11.*

### Beli (Tier A)

**Why they matter:** The closest direct competitor — social restaurant ranking
app with comparative ("this vs. that") scoring, taste-match recommendations,
friend feeds, lists, and maps. ~$12M raised (FirstMark, Goodwater), ~75M
reviews across 30,000 cities as of Sept 2025, 80% of users under 35, App Store
Editors' Choice, 4.9★ on ~15K ratings [context via Wikipedia + App Store, not
the site itself]. And yet: their entire web presence is a thin Squarespace
brochure. The literal HTML comment in their homepage source reads
`<!-- This is Squarespace. -->`. A $12M Gen-Z food company runs the category's
default playbook — app-store-badge landing page, near-zero web content — which
is exactly the opening Blabberly's SEO-engine strategy attacks.

#### Sitemap & page inventory — what pages exist and what each is for

From sitemap.xml + crawl: ~27 distinct URLs total. That is the whole site.

| Page | Purpose |
|---|---|
| `/` and `/beli-home` (title: "Your Personal Restaurant Critic") | Main landing page. Hero + 3 feature pillars + app-store badges. That's it. |
| `/ourstory` and `/meet-the-team` | Founder story (Eliot & Judy), one photo, first-person narrative. |
| `/jobs` | Mission blurb + "See Jobs" link out to a Breezy HR board. No roles listed on-site. |
| `/store` + 3 product pages | Merch: hoodie ("Get in my Beli"), crewneck, cap. Squarespace commerce (cart, sign-in in nav). |
| `/nyc-burger-search` | "NYC's 56 Best Burgers, Ranked" — their ONE serious content/SEO asset. Ranked list w/ Beli scores (5.2–10.0), photos per entry, neighborhoods, recommended dish, app CTAs interleaved. |
| `/nyc-italian-sandwich-search` | "NYC's 31 Best Italian Sandwiches, Ranked" — same format, second of only two guides. |
| `/social-media` | A "Gallery" page pointing at IG/TikTok (@beli_eats). |
| `/guide-subscriptions`, `/paid-guides-terms-subscriber`, `/paid-guides-terms-creator` | Support/legal pages for in-app paid creator guides — monetization exists, but marketed in-app, not on the web. |
| `/contact-us`, `/feature-requests`, `/feedback`, `/partnerships`, `/bugs`, `/press-inquiries`, `/missing-referral`, `/ig-invite` | Form/utility pages. Notably `/missing-referral` implies an in-app referral program with edge cases handled via web form. |
| `/app-privacy-policy`, `/terms-of-service`, `/app-cookie-use`, `/app-cookie-details` | Legal. |

**What does NOT exist:** no city pages, no restaurant/place pages, no blog, no
press page, no testimonials page, no web app, no pricing page (Beli Supper
Club — their invite-only NYC subscription — isn't marketed on the site at
all). 75 million reviews and not one of them is visible to Google.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

- **Headline:** "Track and share your favorite restaurants with your friends"
- **Subhead:** effectively none — straight to "Download now on the App Store and Play Store"
- **Primary CTA:** dual app-store badges (Apple + Google Play). No waitlist, no email capture, no web signup.
- **What's shown:** a screenshot of the app's map interface with restaurant pins.
- **First-10-seconds story:** "This is an app. It tracks restaurants. Download it." The page assumes you arrived already convinced — from TikTok, a friend's invite link, or press. The website is a badge-holder, not a persuasion engine. Site `<title>`/SEO positioning is the utilitarian "Beli App | Restaurant List Keeping" — they're literally indexed under "list keeping," not "best restaurants" or "where to eat."
- The App Store subtitle ("Your top restaurants, ranked") is punchier than anything on the website hero.

#### Narrative arc — how the homepage sells, section by section, in order

It barely has one. The full arc:

1. **Hero** — headline + app badges + map screenshot.
2. **"Welcome to Beli" — three pillars**, each with an app screenshot:
   - **Track:** "Keep organized lists and maps of everywhere you've been and want to try"
   - **Share:** "See where your friends are eating, and what they love and hate…"
   - **Discover:** "Find the best restaurants through personalized recs and top lists"
3. **Footer** — repeated download badges, social links, legal.

That's the whole homepage: one hero, one three-up feature row, footer. No
testimonials, no press strip, no "how it works," no demo video, no community
numbers, no FAQ. The Track → Share → Discover ordering is the one structurally
smart choice: it mirrors the actual product loop (log your own meals → see
friends' → get recs), leading with the single-player utility that works on
day one before the network effects.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **Single conversion event:** app-store download. Badges appear in hero, nav ("Download Beli"), guide pages (mid-page + footer), and every footer.
- **No email/waitlist capture anywhere.** No web account creation (the "Sign In" in nav is Squarespace commerce for merch). Anyone not ready to download right now is lost with zero retargeting surface.
- **Social proof: essentially none on-site.** No ratings badge, no "75M reviews," no press logos, no Editors' Choice mention — all of which they HAVE and could deploy for free. Their proof lives entirely on the App Store listing and TikTok.
- **Urgency/scarcity: none on the website.** Their actual growth mechanics — leaderboards, streaks, invite/referral flows, college leaderboards, invite-only Supper Club — are all in-app. The web sees only the residue (`/missing-referral`, `/ig-invite`).
- **Guide pages as conversion**: the burger/sandwich guides deliberately withhold the interactive payoff — "See the full ranked list and map on the Beli app" — turning content into a download gate. The list is on the page (SEO-readable) but the map/save/track experience requires the app. This content-as-teaser gating is their one genuinely clever web conversion move.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

- **Platform:** stock Squarespace template (confirmed in source), Adobe Typekit webfonts. Layout is standard Squarespace stacked sections — centered hero, three-column feature row, long-scroll guide pages.
- **Color:** clean/minimal — white background, black Beli wordmark, restrained accents. The brand color (a teal/blue-green in the app icon and UI) appears mainly inside screenshots rather than as a site-wide system. [Exact palette/typeface names NOT DIRECTLY OBSERVED — Typekit kit is obfuscated.]
- **Motion/animation:** none observed; static pages.
- **Imagery split:** product-UI screenshots on marketing pages (map view, lists, feed); real food photography only on the two guide pages (60+ burger photos, 31+ sandwich photos — their best visual asset, buried two clicks deep).
- **How the app is shown:** flat screenshots, not device frames or interactive demos; no video, no animated walkthrough. The product — which is genuinely visual (scores, maps, ranked lists) — is undersold by its own website.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Tone: casual, friend-to-friend, founder-personal. Vocabulary of tracking and
taste: "track," "share," "discover," "lists," "maps," "recs," "love and hate."

Worth studying (quoted):
- "Track and share your favorite restaurants with your friends" (hero)
- "Your top restaurants, ranked" (App Store subtitle — their best line, not on the site hero)
- "Your Personal Restaurant Critic" (page title on /beli-home — second-best line, also buried)
- "Find the best restaurants through personalized recs and top lists"
- "See where your friends are eating, and what they love and hate…"
- "We are two individuals who love food." (Our Story opener)
- "…a product where you no longer had to search — one that knew your tastes and told you the places that you would love." (Our Story — the clearest articulation of the taste-match promise anywhere on the site)
- "Help create a world that celebrates individual taste" (Jobs page — a genuinely good mission line, wasted on the careers page)
- Guide voice: "We've tried them all so you don't have to." / "See the full ranked list and map on the Beli app."

Pattern: their sharpest positioning lines ("ranked," "personal restaurant
critic," "celebrates individual taste") are scattered across the App Store,
page titles, and the jobs page — while the homepage leads with the flattest
one. The copy system has good raw material and no editorial hierarchy.

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

- **Footprint: ~27 URLs.** Two real content pages (NYC burgers, NYC Italian sandwiches). No blog, no city hubs, no cuisine pages, no programmatic place pages, no user/list pages on the web.
- The two guides prove the model works for them — ranked-list + photos + neighborhoods + app-gated map is a strong template — and then they stopped at two, in one city.
- **The structural choice:** all 75M reviews, every restaurant score, every leaderboard and list is locked inside the app. Google cannot see Beli's data. Someone searching "best burgers Carlsbad" or "[restaurant name] rating" will never land on Beli. Their acquisition is TikTok/IG virality + word-of-mouth + App Store browse — strong channels for Gen-Z NYC, but they've ceded the entire search surface.
- Site-wide SEO basics are weak even where pages exist: title pattern "Beli App | Restaurant List Keeping" targets nothing anyone searches; meta description is feature-speak.
- [NOT DIRECTLY OBSERVED: any separate web-app subdomain or deep-link landing pages for shared lists/restaurants — none surfaced in sitemap, site search, or web search; shared content appears to resolve into the app via store redirect.]

#### What they do BEST — steal-worthy moves, named specifically

1. **Track → Share → Discover pillar ordering.** Leads with single-player utility (works with zero friends), then the social layer, then the algorithmic payoff. Blabberly's homepage section order should follow the same value-ladder logic (watch real local videos → see real ratings/% match → plan the night out).
2. **Content-as-teaser app gating on the guides.** Full ranked list on-page for SEO and skimmers; the map + save + personal tracking gated behind download ("See the full ranked list and map on the Beli app"). Blabberly's 1,626 enriched place pages should run the same split: rich readable page for Google, with the videos/% match/route-planning payoff as the app/waitlist hook.
3. **The ranked-list guide format itself.** "NYC's 56 Best Burgers, Ranked" — number + superlative + city + "Ranked," entries with score, neighborhood, photo, one recommended dish. This is a proven, repeatable SEO template Blabberly can run per-city/per-cuisine in SD County from day one ("Carlsbad's 23 Best Tacos, Ranked by People Who Went").
4. **Founder-story authenticity.** "We are two individuals who love food" + one candid photo. Cheap, human, on-brand for a taste-driven product. Blabberly's 4-founder SD story can do the same in one page.
5. **Single-minded conversion clarity.** Whatever else is wrong, no visitor is ever confused about the ask: download the app. Pre-launch Blabberly needs the same singularity — one ask (waitlist/TestFlight), everywhere.
6. **Score language as identity.** Beli scores (the 0–10 number) appear in their guides as editorial currency — "Beli rating 9.0." Blabberly's required-rating-from-people-who-actually-went is a stronger version of the same asset and should be branded as visibly.

#### What they do WORST — the openings we exploit

1. **Zero web surface for their data.** 75M reviews invisible to Google. Blabberly publishing 1,626 enriched place pages pre-launch (with universal links already configured) claims a surface Beli has structurally abandoned. This is the single biggest exploit — and it compounds: every place page is a landing page Beli doesn't have.
2. **No email/waitlist capture.** Anyone not ready to download bounces forever. Blabberly's pre-launch site converts the same visitor into a waitlist contact we can activate on launch day.
3. **No social proof despite having mountains of it.** Editors' Choice, 4.9★/15K ratings, 75M reviews, major press — none of it on the site. Blabberly should show its proof (tester quotes, venue counts, real ratings) even at alpha scale.
4. **Generic template, no brand system on the web.** Stock Squarespace, no motion, no color identity, flat screenshots. Blabberly's sunset-gradient system, shown consistently, makes the brand feel designed where Beli's feels rented.
5. **Their best copy is misplaced.** "Your Personal Restaurant Critic" and "Your top restaurants, ranked" never reach the homepage hero. Blabberly should put its sharpest differentiator line (real ratings from people who actually went + % match) in the hero, not the footer.
6. **Content engine stalled at two guides, one city.** They validated the format and never scaled it. A small team with an enrichment pipeline (which Blabberly already has) can out-publish them 100:1 in its home market.
7. **No web story for the night-out layer.** Beli is solo-tracking-first; group planning barely exists in their product or site narrative. Blabberly's plans/polls/multi-stop routes is whitespace Beli's site never touches.
8. **NYC-centric content in a global app.** Nothing local outside NYC. In San Diego County specifically, Beli has zero content gravity — Blabberly can own its home turf's search results before Beli ever notices.

---

## T02. Corner (corner.inc)

Researched 2026-06-11. The live site sits behind a Vercel Security Checkpoint (JS bot challenge) and its robots.txt disallows ALL crawlers except Googlebot and Twitterbot — direct fetches return 429. Everything below was reconstructed from Wayback Machine snapshots (homepage 2026-04-03; guides/place/profile pages Dec 2025–Apr 2026), the Wayback CDX index, sitemap shards, the App Store listing, and press triangulation. Items not directly observed are marked.

### Corner (Tier A)

**Who:** Corner International, Inc. — "social map" for Gen Z. Founded by Eliza Wu (CEO) + Jake Xia (CTO), NYC. ~$3.75–3.8M raised (Abstract Ventures + angels [press-reported, NOT DIRECTLY OBSERVED on site]). Claude-powered semantic search ("places to cowork from", "romantic wine bars") per press. App Store: "corner: curate & share places" (id1668282277), Social Networking, 4.5★ / 686 ratings, subtitle "personalized map with friends." 275K+ user-contributed locations per press; site claims 125K users across 425 cities (Apr 2026).

#### Sitemap & page inventory — what pages exist and what each is for

Two-stack architecture: a **Framer marketing layer** (homepage, shop) and a **Next.js content/SEO layer** (guides, places, profiles, lists) on Vercel.

| Page | Purpose |
|---|---|
| `/` (Framer, single long scroll) | Manifesto + download. Nav: guides, about, shop, contact, download now. "about" and "contact" appear to be scroll anchors on the homepage (no separate archived pages; team + contact sections live on `/`). |
| `/guides` | Guides hub. Title: "City Guides • Corner". Meta: "Discover the coolest places anywhere in the world, curated by over 80,000 global tastemakers in local communities." Sells the editorial model, lists ~35 cities with guide counts. |
| `/guides/{city}` | City hub (e.g. New York City — meta: "177 curated guides from locals"). Sections: HOT LISTS THIS WEEK, Neighborhoods, then guide links grouped EAT / CAFES / (more). |
| `/guides/{city}/{neighborhood}` and `/guides/{city}/{neighborhood}/{topic}` | Programmatic intent articles, e.g. `/guides/new-york-city/financial-district/vegan-brunch` → "Best Vegan Brunch Spots in Downtown Manhattan." Dated, bylined "Corner Editorial," numbered place list with editorial blurbs + verbatim user-review quotes + SAVES counts + Related Guides. ~2,071 guide URLs in sitemap shard 0. |
| `/place/{id}` | Programmatic place pages at enormous scale — sitemap has 47 shards; sampled shard contained 10,000 place URLs each → plausibly 300–400K+ place pages. Full anatomy below. |
| `/{username}` | Public user profiles ("1137mhz's corner • explore new places"): follow button, places count, following/followers, home city, curations. |
| `/list/{uuid}` | Shared curated-list pages (six are linked straight from the homepage). |
| `/shop` | Merch ("corner.inc — merch overview"). JS-rendered; contents [NOT DIRECTLY OBSERVED]. |
| `/wtfdwg/vol1` | In sitemap — likely a "WTF Do We Go" editorial/zine volume [NOT DIRECTLY OBSERVED]. |
| `robots.txt` | `User-agent: * Disallow: /` with explicit allows only for Googlebot and Twitterbot. Deliberate cloaking: Google-only SEO, everyone else (Bing, DuckDuckGo, AI answer engines, scrapers, link-preview bots other than Twitter) is shut out. |

No pricing page, no business/partner page, no blog in the classic sense (guides ARE the blog), no web-app map, no Android link observed.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

- **Headline:** `the map for people who care where they're going` (all lowercase)
- **Kicker/overline:** `GOOGLE MAPS BUT SOCIAL.` (also the meta description: "Google Maps but social. Find the coolest places in any city. Join our growing community of 60,000+ users.")
- **Proof line:** `join our growing global community of 125K users across 425 cities`
- **Secondary statement:** `find better places.` flanked by badges `ZERO ADS` / `ZERO INFLUENCERS`
- **Primary CTA:** `download now` → App Store (no email capture anywhere)
- **What's shown:** a hero video (framerusercontent mp4) + GIF accents; handwritten doodle-font annotations over a clean black/white layout [video content NOT DIRECTLY OBSERVED — only the asset reference]
- **First-10-seconds story:** "You already know Google Maps and review sites are broken. This is a map made of taste, by people like you, with no commercial pollution. Download it." It positions against an incumbent in four words ("GOOGLE MAPS BUT SOCIAL") — instant comprehension via analogy, then differentiates on purity (zero ads/influencers) and scale (125K users).

Note the inconsistency: meta says 60,000+ users, hero says 125K, guides page says 80,000 tastemakers — three different numbers live at once.

#### Narrative arc — how the homepage sells, section by section, in order

One long scroll, five beats:

1. **Manifesto hero** — "the map for people who care where they're going" + GOOGLE MAPS BUT SOCIAL + user count + download.
2. **Purity badges / value statement** — "find better places." ZERO ADS. ZERO INFLUENCERS. (The anti-Yelp, anti-sponsored-content position as visual stamps.)
3. **"our story"** — a genuine manifesto, verbatim: *"we take places seriously because they're where our memories are made. where our lives are lived. / so why do we decide where to go based on how viral it is? how aesthetic? how 1,000 random people rated it? / we built the first map for people who actually care about where they're going."* Then: "Since then, we've grown into a small but mighty team, passionate in building you the most amazing app to connect with the people and places you love."
4. **"our team"** — five named humans with roles (Eliza Wu Founder/CEO, Jake Xia Founder/CTO, Annie Gao Creative Lead, Can Kacmaz Lead iOS Dev, Namay Jindal Engineer) + a photo captioned `our nyc HQ <3`. Founder-as-product authenticity play.
5. **Contact + socials** — "we'd love to hear from you!! for questions or feedback, reach out to hello@corner.inc / for press and partnership inquiries, reach out to annie@corner.inc / follow us on socials:" (Instagram @thecornerapp, TikTok @thecornerapp, X @buildyourcorner). Footer: guides · about · shop · contact · download now.

It's an identity sell, not a feature sell. Zero feature screenshots, zero "how it works," zero FAQ. The pitch is entirely worldview: if you agree ratings/virality are broken, you belong here.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **Single conversion goal:** App Store install. `download now` on the marketing site; persistent `Download Corner` / `Download` buttons on every guides/place/profile page. No waitlist, no email capture, no Android.
- **TikTok in-app-browser escape hatch** (clever, observed on homepage): *"TikTok blocks appstore links. Open this page in the browser to download the app. 1️⃣ tap the ••• 2️⃣ select 'Open in Browser'"* — they engineered the site for where their traffic actually originates.
- **SEO→app deep links:** CDX shows Branch.io links of the form `?intent=save&placeId=...&utm_source=corner_app&utm_campaign=seo` — place pages deep-link into the app with the save intent pre-loaded, so SEO visitors land in-app already mid-action.
- **Contribution-as-fame loop** (guides hub): *"Looking to get involved? Download the app and add your reviews for a chance to get featured in our articles!"* — UGC flywheel doubling as a conversion hook.
- **Social proof:** user counts (125K users / 425 cities; "80,000 gen z tastemakers"), per-place SAVES counts with weekly velocity ("527 saves (+28 this week)"), local rank badges ("🏅 6th in the area"), "SAVED ON CORNER BY" rows of real handles, verbatim user quotes with @handles and recency stamps ("@giannab, 4w ago").
- **Urgency/freshness mechanics:** "HOT LISTS THIS WEEK," guide series named "Currently Buzzing," "Just Dropped," "Right Now," "Fresh On The Scene"; "Our articles are updated daily, backed by real time activity and changes from users."
- No press logos, no testimonials carousel, no app-store rating display on site [NOT DIRECTLY OBSERVED anywhere on archived pages].

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

- **Marketing layer:** Framer-built. Black/white base with electric blue `#09f` accent and soft pink `#ffd9f0`; system-clean body type (Inter / Inter Variable, Public Sans) punctuated by a handwritten doodle font ("Hello-Scratchy Doodles") — scrapbook-over-minimalism, very Gen Z zine energy. Hero video + GIF assets supply motion [animation specifics NOT DIRECTLY OBSERVED].
- **All-lowercase styling** for headers and nav ("guides," "download now," "our story") with occasional ALL-CAPS stamps (ZERO ADS, GOOGLE MAPS BUT SOCIAL) for emphasis contrast.
- **Humanity over polish:** founder headshots, "our nyc HQ <3" photo, emoji in body copy.
- **Content layer:** clean editorial — numbered lists, place photos, emoji category tags ("☕️ coffeehouse classics," "🍩️ matcha & donuts"), saves counters, quote blocks for user reviews. Reads like The Infatuation rebuilt by a product team.
- **Product UI on the website:** essentially absent outside the hero video — no screenshot galleries, no phone mockups observed. The content pages effectively ARE the product demo (web mirrors of in-app place/list/profile views).

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Lowercase, intimate, anti-establishment, meme-literate but editorially confident. Worth studying verbatim:

- "the map for people who care where they're going" (hero)
- "GOOGLE MAPS BUT SOCIAL." (positioning-by-analogy in four words)
- "find better places." / "ZERO ADS" / "ZERO INFLUENCERS"
- "get off your phone and go outside" (guides page `<title>` tagline)
- "PLACE RECOMMENDATIONS FOR GEN Z, BY GEN Z."
- "Corner is a living, breathing map reflective of the culture."
- "We're tired of seeing the same tourist traps all over social media, out-of-touch critics, and sneaky advertisements dressed up as authentic reviews."
- "MEET THE WRITERS: IT'S YOU! — We don't believe in critics or having one voice represent the collective experience of a place."
- "…secret nuggets you can't find elsewhere (i.e., where the alt girls go out in Brooklyn.)"
- "We will never show you soulless chain establishments or financially incentivized reviews."
- "so why do we decide where to go based on how viral it is? how aesthetic? how 1,000 random people rated it?"
- App Store: "No bots, no ads, just vibes." / "The more you use corner, the more it learns your unique taste."
- Guide-title voice: "Worth the Resy Notification: Best Upscale Restaurants NYC," "Get Sh\*t Done: Best Cafes for Remote Work in Brooklyn," "Main Character Energy: Best Aesthetic Cafes in West Village," "Café & Yap: Best Coffee Shops for Remote Work in LES," "Plug In & Pour Over," "Werk Not Work," "Feed Your Feed."

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

This is the most serious part of their website. Footprint:

- **47 sitemap shards.** Shard 0 ≈ 2,074 URLs (almost all `/guides/*`); sampled mid-shards contain **10,000 `/place/{id}` URLs each** → total plausibly **300–400K+ indexed URLs**, overwhelmingly place pages, plus profiles and lists.
- **Guide lattice:** city (35+ cities, counts displayed: Lisbon 482, LA 475, NYC, Tokyo, SF, London, Toronto, Seoul, Paris, Singapore, down to Osaka 13) → neighborhood → **intent topic** (vegan brunch, gluten-free, dog-friendly, late-night, remote-work cafes, date spots, kid-friendly, rooftop, matcha). Classic programmatic head×modifier coverage, but written with personality.
- **AI-generated, UGC-grounded editorial:** each guide entry is a synthesized blurb (almost certainly Claude-written from user reviews) anchored by a verbatim user quote with @handle. Dated, bylined "Corner Editorial," with SAVES counts and Related Guides. "Our articles are updated daily, backed by real time activity."
- **Place-page anatomy (the steal-worthy template):** name + emoji descriptor + address/neighborhood + SAVES → hours + "Updated April 3rd, 2026" + Directions/Site/Call → one-line summary → structured opinion blocks: **VIBE / WHAT TO GET / THE MOVE / BEST FOR** → "What people are saying" (user quotes w/ recency) → "SAVED ON CORNER BY" handle wall → "Places you might also like" (rank badge + saves + weekly delta) → "Featured on" (guide cross-links) → "From Curators" (user lists) → boilerplate footer pitch: *"Corner is the best map for finding the coolest places where young people are going. We serve you authentic, culturally relevant recommendations from friends and people your age."* + city link wall. Dense internal-linking lattice: place ↔ guide ↔ curator-list ↔ city.
- **SEO→install plumbing:** Branch deep links with `utm_campaign=seo` carrying `intent=save&placeId=` payloads.
- **The paradox:** robots.txt blocks every crawler except Googlebot + Twitterbot, and Vercel's challenge 429s everything else. They've bet the entire organic channel on Google alone and forfeited Bing/DDG/AI-assistant discovery, plus broken link unfurls on most platforms.

#### What they do BEST — steal-worthy moves, named specifically

1. **The place-page opinion template (VIBE / WHAT TO GET / THE MOVE / BEST FOR).** Four scannable, opinionated blocks that make an AI-enriched page feel like a friend's text, not a database row. Blabberly's 1,626 enriched place pages should adopt an equivalent structured-opinion skeleton, not paragraphs.
2. **UGC-grounded AI editorial.** Every synthesized blurb is pinned to a verbatim user quote with @handle and recency ("@giannab, 4w ago") — authenticity and scale simultaneously. Blabberly's required-rating posts are even stronger raw material for this.
3. **Programmatic intent lattice:** city → neighborhood → intent ("vegan brunch in FiDi") with dense cross-links (place ↔ guide ↔ curator list). Hundreds of thousands of pages from one data model.
4. **Living-map social proof:** saves with weekly velocity ("+28 this week"), "🏅 6th in the area" rank badges, "HOT LISTS THIS WEEK," "updated daily." The site feels alive, never archival.
5. **Positioning-by-analogy hero:** "GOOGLE MAPS BUT SOCIAL." Four words, instant comprehension, picks a fight with an incumbent. Then "ZERO ADS / ZERO INFLUENCERS" as trust stamps.
6. **The manifesto:** "so why do we decide where to go based on how viral it is? how aesthetic? how 1,000 random people rated it?" — an emotional 'why' before any feature talk.
7. **TikTok in-app-browser escape hatch** — instructions for breaking out of TikTok's webview to reach the App Store. They built for their actual traffic source.
8. **SEO-to-app deep links** with pre-loaded save intent (`intent=save&placeId=`) — organic visitors land in-app mid-action, not on a cold start screen.
9. **Contribution-as-fame loop:** "MEET THE WRITERS: IT'S YOU!" + "add your reviews for a chance to get featured in our articles" — the content engine recruits its own writers.
10. **Guide titles with a voice** ("Worth the Resy Notification," "Café & Yap") — programmatic SEO that doesn't read programmatic.

#### What they do WORST — the openings we exploit

1. **The website never shows the product.** No screenshot galleries, no phone mockups, no feature tour — just a hero video and vibes. A visitor cannot picture the app before downloading. Blabberly's site should be drenched in real product UI and real food video.
2. **No video, period.** Corner is photo-and-text. Food is a sensory category; Blabberly's short-video feed is a structural advantage Corner's web presence can't answer.
3. **Anti-rating dogma forfeits quantified trust.** "How 1,000 random people rated it?" is their villain — so they offer NO quality score at all, only saves. Blabberly's counter is sharper: a required star rating from people who verifiably went, plus % match. We can agree ratings-by-randoms are broken AND still give users a number they can trust.
4. **The taste algorithm is invisible on the website.** "The more you use corner, the more it learns your unique taste" lives only in App Store copy; the site never sells the intelligence. Blabberly should make % match the visible, demo-able hero mechanic.
5. **Stale, conflicting numbers:** 60,000+ (meta) vs 125K (hero) vs 80,000 tastemakers (guides) simultaneously. Sloppiness that erodes the authenticity claim.
6. **Google-only SEO bet:** robots.txt blocks all other crawlers and the Vercel challenge 429s everything — no Bing/DDG, no AI answer engines (a growing referral channel), broken link previews on most non-Twitter platforms. Blabberly should be maximally crawlable and answer-engine-friendly.
7. **Global-thin, not local-deep:** 35 cities worldwide, no San Diego presence at all in their city list; non-flagship cities have a handful of guides. Blabberly owns SD County with ~4,000 venues of depth they cannot match locally.
8. **iOS-only, web-view-only:** no Android observed, no usable web map, every path dead-ends at the App Store. No email capture means a not-now visitor is lost forever — Blabberly's pre-launch waitlist is exactly the mechanism they lack.
9. **No night-out layer:** Corner ends at "save it to a list." No group decision tools, no plans, no multi-stop routes — Blabberly's social-coordination story is uncontested ground.
10. **Guides hub IA is a wall of links** — hundreds of titles in undifferentiated columns; impressive but unbrowseable. A curated, taste-personalized entry point would beat it.

---
*Sources: Wayback Machine snapshots of corner.inc (homepage 2026-04-03; /guides 2025-12-12; /guides/new-york-city 2025-11-28; /guides/new-york-city/financial-district/vegan-brunch 2026-03-04; /place/10011 2026-04-04; /1137mhz profile 2026-02; sitemap shards 2025-12-17), Wayback CDX index, live robots.txt via archive, Apple App Store listing id1668282277, and press (Business Insider via syndication, PitchBook, People of Color in Tech, GenZ Entrepreneurship).*

---

## T03. The Infatuation (theinfatuation.com)

Researched 2026-06-11 via live WebFetch of homepage, /about, /new-york, /san-diego, /mobile-apps, /newsletter, /new-york/guides/best-restaurants-nyc, /new-york/reviews/lindustrie-pizzeria, /new-york/perfect-for/date-night, /all/features/new-infatuation-ratings-relaunch, plus WebSearch triangulation. Anything not directly observed is marked.

### The Infatuation (Tier A)

#### Sitemap & page inventory — what pages exist and what each is for

The site is a content machine with a small marketing shell around it. Observed architecture:

- **`/` (homepage)** — national front door. Editorial mosaic: featured national guides, then a city-by-city carousel stack (NY, LA, Miami, Chicago, London, SF...). Job: route you to your city.
- **`/{city}` (city hubs, ~13 newsletter cities, 40-50 cities total in app)** — e.g. `/new-york`, `/san-diego`. Each is a self-contained mini-homepage: hero guide, "Let Us Help You Make a Decision" guide rail, "New Reviews & First Looks," themed sections ("The Spots Of The Summer," "Best Of NYC"). Sub-navigation: **Neighborhoods, Perfect For, Cuisines, Guides, Reviews** — five programmatic taxonomies per city.
- **`/{city}/reviews/{slug}` (individual review pages)** — the atomic SEO unit. Numeric rating (e.g. 9.1), address, price tier, cuisine tag, "Perfect For" tags, Food Rundown (dish-by-dish), photographer-credited photos, author byline + bio, Google Maps link, "Included In" guide cross-links, related reviews.
- **`/{city}/guides/{slug}` (guide/listicle pages)** — the traffic engines. "Top 25: The Best Restaurants In NYC", "The Hit List: New NYC Restaurants". Ranked entries with rating, blurb, Perfect For tags, save button, map link, Resy/OpenTable reservation buttons, multi-author bylines, date stamps.
- **`/{city}/perfect-for/{occasion}`** — programmatic occasion hubs (Date Nights, Late Night Eats, Girls' Night Out...). Curated guides + top-rated spots + full review feed for that occasion. Confirmed live and well-structured.
- **`/{city}/cuisines/{cuisine}`, `/{city}/neighborhoods/{hood}`** — same pattern for cuisine and neighborhood taxonomies [structure inferred from nav; individual pages NOT DIRECTLY OBSERVED].
- **`/about`** — mission + methodology ("show up unannounced / pay for everything / call it like we see it") + Chase partnership + careers.
- **`/mobile-apps`** — thin app-download page (headline + one map screenshot + store badges).
- **`/newsletter`** — 14 newsletter editions (13 cities + National/Travel), multi-select checkbox signup.
- **`/all`** — global review/guide index ("All Restaurant Reviews"); national guides like "The 13 Best Restaurants In America."
- **Features/editorial** — `/features/...` essays and announcements (e.g. ratings relaunch post).
- **Community** — `community.theinfatuation.com` subdomain exists [NOT DIRECTLY OBSERVED in detail].
- **EEEEEATSCON / Experiences** — events arm, linked from footer as "Experiences" [NOT DIRECTLY OBSERVED in detail].
- **Legal/utility** — /terms, /privacy, careers, contact, sitemap.

San Diego is live and covers Blabberly's exact turf: Carlsbad, Encinitas, North Park, Little Italy, Downtown, North County section — but with only ~4 guides and ~15-20 visible reviews. Thin coverage relative to NYC.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

- **Headline:** "let us help you make a decision" — lowercase, conversational, anti-corporate. This line is the brand thesis and recurs site-wide (homepage, city pages, app page).
- **Subhead:** none. The headline carries it alone.
- **Primary CTA:** none in the classic sense — no signup wall, no app modal. The hero is a featured guide with food photography; the implicit CTA is "start reading."
- **What's shown:** a large 16:9 editorial food photograph from a featured guide.
- **First-10-seconds story:** "You're hungry, you can't decide, we're the opinionated friend who's already eaten everywhere. Pick your city and we'll tell you exactly where to go." It sells utility-through-editorial, not the product. Notably there is NO app pitch, NO email capture, NO value-prop bullets above the fold — content IS the pitch.

#### Narrative arc — how the homepage sells, section by section, in order

1. **Hero featured guide** — immediate proof of taste (timely, national: "The Spots Of The Summer, National Edition").
2. **National guides row** — breadth + currency ("Most Exciting Restaurant Openings In The Country," "Best Ice Cream In America").
3. **Travel section** ("Where To Eat On Your Next Vacation") — Columbus, Madrid, Tokyo... signals global authority.
4. **City stacks, one per major market** (New York → LA → Miami → Chicago → London → SF) — each stack = ~4 guides + 1 fresh review with a numeric rating (8.3-9.0). The ratings sprinkled through the page train you on the trust currency before you ever read a review.
5. **Footer** — the only conversion surface: App Store + Google Play badges, newsletter link, 8 social platforms, Chase disclaimer.

The arc is pure editorial funnel: demonstrate taste → localize → let the content earn the download/subscribe at the bottom or inside article pages. There is no "how it works," no testimonial block, no feature grid. The homepage assumes the brand is the proof.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **App funnel:** store badges in the global footer on every page; app-download banners on review pages; dedicated `/mobile-apps` page ("FIND PLACES ON OUR APP" / "All our reviews, ratings, AND local faves, on the new Infatuation app") with a single map screenshot. Honestly weak — one screenshot, zero feature tour, zero app-store rating proof, zero QR/SMS link.
- **Newsletter:** the real conversion product. 14 editions, city-multi-select form, promoted in footer + about page + article interstitials. "Be the first to get expert restaurant recommendations for every situation right in your inbox."
- **Account/save loop:** "Sign up" in header; "Save spot" buttons on every review/guide entry — saving is the hook that converts readers into account holders (and account holders into app users). This is their cleverest mechanic: the content itself generates the signup intent.
- **Chase Sapphire integration:** "Connect your account" prompts for cardholder-exclusive content — a monetization layer doubling as a membership tier.
- **Reservation handoff:** "RESERVE A TABLE" → Resy/OpenTable on guide entries — utility CTA that keeps users acting through the page.
- **Social proof:** almost none in the conventional sense — no testimonials, no press logos, no download counts. The methodology page IS the social proof ("Show up unannounced. Pay for everything. Call it like we see it."), plus author headshots/bios and photographer credits on every piece.
- **Urgency mechanics:** editorial freshness only — "The Hit List" (new openings), "Just Published," month-stamped dishes lists, seasonal guides ("Spots Of The Summer"). Recency is the urgency.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

- **Layout:** dense card grids organized in horizontal city/topic rails; magazine-style hierarchy; sidebar filters on taxonomy pages; consistent card anatomy (photo, rating chip, name, cuisine tag, neighborhood tag, one-line blurb).
- **Typography:** bold display headlines, frequent ALL-CAPS section labels ("FIND PLACES ON OUR APP", "THE INFATUATION IN YOUR INBOX"), lowercase brand line ("let us help you make a decision") used as a stylistic signature. Clean sans-serif body. [Exact typefaces NOT DIRECTLY OBSERVED.]
- **Color:** restrained chrome — mostly black/white UI that lets food photography carry all the color. Rating numbers act as visual accents.
- **Photography vs illustration vs UI:** ~100% original editorial food/interior photography, every image credited to a named photographer. No illustration system observed. Product UI is shown exactly once (one map screenshot on /mobile-apps) — the app is almost invisible on the site.
- **Motion:** none significant observed; the site optimizes for read speed, not spectacle ("faster website, improved readability" was an explicit goal of their relaunch). [Scroll animation specifics NOT DIRECTLY OBSERVED — server-rendered content suggests minimal.]

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

The voice is the moat: a funny, opinionated friend texting you where to eat.

- **"let us help you make a decision"** — the master tagline. Frames everything as decision relief, not discovery.
- **"Expert Restaurant Recommendations For Every Situation"** — the about-page positioning line; "every situation" is the bridge to the Perfect For taxonomy.
- **"Show up unannounced. Pay for everything. Call it like we see it."** — methodology as a three-beat manifesto.
- **"Real people, with real opinions."**
- **"Our ratings are all about how strongly we recommend places, determined by our expertise, context, and instinct (not by a rigid rubric)."** — anti-algorithm trust positioning.
- Guide intro voice: *"Have you ever woken up and thought, 'Gosh, I'd love to eat at a second-best restaurant today?'"*
- Review voice: *"In a city of slice shops, L'Industrie reigns supreme"*; pizza you "crave for no reason at all"; bites tasting "more like bread from a bakery than a happy dough triangle."
- Occasion microcopy: Date Nights guide tagline — *"Where to eat with someone who likes you back."* Guide titles read like real human situations: "A Guide To The 'Super Cute Reasonably Priced Restaurant To Catch Up With A Few Friends'", "12 Restaurants Perfect For Literally Everyone", "Dive bars ranked by decision-making risk."

Vocabulary: situational, second-person, wry, specific. Zero corporate-speak, zero "platform" language, zero growth-hack copy.

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

- **Scale:** 40-50 cities in the app, ~13 cities with full editorial newsletters; "well over 2,000 new ratings" refreshed at the 2022 ratings relaunch alone; per-city footprints in the hundreds of reviews for flagship markets. [Exact page counts NOT DIRECTLY OBSERVED.]
- **The architecture is a textbook hub-and-spoke:** city hub → five taxonomies (Neighborhoods / Perfect For / Cuisines / Guides / Reviews) → individual review pages. Every review feeds upward into multiple guides ("Included In" cross-links) and multiple taxonomy pages — each restaurant generates 4-6 indexed surfaces.
- **Query-intent coverage:** guides target "best X in Y" head terms ("The Best Sushi In LA"); Perfect For pages target occasion intent ("romantic restaurants NYC", "first date spots"); neighborhood pages target geo-modifiers; reviews target brand+name navigational queries. The Hit List targets "new restaurants {city}" freshness queries.
- **Freshness signals everywhere:** visible publish dates, "based on or verified by a visit that happened during the past year," monthly "best dishes" posts, seasonal refreshes of evergreen guides.
- **E-E-A-T machine:** named authors with titles and bios, photographer credits, methodology page, consistent rating system — exactly what Google's review-content guidelines reward.
- **Distribution stack:** 14-edition newsletter, Substack presence, 8 social platforms, iMessage app, events (EEEEEATSCON), Zagat brand (acquired 2018; print revival) — the site is one node in an omnichannel content org backed by JPMorgan Chase (acquired 2021).
- **Notably absent:** no UGC reviews on-site (pure editorial), no programmatic thin pages — every indexed page has human-written copy.

#### What they do BEST — steal-worthy moves, named specifically

1. **The "Perfect For" occasion taxonomy.** Indexing restaurants by *situation* (Date Night, Impressing Out Of Towners, Cheap Eats) instead of just cuisine/geo. It matches how people actually search and decide, and it multiplies SEO surfaces per venue. Blabberly's taste-tag + anticipatedQueries data could power the same thing programmatically.
2. **"let us help you make a decision."** The whole brand is framed as decision relief, not content. One lowercase sentence does the work of a feature grid.
3. **Hub-and-spoke city architecture with bidirectional cross-links.** Review ↔ guide ↔ taxonomy interlinking means every new place page strengthens every list page. This is the exact skeleton Blabberly's 1,626 enriched place pages should hang on (city/neighborhood hubs → occasion/cuisine rails → place pages), with "Included In" style cross-links.
4. **Trust manufactured through methodology, not testimonials.** "Show up unannounced. Pay for everything. Call it like we see it." Three bullets replace every trust badge. Blabberly's analog writes itself: "Every score comes from someone who actually went — a rating is required on every post."
5. **The save-button conversion loop.** Content → "Save spot" → account → app. The signup ask appears at the exact moment of intent, not in a popup. Blabberly's place pages should do the same: "Save this spot" → waitlist/app.
6. **Numeric ratings as visual trust currency**, scattered across the homepage and cards so you internalize the scale before you read a single review.
7. **Freshness as product:** Hit List, monthly dish roundups, visible "verified by a visit in the past year" claims — recency is both an SEO signal and an urgency mechanic.
8. **Voice discipline.** Every card blurb, guide title, and tagline sounds like the same funny friend. Vocabulary is situational and second-person ("Where to eat with someone who likes you back").

#### What they do WORST — the openings we exploit

1. **The app is an afterthought on the site.** /app literally 404s (real page hides at /mobile-apps), which has ONE screenshot, no feature tour, no app-store ratings, no QR code, no video. For a company whose strategy is app-led, the web-to-app bridge is shockingly weak. Blabberly's site should make the app the hero: real UI, video of the feed, QR code, store badges above the fold.
2. **No personalization story.** Ratings are one-size-fits-all expert opinion; there's no "% match," no taste profile, nothing adaptive. Blabberly's "% match" is a direct counter-positioning: "not what a critic likes — what *you'll* like."
3. **No community/UGC on the site.** Reviews come from a small staff; readers are an audience, not participants. Blabberly's required-rating-from-people-who-went model flips this: scores from real visits at scale, with video proof.
4. **Editorial doesn't scale to secondary markets.** San Diego has ~4 guides and a couple dozen reviews; Carlsbad and North County get scraps. Staff-written coverage is expensive, so smaller markets stay thin — Blabberly can out-cover San Diego County (1,626 enriched pages vs their few dozen) on day one.
5. **No video.** In 2026 their entire surface is still photos+text while the audience decides where to eat on TikTok/Reels. Blabberly's short-video place pages attack this head-on.
6. **No social proof or numbers anywhere** — no download counts, no press, no member counts. Confidence-as-proof works for a 15-year-old brand; it's also a gap a challenger can exploit with concrete proof points.
7. **Conversion machinery is passive.** No waitlist, no referral loop, no urgency beyond editorial freshness; the homepage's only CTAs are buried in the footer. A focused pre-launch site with a single waitlist CTA will out-convert this layout per visitor by an order of magnitude.
8. **The night-out gap.** They help you pick ONE restaurant; they have nothing for the group decision, the poll, the multi-stop plan. Blabberly's plans/routes/group-chat layer is whitespace they don't touch.

---

## T04. Eater (eater.com)
*Researched 2026-06-11.*

Method note: eater.com blocks direct fetches; all "directly observed" findings below came
via text-rendered fetches of www.eater.com (homepage, /maps, /newsletters, /pages/about),
ny.eater.com (city-site template), ny.eater.com's Eater 38 map page, and the Eater iOS App
Store listing. The san-diego.eater.com subdomain could not be fetched at all — San Diego
specifics are triangulated from search/syndication and marked [NOT DIRECTLY OBSERVED].

### Eater (Tier A)

Vox Media's food-discovery editorial network: a national site + ~23 US city sites (San Diego
included), built on the Chorus/Concert publishing platform. Founded 2005, acquired by Vox
2013; siblings Punch (2021) and Thrillist (2022) are cross-linked in the nav. 13 James Beard
Awards, six ASME Awards, five NY Emmys. Launched a free iOS app in Oct 2024 (Capital One
Dining + SevenRooms reservations partnership) packaging "10,000 maps from over 100 cities."
This is the incumbent that owns the exact SERPs Blabberly's 1,626 San Diego place pages must
compete in.

#### Sitemap & page inventory — what pages exist and what each is for

Directly observed structure:

- **www.eater.com (national homepage)** — editorial front page: hero feature story, regional
  news, video, "The Latest," Eater Maps rail, Most Popular, Dining Out & Eater Travel
  collections. Job: demonstrate authority + route you to maps/newsletters/app.
- **Top nav (national):** Dining Out / At Home / Culture / Travel; secondary: Restaurant
  News, Maps and Guides, Newsletters, Shop (Editors' Picks, Books, Tableware, Cookware,
  Merch, Wine Club — a commerce arm), plus sibling-brand links to Punch and Thrillist.
- **City sites (`{city}.eater.com`, ~23 of them incl. san-diego.eater.com)** — full
  mini-publications, NOT thin landing pages. NY template directly observed; nav: Maps,
  Watch, App, Openings, Closings, Restaurant News, Maps & Guides, Neighborhoods, Punch,
  Thrillist, Newsletters, All Coverage. Sections: hero guide → "Dining Out in {city}" →
  Dining Reports (reviews) → Restaurant News (openings/closings) → Eater Maps rail
  (Essential 38 + Heatmap + neighborhood/thematic maps) → newsletter CTA → footer.
- **Map pages (`{city}.eater.com/maps/{slug}`)** — the crown jewels. Three archetypes:
  - **The Eater 38** ("The 38 Best Restaurants in {City}") — the canonical evergreen list,
    updated quarterly.
  - **The Heatmap** ("The Best New Restaurants in {City}") — freshness play, restaurants
    <6 months old, updated monthly-ish.
  - **Thematic/neighborhood maps** — "best sushi restaurants dallas," "15 Best Patisseries
    in Paris," "Best Restaurants in Waikīkī" — the long-tail programmatic-style layer.
- **/maps (Search Maps hub)** — chronological feed of all map/guide cards (image, headline,
  one-line description, date). Pure internal-linking + discovery surface.
- **/newsletters** — 5 national newsletters (Eater Today daily; From the Editor; Eater
  Travel; Pre Shift; Kang Town) + 23 city newsletters, single email field signup.
- **/pages/about** — mission, ethics/methodology pointers, awards, property list (Gastropod
  podcast, YouTube docs, PBS *No Passport Required*, Hulu *Eater's Guide to the World*).
- **App page** — nav "App" link funnels to the App Store listing (no rich owned marketing
  page was observed; /app resolves to the store). [Owned app landing page, if any:
  NOT DIRECTLY OBSERVED]
- **Footer utilities** — Contact, Send a Tip, Community Guidelines, Archives, Terms/Privacy/
  Cookie Policy, newsletter signup repeated.
- **san-diego.eater.com** [NOT DIRECTLY OBSERVED — fetch blocked] — by template parity:
  SD 38, SD Heatmap (confirmed active: May 2026 update added Pastaria Vivi, Tijuanazo,
  Juice Holler, Sono — found via Yahoo syndication), neighborhood maps, openings/closings
  news, Eater San Diego newsletter.

No pricing pages anywhere — monetization is ads, commerce (Shop/Wine Club), affiliate
booking/delivery links, and the Capital One app partnership.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

- **National homepage hero (observed 2026-06-11):** a feature story — Noma's return to
  Copenhagen after its LA residency, promising a "new microseasonal menu setup." Editorial
  photography, headline + dek. No product pitch, no signup demand above the fold.
- **City homepage hero (NY, observed):** a big service-journalism guide — "Where to Eat,
  Drink, and Celebrate the World Cup in New York and New Jersey," dek: "The ultimate eating
  and drinking guide during the huge soccer tournament in and around NYC." Timely + useful,
  not newsy for its own sake.
- **Primary CTA:** there isn't one in the hero. Eater's "hero" is the story itself. The
  conversion asks (newsletter field, app promo "Eat like an expert, wherever you are")
  live below the fold and in persistent chrome.
- **First-10-seconds story:** "This is a serious food publication that knows this city
  better than you do." Authority by demonstration — you land inside the content, not in
  front of a pitch. The trade-off: zero explanation of what Eater *is* for a first-timer,
  and no single obvious next action.

#### Narrative arc — how the homepage sells, section by section, in order

National homepage (observed order):

1. **Hero feature** (Noma) — establishes editorial weight: we cover the food world's
   biggest stories.
2. **Featured regional stories** (LA, NY, New Orleans, Atlanta) — breadth: we are
   everywhere that matters.
3. **Video section** — production muscle; Eater is a media brand, not a blog.
4. **"The Latest"** — firehose from the city sites; proof of daily velocity.
5. **Eater Maps rail** (Vancouver, Paris, London, Barcelona, Tokyo, Lisbon) — the utility
   pivot: after the journalism, here's the service product you'll actually use to pick
   dinner. This is where reader becomes user.
6. **Most Popular** — social proof via what others read.
7. **Dining Out & Eater Travel collections** — evergreen guides; the SEO/utility layer
   surfaced editorially.

The arc is **credibility → coverage → utility → capture** (newsletter + app). The "sell"
is never explicit — authority is performed, then monetized at the edges. City sites run
the same arc compressed: useful hero guide → reviews → news → maps → newsletter.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **Newsletter is the primary conversion engine.** Single email field, repeated on every
  page + footer + a signup prompt even on the 404 page. Copy: "Enter your email to get the
  best of Eater sent straight to your inbox"; city version: "All your essential food and
  restaurant intel delivered to you." 28 newsletters total segment by city and persona
  (Pre Shift targets industry pros; Kang Town is a personality-led West Coast letter).
- **App funnel:** "Eat like an expert, wherever you are" promo on homepage + a persistent
  "App" item in city-site navs → App Store. Listing sells: "the most trusted way to find
  great restaurants," editor-curated maps, follow editors/chefs/friends, save/share lists,
  in-app reservations (SevenRooms; Capital One cardholders get prime-time tables). 4.7★
  but only **48 ratings** as of today — the funnel is weak (see WORST).
- **Social proof:** awards bar (13 James Beard, 6 ASME), "Most Popular" module, author
  bylines with local-expert credentials on every map ("An award-winning food writer's
  picks…"). No user counts, no testimonials — institutional proof only.
- **Urgency mechanics:** freshness as urgency. "Updated Apr 6, 2026" timestamps, quarterly
  38 refreshes with explicit add/drop changelogs ("Spring 2026 additions… five removed"),
  monthly Heatmaps of sub-6-month-old restaurants, Openings/Closings news cadence. The
  message: this is alive, bookmark it, come back.
- **Affiliate/booking CTAs inside content:** every 38 entry carries reservation links
  (OpenTable/direct), delivery links (Grubhub, DoorDash, Uber Eats), tel: links, Google
  Maps links — the map page is itself a conversion surface (toward partners, not toward
  Eater's own product).
- **No waitlist mechanics, no pricing, no urgency countdowns** — nothing scarcity-based.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

(Observed via text-rendered fetches; pixel-level detail flagged.)

- **Layout system:** classic editorial grid — dominant hero card, then stacked module rails
  ("The Latest," maps carousels, Most Popular), card = photo + headline + dek + byline +
  date. City sites and national share one template (Vox's Concert/Chorus design system),
  so 24 properties feel like one brand.
- **Photography-first:** every card and every map entry leads with commissioned restaurant/
  food photography with named photographer credits. No illustration system observed, no
  3D, no device mockups on the editorial pages.
- **Typography & color:** Eater's signature red-on-white masthead with high-contrast
  editorial type (bold display headlines + readable serif/sans body) [NOT DIRECTLY
  OBSERVED — text-only fetches; consistent with the long-standing Vox-era brand].
- **Motion/animation:** none observed; the pages read as static, dense, content-forward.
  [Any scroll animation NOT DIRECTLY OBSERVED.]
- **Map UI:** list-with-embedded-map pattern — numbered entries paired with an interactive
  city map; each entry: photo(s), 150–300-word blurb, hours, price band ($–$$$$), address,
  phone, booking/delivery links.
- **How the app is shown:** barely. A text promo line + App Store handoff; the editorial
  site does not showcase app UI, screenshots, or video of the product. The app is an
  appendage, not the protagonist — the inverse of what Blabberly's site needs to be.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Confident, insider, service-y; authority asserted through specificity rather than hype.

Quotes worth studying:
- Mission: **"In a world full of near-endless food options, Eater is the expert voice that
  cuts through the noise, spotlights under-the-radar destinations, and gives you the
  down-low on the places to go right now."** — the entire category's positioning problem
  (choice overload) and answer (trusted curation) in one sentence.
- App tagline: **"Eat like an expert, wherever you are."** — identity-promise + portability
  in seven words.
- 38 intro device: opens on the reader's literal search query — **"Where should I eat in
  New York City?"** — then frames the list as a **"shortlist of the city's must-hit
  restaurants, updated quarterly."** Query-mirroring as both SEO and empathy.
- Newsletter: **"The freshest news from the food world every day"** (Eater Today); **"All
  your essential food and restaurant intel delivered to you"** (city sites).
- Map deks: **"An award-winning food writer's picks for the best restaurants, bars, and
  food carts"**; **"Where to find the pastries of your dreams, in the city that does them
  best."**
- House vocabulary: *essential, must-hit, under-the-radar, intel, the freshest, heatmap,
  dining out, openings/closings.* "Essential" is the franchise word — the Essential 38.
- App Store: **"the most trusted way to find great restaurants"** — trust claimed by
  tenure ("editors have invested years…").

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

This is the section that matters most for Blabberly.

- **Scale:** ~23 US city sites + national; the app packaging claims **10,000+ maps across
  100+ cities** — that's the rough size of the evergreen guide inventory. Two decades of
  archives on top.
- **The template franchise:** every city gets (a) the **Eater 38** targeting "best
  restaurants in {city}" — the single highest-value local food query; (b) the **Heatmap**
  targeting "new restaurants {city}"; (c) a fan of **{cuisine}/{neighborhood} maps**
  (`dallas.eater.com/maps/best-sushi-restaurants-dallas`) covering the long tail. It's
  editorial content run with programmatic discipline — one schema, hundreds of permutations.
- **Freshness signals as ranking strategy:** visible "Updated {date}" timestamps, quarterly
  38 revisions with explicit add/remove changelogs, monthly heatmap updates. Google rewards
  it; readers re-visit for it.
- **On-page structure:** query-mirroring H1s ("The 38 Best Restaurants in…"), intro that
  restates the question, NAP data (name/address/phone), hours, price range — restaurant
  structured data ripe for rich results. Breadcrumbs to category hubs ("Dining Out in NY"),
  dense cross-links to related maps, /maps hub as an internal-link spine.
- **News layer feeds the evergreen layer:** daily openings/closings coverage generates
  fresh inbound links + crawl activity, and graduates into heatmap/38 updates.
- **Distribution multipliers:** syndication (SD heatmap content appears on Yahoo News),
  23 city newsletters driving return traffic, video/YouTube/podcast/streaming properties
  reinforcing brand queries.
- **What they DON'T have:** no per-restaurant permanent pages with user-generated signal.
  A restaurant exists on Eater only as a blurb inside maps + scattered news hits. There is
  no `eater.com/place/{venue}` with ratings, photos over time, or community activity —
  that's the structural gap Blabberly's 1,626 enriched place pages + universal links can
  occupy. Eater also covers San Diego with a thin local staff [headcount NOT DIRECTLY
  OBSERVED] — depth on Carlsbad/North County long tail is exactly where a 4,000-venue
  database out-covers them.

#### What they do BEST — steal-worthy moves, named specifically

1. **The Essential 38 franchise** — a named, numbered, capped list that became a noun.
   The cap (38, not "top 50") signals curation; the name is ownable and quotable;
   restaurants brag about making it (Juniper & Ivy has a page about it). Blabberly
   should build its own named SD franchise (capped, branded, recurring).
2. **Update-stamped evergreen + add/drop changelogs** — "Updated Apr 6, 2026" plus "five
   new entries, five removed" turns a static list into a living product with built-in
   return visits and freshness SEO. Directly stealable for Blabberly place rails.
3. **Query-mirroring intros** — opening the page with the user's literal question ("Where
   should I eat in San Diego?") before answering it. Cheap, effective, on-brand.
4. **The 38/Heatmap/thematic three-layer map system** — one evergreen authority page, one
   freshness page, N long-tail pages per market, all interlinked through a hub. This is
   the exact architecture to wrap around Blabberly's place pages.
5. **Newsletter capture everywhere, segmented by city + persona** — one email field,
   28 flavors, even on the 404. For a pre-launch waitlist site, this is the model: the
   ask is tiny and it's omnipresent.
6. **Authority through bylined local experts + institutional awards** — every map carries
   a named, credentialed curator. Blabberly's analog: real locals with required ratings
   — "scores from people who actually went."
7. **Complete utility inside the content** — hours, price band, address, phone, booking
   and delivery links per entry. The page fully services the intent, so it earns the
   ranking. Blabberly place pages should be at least this complete.
8. **One design system across 24 properties** — city sites feel like one brand; trust
   accrues network-wide. Mirrors the CEO's master-site/subset doctrine: build the system
   once, unlock surfaces.

#### What they do WORST — the openings we exploit

1. **The app funnel is an afterthought** — a text link to the App Store, no owned landing
   page with product UI, no screenshots or video on the editorial site. Result: a 2024
   flagship app with only **48 App Store ratings** in ~20 months despite millions of
   readers. Blabberly's site can be unapologetically app-first: show the feed, the camera,
   the % match, the route builder.
2. **No per-venue pages and no user-generated ratings** — Eater's scores are 38 editors'
   opinions; a venue not on a map is invisible. Blabberly's required-rating model
   ("every score comes from someone who actually went") plus permanent place pages for
   ~4,000 SD venues attacks the long tail Eater structurally cannot cover.
3. **Top-down curation, zero community** — no comments surfaced, no user lists on web, no
   social layer. The app's "follow editors, chefs, and friends" exists but the website
   ignores it. Blabberly's short-video social feed + night-out layer (group chats, polls,
   plans, multi-stop routes) is a category Eater doesn't play in at all.
4. **No personalization** — the 38 is the same 38 for everyone. Blabberly's "% match"
   taste personalization is a direct, demonstrable counter ("your 38, not theirs").
5. **No clear first-action for a new visitor** — landing on eater.com gives you a Noma
   story, four navs, a shop, and three sibling brands. Strong for readers, terrible for
   conversion. A focused Blabberly site with ONE job (waitlist → download) will out-convert
   by default.
6. **Thin metro-edge coverage** — San Diego is one of 23 markets sharing national
   resources; Carlsbad/North County/neighborhood depth is sparse vs. Blabberly's 4,000
   venues with enriched data. Win the queries Eater never writes: "best {cuisine} in
   {Carlsbad/Encinitas/North Park}" at full depth.
7. **Static, text-era presentation** — photography + 300-word blurbs, no motion, no video
   on map pages, despite Eater's own video muscle. A sunset-gradient, video-forward place
   page (real short clips from real visits) feels a generation newer.
8. **Conversion leaks to partners** — map-page CTAs route value to OpenTable/DoorDash/
   Google Maps. Blabberly keeps the loop in-product: place page → universal link →
   app → plan the night.

#### Verdict on the strategic lean (publish 1,626 enriched place pages pre-launch)

Eater's playbook *confirms* the lean: their entire moat is structured, fresh, query-shaped
local pages — and they have no per-venue layer. Ship the place pages, but wrap them in the
Eater-style scaffolding or they'll float unanchored: a "Best of {neighborhood}/{cuisine}"
guide layer linking into place pages (hub-and-spoke), visible "Updated {date}" stamps,
query-mirroring H1s/intros, restaurant schema markup, and a waitlist field on every page.
That combination — Eater's SEO architecture + per-venue depth + UGC ratings they can't
match — is the wedge.

---

## T05. Yelp (yelp.com)

**Researched:** 2026-06-11. **Access note:** www.yelp.com serves DataDome bot protection (403 to all programmatic fetchers, including proxies); robots.txt disallows ALL crawlers by default and explicitly blocks every AI agent (GPTBot, ClaudeBot, PerplexityBot, CCBot, Meta) while allowlisting only Google/Bing/social-preview bots. Consumer-site specifics below were triangulated from Google SERP titles/snippets, Yelp's own blog + press site, the open `business.yelp.com` and `trust.yelp.com` properties, and press coverage of the Spring 2026 release. Items reconstructed rather than directly fetched are marked [NOT DIRECTLY OBSERVED].

### Yelp (Tier A)

#### Sitemap & page inventory — what pages exist and what each is for

**Consumer site (www.yelp.com — bot-walled):**
- `/` — Homepage. SERP title: "Restaurants, Dentists, Bars, Beauty Salons, Doctors - Yelp". Meta description: "User Reviews and Recommendations of Best Restaurants, Shopping, Nightlife, Food, Entertainment, Things to Do, Services and More at Yelp." Job: route everyone into search as fast as possible.
- `/search?find_desc=X&find_loc=Y` — Programmatic search/category-city pages, indexed at enormous scale. SERP titles observed live: "TOP 10 BEST Restaurants in New York, NY - Updated 2026 - Yelp" and "THE BEST 10 RESTAURANTS IN NEW YORK, NY - UPDATED JUNE 2026 - HOURS - YELP" (`?cflt=` variant). These ARE Yelp's city pages — there is no separate hand-made city page layer.
- `/biz/<slug>` — The place page, the SEO crown jewel. Anatomy [NOT DIRECTLY OBSERVED — reconstructed from training knowledge + Yelp support docs]: photo collage header, name + star rating + review count + price tier + categories, action row (Write a Review / Add Photo / Share / Save), transaction modules (Reserve / Waitlist / Order / Request a Quote), Sponsored "you might also consider" units, popular dishes / menu, hours + map, amenities ("Vibes"-adjacent attributes), algorithmically highlighted review snippets, full review feed, "Ask the Community" Q&A, "People Also Viewed."
- `/article/...` — Yelp Articles editorial layer (robots.txt explicitly allows social bots on `/article/` for share previews).
- `/collections/...`, user profiles, `/events`, Elite pages — community surfaces; most are Disallowed in robots.txt (deliberately kept out of the index).
- `/spk/` — an AI-readable endpoint allowed ONLY for OAI-SearchBot; Yelp is selectively feeding AI search engines while blocking AI training crawlers.

**Open satellite properties (directly observed):**
- `business.yelp.com` — Yelp for Business marketing site: hero "It's free to be on Yelp", Products/Solutions/Resources nav, Yelp Ads, Guest Manager, new AI products (Yelp Receptionist, Yelp Host), Local Business Resource Center (articles, "Behind the Review" podcast, webinars).
- `trust.yelp.com` — Trust & Safety microsite: "Earning your trust. Always." Sections: Reputation matters / Authenticity & reliability / Fighting misinformation / Data you want to know; links to an annual Trust & Safety Report.
- `blog.yelp.com` — Official blog in four sections: News, Businesses, Community, Life at Yelp.
- `yelp-press.com` — Press/fast-facts: founded San Francisco 2004; mission "Yelp connects people with great local businesses"; 330M cumulative reviews (12/31/25); 28M monthly app unique devices (2025 avg); 485K paying advertising locations; $361M Q1 2026 revenue.
- `yelp-ir.com`, `yelp-support.com`, `yelp.careers`, developer docs (`docs.developer.yelp.com`) — IR, support, hiring, Fusion API.

**Notable robots.txt details (directly observed):** Asimov's Three Laws easter egg in the header; honeypot business URLs (`/biz/outlook-autumn-market-...-0` through `-9`) to catch scrapers; `Disallow: /search*start=` for Bing (pagination crawl-budget control); blanket `User-Agent: * Disallow: /`.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

[NOT DIRECTLY OBSERVED — reconstructed from Yelp's own homepage-redesign post (blog.yelp.com "New Year, New Homepage," Jan 2017, architecture still in force) + SERP data.]
- There is no marketing headline. The hero IS a search box — "Find" (things to do, nail salons, plumbers…) + "Near" (location) — overlaid on a large, full-bleed photo taken by a real community member. Yelp wrote that they chose "the large photo with the search bar overlay" after A/B testing, because real Yelper photos beat illustrations for engagement.
- Primary CTA: the search button. Secondary header CTAs: "Write a Review," "Log In," "Sign Up," and a prominent "Yelp for Business" link splitting the two audiences at the very top.
- A category icon row (Restaurants, Home Services, Auto Services, More) sits under the search bar; logged-in users get recently-viewed businesses and friend/follow activity modules below.
- First-10-seconds story: "You already know what Yelp is. Type what you need, we'll show you the best near you." Zero persuasion, pure utility — the brand equity does the selling. The 2026 app adds an "Assistant" tab (AI chat that answers and books in one conversation) as an alternate front door [observed via press release + TechCrunch coverage of the April 2026 Spring Release].

#### Narrative arc — how the homepage sells, section by section, in order

[Partially NOT DIRECTLY OBSERVED — order per Yelp's published redesign rationale.]
1. **Search hero** — utility first; community photo signals "real people were really here."
2. **Categories** — deliberately surfaces non-restaurant verticals (home services is Yelp's #3 reviewed category and its revenue engine) — "from happy hour to hospitals," in Yelp's words.
3. **Personalized activity** (logged in) — recently viewed, friends' reviews, Request-a-Quote messages; turns the homepage into a feed.
4. **Community content** — trending businesses, popular lists, Elite/community-manager content; the proof layer is user-generated, not testimonial-driven.
The "selling" is structural, not rhetorical: Yelp's homepage assumes intent and converts it to a search; persuasion is reserved for the business-owner site, which runs a classic stat-stacked funnel ("74+ million people visit Yelp each month" → "82% of users hire or buy from a business they found on Yelp" → "Businesses get 4x more leads with Yelp Ads" → "Verify my free listing").

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **Consumer conversion = a search, then an account.** Write-a-review, save, message, and quote flows all gate on signup; the homepage's "Write a Review" header link is a standing acquisition hook.
- **App funneling:** mobile web aggressively interstitials toward the native app ("Open in the Yelp App" banners; some content/actions degraded on mweb) [NOT DIRECTLY OBSERVED on this pass — long-standing, widely experienced pattern]. Press fast-facts lead with app metrics (28M monthly app devices), reflecting app-first strategy. The 2026 Assistant tab is app-only, another pull into install.
- **Transactional CTAs in-content:** Reserve, Join Waitlist, Order (DoorDash integration), Request a Quote, Book (Zocdoc/Vagaro/Calendly as of Spring 2026) — conversion is embedded per-listing, not centralized.
- **Social proof mechanics:** star ratings + review counts on every card; algorithmically chosen review snippets; "Recommended Reviews" framing; Elite badges; "People Also Viewed."
- **Urgency mechanics:** "Updated June 2026" in programmatic page titles (freshness as urgency); waitlist counts and "closing soon" hours states on listings [NOT DIRECTLY OBSERVED].
- **B2B funnel (observed):** single repeated CTA "Verify my free listing," friction-free framing ("It's free, easy, and only takes a few minutes"), stats + testimonial carousel, no public pricing anywhere — pricing is held for the sales flow.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

- **Color:** Yelp red as the single brand anchor (post-2021 refresh palette with warmer accents), white ground, dense black text. Stars are the most load-bearing visual element on the site.
- **Photography over illustration — explicitly doctrinal.** From their redesign post: real community photos "better accomplish" conveying authentic local experiences. UGC photo density is the aesthetic: collages, galleries, photo-first cards. Illustration appears mainly on the B2B site and blog.
- **Layout:** utilitarian list + right-rail map on search pages; card grids on home; long single-column place pages. Information density is high; whitespace is not a priority. [Specifics NOT DIRECTLY OBSERVED this pass.]
- **Typography:** proprietary sans (Yelp's brand refresh introduced a custom grotesque with quirky display cuts used in marketing; product UI stays in a plain sans) [NOT DIRECTLY OBSERVED].
- **Motion:** essentially none on the consumer web product; the 2026 app added immersive full-screen video in the home feed — video is arriving in-app before on-web.
- **How the app is shown:** barely, on the website itself — the website IS the product. App promotion happens via banners and store badges rather than device-frame marketing sections.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

- Mission line: "Yelp connects people with great local businesses." (press site)
- B2B hero: "It's free to be on Yelp." — disarms the #1 SMB objection (cost) in six words.
- B2B closer: "Ready to get started? It's free, easy, and only takes a few minutes."
- Trust site: "Earning your trust. Always." and the policy-as-positioning line "Businesses are not permitted to ask their customers for reviews."
- Programmatic title formula: "TOP 10 BEST {category} in {City}, {ST} - Updated {Month Year} - Yelp."
- Meta description: "User Reviews and Recommendations of Best Restaurants, Shopping, Nightlife, Food, Entertainment, Things to Do, Services and More at Yelp."
- Even robots.txt has voice: Asimov's Three Laws quoted at the top — engineering whimsy as brand.
- Overall tone: functional, confident, superlative-heavy ("Best," "Top") in SEO surfaces; warm-bureaucratic in trust/policy copy; stat-led and plainspoken in B2B. Consumer-facing personality lives in the community (review prose, Elite culture), not in site copy.

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

- **Scale:** 330M cumulative reviews across millions of `/biz/` pages — one of the largest programmatic local-SEO footprints on the internet. Every business page carries dynamically generated, review-derived unique content; this is the canonical "data is the moat" pSEO case study.
- **Three-layer pyramid:** (1) `/biz/` place pages (long-tail brand+city queries), (2) `/search` "Top 10 Best X in Y" pages (commercial-intent category+city queries, freshness-stamped titles regenerated monthly — "Updated June 2026"), (3) editorial (`/article/`, blog, seasonal "Top 100 Places to Eat" lists) for press pickup and links.
- **Schema-rich:** LocalBusiness/AggregateRating markup drives star-decorated SERP listings [NOT DIRECTLY OBSERVED].
- **Crawl-budget discipline:** robots.txt sculpts the index hard — community surfaces (events, collections-by-user, talk, user profiles' sub-pages, write-a-review) are Disallowed; only the money pages get crawled.
- **The 2026 twist:** Yelp blocks all AI training crawlers and most AI answer engines, but exposes a dedicated `/spk/` path solely to OAI-SearchBot — defending the review corpus as proprietary while negotiating selective AI-search presence. Yelp's content is its product; it treats crawlers as either Google (friend), or thief.
- **Editorial cadence:** blog in four lanes (News/Businesses/Community/Life at Yelp); B2B resource center with podcast ("Behind the Review") and webinars — B2B content marketing is a full standalone operation.

#### What they do BEST — steal-worthy moves, named specifically

1. **The "Top 10 Best {thing} in {city} — Updated {Month Year}" title formula.** Freshness stamp + superlative + geo, regenerated automatically. Directly stealable for Blabberly's 1,626 enriched place pages and any future category/neighborhood rollup pages.
2. **Search-pages-as-city-pages.** No hand-built city landing pages; the programmatic search result IS the landing page, with unique intro copy. Maximum coverage, zero editorial overhead.
3. **Review-derived unique content per place page.** Every place page differs because the community wrote it — the unreplicable moat. Blabberly's analog: rating-required video posts + AI-enriched About sections give every venue page genuinely unique content from day one.
4. **UGC photography as the design system.** Real community photos behind the search bar; authenticity as aesthetic doctrine, validated by A/B tests. Blabberly's vertical food video is an even stronger version of this card.
5. **"It's free to be on Yelp."** Objection-killing six-word B2B hero. The pattern (lead with the absence of the feared cost) ports directly to a future Blabberly-for-restaurants page.
6. **Trust as a destination.** A whole subdomain ("Earning your trust. Always.") + annual report + the "businesses can't solicit reviews" rule as marketing. Blabberly's required-rating-from-real-visits mechanic deserves the same explicit, page-level treatment.
7. **Crawl-budget sculpting via robots.txt** — index only money pages; keep thin community surfaces out.
8. **Embedded transactional CTAs per listing** (Reserve/Waitlist/Order/Quote) rather than one central conversion point.

#### What they do WORST — the openings we exploit

1. **Zero emotional sell, zero story.** The homepage assumes you already care. A pre-launch challenger can out-narrate Yelp completely — Yelp literally cannot ship a "why we exist" homepage without breaking its utility front door.
2. **Trust collapse is structural.** Star averages pool tourists, grudges, and 2014 reviews; "Recommended Reviews" filtering is widely resented by businesses and distrusted by users. Blabberly's wedge — every score comes from a required rating attached to a real visit and a real video — attacks Yelp's core asset, not its periphery.
3. **Stale, text-first content format.** Reviews are walls of prose + static photos; video arrived in-app only in 2026 and not on web. A short-video place page feels a generation newer.
4. **No taste personalization on the web surface.** "Top 10 Best" is the same list for everyone; Blabberly's "% match" is a visible, marketable differentiator Yelp's page anatomy has no slot for.
5. **Hostile to discovery-as-fun.** Yelp is where you verify, not where you browse for a night out. The entire social/night-out layer (group plans, polls, multi-stop routes) is whitespace Yelp abandoned (Talk/Events are robots-Disallowed ghost towns).
6. **Design debt.** Dense, cluttered, ad-interrupted pages; "Sponsored Results" above organic listings erode the very trust the brand claims. A clean sunset-gradient page with one honest score reads as relief.
7. **Bot wall + AI-crawler blockade** means Yelp's content is increasingly invisible to AI answer engines (everything blocked except one OpenAI path). A young site that welcomes AI search crawlers can become the cited source for "best tacos in Carlsbad"-class queries that Yelp opts out of.
8. **SMB resentment.** Decades of ad-sales aggression and review-filter anger = a partner-acquisition opening for a friendlier local platform.

**Verdict relevance for Blabberly's pre-launch place-page question:** Yelp proves the model — programmatic place pages with genuinely unique per-venue content, freshness-stamped superlative titles, and tight index discipline are the entire engine. Publishing the 1,626 enriched pages pre-launch with waitlist CTAs copies Yelp's strongest move at the exact moment Yelp is walling itself off from AI-era search.

---

## T06. Resy (resy.com)

Researched 2026-06-11 for the Blabberly website master plan. Method: direct fetches of resy.com (prerendered HTML served to crawler user-agents — consumer site is a client-rendered Angular app that returns an empty shell to normal fetches), HubSpot-built ResyOS marketing pages (server-rendered), blog.resy.com (WordPress), their production CSS, the App Store listing, and corroborating web searches. Items I could not directly observe are marked [NOT DIRECTLY OBSERVED].

### Resy (Tier A)

Amex-owned restaurant reservation platform, ~16,000+ restaurants, 80 cities worldwide, founded 2014 (Leventhal/Montero/Vaynerchuk), acquired by American Express 2019. The strongest proof in the category that a restaurant platform can feel premium, editorial, and brand-led rather than utility-gray.

#### Sitemap & page inventory — what pages exist and what each is for

**Consumer side (resy.com — Angular SPA, prerendered for bots):**
- `/` — root resolves into the booking utility; page title "Resy | Your Guide to the World's Best Restaurants". Effectively the city experience with a global search widget (guests / date / time pickers), city selector, "Global Dining Access," "For Businesses," "Log in." [Exact unauthenticated root hero state NOT DIRECTLY OBSERVED — root did not prerender; all evidence says it geo-resolves to the nearest city page.]
- `/cities/{city-slug}` (e.g. `/cities/new-york-ny`) — the real "homepage" per metro. Anatomy directly observed: search widget → editorial guide hero ("The Resy Guide to Summer Fridays in New York City") → "Discover restaurants to love in New York" intel block linking The Hit List / Events & Experiences / Amex offers → editorial story links → **Climbing** carousel (trending venues) → **Top Rated** carousel → **New on Resy** carousel → "Resy Spotlight" Amex Gold $100 Resy Credit promo → "Special Events & Experiences" feed (dozens of event cards; on fetch day, wall-to-wall World Cup watch parties) → footer. Venue cards show name, star rating, review count ("4.7 (22K) reviews"), cuisine, price band ($–$$$$), neighborhood.
- `/cities/{city}/venues/{venue-slug}` — programmatic venue page, fully prerendered (~97KB of real content). Anatomy: name, rating + review count, cuisine/price/neighborhood tags, Share/Save, full booking widget (party size, calendar, time slots by service: "dinner / Dining Room / 6:15 PM…"), **Notify** button, "Need to Know" (house policies), "About {Venue}" narrative, Upcoming Events at the venue, address + Get Directions + website, "Other ways to support" (online shop links), "You Might Also Like…" (sibling venues), and "Discover {Venue} & More" — a block of cross-linked editorial guides with bylines and dates. SEO title pattern: "Book Your Public Records Reservation Now on Resy."
- `/cities/{city}/events` and `/cities/{city}/list/{collection_id}` — programmatic event and collection list pages (events page for NYC was ~900KB of prerendered content — enormous).
- `/welcome` — the consumer marketing / app-download page, title "Welcome to Resy." Headline: **"Reservations Are Just the Beginning."** Sections: "Access Top Spots Near You" (Book Now), "Discover Your Next Obsession" (Discover Now), "Connect Your Friends with Your Faves" (Make a Resy List), "Don't have the Resy App yet?" (Download the iOS App / Download the Android App), then Amex up-sell stack: Global Dining Access, The Resy Credit, Platinum Nights.
- `/global-dining-access` — Amex perk page. Headline: **"A personal dining concierge, at your fingertips"** "by American Express." Benefits grid (Exclusive Reservations, Priority Notify, Early Access to Special Experiences, VIP Diner Badge), 4-step "Unlock Your Benefits" walkthrough, "purple bricks" explainer, editorial guide cross-links, FAQs.
- `/about` — corporate one-pager + a giant self-service FAQ (reservations, Notify management, account deletion steps). Split explicitly into "For Diners:" and "For Businesses:" paragraphs.
- `/terms`, `/privacy`, cookie/accessibility pages.

**B2B side (resy.com/resyos/* and /join/* — HubSpot CMS, server-rendered, built by Webstacks):**
- `/join/reservations/` — flagship B2B page. Hero: **"A smarter way to run your business."** Six feature modules (photography with floating product-UI overlays), a hero stat ("90% reduction in no-shows caused by bots and brokers, Q2 2024 to Q2 2025"), "Everything you need—at a glance" 14-feature grid, integrations logo wall (Google, Square, Toast, Meta, Instagram, The Infatuation), 4 testimonials, demo form, 6-question FAQ.
- `/resyos/plans-and-pricing/` — transparent public pricing: Platform $249/mo, Platform 360 $399/mo (Powered by Resy); Essential $269/mo + 3% prepay fee, Premium $399/mo + 2% (Powered by Tock — Resy and Tock now sell as one family). Full comparison table, testimonials, FAQ, "no per-cover fees" emphasized.
- `/resyos/the-diner-experience/`, `/resyos/resy-guest-network/`, `/resyos/...` — solution pages per value prop (experiences/events tooling, the diner network, partner perks: Toast/Square/Fishbowl discounts via Amex Business Savings Suite). Each ends in the same "Schedule a demo today / Built for hospitality. Backed by American Express." block.
- `/why-resy` — exists in nav [content NOT DIRECTLY OBSERVED — did not prerender].

**Editorial (blog.resy.com — "Resy | Right This Way"):**
- The Hit List (monthly per-city "where to eat right now" — the franchise), New on Resy, Guides (date night, outdoor dining, music lovers, AAPI-owned, Summer Fridays…), Interviews/series (Chef to Chef, Resy Regulars, Corner Table, Dish By Dish, The One Who Keeps the Book, Why We Stay), Newsroom (press releases, the annual "Resy Retrospective"), and **On The House** (`/for-restaurants/`) — a whole B2B content hub ("This is our place for restaurant folks to have a voice…") with restaurant marketing/SEO/operations how-tos that double as B2B SEO.

**App stores:** iOS app (4.9★, 694K ratings, Food & Drink) + relaunched Android app. Smart App Banner (`apple-itunes-app` meta) on every web page.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

Resy's consumer "hero" is not a marketing hero at all — it's a **utility**: a search bar with party size / date / time pickers above city-specific editorial. The first-10-seconds story on a city page: "We are the insider's booking layer for this city — here's a beautiful guide, here's what's climbing, book now." The brand promise lives in the page title ("Your Guide to the World's Best Restaurants") and the tagline ("Right This Way") rather than a headline block.

Where they DO write classic hero copy:
- `/welcome` (consumer app pitch): **"Reservations Are Just the Beginning"** / "We know you love restaurants. We do, too. That's why Resy gives you more than just reservations; we share trustworthy recommendations, create memorable experiences, and above all, celebrate the magic of dining." CTAs: Book Now / Discover Now / Make a Resy List / Download the iOS App.
- B2B: **"A smarter way to run your business"** / "…so you can operate with greater efficiency—which in this industry, is everything." CTA: "Book a demo," shown over photography of a real named partner restaurant ("Penny Roma • San Francisco, CA").
- GDA: **"A personal dining concierge, at your fingertips."**

Takeaway: a mature marketplace skips the pitch and leads with inventory. The pitch pages exist off to the side for cold traffic. (Blabberly pre-launch is the inverse — no bookable inventory yet, so the hero must do the work Resy's city pages do.)

#### Narrative arc — how the homepage sells, section by section, in order

City page (their de facto homepage), in observed order:
1. **Search widget** — "you can book right now" (utility-first trust).
2. **Editorial guide hero** — a seasonal, human-written guide with a one-line dek. Establishes taste authority before showing listings.
3. **"Discover restaurants to love in {City}"** — "Be the first to know with Resy's insider guides, deep dives on old standbys, and vital intel on all the latest and greatest new openings." Links: The Hit List, Events & Experiences, Amex offers. This is the thesis statement: intel + access.
4. **Editorial story strip** — 3–4 current stories with city-desk headlines ("Somssi, From the Team Behind Atoboy and Atomix, Reinvents the Classic Bistro").
5. **Climbing** — momentum rail ("what's hot right now"), each card with rating + review volume. Social proof via velocity, not testimonials.
6. **Top Rated** / **New on Resy** — quality rail and freshness rail.
7. **Resy Spotlight** — Amex monetization promo ($100 Resy Credit for Gold Card members), woven in as a perk, not an ad.
8. **Special Events & Experiences** — a live, dated feed (World Cup watch parties everywhere on fetch day) proving the platform is alive *today*.
9. **Footer** with the brand's best line: "Your next favorite restaurant is a few taps away."

Arc in one sentence: *book → trust our taste → see what's moving → see we're alive today → download the app.* The selling is done by curation and live data, not by claims.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **Time-slot buttons ARE the CTA.** Venue pages put bookable times (6:15 PM, 6:45 PM…) directly in the page — the conversion control is the inventory itself.
- **Notify** — their genius mechanic: when a table isn't available, the CTA becomes "Notify," capturing intent + contact + a push-notification relationship instead of a dead end. Every sold-out state is a lead-gen state. Priority Notify is then resold as an Amex perk.
- **App-store funneling:** Smart App Banner meta on every page; "iOS App / Android App" links first in the footer's first column; `/welcome` page closes with download buttons; blog posts link app features ("you set countless Notifies"); Apple Editor's-Choice-style quote on the listing ("…we ended up with four separate dinner reservations").
- **Social proof:** review counts at scale on every card ("(32K) reviews" on Carbone), the Climbing rail (popularity velocity), 4.9★/694K on the App Store, and on B2B pages named-venue testimonials (Double Chicken Please, St. Anselm) + logo walls + a hard stat ("90% reduction in no-shows caused by bots and brokers").
- **Urgency:** scarcity is the product — "all the hottest tables," primetime tables "held just for you," purple bricks for GDA members, "Set your event to go live before ticket sales to generate excitement." Dated event feeds create same-day urgency.
- **Membership/lock-in:** Amex layer (GDA, Resy Credit, Platinum Nights) converts dining access into card loyalty — an "earned exclusivity" mechanic.
- **B2B funnel:** single relentless CTA ("Book a demo") on every page + embedded HubSpot forms + public transparent pricing with per-plan "Get {Plan}" CTAs + FAQ objection handling.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

- **Typography (directly observed in production CSS):** `Beatrice, GT America, Helvetica` for display; `GT America` for body; `GT America Condensed` and a serif `Bookmania` as accents. Beatrice (Sharp Type) is a fashion-magazine-grade grotesque — this is the single biggest reason Resy reads "editorial brand" instead of "booking software."
- **Color (directly observed in CSS):** Resy red **#EB1700** as the primary action/brand color (hover #C71300; legacy coral #FF462D still present), near-black #2A2A2A text, gray scale (#737373/#EAEAEA/#FAFAFA), link blue #336DDE/#2B5CBC, **GDA purple #696EB1/#4A4E95** (the "purple bricks" — a color-coded membership tier baked into the booking UI), availability green #16A66C. White-dominant pages; color is used sparingly and semantically.
- **Photography over everything:** professional food/interior/portrait photography with consistent photographer credits. No illustration system observed anywhere — the food IS the art. B2B pages composite real restaurant photography with floating product-UI overlays (reservation cards hovering over a patio shot) — the cleanest pattern I've seen for "show the software inside the lifestyle."
- **Layout:** card-and-carousel system on consumer pages (rails of venue cards), long-scroll modular sections on B2B (hero → feature modules → logo wall → testimonials → demo form → FAQ), magazine grid on the blog.
- **Motion:** [NOT DIRECTLY OBSERVED — cannot execute their JS; no evidence of heavy animation; the consumer site is a fast utility, and carousels appear to be the main moving element.]
- **How the app is shown:** almost never as a naked device mockup on consumer pages — the *web product itself* is the demo (live booking widget on every venue page). B2B shows UI as overlay cards on photography. `/welcome` pitches app features in prose + download buttons rather than screenshot galleries.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Tone: insider-confident, warm, never sycophantic; reads like a well-connected friend who works in restaurants. Vocabulary: "intel," "insider," "sought-after," "in-demand," "hot new opening," "neighborhood favorites to cult classics," "the hottest tables."

Taglines and lines worth studying (all verbatim, directly observed):
- **"Right This Way."** — the maître d' gesture compressed into a brand. Best two-word tagline in the category.
- **"Your next favorite restaurant is a few taps away."** (footer)
- **"Reservations Are Just the Beginning."** (/welcome)
- **"Discover restaurants to love in your city and beyond."** (meta description)
- **"Resy powers some of the world's best restaurants, using technology to imagine the future of hospitality."** (footer mission line)
- **"Diners rely on Resy for intel and access to the most exciting restaurants, from neighborhood favorites to cult classics, just-opened hot spots, and everything in between."** (/about)
- **"Connect Your Friends with Your Faves … since we know they always ask for your suggestions."** (/welcome — social-proof psychology in one clause)
- Blog voice: "Often in New York, the most important dining question doesn't revolve around where to eat: It's *how do we get in*?" / "consider this your ultimate cheat sheet."
- B2B: "A smarter way to run your business" / "operate with greater efficiency—which in this industry, is everything." / "Built for hospitality. Backed by American Express." / "Turn cancellations into covers." / footer sign-off "Made with ❤️ in NYC + CHI."
- Pattern: every section header is a verb-first promise ("Access Top Spots Near You," "Discover Your Next Obsession," "Help reduce no-shows," "Offer more than ordinary reservations").

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

- **Programmatic venue pages at full SEO strength:** every one of ~16,000+ venues gets a prerendered page with templated title ("Book Your {Venue} Reservation Now on Resy"), unique "About" narrative, policies, events, internal links to sibling venues AND editorial guides. The crawler-targeted prerender layer (visible `prerender-status-code` meta) means the Angular SPA still ships full HTML to bots — they engineered around their own JS framework specifically for SEO.
- **City hubs** for ~25+ "Popular Cities" (NYC to Athens to Hong Kong) plus collection list pages (`/list/collection_889`) and per-city event pages (NYC events page = ~900KB of prerendered content) — thousands of indexable list permutations (date/seats/time query params).
- **Editorial moat:** blog.resy.com publishes the monthly **Hit List** per city (a renewable, rank-bait franchise: "The Top Restaurants in NYC Right Now"), evergreen Ultimate Guides, interview series, and how-to-get-in service journalism — every article internally links venue pages with "Book Now" buttons. Editorial has real bylines (a Managing Editor, freelancers, photo credits) — staffed like a magazine.
- **Two-audience SEO:** "On The House" hub targets restaurant-operator keywords ("How to Set Up an SEO Strategy for Your Restaurant") to feed the B2B demo funnel.
- Footprint estimate: tens of thousands of indexed pages across venues, cities, collections, events, and a decade of editorial. [Exact index counts NOT DIRECTLY OBSERVED.]

#### What they do BEST — steal-worthy moves, named specifically

1. **The venue page as a conversion-grade SEO asset** — booking widget + narrative About + policies + events + cross-linked editorial on one prerendered page. This is the exact blueprint for Blabberly's 1,626 enriched place pages: About narrative + posts/ratings + "get the app" CTA + internal links to neighboring places and guides.
2. **Notify: the dead-end-to-lead-capture inversion.** Every "unavailable" state becomes a signup with re-engagement rights. Blabberly's pre-launch equivalent: every place page's "see it in the app" = waitlist capture with a reason to return at launch.
3. **The Hit List franchise** — a monthly, city-scoped, renewable editorial format that owns "where to eat right now" queries and gives the brand a heartbeat. Blabberly can run "The San Diego Hit List" powered by actual rating/post velocity — data Resy fakes with editors, we'd have natively.
4. **"Climbing" rail** — popularity-velocity as a product surface. Maps directly onto Blabberly's trending/Top Spots signals.
5. **Editorial typography as positioning** (Beatrice + GT America + photography + credits). They bought their premium feel with type and photo discipline, not animation. The sunset gradient + one great display face could do the same for Blabberly.
6. **Photography-with-floating-UI composites** on B2B pages — show real restaurant life with the product hovering inside it. Ideal pattern for showing Blabberly's feed/route UI inside San Diego golden-hour photography.
7. **Verb-first benefit headers + a two-word spatial tagline** ("Right This Way") — copy system worth imitating structurally.
8. **Semantic color coding of privilege** (GDA purple bricks) — membership made visible inside the booking UI itself.
9. **Prerender-for-bots discipline** — they refused to let an SPA cost them SEO. Blabberly's place pages must ship full HTML, period.

#### What they do WORST — the openings we exploit

1. **The consumer site has no soul above the fold for newcomers.** Root drops you into a search utility; the actual brand pitch is buried at `/welcome`, which nobody links to prominently. A first-time visitor never gets told *why Resy*. Blabberly's site can lead with story + feel — we have to, and it's also just better marketing.
2. **No real ratings identity.** Review counts ("(32K) reviews") appear with zero explanation of who rated or whether they actually ate there. Blabberly's "every score comes from someone who actually went, rating required at post time" is a direct strike at this vagueness.
3. **No video anywhere.** The category's most visceral medium — short food video — is absent from Resy's entire web presence. A Blabberly site with autoplaying (muted, lazy) short-video of real dishes is a different sensory league.
4. **Reservation-gated worldview.** Resy only covers venues that take reservations on Resy — taco shops, counter spots, and most of a county's real food life don't exist there. Blabberly's ~4,000-venue San Diego coverage (cafes, bars, hole-in-the-walls) out-covers them locally by an order of magnitude.
5. **Exclusivity cuts both ways.** "Hottest tables," purple bricks, Amex tiers — the brand can read as a velvet rope for card members. Blabberly's "your friends and neighbors, not a concierge" framing is the warm counter-position.
6. **No personalization story.** Resy's guides are one-size-fits-all editorial; there is no "% match," no taste profile, nothing adaptive on the site. Blabberly's taste-match is a visible, demo-able differentiator Resy structurally can't copy on the web.
7. **No social/night-out layer.** "Make a Resy List" is their entire social feature set on the web. Group chats, polls, plans, and multi-stop routes have no Resy equivalent — the whole night, not just the table.
8. **Editorial is expensive and manual.** Their moat is a paid magazine staff. Blabberly's enriched place narratives + community post data can generate comparable freshness programmatically.
9. **Fragmented site architecture** — Angular SPA + HubSpot B2B + WordPress blog, three nav systems, visible seams (and a literal untranslated `titles.skip_to_main` string leaking into the shell). A single coherent site is an achievable bar to beat.
10. **App Store description is lazy** for a brand this good: two sentences, no feature storytelling — coasting on 694K ratings. Pre-launch Blabberly can't coast; ours has to work harder, and can.

#### Key verbatim reference (for the copy bank)
- "Right This Way"
- "Your next favorite restaurant is a few taps away."
- "Reservations Are Just the Beginning"
- "Discover restaurants to love in your city and beyond."
- "intel and access to the most exciting restaurants, from neighborhood favorites to cult classics"
- "Built for hospitality. Backed by American Express."
- "Turn cancellations into covers."

---

## T07. OpenTable (opentable.com)

Researched 2026-06-11. Method note: opentable.com sits behind Akamai bot
protection — direct WebFetch timed out and `/r/*` restaurant profiles plus
`/region/*` and `/lists/*` city pages returned 403 to readers. Homepage,
/about, /icons, /app-information, /restaurant-solutions, /blog, and a
live programmatic Diners' Choice page (/diners-choice/los-angeles/ambience)
were directly observed via text-rendering proxy (geo-resolved to Oregon, so
localized modules showed Portland/Hood River content). Everything else is
triangulated from search snippets, OpenTable's own press, and third-party
reviews and is marked [NOT DIRECTLY OBSERVED].

### OpenTable (Tier A)

#### Sitemap & page inventory — what pages exist and what each is for

Two parallel sites under one domain — a diner site and a B2B restaurant
site — plus an enormous programmatic SEO layer.

**Diner-facing core:**
- `/` — Homepage. Geo-localized booking engine + discovery feed. Title tag:
  "Restaurants and Restaurant Bookings | OpenTable."
- `/r/{restaurant-slug}` — The atomic unit: millions of restaurant profile
  pages (e.g. `/r/callie-restaurant-san-diego`, `/r/addison-by-william-bradley`).
  Each is simultaneously a booking widget, a review hub, and an SEO landing
  page. [NOT DIRECTLY OBSERVED — 403 to non-browser clients; structure
  triangulated from search snippets and help-center docs: availability
  widget, verified-diner reviews with Food/Service/Ambience/Value subscores,
  photos, menu, "additional information" fields, similar-restaurant links.]
- `/region/{metro}/{city}-restaurants` and `/{city}-restaurants` — City hub
  pages ("The Best Restaurants in San Diego Right Now," "The best
  restaurants in San Diego | (Updated 2026)"). Search snippet exposes the
  freshness mechanic: "As of Mar 23, 2026 there are 836 restaurants in San
  Diego available on OpenTable for reservations." [NOT DIRECTLY OBSERVED — 403.]
- `/neighborhood/{city}/{neighborhood}-restaurants` — One level deeper
  (e.g. "The Best Restaurants in Downtown San Diego Right Now"). [NOT
  DIRECTLY OBSERVED]
- `/diners-choice/{city}/{category}` — Programmatic award pages (directly
  observed: "Diners' Choice: Best Ambiance restaurants in Los Angeles").
  Methodology copy + 10 restaurant cards + "Explore Diners' Choice best of
  Los Angeles" internal-link block + "Updated June 05, 2026" freshness stamp.
- `/open/{city}` — "Restaurants Open In San Diego" — real-time-availability
  angle pages. [NOT DIRECTLY OBSERVED]
- `/cuisine/...` landmark/cuisine/category pages — surfaced in homepage
  footer as per-city subsections: "Landmarks, Cuisines, Categories,
  Neighbourhoods, Food nearby."
- `/icons` — OpenTable Icons award hub (observed). Editorial cards for
  ~21-26 "hottest restaurants" per metro, geo-localized; each card has photos,
  accolade copy, and "View full availability" links.
- `/lists/top-100-restaurants-us` — Annual Top 100 list. [NOT DIRECTLY
  OBSERVED — 403]
- `/blog/` — Editorial hub, observed. Tagline "Go deeper on dining."
  Sections: Cities (18+ city guides), Restaurant News (Awards, Events,
  Spotlight, Restaurant Business, Tips and Tricks, Industry Trends),
  Newsroom. Articles embed a reservation widget ("Find your table for any
  occasion" + "Let's Go").
- `/app-information` — App download page, observed. QR code + iOS/Android
  links.
- `/about/` — Mission page, observed. Story / Locations / Join the team +
  stats block.

**Restaurant-facing (B2B):**
- `/restaurant-solutions/` — Main B2B marketing page, observed. Hero video,
  four value-prop pillars, testimonials, lead-gen form.
- `/restaurant-solutions/plans/` (+ `/plans/basic/`, `/plans/core/`) —
  Pricing tiers. [NOT DIRECTLY OBSERVED — 403; per third-party reviews
  (eatapp, Capterra, Tekpon): Basic $149/mo + $1.50/network cover, Core
  $299/mo + $1.00/network cover, Pro $499/mo + $1.00/network cover; website
  bookings free on Core/Pro.]
- `/restaurant-solutions/resources/...` — A full B2B content-marketing
  library (SEO tips for restaurants, review management, Diners' Choice
  explainer, owner-app pages). Doubles as B2B SEO.
- `support.opentable.com` / `help.opentable.com` — separate help centers for
  restaurants vs. diners (their articles rank for product questions).

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

The homepage hero is not a headline — it's a **functional booking engine**.
Directly observed: a reservation bar with date (June 2026 calendar), time
("7:00 PM"), party size ("2 people"), and a geo-IP location module: "It
looks like you're in Hood River. Not correct?" Below it, a campaign banner:
**"Introducing OpenTable Icons" / "Book this year's award-winners, hot
newcomers, and hard-to-get tables."** Then an AI-discovery module:
**"Find the right table in Hood River" / "Let OpenTable find the best spots
for you. Powered by AI."**

The first-10-seconds story: *you are not here to learn what OpenTable is —
you're here to book dinner tonight, near where you're standing.* Zero
explanation, zero brand pitch, instant utility. The product IS the homepage.
This is incumbent privilege: 100% brand awareness means the hero can skip
persuasion entirely and go straight to transaction. Note the contrast with
the B2B hero, which IS persuasion: "The power to book 2,000 reservations
in 50 seconds" with "Watch the video" / "Get started" CTAs.

#### Narrative arc — how the homepage sells, section by section, in order

Directly observed order:
1. **Booking bar + location confirmation** — utility first; commits you to
   a session ("you're in Hood River").
2. **Icons campaign banner** — seasonal scarcity/aspiration layer
   ("award-winners, hot newcomers, and hard-to-get tables").
3. **AI concierge module** — "Let OpenTable find the best spots for you.
   Powered by AI" — the discovery on-ramp for people without a restaurant
   in mind.
4. **"Check out diners' favorite restaurants in Portland / Oregon"
   (Updated 6/5/2026)** — award-winner carousel with rating-facet filters
   (Overall, Food, Service, Ambience, Value). Data-as-content.
5. **"See what locals rave about in Portland / Oregon"** — verified-diner
   review snippets as a trust rail.
6. **"How OpenTable works"** — the only explanatory section, four icons:
   Discovery → Reservations → Availability ("full visibility into available
   reservations; timely notifications") → OpenTable points ("earn rewards
   for dining out").
7. **Footer mega-directory** — 15+ US metros + London/Dublin/Edinburgh,
   each fanning out to Landmarks / Cuisines / Categories / Neighbourhoods /
   Food nearby. The SEO engine is literally the basement of the homepage.

The arc is: transact → tempt → personalize → prove → explain → index. Selling
is done by inventory and social proof, not copywriting.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **Primary conversion = a reservation,** and every surface funnels to the
  availability widget: homepage bar, blog-article embedded widget ("Find
  your table for any occasion" + "Let's Go"), Icons cards ("View full
  availability"), Diners' Choice cards showing live "availability status
  messaging."
- **Geo-personalization as conversion lubricant:** geo-IP detection with an
  explicit correction affordance ("Not correct?") means the first screen is
  already locally relevant — no empty-state search box.
- **Social proof at industrial scale:** "136 million restaurant reviews,"
  reviews labeled as from **verified diners** (only people who actually
  booked and ate can review — their structural trust moat). Review snippets
  with diner name + dining date on award pages.
- **Awards as urgency:** Icons ("hard-to-get tables"), Diners' Choice, Top
  100 — manufactured scarcity and FOMO around inventory they already have.
  Award pages refresh monthly ("OpenTable analyzes nearly 2 million global
  diner reviews from the past four months").
- **Rewards loop:** OpenTable points ("Earn rewards for dining out")
  positioned in the core how-it-works — retention mechanic advertised as
  acquisition copy.
- **App funneling:** `/app-information` page — "Your next great meal awaits"
  / "Explore hundreds of restaurants and instantly book your next dining
  adventure," QR code ("Scan the QR code to explore…"), "Open app" button,
  iOS + Android links. Notably thin and undersold for a company this size —
  no app-store star ratings, no testimonials, five generic images. [App
  Store rating figures NOT DIRECTLY OBSERVED.]
- **B2B machinery:** long-form lead-gen form (name, email, phone, restaurant
  name, title, locations, reason), "Get started" CTAs, phone number
  (1-800-673-6822) in footer, stat-led proof ("guests who spend 25% more
  per person than walk-ins," "real person in under 1.5 minutes," "92%
  customer satisfaction"), enterprise logo wall (Marriott, IHG, Caesars,
  Boka).
- No waitlist/email-capture mechanics anywhere on the diner side — they have
  nothing to wait for. (Their in-product "waitlist" is a restaurant feature,
  not a marketing funnel.)

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

[Observed via text rendering; pixel-level specifics NOT DIRECTLY OBSERVED.]
- **Layout system:** card grids and horizontal carousels everywhere —
  restaurant cards (photo, name, star rating + review count, price band
  $30-and-under to $50+, cuisine, neighborhood, availability slots) are the
  universal atom, reused on homepage, award pages, blog, and Icons. Clean
  card-based layout with "prominent imagery, readable typography, consistent
  spacing" (observed on /icons).
- **Color:** white-dominant utility chrome with OpenTable's signature red
  (the brand red, ~#DA3743) reserved for CTAs and the logo. [Exact hex NOT
  DIRECTLY OBSERVED on-page.]
- **Photography vs illustration:** photography-led — food and dining-room
  photos carry every card; the B2B side leads with a cinematic restaurant
  video (Mawn) and uses flat iconography for the four how-it-works steps.
  Little to no illustration on the diner side.
- **Product UI display:** the diner site barely "shows the app" — the
  homepage IS the product. The app page shows a handful of screenshots
  [content NOT DIRECTLY OBSERVED]. The B2B side shows dashboard/iPad
  product UI and emphasizes "manage from anywhere (phone/iPad/computer)."
- **Motion:** none observable via text render; the experience reads as
  fast, dense, utilitarian rather than animated brand theater. [NOT
  DIRECTLY OBSERVED]
- **Tone of the visual system overall:** an OTA/marketplace aesthetic
  (closer to Booking.com than to a consumer-social brand). Functional, not
  emotional.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Voice is warm-utilitarian: short, appetite-forward, zero jargon on the diner
side; stat-heavy and operator-empathetic on the B2B side.

Worth studying:
- "Book this year's award-winners, hot newcomers, and hard-to-get tables."
  — scarcity + curation in 10 words.
- "Let OpenTable find the best spots for you. Powered by AI" — AI as
  concierge, not feature spec.
- "It looks like you're in Hood River. Not correct?" — disarmingly humble
  geo-personalization microcopy.
- "Your next great meal awaits" (app page) — appetite, not features.
- "We love what can happen around the restaurant table." (About) — mission
  framed as the table, not the tech; "our story is one of human
  connection—among diners and restaurants."
- "Go deeper on dining" (blog) — positions editorial as depth, not content
  marketing.
- B2B: "The power to book 2,000 reservations in 50 seconds" — capability as
  spectacle; "It's like having an extra employee" (testimonial); "The proof
  is in the profits."
- Vocabulary system to note: "verified diners," "Diners' Choice," "covers,"
  "seated diners," "Icons." They've built proprietary nouns around trust
  and inventory.

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

This is the industrial-grade version of what Blabberly is weighing:
- **Scale:** 60,000+ restaurants/bars/wineries served (About page; B2B page
  says 65,000+), each with a `/r/` profile page → tens of thousands of
  always-fresh, review-fed place pages in the US alone, with international
  variants (opentable.co.uk, etc.). 1.7-1.9 billion seated diners/year and
  "136 million reviews" continuously feeding UGC into those pages.
- **The page-type lattice:** place page (`/r/`) → neighborhood page → city
  page → metro/region page → cuisine/landmark/category pages → "open now"
  pages (`/open/{city}`) → programmatic award pages
  (`/diners-choice/{city}/{category}`) → annual lists (Top 100, Icons).
  Every layer interlinks; the homepage footer alone fans out to 18 metros x
  5 subsection types.
- **Freshness as ranking weapon (directly observed):** machine-stamped
  dates everywhere — "Updated 6/5/2026" on homepage carousels, "Updated
  June 05, 2026" on Diners' Choice pages, "(Updated 2026)" in city-page
  title tags, "As of Mar 23, 2026 there are 836 restaurants in San Diego"
  in meta descriptions. Review flow auto-refreshes content monthly:
  "OpenTable analyzes nearly 2 million global diner reviews from the past
  four months."
- **Title-tag formula:** "The Best Restaurants in {City} Right Now" /
  "{Restaurant} Restaurant - {City}, {ST} | OpenTable" — intent-matched,
  templated, ruthless.
- **Editorial layer:** blog city guides ("The best restaurants in San
  Francisco"), celebrity/chef features ("Where Padma Lakshmi loves to eat
  in New York City"), award coverage (James Beard, Michelin) — editorial
  exists to catch "best restaurants in X" head terms that pure programmatic
  pages can't win on E-E-A-T, then funnels into the booking widget embedded
  in every article.
- **Awards as PR + SEO flywheel:** Icons launches get picked up by
  PRNewswire, Yahoo Finance, trade press per city — earned links pointed at
  programmatic award pages.
- **B2B content library:** `/restaurant-solutions/resources/` ranks for
  operator queries ("restaurant SEO tips," "manage online reviews") —
  content marketing as lead gen.

#### What they do BEST — steal-worthy moves, named specifically

1. **Place page as the atomic unit of both SEO and conversion.** One
   template serves search engines, social proof, and the booking CTA at
   once. Blabberly's 1,626 enriched place pages are exactly this play at
   county scale — OpenTable proves the model compounds for 25+ years.
2. **Freshness stamping at machine scale.** "Updated 6/5/2026," "As of Mar
   23, 2026 there are 836 restaurants…" — dynamic counts and dates in
   titles/meta make templated pages look alive. Trivially stealable for
   Blabberly's enriched pages (e.g. "X spots rated by San Diego locals this
   month").
3. **Verified-only reviews as a trust moat, named and branded.** "Verified
   diners" — only people who booked can review. Blabberly's required-rating-
   on-every-post is the *stronger* version of this (proof of visit via
   video); steal the move of giving it a proprietary name and saying it
   everywhere.
4. **The page-type lattice.** City → neighborhood → cuisine → "open now" →
   award pages, all interlinked, all from one database. A four-layer
   template stack multiplies one dataset into thousands of intent-matched
   pages.
5. **Programmatic awards (Diners' Choice, Icons, Top 100).** They turn
   their own review data into recurring award "news" that earns press links
   monthly/annually. A future "Blabberly Locals' Choice: North County" is
   the same engine at county scale.
6. **Geo-personalized first screen with humble microcopy.** "It looks like
   you're in Hood River. Not correct?" — instant local relevance, no empty
   search box.
7. **Embedded booking widget inside every editorial article.** Content
   never dead-ends; every blog guide carries "Find your table for any
   occasion → Let's Go."
8. **Two-audience architecture under one domain** with cleanly separated
   voices: appetite copy for diners, ROI stats for operators ("guests spend
   25% more per person than walk-ins").

#### What they do WORST — the openings we exploit

1. **Zero personality, zero taste identity.** The site is a utility — there
   is no "% match," no sense that OpenTable knows *you*. Ratings are
   anonymous averages from strangers. Blabberly's taste-personalization and
   face-on-camera video reviews are the emotional layer OpenTable
   structurally cannot ship.
2. **Reviews are text from people you'll never see.** No video, no faces,
   no social graph. A 4.8 from 3,000 verified diners still can't show you
   the dish, the room, or whether the reviewer shares your taste.
3. **Only bookable restaurants exist.** OpenTable's index is its client
   list — taco stands, counter-service gems, cafes, and most of a real food
   scene are invisible because they don't pay $149-499/mo. Blabberly covers
   ~4,000 venues across San Diego County because coverage isn't gated on a
   SaaS contract.
4. **No night-out layer.** Booking a table is the last 5% of a night out.
   No group planning, no polls, no multi-stop routes, no chat — the social
   coordination job is completely unserved.
5. **The homepage assumes you already know what you want.** Discovery is
   bolted on (carousels, a generic "Powered by AI" module) — it's a
   transaction engine wearing a thin discovery costume. First-screen
   discovery-by-video is open territory.
6. **Undersold app page.** "Your next great meal awaits" + QR code, no
   ratings shown, no feature storytelling — for an app-first product like
   Blabberly, the download page can be dramatically better than the
   incumbent's.
7. **Corporate, dated brand surface.** Marketplace-utility aesthetic, no
   motion, no brand world; the About page leans on a 1998 founding story.
   A sunset-gradient, video-native brand reads a generation younger.
8. **Award programs are top-down and fine-dining-skewed** (Icons panels of
   "critics and industry experts," Michelin/James Beard framing) — leaves
   the everyday local scene unclaimed.

---

## T08. Partiful (partiful.com)

Researched 2026-06-11 via live WebFetch of partiful.com (homepage, /about, /press, /ticketing, /org-profiles, /birthday-party-invitations, /dinner-invitations, /download, /explore, /explore/nyc), raw HTML inspection of links/fonts/analytics, plus WebSearch context (NoGood marketing-strategy analysis, press coverage). Items not directly observed are marked.

### Partiful (Tier B)

#### Sitemap & page inventory — what pages exist and what each is for

Partiful runs **two stacks under one domain**, and the seam is invisible to users:

1. **Framer marketing site** (homepage + landing pages) — white-background, fast, designer-owned, no engineering dependency:
   - `/` — homepage; sells "create an invite" to hosts
   - `/about` — manifesto-style about page ("I party, therefore I am")
   - `/press` — 20 chronological press hits, Dec 2022 → Jun 2026, with awards (TIME100 Most Influential Companies 2025, Google Best App of 2024, Fast Company Most Innovative)
   - **Occasion landing pages** (programmatic-lite SEO set): `/birthday-party-invitations`, `/dinner-invitations`, `/housewarming-invitations`, `/pride-invitations` — keyword-targeted pages ("Birthday Party Invitations | Send Instantly & Track RSVPs") that all funnel to `/create`
   - `/ticketing` — feature launch page for paid ticketing
   - `/org-profiles` — "For Orgs" page targeting run clubs, book clubs, rec leagues
   - `/download` — QR code + iOS/Android links
   - `/careers` (Ashby), `/contact`, `/terms`, `/privacy`, `/cookie-policy`, `/community-guidelines`
   - `/blog` — "The Guest List" editorial blog (also mirrored on Substack)

2. **Next.js product app** (dark-themed, `ptf-dark`) living on the SAME domain:
   - `/create` — the actual invite builder, reachable in one click from any marketing page, **no signup wall to start**
   - `/explore` — public event discovery hub (NYC, LA, SF featured; 9 city pages total)
   - `/explore/{nyc,la,sf,bos,dc,chi,mia,atx,lon}` — city discovery pages with category pills (Music, Community, Arts, Fitness, Food, borough filters) and editorial rails ("weekend forecast", "after hours", "meet new people!")
   - `/e/<eventId>` — **public event pages: every invite anyone creates is an indexable, shareable landing page with Partiful branding.** This is the real sitemap — thousands of user-generated pages doing the marketing.
   - `/login`

Notable absence: **no `robots.txt` and no `sitemap.xml`** — both return the app's 404 page (which is `noindex,nofollow`). Their SEO runs on internal linking + sheer link velocity from shared invites, not classic technical SEO hygiene.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

- **Headline:** "Parties are back"
- **Subhead:** "The easiest way to get your guests on the same page"
- **Primary CTA:** "Create invite" → goes STRAIGHT into the product (`/create?referrer=landing`), no signup, no demo request, no waitlist
- **What's shown:** animated invite templates. The homepage HTML loads Framer `Ticker` and `Video` modules — a scrolling ticker of live invite designs/video. [Exact hero art NOT DIRECTLY OBSERVED — inferred from loaded components and template links.]
- **First-10-seconds story:** *You can make a beautiful, funny invite right now, for free, without signing up.* Three words of cultural swagger ("Parties are back" — a post-pandemic flex that doubles as a category claim), then immediate product access. There is zero "learn more" friction; the hero treats the product itself as the demo. Directly below: "Fun, modern invites in 1-click — 100% free, no paywalls," killing the two biggest objections (effort, cost) in the first viewport.

#### Narrative arc — how the homepage sells, section by section, in order

1. **Hero** — "Parties are back" + "Create invite." Claim the cultural moment, hand over the tool.
2. **Value prop** — "Fun, modern invites in 1-click. 100% free, no paywalls. Backgrounds, Fonts, Animations, Posters." Objection-killing before the user even scrolls far.
3. **Press wall** — six elite-publication quotes (NYT, Atlantic, WSJ, WaPo, USA Today, NYT Style). Quotes, not logos — each one a one-liner that does positioning work ("Evites are so last decade").
4. **Template gallery** — "For every occasion, every vibe 🎉 / No more boring invitations." Each template tile deep-links to `/create?theme=…&effect=…&poster=…` — clicking a design IS starting an event.
5. **Feature trio** — Ticketing ("New! Sell tickets for your event 🎟️"), social guest list ("See who's going 👀 — Stalk the guest list…"), Text Blast ("Running late, need more drinks, 10 people texting you asking how to get in?"). Features framed as social situations, not capabilities.
6. **Feature grid** — "Powerful features, easy events": date polls, guest questionnaires, payments, share-anywhere. Each card has a "Try it" link — again, straight into product.
7. **Photo album** — "Get a shareable photo album 🤳" — extends the product's job past the event itself (memories), the emotional close.
8. **App-store proof** — "5.0 • 40K Ratings" linked to the App Store.
9. **Real user reviews** — seven verbatim App Store-style testimonials with usernames and dates ("I don't even hang out with my friends if they don't send me the partiful first" — r3boi). Deliberately unpolished; reads like screenshots of real life.
10. **Final CTA** — "Let's get the party started. Find us on any browser, iPhone, and Android."
11. **Blog teaser** — "psst…fresh off the press 😮‍💨" with three editorial posts (e.g., "The Rise of Unserious Events: A Lookback at the Timothée Chalamet Lookalike Contest"). Brand-as-culture-publication, last impression is personality.

The arc is: *cultural claim → instant tool → elite validation → play with designs → features-as-stories → peer proof → go.* It sells use, not signup.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **One verb everywhere:** "Create invite" / "Create event" / "Create free invite" appears in the hero, after every feature section, in the template gallery, in the footer of every page including 404s. CTA variants stay in-voice: "Get started," "Try it out," "Start selling," "See you at the door."
- **Zero-friction entry:** CTAs deep-link into `/create` with the design pre-loaded via URL params (`?theme=karaoke&effect=sunbeams&poster=Tyler+the+Creator`). The user is *inside the product, configured,* one click after the marketing page. No account wall to begin.
- **Web-first, app-second:** "100% free on any browser, iPhone, and Android" and "guests don't need the app" are repeated claims. App download is offered (QR on /download, footer links, `m.partiful.com` smart links via Branch.io for deferred deep linking) but never required. The app is upsold AFTER the web product proves value.
- **Social proof, three flavors stacked:** (1) elite press quotes, (2) "5.0 • 40K Ratings" hard number, (3) scrappy verbatim user reviews with handles/dates. Plus awards on /press (TIME100 2025, Google Best App 2024).
- **The invisible engine:** every shared invite (`/e/...`) is a branded landing page put in front of non-users by their own friends — product-led distribution that no homepage CTA can match. RSVPing exposes you to "create your own."
- **Urgency mechanics:** essentially none — no countdowns, no scarcity, no waitlist. The only "new" energy is the "New!" badge on Sell Tickets. Urgency is replaced by *cultural FOMO* (press quotes like "If You Don't Send a Partiful Invite, Gen Z's Not Going" [headline observed on /press]).
- **Heavy paid/attribution stack** [observed in HTML]: GTM, Meta Pixel, TikTok Pixel, Snap Pixel, Branch — they run paid social and measure it; the site is an active performance asset, not a brochure.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

- **Two-world system:** the marketing site is **light/white** (`background-color: rgb(255,255,255)` dominant with black sections) while the product app is **dark** (`ptf-dark` class, black UI). Marketing = daylight clarity; product = nightlife. The contrast itself communicates "the party is inside."
- **Typography** [observed in source]: TWK Lausanne Pan (400/550/650/700) — a fashionable Swiss grotesque — plus a custom **"Partiful Display Medium"** face for brand moments, Inter/Inter Variable as workhorse, and **Fragment Mono** + Afacad as accent faces. Editorial-fashion typesetting, not SaaS-default.
- **Color:** white/black base with the color riot delegated to the **invite templates themselves** — themes named oxblood, aquatica, cloudflow, galaxy, crystal, watercolor, girlyMac, karaoke [observed in template URL params]. The brand's chrome is neutral; the user content is the color.
- **Motion:** Framer-native animation; Ticker (scrolling template strips) and Video components in the hero; invite templates ship with named effects — sakura, confettiExplosion, sunbeams, bows, graduation [observed in URL params]. Animation is a *product feature being demoed*, not decoration.
- **Imagery:** no stock photography. The site shows **real product UI** (invite cards, guest lists, text blasts) and real user-generated event posters (lookalike-contest flyers, meme posters — Shrek in sunglasses, "girldinner-leftovers", "quarter-life-crisis" templates). On /explore, real event photos from real hosts. Product-as-imagery throughout.
- **Emoji as a design system:** section headers carry emoji (🎉 👀 🎟️ 🤳 📫 😮‍💨); even the 404 page is a giant 😬 with "Page Not Found." Emoji do the visual-warmth work other sites assign to illustration.
- **Layout:** classic centered hero → alternating feature sections → card grids; nothing structurally exotic. The personality lives in type, copy, and the demo content — the skeleton is conventional and easy to scan.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Tone: self-aware, dry, terminally-online, confident. Reads like a funny friend, never like a company. NoGood's analysis nails it: "self-aware and a little unhinged (in the best way)" and "sounds like real people who genuinely like parties wrote it."

Quotes worth pinning to the wall:
- **"Parties are back"** — three-word hero that claims a cultural moment.
- **"The easiest way to get your guests on the same page"** — benefit subhead, zero jargon.
- **"Fun, modern invites in 1-click. 100% free, no paywalls."** — objection-murder as copy.
- **"Stalk the guest list, leave comments, reply to friends, and add reactions. Keep the party going."** — uses the word users actually use ("stalk") instead of "view attendees."
- **"Running late, need more drinks, 10 people texting you asking how to get in? Send updates to everyone at once."** — feature intro as a lived scenario.
- **"Easy AF ticketing"** (on /ticketing) and **"Don't process payments, fill the room"** — reframing a payments feature as a social outcome.
- **"See you at the door"** — a CTA that's an RSVP.
- **"No ads, no fees, and most importantly, no group chat chaos."** (dinner-invitations page)
- **"The whole point of a dinner party is the people, good food, good conversation, and a reason to finally use the nice dishes."** — SEO page copy that's actually charming.
- **"I party, therefore I am"** (About headline) + mission **"We make it easy to go from idea, to invite, to actual memories."**
- **"psst…fresh off the press 😮‍💨"** — blog section label.
- Blog tagline: **"This newsletter knows how to party."** Blog post titles go fully feral: "Why We Need Fuckbois," "The Cuntiest Chess Club in Los Angeles," "FLAMER HOSTS 700 STONERS FOR QUEER CHURCH ON 420."
- External positioning shorthand [from press/analyses, not site copy]: "Facebook Events for hot people," "Eventbrite but for Gen Z."

Vocabulary system: contractions, lowercase headers on app surfaces ("explore nyc", "trending in nyc", "weekend forecast"), internet-native intensifiers (AF), second person, emoji as punctuation. They never say "platform," "seamless," or "solution."

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

- **Occasion landing pages (4 observed):** birthday / dinner / housewarming / pride invitations. Proper SEO anatomy: keyword title tags ("Birthday Party Invitations | Send Instantly & Track RSVPs"), 18+ template galleries that deep-link to /create, and genuine educational sections ("What makes a great birthday party invitation?", how-to guides). Small set, high intent — they target "X invitations" commercial keywords, not informational sprawl. (Sloppiness note: the dinner page's how-to header still says "How to send free **birthday** invitations online" — template reuse showing.)
- **City explore pages (9):** nyc, la, sf, bos, dc, chi, mia, atx, lon. Title pattern "Discover Things to Do in New York | Partiful." Live event inventory with category pills and editorial rails ("weekend forecast", "after hours", "celebrate pride"). These are discovery surfaces first, SEO second — thin on static copy, rich on fresh structured listings.
- **Public event pages (`/e/<id>`):** the true programmatic footprint — every user-created event is a branded public page. Effectively unbounded UGC page count with built-in social distribution (16,055 attendees on a single observed event).
- **Blog "The Guest List":** four categories (Latest, Party 101, Culture, IMHO), mirrored to Substack, with an email list ("Get on the list"). It's a *culture magazine*, not a content-marketing blog — community spotlights, scene nostalgia, feature announcements wrapped in editorial. Builds brand and press-worthiness, not keyword rankings.
- **Technical SEO is shockingly loose:** no sitemap.xml, no robots.txt (both 404). They can afford this because distribution is product-led + press-led; rankings are gravy.
- **Overall footprint:** small curated core (~20 marketing pages + 9 city pages + blog) sitting on top of a massive UGC long tail.

#### What they do BEST — steal-worthy moves, named specifically

1. **CTA-to-product in one click, pre-configured.** Template tiles deep-link to `/create?theme=…&effect=…&poster=…` — the marketing page hands you a half-finished creation. For Blabberly: a place page or route card whose CTA drops you into the app (or web preview) with that place/route already loaded.
2. **Features narrated as social situations.** "Running late, need more drinks, 10 people texting you asking how to get in?" — every feature is introduced by the moment of pain it kills. Blabberly equivalent: "It's 7pm, six people, nobody can pick a spot" → polls/plans/routes.
3. **Press quotes as positioning weapons.** Six one-line quotes chosen because each does an argument's worth of work ("Evites are so last decade"). Quotes > logo walls.
4. **Three-layer social proof stack:** elite press + hard number ("5.0 • 40K Ratings") + raw, verbatim, username-and-date user reviews that sound human ("I don't even hang out with my friends if they don't send me the partiful first").
5. **UGC as the landing-page army.** Every invite is a public branded page a friend puts in front of you. Blabberly's `/place/*` universal links + shared posts/routes can play this exact role — every shared route or place is a recruitment page.
6. **The two-stack trick:** Framer marketing site (designers iterate freely) seamlessly stitched to the Next.js app on one domain. Marketing velocity without engineering bottleneck.
7. **Voice as moat.** The copy is the brand. "Easy AF ticketing," "Stalk the guest list," a 😬 404 page — personality applied with total consistency from hero to legal-footer-adjacent surfaces.
8. **Web-first generosity:** "100% free, no paywalls," "guests don't need the app." Value before download; the app install is the second ask, not the first.
9. **Emoji-in-headers as a cheap warmth system** — zero illustration budget, instant Gen Z legibility.
10. **Occasion-page SEO anatomy:** keyword title + live template gallery + honest how-to content + single repeated CTA. A clean, reusable template for Blabberly's "best birria in Carlsbad"-style pages.

#### What they do WORST — the openings we exploit

1. **No food/place dimension at all.** Partiful organizes *the gathering*, never *where to go*. The "where should we eat/drink" decision — Blabberly's entire territory — is a void in their product and their site. They get you to RSVP; we get you to the right table.
2. **Thin, generic city pages.** "explore nyc" is an event dump with category pills — no neighborhood depth, no venue intelligence, no taste personalization. Blabberly's 1,626 enriched place pages with real ratings-from-people-who-went can be 10x richer per page in San Diego County than Partiful is anywhere.
3. **Technical SEO negligence:** no sitemap, no robots.txt, sloppy template reuse (dinner page titled with "birthday" how-to). They coast on brand searches and link velocity. A disciplined competitor can own intent keywords they ignore — especially local food intent, which they don't even compete for.
4. **No urgency or launch mechanics.** Nothing converts a visitor who isn't ready to host *today*. No waitlist, no email capture on the homepage (newsletter is buried in the blog). For a pre-launch Blabberly, a proper waitlist + city-rollout scarcity ("San Diego first") is a layer Partiful never built.
5. **Big-city coastal bias:** 9 cities, zero suburban/regional presence. San Diego isn't even on the list. Regional depth — every taco shop in Carlsbad — is a position they structurally can't take with an events-only model.
6. **Host-only homepage:** everything sells the event *creator*; the guest/discovery side is an afterthought (Explore is one nav link). Blabberly sells both sides — the person deciding where to go tonight is a first-class user, not just an RSVP.
7. **The voice has a ceiling:** "Why We Need Fuckbois" on the company blog is a flex that also caps them — partnerships with restaurants, families, older demos get harder. Blabberly can be playful-warm (sunset, food, friends) without the edgelord tax, and food photography gives us an emotional asset Partiful's meme-poster aesthetic can't match: appetite.
8. **Events are episodic; eating is daily.** Their site has no answer to a recurring use case ("where should we go?" happens 3x a week; "I'm hosting a party" happens 3x a year). Frequency is our wedge — and our site should say so.

---

## T09. Strava (strava.com)

Researched 2026-06-11 via live WebFetch (homepage, /subscribe, /mobile, business.strava.com, press.strava.com, stories.strava.com, /routes/hiking/usa/california/san-diego) + WebSearch triangulation. Items not directly observed are marked.

### Strava (Tier B)

#### Sitemap & page inventory — what pages exist and what each is for

| Page | URL | Job |
|---|---|---|
| Homepage (logged-out) | strava.com | The signup machine. Hero + community story + feature pillars + subscription teaser. Title tag: "Strava \| Running, Cycling & Hiking App - Train, Track & Share" |
| Features | /features | Feature marketing (Track & Analyze / Share & Connect / Explore & Compete). JS-rendered — returned only nav/footer to crawlers. [Details NOT DIRECTLY OBSERVED] |
| Subscription / pricing | /subscribe | Full pricing grid: individual $6.67/mo billed annually ($79.99/yr, "Save 44%"), Family $2.92/person/mo (4 accounts), Student 50% off, Strava+Runna bundle "$12.50/mo, Up to 60% Off," teacher/military/medical 25% off. 30-day free trial with an explicit trial-timeline graphic ("2 days before: Get a reminder about when your trial will end"). |
| Mobile download | /mobile | Legacy-feeling but effective app-store funnel: both store badges, press logos (Velo News "Technical Innovation of the Year," Runner's World, Triathlete, Men's Journal, Road Bike Action — "can easily become an addiction"). |
| Maps | /maps | Maps/heatmap landing. JS-rendered, thin to crawlers. [Details NOT DIRECTLY OBSERVED] |
| Programmatic routes directory | /routes/[activity]/[country]/[state]/[city] | The SEO engine. e.g. "The Best Hiking Trails in San Diego, CA" — top-10 list pages generated from activity data, fully public, no login wall, with 100+ internal location links each. Root /routes and /routes/running 404 or render thin direct — discovery is via search + interlinking. |
| Stories (editorial) | stories.strava.com | Server-rendered Contentful blog in 13+ languages: training guides, athlete narratives, "Explaining the 'Strava Tax'," product What's New. Signup CTAs throughout. |
| Business / brand partnerships | business.strava.com | B2B: Sponsored Challenges, Sponsored Segments, subscription partnerships. "Reach the world's largest community of skiers, hikers, cyclists, swimmers, runners, active people." Case studies: Lululemon, The North Face, CLIF Bar, Chipotle, Salomon. "Sponsored Challenges increase average brand recall by 2x." |
| Press | press.strava.com | News feed (e.g. Jun 2026: hiking features; MCP Connector syncing training data to Claude; Metro Commute Report "550 million miles of bike commutes logged in 2025"). |
| About | /about | JS-rendered, thin to crawlers. [Details NOT DIRECTLY OBSERVED] |
| Footer cluster | Family Plan, Student Discount, Gift cards, What's New, Careers, Privacy/Terms | Long-tail conversion + legal. |
| Individual route/segment/activity/club pages | /routes/:id, /clubs/:id | Millions of user-generated public pages (e.g. "San Diego Bay \| 4.9 mi Running Route on Strava") that rank organically and deep-link into the product. |

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

- **Headline:** "Community-Powered Motivation"
- **Subhead:** "Track your progress and cheer each other on. Join over 100 million active people on Strava for free." (Homepage still says 100M while press claims 180M+ — they round DOWN and keep the hero stable.)
- **Primary CTA:** not a "Download" button — an actual inline signup module: "Sign Up With Google" / "Sign Up With Apple" / "Sign Up With Email," all → /register/free. Zero clicks between landing and account creation.
- **What's shown:** lifestyle photography (a runner shielding her eyes from the sun — joy, not data) layered with a device mockup of the app.
- **First-10-seconds story:** *You won't do this alone.* The product (GPS tracking) is demoted to the subhead; the emotional promise (community, cheering, motivation) leads. Scale ("100 million") + price ("for free") kill both objections — "is anyone on this?" and "what does it cost?" — in one sentence.

#### Narrative arc — how the homepage sells, section by section, in order

1. **Hero** — emotional promise + scale + free + instant signup form.
2. **Identity claim** — "If you're active, Strava was made for you." Radical inclusivity: not "for cyclists," for *anyone who moves*. (Their classic line, seen in earlier versions and teardowns: "If you sweat, you're an athlete.")
3. **Three pillars / how it works** — "Start by sweating" → "Get *better* by analysis" → "Dive into details on desktop." A verb-led usage journey, not a feature list.
4. **The hook-then-moat section** — "Join for the tracking, stay for the community," with "Open, tap, go" (zero friction), "A no BS network" (quality feed, anti-Instagram positioning), "The ultimate athlete resource" (discovery). This is the single most honest articulation of a community app's retention model on any marketing site: tool gets you in, network keeps you.
5. **Explore features** — Track & Analyze / Share & Connect / Explore & Compete cards → /features.
6. **Subscription teaser** — "More features, more fun," spotlighting one emotionally resonant feature (Beacon: "Share your real-time location during an activity with up to three safety contacts") rather than a feature dump → /subscribe.
7. **Breadth closer** — supports skiing, kiteboarding, crossfit, kayaking, yoga... widens the addressable audience right before the final CTA.
8. **Footer** — repeats signup, app badges, full sitemap.

Arc summary: emotion → identity → usage journey → retention promise → monetization whisper → breadth → ask again.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **Signup form IS the hero.** Google/Apple/Email one-tap registration above the fold; account creation happens on the marketing site, app download comes second. They capture the relationship first, then push to the store.
- **Every public page converts.** SEO route pages carry "Join for Free" in header, "Sign Up" in footer, app badges, and route detail links that gate deeper interaction behind an account.
- **App-store funneling:** /mobile is a dedicated badge page; badges also live in every footer; smart banners on mobile web [NOT DIRECTLY OBSERVED].
- **Social proof, layered by audience:** consumers get the 100M number; /mobile gets press quotes ("can easily become an addiction" — Road Bike Action); business gets brand logos (Lululemon, North Face, Chipotle) + a measured stat ("2x brand recall"); press gets data reports ("14 billion kudos given this year," "550 million commute miles").
- **Urgency mechanics:** essentially none — no countdowns or fake scarcity. The only time pressure is the 30-day trial, and they *defuse* it with a transparent timeline ("2 days before: Get a reminder... Cancel at least 24 hours before"). Trust over urgency.
- **Pricing anchoring:** annual-first prices shown as low monthly equivalents ($6.67/mo), discount badges ("Save 44%", "Up to 60% Off"), family/student/military ladders to catch every willingness-to-pay.
- **Data-as-marketing:** Year in Sport (12th annual; 2025 theme "Doomscrolling Is Out, Movement Is In," 30,000+ surveyed) is an annual earned-media + in-app-share flywheel — every user becomes a December billboard.

#### Visual language — layout, typography, color, motion, photography vs illustration vs product UI

- **Color:** one signature orange (#FC4C02-family) for every CTA and data accent, on clean white. The orange IS the brand — instantly recognizable at thumbnail size.
- **Photography-first:** real athletes in golden natural light, mid-effort or post-effort joy. Almost no illustration. People > product.
- **Product UI shown in context:** device mockups layered over/next to lifestyle shots — the app appears as the companion to the life, never as naked screenshots in a row.
- **Layout:** generous whitespace, alternating image/copy bands, three-card grids for feature groupings; minimal, "stripped of distraction" (echoed in DesignRush's analysis).
- **Typography:** bold condensed sans for headlines (shouty, athletic), clean sans body. Occasional italic emphasis inside headlines ("Get *better* by analysis").
- **Motion:** modest — no heavy scroll-jacking observed in markup; the energy comes from photography and color, not animation. [Animation details NOT DIRECTLY OBSERVED — JS-rendered portions]

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Tone: motivational, blunt, second-person, slightly irreverent. Vocabulary of effort and belonging — sweat, cheer, strive, kudos.

Quotes worth pinning to the wall:
- **"Community-Powered Motivation"** — the entire company in three words.
- **"Track your progress and cheer each other on."** — feature + feeling in nine words.
- **"If you're active, Strava was made for you."** / classic: **"If you sweat, you're an athlete."** — identity-granting copy; the reader is admitted, not sold.
- **"Join for the tracking, stay for the community."** — acquisition hook vs retention moat, stated out loud.
- **"A no BS network."** — anti-social-media positioning in four words.
- **"Start by sweating."** — verb-first section header.
- **"The social network for those who strive."** — long-running tagline.
- Footer/meta: **"Train, Track & Share."**

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; footprint size

This is Strava's most Blabberly-relevant asset:

- **Programmatic location pages** at `/routes/[activity]/[country]/[state]/[city]` — "The Best Hiking Trails in San Diego, CA," "The Best Trail Running Routes in Los Angeles, CA," etc. Verified live and fully public (no login wall). Anatomy of one page: data-backed intro ("compiled... using data from hundreds of thousands of hikes"), ranked top-10 with difficulty/distance/elevation ("2.92 mi · 893 ft"), 3-4 sentence editorial descriptions, six photos per route (auto-pulled from on-trail member uploads), 100+ internal links to sibling locations and activities, app badges, ~2,500+ words. Per [Here & There's analysis](https://www.hereandthere.club/p/stravas-big-shift), Strava spiked these pages in late 2024, targets intent like "best hikes near me," and **de-listed ~53,000 low-value user routes to concentrate crawl budget on the curated pages** — programmatic SEO with editorial discipline, fed by the 2023 FATMAP acquisition's structured route data.
- **Millions of UGC pages** (individual routes, clubs, segments) ranking long-tail ("San Diego Bay | 4.9 mi Running Route on Strava").
- **Stories** editorial hub: server-rendered, Contentful, 13+ languages, training guides + athlete stories + product news, signup CTAs throughout.
- **Data journalism:** Year in Sport annual trend report (press cycle every December), Metro Commute Report — original data nobody else has, converted into earned media.
- **Defunct:** "Strava Local" city guides were discontinued years ago [NOT DIRECTLY OBSERVED] — they replaced editorial city guides with data-generated route pages, a telling evolution.

Footprint: enormous — among the largest programmatic SEO operations of any consumer app, riding very high domain authority.

#### What they do BEST — steal-worthy moves, named specifically

1. **Community-first hero with the tool demoted to the subhead.** "Community-Powered Motivation" + "Join over 100 million active people... for free." Blabberly translation: lead with *people deciding where to eat together*, put video/ratings in the subhead.
2. **Inline signup as the hero CTA** (Google/Apple/Email on the marketing page) — capture the account before the App Store ever enters the picture. For pre-launch Blabberly this maps 1:1 to the waitlist form living IN the hero.
3. **"Join for the tracking, stay for the community"** — explicitly naming the hook (utility) and the moat (network) as homepage architecture. Blabberly: "Come for the honest ratings, stay for the crew."
4. **Programmatic place/route pages built from proprietary activity data**, public, photo-rich, densely interlinked, with crawl-budget discipline (de-listing 53k weak pages). This is the exact precedent for publishing Blabberly's 1,626 enriched place pages pre-launch with waitlist CTAs — Strava proves data-generated local pages + high-intent queries ("best X in [city]") + in-product photos = compounding acquisition.
5. **Identity-granting copy** — "If you sweat, you're an athlete" admits the reader to a club instead of pitching software.
6. **One ownable color** used with total discipline — orange on white everywhere. (Blabberly's sunset gradient should play the same role.)
7. **Data-as-marketing flywheel** — Year in Sport / Metro Commute Report turn user data into an annual press cycle and shareable personal recaps.
8. **Audience-layered social proof** — user count for consumers, press quotes on the download page, brand logos + recall stats for B2B. Blabberly's future restaurant-partner page should mirror business.strava.com's structure.
9. **Transparent trial mechanics** ("2 days before: Get a reminder...") — converting through trust instead of urgency.

#### What they do WORST — the openings we exploit

1. **JS-rendered marketing subpages** — /features, /about, /maps serve essentially empty HTML to crawlers and fetchers; only the homepage and programmatic pages are solid. Blabberly: statically render every marketing page.
2. **Stale hero numbers** — homepage says 100M while press says 180M+; the marketing site visibly lags the company.
3. **/mobile is a fossil** — dated "Strava GPS Cycling and Running App" headline and old press quotes (Velo News-era), inconsistent with the brand-forward homepage.
4. **No visceral product demo** — for a product whose feed is the magic, the homepage shows static mockups; no autoplay video of the experience. Blabberly, a short-video app, can make the site itself feel like the feed.
5. **Confusing route-page entry points** — /routes and /routes/cities 404 or render thin; the SEO pages are reachable only via search/interlinks, with no human-browsable directory.
6. **Generic top-10 SEO copy** — route descriptions are competent but voiceless; nothing sounds like "A no BS network." Blabberly's enriched About copy can out-personality them at the page level.
7. **Pricing complexity creep** — Runna bundle, family, student, teacher/military/medical, gift cards: five-plus pricing concepts on one page.
8. **No urgency or launch energy anywhere** — fine for an incumbent, but it means the playbook for a pre-launch waitlist (scarcity, founding-member status, city-by-city rollout) is one Strava never demonstrates; we take their trust mechanics and add launch heat ourselves.
9. **Community claimed, never shown** — no testimonials, member faces, or real kudos/comment threads on the homepage; "100 million" is asserted, not dramatized. Blabberly can show actual posts, ratings, and group plans from the ~80 beta testers.

Sources: live fetches of [strava.com](https://www.strava.com/), [/subscribe](https://www.strava.com/subscribe), [/mobile](https://www.strava.com/mobile), [business.strava.com](https://business.strava.com/), [press.strava.com](https://press.strava.com/), [stories.strava.com](https://stories.strava.com/), [San Diego hiking routes page](https://www.strava.com/routes/hiking/usa/california/san-diego); context from [Here & There on Strava's SEO shift](https://www.hereandthere.club/p/stravas-big-shift), [Here & There on Year in Sport 2025](https://www.hereandthere.club/p/a-look-at-stravas-2025-year-in-sport), [Strava press release (Year in Sport 2025)](https://press.strava.com/articles/strava-releases-12th-annual-year-in-sport-trend-report-2025), [DesignRush analysis](https://www.designrush.com/best-designs/websites/strava), [Scrapbook landing-page teardown](https://www.getscrapbook.com/teardowns/strava), [NoGood marketing analysis](https://nogood.io/blog/strava-marketing-strategy/).

---

## T10. Cash App (cash.app)

Researched 2026-06-11 via direct WebFetch of homepage + 9 subpages, sitemap.xml, and design-press triangulation (BUCK case study, Design Compass, Creative Bloq/Awwwards coverage of the brand-guidelines site). Items not directly observed are marked.

### Cash App (Tier B)

#### Sitemap & page inventory — what pages exist and what each is for

Directly read from `cash.app/sitemap.xml` — **144 URLs total**, a remarkably tight footprint for a 59M-user product:

- **Product/feature pages (~11):** `/card`, `/send`, `/savings`, `/bitcoin`, `/stocks`, `/spend`, `/borrow`, `/afterpay/cashapp`, `/send/pools`, `/tags`, `/taxes`. Each is a self-contained mini-homepage: hero → feature blocks → FDIC/security section → FAQ → social-proof strip → "Sign up now."
- **Banking cluster (5):** `/bank/`, `/bank/no-fees`, `/bank/direct-deposit`, `/bank/cash-app-green`, `/bank/overdraft` — benefit-level SEO pages under one directory.
- **Families cluster (3):** `/families/` + kid (6–12) and teen (13+) sub-pages — segment-specific landing pages with their own FAQs.
- **Educational content (19):** `/learn/` hub ("Cash App Basics — Cash App makes money simple") with categories Getting Started / Spend & Budget / Save & Invest. Titles are pure question-intent SEO: "What is Cash App and how does it work?", "Is Cash App a bank?", "What is Cash App's savings interest rate?", "What is bitcoin? A beginner's guide."
- **Scam/security content (9):** `/outsmart-scams/` — common scams, how to identify, how to recover. Defensive SEO that doubles as trust-building.
- **Press (71 URLs):** half the entire sitemap is `/press/` releases — partnerships, features, "trends" reports. This is their newsroom + announcement archive.
- **Campaign pages (4):** `/cmp/green-house`, `/cmp/1099-K`, sweepstakes pages — short-lived activations get their own namespace.
- **Utility:** `/login`, `/new` (Fall Release 2025 teaser page), `/contact`, `/reviews`, `/security`.
- **$cashtag profile pages** (`cash.app/$username`) exist as a payment-profile pattern but are not in the sitemap; the `/$jack` test URL returned 404. Scale/indexing of these [NOT DIRECTLY OBSERVED].
- **Notable absences:** no city pages, no blog in the traditional sense, no pricing page (free is the pricing), no about page in the sitemap (careers/press in footer instead).

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

- **Headline:** "The way money should work"
- **Subhead:** "From getting paid to growing what you've got, Cash App makes managing your money effortless and instant—without all the fees."
- **Primary CTA:** "Get started" → routes to `/login?su` (account creation in the browser, not an app-store kick-out).
- **What's shown:** brand-forward product imagery — neon-green ("strengthened to a more intense fluorescent green" per the 2025 Evergreen redesign), custom Cash Sans typeface, 3D graphic elements, customizable card designs (Glitter, Black, Pink, White, Glow, Mood). Exact hero animation behavior [NOT DIRECTLY OBSERVED — JS-rendered; triangulated from design press describing "custom motion and responsive feedback" sitewide].
- **First-10-seconds story:** category-defining confidence. No "what is this app" explanation — at 59M users they open with a worldview statement ("the way money *should* work"), name the enemy ("without all the fees"), and push you straight into signup. The hero sells a philosophy; the sections below sell the features.

#### Narrative arc — how the homepage sells, section by section, in order

1. **Worldview hero** — "The way money should work" + Get started.
2. **Cash App Green** (premium tier) — "Earn, save, and do more with Cash App Green": 3.25% savings interest, higher borrow limits, free overdraft, 40k ATMs. Aspirational tier first.
3. **Cash App Card** — "the debit card that works for you": no hidden/monthly fees ever, weekly custom cash back, real-time alerts, "card designs you can fully personalize." The physical, personalizable object is the emotional anchor.
4. **Access cash** — "Explore our flexible ways to bridge the gap between payday and bill pay": overdraft to $200, borrow $500 no credit check, Afterpay, paycheck 2 days early. Speaks to the real life of their young/paycheck-to-paycheck user without condescension.
5. **Cash App Tags** — "Meet the all-new Cash App Tags… a more whimsical way to tap to pay." New-product showcase slot keeps the page feeling current (fall 2025 release).
6. **Save & grow** — "Make your money go even further": interest, auto-save, spare-change round-ups.
7. **Send money** (the original core) — "Sending money is fast, free, and made for you": stickers, pools, contact sync, Security Lock. Note the founding feature is *sixth* — the page sells the bank, not the Venmo-killer.
8. **Security** — "Security built into every swipe, tap, and send… Since 2020, we've prevented $2 billion+ in scams" + Zero Fraud Liability + FDIC.
9. **Social-proof close** — "The money app 59 million+ people trust" + user quote + 5★ Editor's Choice / 9.9M+ reviews / 4.5★ Trustpilot → "Sign up now."
10. **Footer** — single hard "Download Cash App" button, human phone number, then a wall of legal disclaimers.

Arc in one line: *worldview → premium aspiration → tangible object → real-life money stress → novelty → growth → social core → safety → 59M people already trust us → sign up.*

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **Two-speed CTA system:** every section has a soft "Learn about X / Explore X / Meet X" link, while the hard CTAs ("Get started," "Sign up now") repeat at hero, social-proof section, and every subpage bottom. Soft CTAs deepen engagement; hard CTAs all converge on one funnel.
- **Web-first signup, not app-store-first:** CTAs route to `/login?su` — account creation happens on the web, the app comes after. No QR codes or SMS-my-phone widgets observed on the homepage. The only explicit app-store ask is the single footer "Download Cash App" button (with tracking parameters). They convert identity first, install second.
- **Campaign attribution baked in:** `/new` CTA carries `?su&source=fallrelease2025-branded` — every campaign page tags its signups.
- **Social proof is a system, not a quote:** a repeated three-badge strip (5★ App Store Editor's Choice / 9.9M+ reviews / 4.5★ Trustpilot) appears on virtually every page; a dedicated `/reviews` page ("Read reviews by real people") aggregates dated user quotes + press quotes (NerdWallet, GOBankingRates, USA Today); `/taxes` has its own proof stack ("Over 12 million returns filed, all for $0" + USA Today/CNET/College Investor quotes + Forbes "Best Tax Software").
- **Trust as conversion fuel:** FDIC "$250,000" insurance block, "$2 billion+ in scams prevented," Zero Fraud Liability, and a real phone number (1-800-969-1940, 8AM–9:30PM ET daily) appear across pages — for a money app, safety messaging *is* the objection-handling layer.
- **FAQ sections on every product page** (6–14 Q&As) do double duty: objection handling + long-tail SEO.
- **Urgency mechanics: essentially none.** No countdowns, no scarcity, no waitlist. The closest is novelty cadence — "all-new Tags," the `/new` Fall Release teaser carousel, concert presales as a card perk. Confidence replaces urgency.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

[Partially NOT DIRECTLY OBSERVED — WebFetch returns text/structure only; visuals triangulated from the 2025 "Evergreen" design-system coverage (BUCK case study, Design Compass, Creative Bloq, Awwwards SOTD for the brand-guidelines site).]

- **Color:** signature neon green, intensified in the 2025 refresh to a "more vibrant fluorescent green," on high-contrast dark/light fields. One unmistakable brand color, owned completely.
- **Typography:** custom proprietary typeface **Cash Sans**, built to balance "brand personality and clarity." Headlines are short declaratives set huge.
- **Illustration/3D:** a full **3D illustration library** (built with BUCK) using banking metaphors — "paracords to parachutes, locks to coins, paper money to checks." Explicitly anti-minimalist: the brief rejected blandness to keep Cash App's "irreverent spirit" and "unmistakable edge." 650+ custom icons designed around "metaphor and charm rather than literal representations."
- **Motion:** "custom motion and responsive feedback" throughout; the `/new` Fall Release page is a 12-image teaser spinner/carousel; the separate brand-guidelines site (by Index Studio) opens with an "expressive, infinite canvas." Motion is a brand pillar, not decoration.
- **Photography vs product UI:** product objects over screenshots — the *card* (in Glitter/Glow/Mood finishes, with stamps, emoji, hand-drawing customization) and *tags* are the photographed heroes. The app UI itself appears sparingly; the physical, personalized object carries the brand. Layout is a "sophisticated grid system" of stacked full-width feature sections.
- **Net effect:** fintech that looks like a streetwear drop. The visual system is the differentiation strategy — competitors look like banks; Cash App looks like culture.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Tone: confident, plainspoken, lightly playful — short declaratives, second person, zero jargon, fee-hatred as a recurring villain.

Taglines worth studying:
- **"The way money should work"** — worldview headline; sells a belief, not a feature.
- **"The shape of money"** — `/new` Fall Release subhead; pure brand poetry on a product page.
- **"Cash App grows with your family"** — segment page headline that implies longevity.
- **"A magical new way to pay"** / **"a more whimsical way to tap to pay"** — "magical" and "whimsical" in *fintech* copy; the voice permits delight.
- **"Real security for real life"** — security subhead; humanizes the scariest topic.
- **"Bridge the gap between payday and bill pay"** — names the user's actual life without shame.
- **"No hidden or monthly fees ever"** — the "ever" is the voice.
- **"The money app 59 million+ people trust"** — social proof as category claim.
- **"Style it, wear it, hang it"** — three-verb product copy (Tags).
- **"Cash App makes money simple"** — the /learn hub's plain thesis.

Pattern: headline = belief or benefit in ≤7 words; body = concrete numbers (3.25%, $200, $500, 2 days early, 40k ATMs, $2B+); legal compliance pushed entirely to the footer so the voice stays clean above it.

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

- **Footprint is small and intentional: 144 sitemap URLs.** They are not playing the volume game — the brand and app-store presence do the acquisition; the site's SEO is concentrated on branded and near-branded queries.
- **`/learn` (19 articles):** question-intent guides targeting "what is Cash App," "is Cash App a bank," "how to send money on Cash App" — owning their own branded long-tail and the consideration queries of curious non-users. Categorized (Getting Started / Spend & Budget / Save & Invest), each funneling to "Sign up now." Individual article depth [NOT DIRECTLY OBSERVED — article URL redirected during fetch].
- **`/outsmart-scams` (9 pages):** brilliant defensive SEO — "Cash App scams" is a high-volume query that could be reputation poison; they own it themselves with identification/recovery content that doubles as trust signaling.
- **`/press` (71 pages):** the largest single content type. Newsroom-as-SEO: every partnership and release gets a permanent URL, feeding journalists and accruing authority.
- **`/bank/*` benefit pages:** directory-clustered pages for "no fee banking," "direct deposit app," "overdraft" — non-branded commercial intent.
- **No city pages, no programmatic local pages, no traditional blog.** $cashtag profile pages are the only programmatic surface and they're payment utilities, not SEO plays [indexing status NOT DIRECTLY OBSERVED].
- **Technical note:** homepage showed no FAQ schema/JSON-LD in the fetched markup [structured data presence on FAQ-heavy product pages NOT DIRECTLY OBSERVED] — despite FAQs on every product page, suggesting they're under-exploiting their own FAQ content technically.

#### What they do BEST — steal-worthy moves, named specifically

1. **Worldview headline over feature headline.** "The way money should work" — Blabberly's equivalent is a belief statement about food discovery ("ratings from people who actually went"), not "a food app."
2. **The repeated social-proof strip.** One compact, identical three-badge bar (rating / review count / third-party score) stamped on *every* page near the close. Build it once, deploy everywhere. Blabberly's pre-launch version: tester count, venue count, neighborhood coverage.
3. **Product-page template discipline.** Hero → benefit blocks → trust section → FAQ → proof strip → one hard CTA. Every feature page is the same machine. Design the template once; every Blabberly feature page (feed, % match, routes, plans) inherits it.
4. **Soft/hard CTA two-speed system.** "Explore X" everywhere for depth, but every hard CTA converges on a single funnel with campaign source tagging (`?source=fallrelease2025-branded`). For Blabberly: "Explore the feed / See a route" soft CTAs, one waitlist hard CTA, UTM-tagged per page.
5. **Owning the scary query.** `/outsmart-scams` turns their worst search neighborhood into owned trust content. Blabberly analog: own "is Blabberly legit," "Blabberly vs Yelp," "are Blabberly ratings real" before anyone else does.
6. **FAQ blocks on every product page.** 6–14 real questions per page = objection handling + long-tail coverage in one component.
7. **Concrete numbers as voice.** 3.25%, $2B+, 59M, 9.9M, 12M returns, 2 days early. Blabberly: 4,000 venues, 1,626 written place guides, every post star-rated, 80 testers.
8. **Brand-forward anti-minimalism.** Neon green + custom type + playful 3D — they refused to look like a bank. The sunset gradient is Blabberly's neon green; commit to it at full saturation rather than sanding it down to look "credible."
9. **The physical/personal object as hero visual.** Customizable cards photographed like sneakers instead of UI screenshots. Blabberly's equivalent hero objects: the food video itself and the % match badge.
10. **Whimsy vocabulary in a serious category.** "Magical," "whimsical," "Style it, wear it, hang it" — permission for Blabberly to sound like a friend who knows where to eat, not a directory.
11. **`/new` release-teaser page.** A permanent URL for "what just shipped" with its own campaign tracking — a habit-forming destination for fans and press alike.

#### What they do WORST — the openings we exploit

1. **Almost zero local/SEO content surface.** 144 URLs, no city pages, no place content, no non-branded discovery play. They can afford that at 59M users; it confirms the opening for Blabberly's 1,626 enriched place pages — a programmatic local-SEO engine Cash App's playbook simply doesn't model. We take the *template discipline* and apply it to the content volume they skip.
2. **Brand carries everything; the site barely explains.** A first-time visitor who's never heard of Cash App gets a worldview and vibes, but the "how it actually works" story lives in /learn articles. Pre-launch Blabberly has zero ambient awareness — our homepage must *show the product working* (real feed, real % match, real route), not just declare a philosophy.
3. **No community texture.** For a peer-to-peer money app, there are no humans on the site — one anonymous quote, no creators, no faces, no neighborhood. Blabberly's raw material (real people's food videos, real local spots) is exactly what their site lacks; we can feel alive where they feel corporate-cool.
4. **Social-proof strip is corporate, not human.** Editor's Choice badges and Trustpilot scores — impressive, sterile. Pre-launch Blabberly can win with named, specific local voices ("@handle's carne asada video from Carlsbad") that no badge can fake.
5. **Heavy legal ballast drags every page.** Walls of FDIC/FINRA/issuer disclaimers end each page (unavoidable for fintech). Food discovery carries no such weight — our pages can end light, on appetite and a CTA.
6. **Under-exploited structured data.** FAQ-rich pages with no FAQ schema detected on the homepage [subpage schema NOT DIRECTLY OBSERVED]. Blabberly place pages can ship Restaurant/LocalBusiness + FAQ schema from day one and win rich results in a way the giant didn't bother to.
7. **Web-signup-first funnel doesn't map to us — and watch the redirect trap.** Their CTAs go to web account creation because Cash App has a web surface. Blabberly is app-only at launch; copying "Get started → web login" would dead-end. Also their `/download` URL silently redirects to the homepage — a sloppy edge for anyone arriving on a "download cash app" query. Our /download must be a real page: store badges, QR, waitlist fallback.
8. **No urgency or scarcity levers at all.** Fine at 59M users; a pre-launch app *needs* them. Founding-member framing, neighborhood-by-neighborhood rollout, and "join the first 500 San Diego tastemakers" mechanics are levers Cash App never has to pull — and we should.

---

## T11. Opal (opalapp.com)

Researched 2026-06-11 via live WebFetch of homepage, /pricing, /about, /use-cases, /blog, /screentime, /manifesto + WebSearch triangulation.

### Opal (Tier B)

Why it's in the set: a small-team consumer iOS app whose marketing site punches at the aspirational tier — gradient-glow visual system, Apple-award social proof, 150k+ ratings, quiz-driven onboarding funnel. The most realistic budget-class model for Blabberly.

#### Sitemap & page inventory — what pages exist and what each is for

**Top nav:** Our Story · Use Cases · Pricing · For Schools · Support · "Try for free" (CTA button)

| Page | Purpose |
|---|---|
| `/` Homepage | Core sell: hero → feature tour → impact stats → testimonials → community → final CTA |
| `/pricing` | Free vs Pro vs Teams comparison; trial mechanics; money-back guarantee; FAQ |
| `/about` (Our Story) | "An Operating System for Attention" — mission, 36+ team members with photos/LinkedIn, named investors (Adjacent, Speedinvest, Night Capital; angels incl. Evan Sharp of Pinterest, Severin Hacker of Duolingo), 12+ press logos (NYT, New Yorker, Guardian, WSJ, Forbes, Fortune, TechCrunch) |
| `/manifesto` | Movement-building essay: "We can and must rewire our screens for mindfulness." Problem → villain → call to action structure |
| `/use-cases` | Five persona sections: For Work ("God-mode productivity"), For Students ("Focus today, win tomorrow"), For Parents ("Your kids are watching you"), For Wellbeing ("Leave my dopamine alone"), For Schools — each with persona headline, example blocks, related blog articles, persona-specific CTA |
| `/screentime` | SEO landing page — "The Greatest Screen Time Software to Boost your Productivity"; Opal-vs-Apple-Screen-Time comparison table targeting comparative search queries |
| `/features` | Feature index page |
| `/android` | Platform-specific landing |
| `/blog` | 5 categories: Our Manifesto, Screentime, Product, Interviews, Team. Mix of SEO how-tos and thought leadership ("Big Tobacco Moment: The Risk and Opportunity for Social Media and Screen Time") |
| `/blog/how-to-block-*` | Programmatic-ish SEO series: How to Block Instagram / TikTok / Twitter / Facebook / apps on iPhone, "21 Website Blockers For Studying," Chrome site blockers — all linked from footer "Learn" column |
| `/help` | Help Centre / FAQ (deep article library, indexed in Google) |
| `/team/<name>` | Individual team-member pages (e.g. /team/kenneth-schlenker) — SEO + humanizing |
| `/opal-program`, For Schools, For Students, Gift Cards, Merch Store, Brand Kit, Careers | Long-tail commerce + B2B2C (schools) + community pages |
| `start.opalapp.com/2026-short` | The conversion funnel: hero "Try for free" routes here. Title "Opal · Protect Your Time." Fully JS-rendered — [NOT DIRECTLY OBSERVED] interior steps; third-party UI breakdowns (screensdesign.com) describe a personalized quiz that generates a shocking "Focus Report" quantifying lifetime spent on your phone, ending at a soft paywall with 7-day trial |
| `/quiz` | Footer-linked quiz entry [NOT DIRECTLY OBSERVED — redirects/JS-gated] |
| `scrollingkills.us` | Separate campaign microsite ("Scrolling Kills, Opal Saves") — cigarette-warning-label-style brand campaign with physical stickers; cross-linked from footer "Scrolling Kills" |
| Community Forum (community.opalapp.com) | Discourse-style owned community |
| Footer also links | Free Trial, downloads (iOS/Mac/Android), Focus Coaching, Screen Time Blogs, Terms, Privacy, Contact, language selector (EN/FR) |

The notable structural fact: **opalapp.com is a content empire wrapped around a single-screen app** — marketing site + blog + help center + forum + microsite + merch + schools program, all feeding one funnel URL.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

- **Headline:** "Attention on autopilot."
- **Subhead:** "Opal protects your focus automatically, so you can make technology work for you, not against you."
- **Primary CTA:** "Try for free" → start.opalapp.com/2026-short (the quiz funnel — NOT the App Store)
- **Shown:** Apple Design Awards badge + "4.8 · 150k+ App Ratings" immediately under the CTA; a "Watch our new launch video" play button; glowing product mockups.
- **First-10-seconds story:** Two-word benefit promise ("autopilot" = zero willpower required), instantly de-risked by Apple's endorsement and six-figure ratings, with one obvious next action. No feature talk, no category jargon. Then the very next scroll lands a gut-punch stat: *"5 to 6 hours. That's the average time you'll spend on your phone today — often without realizing. It's time to fight back."* Problem-agitation arrives AFTER the promise, not before.
- Note: site implies "Apple Design Awards" broadly; Opal was a 2025 ADA **finalist**, not winner — they ride the badge hard either way.

#### Narrative arc — how the homepage sells, section by section, in order

1. **Promise** — "Attention on autopilot." + trust badges + Try for free.
2. **Problem stat** — "5 to 6 hours… It's time to fight back." (enemy = your phone, stakes = your life)
3. **Feature tour as named, trademarked concepts**, one per scroll panel, each with its own glow color:
   - Opal Score® — "Your day in one score" (yellow glow)
   - Focus Rules® — "Set your Rules" (ice-blue glow)
   - Focus Timer® — "Tap into focus" (blue glow)
   - Focus Gems® — "Unlock precious Milestones / Discover beautiful rewards that celebrate every moment of focus" — a wall of ~24 collectible 3D gems incl. seasonal ones (Ramadan, Holi, Easter, Valentine's…)
4. **Platform availability** — "Available on iPhone, Mac and Android" + "Better than screen time settings…" (competitive positioning vs the OS default) + store badges.
5. **Quantified outcomes** — "1h 23m saved daily / 1 month saved each year / 6 years of life reclaimed" with a methodology footnote ("*Calculated on the basis of daily Screen Time before and after Opal for over N=300,000"). Plus an animated odometer: "hours saved with Opal."
6. **Percentage proof** — "94% Less distracted / 93% More productive / 90% Improved mental health."
7. **Testimonial wall** — headline IS a quote: "This app has changed my life." ~28 testimonials from named professionals with job titles, employers, cities, and country flags (iOS Engineer at Instagram, CEO of Remote, Designer at Etsy, VC at FirstMark…). Identity-status proof, not anonymous stars.
8. **Community** — "Stay in the Loop… Join the community and learn how other Gems use Opal for focus" + YouTube gallery. (Users have a name: "Gems.")
9. **Close** — "Improve your focus, find your flow." + "Try Opal for free."

Arc in one line: promise → enemy → named magic features → proof in hours/years/percent → people like you → tribe → ask.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **One verb everywhere:** "Try for free" repeats in nav, hero, and close. No competing CTAs.
- **Quiz funnel instead of store link:** the primary CTA goes to start.opalapp.com — a web-first personalized quiz producing a "Focus Report" before pushing install/trial. This captures intent data, personalizes the pitch, and warms the user before the App Store interruption. [Funnel interior NOT DIRECTLY OBSERVED — JS-rendered; characterization from third-party UI teardowns.]
- **Store badges** (iOS/Play/Mac) appear mid-page and footer as the secondary path for already-convinced visitors.
- **Trial mechanics priced by commitment:** Yearly → "Start Free Week"; Monthly → "Start Free 3 Days"; Lifetime $399 → straight "Purchase." Free tier exists forever ($0, 1 Rule) as the wedge.
- **Risk reversal:** "30 Day Money Back Guarantee for purchases made via Stripe."
- **Social proof stack (layered, not singular):** Apple award badge → 4.8/150k+ ratings → N=300,000 outcome study → named-human testimonial wall → employer logo bar on pricing ("Supporting top performers around the world": Apple, Google, Amazon, Shopify, Headspace, Snapchat, Deloitte…) → press logos on About → investor names on About → live counter of hours saved → "500,000+ gems already on their journey" (on /screentime).
- **Urgency:** none of the fake-scarcity kind. The urgency is existential — "6 years of life reclaimed," "It's time to fight back," "Scrolling Kills." Time-you're-losing replaces limited-time-offer.
- **Referral loop baked into product AND marketing:** gems for "Invite 1 Friend / 3 Friends / 10 Friends" are displayed on the homepage itself — the growth mechanic is merchandised as a feature.
- **B2B side doors:** Teams Pro ("Contact for pricing"), For Schools, gift cards, student discount FAQ.

#### Visual language — layout, typography, color, motion, how the app is shown

- **System:** dark, premium canvas; one full-bleed panel per feature; generous whitespace; centered hero. Long single-page scroll with anchor-style sections.
- **Signature move — the glow:** each feature panel gets its own ambient gradient glow (yellow for Score, ice-blue for Rules, blue for Timer; About page assets are literally named "blue-glow," "pink-glow," "ice-glow," "orange-glow," "yellow-glow"). The glow system gives a one-color-per-concept wayfinding rhythm and makes flat screenshots feel cinematic.
- **Product UI is the photography:** no stock photos, no lifestyle imagery on the homepage — device mockups of real app screens inside the glow fields, plus rendered 3D gem objects on little display stands (jewelry-store presentation of achievements).
- **Motion:** animated odometer counter ("hours saved with Opal"), launch video embed, scroll-revealed panels. [Exact animation behavior NOT DIRECTLY OBSERVED beyond these elements.]
- **Typography:** large confident display headlines, short lines, sentence-case. [Exact typefaces NOT DIRECTLY OBSERVED.]
- **Humanity layer:** testimonials use circular avatars + country flag emoji; About uses real team photos and office shots — the polish is cut with warmth.
- **Trademark theater:** ® on Opal Score®, Focus Rules®, Focus Timer®, Focus Gems® — typography doing brand-equity work.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Tone: calm-confident benefit language on the surface, movement-manifesto urgency underneath. Short declaratives. Second person. Enemy-framing without naming competitors (the enemy is the phone, not other apps).

Quotes worth keeping in the swipe file:
- "Attention on autopilot."
- "Opal protects your focus automatically, so you can make technology work for you, not against you."
- "5 to 6 hours. That's the average time you'll spend on your phone today — often without realizing. It's time to fight back."
- "Your day in one score."
- "Tap into focus."
- "Unlock precious Milestones."
- "Better than screen time settings…" (positioning against the OS default in one clause)
- "1h 23m saved daily · 1 month saved each year · 6 years of life reclaimed"
- "This app has changed my life" (testimonial-as-headline)
- "Improve your focus, find your flow."
- Persona headlines: "God-mode productivity" / "Focus today, win tomorrow" / "Your kids are watching you" / "Leave my dopamine alone"
- Manifesto: "How we spend our time defines who we are." / "Self-control is not enough to fight addiction science." / "Together, we will take back control of our screens."
- Campaign: "Scrolling Kills, Opal Saves."
- Community identity: users are "Gems."

#### SEO & content strategy — how big the content footprint is

- **No city pages** (product isn't geographic) — their programmatic equivalent is the **"How to Block X" series**: /blog/how-to-block-instagram-on-iphone, how-to-block-tiktok-on-an-iphone, how-to-block-apps-on-an-iphone, "21 Website Blockers For Studying," free-chrome-site-blockers, etc. The best of these are pinned in the footer "Learn" column so every page on the site passes them link equity.
- **The how-to play is genuinely smart:** each article honestly answers the search query using Apple's native Screen Time steps, then positions Opal as the better tool. Captures high-intent "how to block [app I'm addicted to]" traffic.
- **Comparison SEO page:** /screentime targets "screen time app" queries with an Opal-vs-Apple-Screen-Time feature table.
- **Blog:** 5 categories (Manifesto / Screentime / Product / Interviews / Team), ~15 posts visible per page with pagination — a substantial archive blending SEO how-tos with PR-bait thought leadership ("Big Tobacco Moment…", "We Don't Need to Fear AI Taking Our Jobs. We Need to Fear It Taking Our Attention.").
- **Help center as SEO surface:** /help articles rank for product queries.
- **Team pages** (/team/kenneth-schlenker) indexed individually.
- **Campaign microsite** scrollingkills.us for the brand-campaign layer + physical stickers (offline-to-online).
- Estimated footprint: 100+ indexed content URLs across blog + help + team + use cases. [Exact count NOT DIRECTLY OBSERVED.]

#### What they do BEST — steal-worthy moves, named specifically

1. **The trust sandwich under the hero CTA** — award badge + "4.8 · 150k+ App Ratings" sitting directly beneath "Try for free." Blabberly equivalent at launch: App Store rating + "X,XXX places rated by real San Diegans" the moment we have it; pre-launch: tester count + venue count.
2. **Quiz funnel instead of a naked App Store link** — primary CTA goes to a personalization quiz that produces a personal "report" before asking for the install. Blabberly's taste-profile onboarding IS this quiz; a web version ("What's your taste profile? → your % match with 5 real SD spots → join the beta") would convert cold traffic far better than a store badge.
3. **Named, glow-coded feature system** — Opal Score®, Focus Rules®, Focus Gems®, each owning a color and a scroll panel. Blabberly already has nameable assets: % Match, the required star rating, Routes, Dual Bite. Give each a panel and a hue within the sunset system.
4. **Outcome math, not feature lists** — "1h 23m saved daily / 6 years reclaimed," with an N=300,000 footnote and an animated counter. Quantify the promise in the user's units.
5. **Testimonial wall with identity** — names, job titles, employers, cities, flags; headline is itself a quote. At alpha scale: 8 real testers with first name + neighborhood ("Marco, North Park") beats 50 anonymous stars.
6. **Honest how-to SEO footer column** — evergreen articles answering the exact search ("how to block instagram") then selling the app, pinned sitewide in the footer. Blabberly's analog: the 1,626 enriched place pages + "best X in Y" guides pinned in the footer — directly supports the pre-launch SEO-engine lean.
7. **One CTA verb everywhere** — "Try for free" in nav, hero, and close. Zero decision fatigue.
8. **Manifesto + named tribe + campaign microsite** — "Scrolling Kills," users called "Gems," a movement frame that makes a utility feel like a cause. Blabberly's version: a point of view about real ratings from people who actually went, vs. anonymous review-site noise.
9. **Product-UI-as-photography inside glow fields** — no stock imagery; real screens made cinematic by ambient gradient. Maps perfectly onto the sunset gradient: Blabberly screens floating in sunset glows.
10. **Referral mechanics merchandised on the homepage** — invite-friend gems displayed as a feature, advertising the growth loop itself.

#### What they do WORST — the openings we exploit

1. **The product is invisible in motion.** A screen-time blocker has nothing delicious to show — static mockups and glows is all they have. Blabberly's homepage can run actual food video from the feed; we can make people hungry in 3 seconds. They can't. Lead with the feed.
2. **Negative emotional core.** The entire sell is fear/guilt/loss ("Scrolling Kills," "fight back," "6 hours stolen"). Effective for their category but heavy. Blabberly sells joy — tonight's plan, your people, great food. Same polish, opposite valence: desire, not dread.
3. **Generic hero risk.** "Attention on autopilot." is elegant but abstract — a first-time visitor must scroll to learn what Opal literally does. With a concrete product, Blabberly can be specific AND aspirational ("Find tonight's spot. Rated by people who actually went.").
4. **Stat credibility strain.** "94% less distracted / 90% improved mental health" reads survey-flattered; "6 years of life reclaimed" invites eye-rolls; the award badge implies a win when 2025 was a finalist year. Lesson: keep Blabberly's numbers verifiable (venue counts, rating counts, real testers) — credibility is a moat for a ratings product especially.
5. **Hero CTA leaves the brand domain.** "Try for free" jumps to start.opalapp.com — a visible domain/context switch into a funnel page titled differently. Keep Blabberly's quiz/waitlist on blabberly.com.
6. **Quiz funnel is JS-only and crawler-opaque** — their single most important page contributes nothing to SEO. Blabberly's funnel pages should render real content server-side.
7. **No local/geographic surface at all** (n/a for them, but it's our whole differentiation): nobody in this tier owns "your county, your places, your people." The 1,626 place pages give Blabberly a defensible content layer Opal's model can't replicate.
8. **Footer/long-tail sprawl** — Merch Store, Gift Cards, Focus Coaching, Brand Kit, two blogs ("Blog" + "Screen Time Blogs") — diffuse for a pre-scale company and slightly dilutes the footer's SEO focus. Blabberly v1 footer stays ruthless: download, places, guides, about, legal.
9. **Testimonial wall skews coastal-elite tech** (Instagram engineers, VCs, CEOs) — aspirational but distancing for normal users. Blabberly's proof should look like San Diego: students, nurses, couples, foodies.

---

## T12. Phantom (phantom.com)

Researched 2026-06-11 via live WebFetch of homepage + /trade, /cash, /security, /about, /explore, /explore/trending-tokens, /learn, /download, plus the Bakken & Baeck rebrand case study and Phantom's own brand-identity blog post. Site is JS-rendered (Next.js + Sanity + Framer Motion + Lottie); visual/motion specifics that couldn't be extracted from markup are marked [NOT DIRECTLY OBSERVED] and triangulated from the agency case study.

### Phantom (Tier B)

Crypto wallet → consumer "money app" repositioning. 20M+ users, $3B valuation, Sequoia/Paradigm/a16z-backed. In the set because it's the best living example of how exceptional visual craft + modular feature storytelling sells a consumer mobile app in a trust-sensitive category — directly analogous to Blabberly selling a social app in a "why should I trust these ratings?" category.

#### Sitemap & page inventory — what pages exist and what each is for

Top nav: **Features, Learn, Explore, Company, Developers, Support**. Footer reveals the full map:

| Page | Job |
|---|---|
| `/` (home) | Master positioning page: "the money app," three feature pillars, download funnel |
| `/trade` | Feature pillar page: token discovery, swaps, perps (40× leverage, 200+ markets), prediction markets, desktop Terminal |
| `/cash` | Feature pillar page: Phantom Cash debit card + stablecoin account ("This is New Money"), heavy legal disclaimers |
| `/security` | Trust pillar page: self-custody, audits, $50K bug bounty, 24/7 support, open-source phishing blocklist |
| `/download` | Conversion page: Chrome/Brave/Edge extensions + iOS/Android. Title tag: "Download Phantom \| Crypto wallet for Solana, Ethereum & more" |
| `/about` | Credibility page: mission, 2021→2026 timeline (40K beta → 3M → 15M users), 10 named leaders, funding rounds ($9M a16z Series A → $150M Series C co-led Sequoia/Paradigm) |
| `/explore` | Live data hub: trending tokens + 50-row market table, gateway to programmatic token pages |
| `/explore/trending-tokens` | Ranked 85-token "biggest winners & losers in 24h" table |
| `/tokens/{chain}/{address}` | Programmatic per-token pages (thousands; linked from every Explore row) |
| `/learn` | Content hub with 4 lanes: Phantomblog (news), Crypto101 (beginner education), Getting Started (product guides), Developer Resources. ~40+ visible articles with Beginner/Intermediate/Advanced tags |
| Docs, Taxes, Careers, Press Kit, Merch Store, Feature Requests, Status | Supporting footer pages |

Architecture lesson: a small number of beautifully crafted **pillar pages** (trade/cash/security) + two **scale engines** (programmatic token pages, Learn library) + one conversion page. Nothing else. No pricing page (free app), no testimonial page — the product and the numbers are the proof.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

- **Headline:** "The money app that'll take you places"
- **Subhead:** "Your home for trading crypto, predictions, and more"
- **Primary CTA:** "Download Phantom" (also persistent "Download" in the sticky header on every page)
- **What's shown:** [NOT DIRECTLY OBSERVED in fetched markup — visuals are JS-rendered. Per the Bakken & Baeck case study, the site uses Lottie/Framer Motion animation, an animated ghost mascot, and smooth scroll-linked interpolation; the hero is animated brand-world rather than a static screenshot.]
- **First-10-seconds story:** category claim first ("money app" — deliberately NOT "crypto wallet"), aspiration second ("take you places"), function third (the subhead does the literal explaining). The hero sells identity and breadth; the word "wallet" has been demoted to a body-copy callback ("It's more than a wallet"). One action exists on the entire site: Download.

The repositioning move is the masterclass: they renamed the *category* in the headline while letting the subhead and SEO title tag ("Crypto wallet for Solana, Ethereum & more") keep ranking for the old category. New story for humans, old story for Google.

#### Narrative arc — how the homepage sells, section by section, in order

1. **Hero** — category claim + download. "The money app that'll take you places."
2. **"Trading tools for everyone"** — power pillar. Rapid-fire capability bullets ("Buy and sell all types of crypto in an instant," "Trade big moments in culture with Prediction Markets," "Go long, go short, go anywhere with Perps"). → "See more" → /trade.
3. **"Spend, Send, & Save"** — everyday-money pillar. "One home for your money." "Send money in seconds. Even pay friends." "Spend wherever Apple Pay, Google Pay, or VISA is accepted." → /cash.
4. **"Controlled by you, secured by us"** — trust pillar. "Self-custodial means you control your funds. We never have access." Scam detection, Ledger, 24/7 support. → /security.
5. **Social proof** — "Trusted by a community of 20+ million users" + "It's more than a wallet."
6. **Legal disclaimers** (Lead Bank / Bridge Ventures card disclosures) + footer.

The arc is **breadth → utility → safety → crowd → act**. Each homepage section is a teaser with exactly one "See more" link to a pillar page that goes deep — the homepage never tries to fully explain anything. Note where trust sits: third, *after* excitement. They lead with what you can do, then remove the fear, then show the crowd.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **Single conversion event:** Download. Persistent header button on every page, repeated per section, dedicated /download page splitting desktop extension (Chrome/Brave/Edge) vs mobile (iOS/Android). No fragmented asks.
- **Secondary capture:** newsletter signup ("Sign up for our newsletter and join the growing Phantom community") appears site-wide above the footer — the catch-net for people not ready to install. This is the closest thing to Blabberly's waitlist mechanic and it's everywhere.
- **Social proof:** one fat number, used with discipline — "20+ million users" on home; /about layers the institutional stack (Sequoia, Paradigm, a16z, $150M Series C, $3B valuation, growth timeline). No testimonials, no press-logo wall, no app-store rating badges on /download [rating badges NOT DIRECTLY OBSERVED — absent from fetched content].
- **Urgency mechanics:** almost none — confidence posture. The only scarcity is incidental: Phantom Cash "Launching first in the United States, except in New York" (geographic gating reads as rollout heat).
- **Trust friction handling:** full regulatory disclaimers (card issued by Lead Bank, program-managed by Bridge Ventures, 18+) in plain sight on /cash and home — boring text that does real conversion work in a money category.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

- **Layout system:** modular card grid. Pillar pages run repeating 3-up feature card rows; Explore pages are clean data tables. Everything decomposes into self-contained, reorderable cards — this is the "modular feature storytelling" the design press celebrates.
- **Typography:** custom typeface by F37 Foundry; wordmark is "a rounded and more expressive typeface" designed to complement the floating ghost. Rounded = friendly, custom = premium.
- **Color:** purple retained as the recognition anchor, "reimagined with modern tones and vibrant complementary colors that are more lively and expressive." (Direct parallel: Blabberly's sunset gradient is the same kind of non-negotiable brand anchor.)
- **Motion:** smooth scroll animations with linear interpolation; the ghost logo has its own dedicated animation treatment (Lottie); Framer Motion throughout. A named motion designer (Piotr Wojtczak) exists on staff — motion is a budget line, not a flourish. [Specific homepage animation choreography NOT DIRECTLY OBSERVED; sourced from the Bakken & Baeck case study.]
- **Illustration vs photography vs UI:** zero photography. The world is mascot + illustration (commissioned artists: Martin Nicolausson, Digo Digital, Anton Hjertstedt) + stylized product UI mockups — e.g., /cash leads with a rendered balance card showing "$17,382.41" converting to CASH "Instantly." Product UI is shown as *idealized moments with real-looking data*, not raw screenshots.
- **Mascot:** the ghost is the load-bearing brand asset — "designed to be your trusted companion." A character makes a scary category feel safe.
- **Stack:** Next.js, TypeScript, Sanity CMS, Framer Motion, Lottie (per agency case study) — i.e., a content-managed marketing site where editors ship pages without engineers.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

Tone: confident, warm, kinetic. Short declaratives, second person, verbs of motion and ease. Stated brand values: "friendly, trustworthy, and approachable"; mission "make crypto safe and easy-to-use for everyone."

Lines worth pinning to the wall:

- **"The money app that'll take you places"** — category rename + aspiration in nine words
- **"It's more than a wallet"** — explicitly tells returning users the category changed
- **"Controlled by you, secured by us"** — the entire trust model in six words, perfect parallel structure
- **"Self-custodial means you control your funds. We never have access."** — jargon term immediately self-translated in plain English
- **"We've got your back, always"** — a security page headed with warmth instead of fear
- **"Trade big moments in culture"** — reframes a scary instrument (prediction markets) as pop culture
- **"Go long, go short, go anywhere with Perps"** — rhythm doing the work
- **"One home for your money"** / **"Spend, Send, & Save"** — domestic, alliterative, zero jargon
- **"Earn while you sleep"** / **"This is New Money"** — old saws executed cleanly
- **"From your first swap to your next big move"** — addresses beginner and power user in one clause
- **"We're here to make crypto accessible"** — mission as headline on /about

Pattern to steal: every time a technical term appears, the next sentence translates it. Vocabulary stays at "money, send, spend, save, home, friends" — the crypto jargon is quarantined to /learn and /developers.

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

Two-engine model:

1. **Programmatic data pages** — Explore hub → trending-tokens (85 ranked rows) → market table (50+ rows) → individual `/tokens/{chain}/{address}` pages for effectively every tradable token (thousands of URLs). Live price/volume/market-cap data makes each page legitimately useful, internally linked from hub tables, and a top-of-funnel net for "[token] price" searches. **This is the exact blueprint for Blabberly's 1,626 enriched place pages**: hub → ranked/trending lists → entity pages with real data, every page ending in the app CTA + newsletter capture.
2. **Editorial Learn hub** — ~40+ visible articles in four lanes (news / Crypto101 beginner education / product how-tos / developer docs) with difficulty tags. Catches "what is Solana," "common crypto scams" intent and walks searchers to Download. Educational content doubles as a trust asset in a scam-ridden category.

No city pages (product is geography-agnostic — Blabberly, being SD-County-rooted, can run neighborhood/area pages Phantom has no use for). SEO title tags still lead with the old "crypto wallet" category while on-page heroes carry the new "money app" positioning — they don't sacrifice rankings for repositioning.

#### What they do BEST — steal-worthy moves, named specifically

1. **The category-rename hero.** "The money app that'll take you places" claims a bigger category in the headline and lets the subhead explain. Blabberly equivalent: lead with the night-out/identity claim, let the subhead say "food discovery for San Diego County."
2. **Pillar-page architecture.** Homepage = three teaser sections, each with exactly one "See more" → a deep feature page (/trade, /cash, /security). Blabberly maps 1:1: /discover (feed + % match), /rate-and-trust (required ratings), /nights-out (groups, polls, routes).
3. **Trust as a designed product surface.** A whole /security pillar with named, falsifiable specifics ($50,000 bounty, open-source blocklist, independent audits, "We never have access") headlined warmly ("We've got your back, always"). Blabberly's analog: a page that explains *why our scores can't be gamed* — every rating comes from someone who actually posted from the venue.
4. **Jargon-then-translation copy discipline.** "Self-custodial means you control your funds." Blabberly: "% match means scores are computed against *your* taste, not an average."
5. **Programmatic entity pages with live data feeding the app funnel.** Hub → trending lists → thousands of token pages → Download CTA. The validated blueprint for shipping the 1,626 enriched place pages pre-launch with waitlist CTAs.
6. **Mascot as trust prosthetic.** An animated character with a dedicated motion designer makes a scary category friendly. The craft level *is* the trust signal.
7. **One conversion event + one catch-net.** Download everywhere; newsletter signup site-wide for the not-yet-convinced. No CTA sprawl.
8. **One disciplined proof number.** "20+ million users" on home; the investor/valuation stack quarantined to /about where it belongs.
9. **CMS-backed marketing stack** (Next.js + Sanity + Framer Motion + Lottie): pages and posts ship without engineering. Worth copying for a site that must grow from 3 pages to 1,600+ at launch.

#### What they do WORST — the openings we exploit

1. **Zero human beings.** 20M users, not one face, name, quote, or story anywhere on the marketing site. For a *social* app like Blabberly, real people — real posts, real local creators, real group plans — are the whole show. We can be human where they are abstract.
2. **No place, no community texture.** Phantom is placeless by nature. Blabberly's San Diego rootedness (neighborhoods, named venues, "what's good tonight near you") is a warmth and SEO surface they structurally cannot have.
3. **Thin social proof beyond the big number.** No testimonials, no app-store ratings shown, no press wall, no creator spotlights. A pre-launch app can out-human them with five genuine beta-tester quotes and real screen recordings.
4. **Product UI is idealized, not real.** Stylized mockups with fantasy balances ($17,382.41) — gorgeous but bloodless. Showing the *actual* app with *actual* local posts reads more credible for a UGC product.
5. **Hero is identity-first, demo-second.** They can afford vibes at 20M users; a pre-launch app cannot. We should show the product doing its magic (a real % match, a real route) within the first screenful.
6. **Repositioning seams show.** Homepage says "money app," the SEO title and half the funnel still say "crypto wallet"; the card is US-only-except-New-York; perps/memecoin tables sit one click from "your home for your money." A brand-new product gets to be coherent from day one.
7. **Newsletter is the only soft conversion, and it's generic.** "Sign up for our newsletter" with zero stated payoff. A waitlist with a concrete promise ("be first in your neighborhood at launch") beats it easily.
8. **Learn content is functional, not crave-able.** Crypto101 explainers are commodity SEO. Food content (guides, lists, "best birria in North County") is inherently more shareable — our content engine can earn links theirs never will.

---

## T13. Duolingo (duolingo.com)
*Researched 2026-06-11.*

### Duolingo (Tier B)

**Research caveat:** duolingo.com is a JS-rendered React app; WebFetch returned only the
page title for every duolingo.com route (homepage, /courses, /efficacy, /approach,
design.duolingo.com). Findings below are triangulated from: directly observed page
titles and meta text, the live blog.duolingo.com (server-rendered, fully observed),
2026 conversion teardowns and design-gallery features (Mobbin flow archive, SeedProd/
Woorise/StartDesigns landing-page roundups, a Figma community recreation of
duolingo.com web pages), pricing/review sites, and well-documented public knowledge of
the brand system. Anything not directly observed in this session is tagged
[NOT DIRECTLY OBSERVED].

---

#### Sitemap & page inventory — what pages exist and what each is for

Directly observed (titles/meta confirmed live this session):

- **/** — title: **"Duolingo - The world's most popular way to learn"**. The single
  conversion surface. Everything funnels to "GET STARTED."
- **/efficacy** — title/meta: **"Duolingo Really Works - Learn more about how Duolingo
  works for learners"**. Proof page: learner outcomes, third-party studies. Per search
  snippets, cites that learners scored higher on language tests in 2024 than 2023/2020
  and links published journal research.
- **/efficacy/studies** — "Learn how Duolingo conducts studies." The receipts page
  behind the proof page.
- **/efficacy/method** — title: **"Duolingo Teaches with Science - Learn about our
  research-backed method"**.
- **/approach** — teaching-method explainer ("100% free, fun and science-based").
- **/courses** — full catalog of 40+ language courses, each card a conversion entry
  point with learner counts. [layout NOT DIRECTLY OBSERVED]
- **blog.duolingo.com** — fully observed. Categories: Language, Chess, Math, Music,
  plus Announcements, Design, Engineering, Product, Life at Duolingo. Formats:
  research posts, how-to guides ("How to add a new course on Duolingo"), motivation
  content ("Sticking with it: tips for staying motivated"), and a recurring advice
  column **"Dear Duolingo"** (e.g., "Dear Duolingo: What is 'vosotros' and when do I
  use it?"). Editor's-pick hero + grid + merch promos.

Known to exist, not fetched this session [NOT DIRECTLY OBSERVED]:

- **Per-course landing pages** (e.g., /course/es/en/Learn-Spanish) — programmatic,
  one per language pair, each an indexable signup funnel.
- **Super Duolingo / Max upsell pages** — notably, pricing is NOT published on the
  marketing site; third-party sources peg Super at ~$95.99/yr, Max ~$167.99/yr,
  Family ~$119.99/yr. Pricing is revealed in-product, post-signup.
- **schools.duolingo.com** — teacher dashboard pitch (classroom assignments, progress
  monitoring).
- **englishtest.duolingo.com / Duolingo English Test** — separate B2B2C product site.
- **design.duolingo.com** — public brand guidelines site (title "Brand Guidelines -
  Duolingo" confirmed live; content JS-rendered).
- **careers, press, investors** (Duolingo is public, NASDAQ: DUOL) — standard corp
  pages.
- Sibling app pages for **Duolingo ABC, Math, Music, Chess** (chess/math/music
  confirmed as live blog categories this session).

Net shape: a tiny, ruthless marketing core (one homepage + proof pages) wrapped in a
huge programmatic + editorial content shell.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story

[Layout NOT DIRECTLY OBSERVED live; reconstructed from 2026 teardowns, Mobbin flow,
and Figma recreation — consistent across all sources.]

- **Headline:** "The free, fun, and effective way to learn a language!" — three
  adjectives, each pre-empting an objection (cost, boredom, skepticism), one
  exclamation mark.
- **Subhead:** effectively none. The headline IS the pitch.
- **Primary CTA:** giant green **"GET STARTED"** button. Secondary, ghosted:
  **"I ALREADY HAVE AN ACCOUNT."** That's the entire decision tree.
- **What's shown:** flat-illustrated world characters with Duo the owl — zero
  screenshots, zero photography in the hero.
- **Nav:** essentially none — logo + a site-language selector. Teardowns note "no nav
  and no distractions... nowhere to go except forward."
- **First-10-seconds story:** "This is free, it won't feel like homework, it actually
  works, and the only thing to do on this page is start." Clicking GET STARTED drops
  you into "I want to learn…" + a grid of language cards with learner counts
  (Spanish 48.8M, French 27.2M per 2026 teardown observations) — the visitor's first
  click is choosing their goal, not filling a form. Onboarding starts before signup;
  the account comes later.

#### Narrative arc — how the homepage sells, section by section, in order

[Section order NOT DIRECTLY OBSERVED live; consistent across teardowns/recreations.]

1. **Hero** — promise + one button (above).
2. **Credibility strip** — "the world's #1 way to learn a language" / learner-count
   scale claim.
3. **"free. fun. effective."** — restates the headline as a section, with copy that
   learning with Duolingo is fun, and "research shows that it works!" — links out to
   /efficacy. Character illustration alongside.
4. **"backed by science"** — research-based teaching methods, bite-size lessons;
   science as differentiator, again linking to efficacy.
5. **"stay motivated"** — streaks, "game-like features, fun challenges, and reminders
   from our friendly mascot, Duo the owl." They sell the nag as a feature.
6. **"personalized learning"** — AI + adaptive difficulty framing.
7. **Ecosystem cross-sells** — Super Duolingo, Duolingo English Test, Duolingo for
   Schools, Duolingo ABC (and now Math/Music/Chess) cards.
8. **Closing CTA** — "learn anytime, anywhere"-style app-store push + repeat GET
   STARTED.
9. **Footer** — the SEO payload: every course as a crawlable text link ("Learn
   Spanish", "Learn French"…), site-language variants, company links.

The arc is promise → proof → motivation mechanics → personalization → start. Every
section's CTA resolves to the same single action.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics

- **One action, repeated:** GET STARTED appears in hero, sticky contexts, and closing
  section. No competing asks — no newsletter, no demo, no pricing detour.
- **Goal-first signup:** the post-click flow is the famous quiz onboarding — pick
  language → "Why are you learning?" → daily-goal commitment → placement → you're in
  a lesson BEFORE account creation. Signup is requested after the first dopamine hit,
  to "save your progress." The real conversion is the first language-card click.
- **Social proof embedded in the choice itself:** learner counts on each language card
  (48.8M learning Spanish) — proof lives inside the decision UI, not in a logo bar.
- **Mascot as conversion mechanic:** teardowns cite Duolingo's own research that Duo's
  watchful/expectant presence on the landing page measurably increases downloads —
  social-compliance instinct ("don't disappoint the owl").
- **Urgency is in-product, not on-site:** streaks, hearts/energy, leagues, push/email
  nags do the retention work. The website carries almost no urgency mechanics — its
  only job is to get you in; the product converts free → paid.
- **Pricing deliberately absent** from the marketing site; the paywall is met
  in-product after habit formation. [pricing-page absence NOT DIRECTLY OBSERVED, but
  multiple 2026 pricing-review sites note Duolingo doesn't publish prices on the site]
- **App-store funneling:** web is a fully functional product (lessons run in browser),
  so the site doesn't have to beg for the install — start on web, get nudged to the
  app via badges, QR [NOT DIRECTLY OBSERVED], and post-signup prompts.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown

[Brand-system details from public design.duolingo.com guidelines + training knowledge;
live page content NOT DIRECTLY OBSERVED this session.]

- **Layout:** huge whitespace, single-column centered hero, then alternating
  two-column sections (illustration ↔ copy block, sides swapping). Section headlines
  set lowercase ("free. fun. effective.").
- **Typography:** proprietary **Feather Bold** for display (rounded, chunky, friendly
  — letterforms literally derived from Duo's feathers), DIN Next Rounded for body.
  ALL-CAPS button labels.
- **Color:** **Feather Green #58CC02** as the brand anchor and CTA color; supporting
  palette of named brights (Macaw blue, Cardinal red, Bee yellow, Fox orange, Beetle
  purple, Humpback navy) on white. Color names are part of the published brand system.
- **Illustration over everything:** a consistent cast of "world characters" (Lily,
  Zari, Oscar, Eddy, Bea, Junior, Lin, Vikram, Lucy, Falstaff + Duo) in a flat,
  geometric house style. No stock photography anywhere. Product UI screenshots are
  used sparingly — phone mockups in feature sections — because the illustration system
  IS the product's visual identity, so brand and product look identical.
- **Motion:** Rive/Lottie-style character animation — Duo blinks, waves, reacts;
  characters animate on scroll. Motion is characterful, not decorative parallax.
  [specific homepage animations NOT DIRECTLY OBSERVED]

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)

- Title tag: **"Duolingo - The world's most popular way to learn"** [observed].
- Hero: **"The free, fun, and effective way to learn a language!"**
- Section heads: **"free. fun. effective."**, **"backed by science"**, **"stay
  motivated"**, **"personalized learning"** — lowercase, 2–3 words, benefit-first.
- Efficacy meta: **"Duolingo Really Works"** [observed] — blunt, plain-English proof
  claim.
- Method positioning: **"100% free, fun and science-based"** [observed via /approach
  snippet].
- Mascot copy: reminders "from our friendly mascot, Duo the owl" — they name the nag
  and make it lovable.
- Blog voice [observed]: conversational-expert, second person, question-led titles
  ("Can you learn multiple languages at once?"), an advice-column persona ("Dear
  Duolingo").
- Overall: short declaratives, zero jargon, playful but never undermining the science
  claim. The voice is so consistent it survives from homepage to push notification to
  TikTok.

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is

- **Programmatic course pages:** one indexable landing page per language pair
  (40+ courses × source languages), each with learner-count proof and a signup CTA —
  the closest analog to "place pages." Footer links make every course crawlable from
  the homepage.
- **Editorial blog at scale** [observed live]: hundreds of posts across Language,
  Math, Music, Chess + culture/grammar guides targeting high-intent queries ("What is
  'vosotros'", "Cognates in Spanish"). Third-party analyses credit the blog + guides
  with millions of organic visits/month — Google as an acquisition channel.
- **Proof content as SEO asset:** /efficacy + published journal studies earn .edu/.gov
  and press backlinks; Duolingo has organic links "from pretty much every high
  authority news site" per SEO analyses.
- **Web app = SEO surface:** public user profiles and web lessons keep duolingo.com a
  destination, not a brochure.
- **No city pages** — geography is irrelevant to their product; their programmatic
  axis is language pairs instead. (Blabberly's axis is places — same playbook,
  different dimension.)
- Footprint scale: tens of thousands of indexable URLs (courses × locales + blog +
  profiles). [exact counts NOT DIRECTLY OBSERVED]

#### What they do BEST — steal-worthy moves, named specifically

1. **One page, one action** — no nav, two buttons, every section CTA resolves to GET
   STARTED. The discipline our waitlist hero needs verbatim.
2. **Goal-first conversion** — "I want to learn…" before any form. Blabberly analog:
   "Where do you eat?" / pick-your-neighborhood or pick-a-craving grid as the first
   click, email after.
3. **Social proof inside the decision UI** — learner counts ON the language cards.
   Analog: "1,626 places rated by people who actually went" on the place/category
   cards themselves.
4. **A mascot that converts** — Duo isn't decoration; his expectant presence is an
   A/B-tested conversion lever. A characterful brand device beats a feature list.
5. **Objection-killing three-adjective headline** — free/fun/effective each neutralize
   a specific doubt in seven words.
6. **Proof gets its own URL** — "Duolingo Really Works" (/efficacy) turns skepticism
   into a destination and a backlink magnet. Analog: a "Why Blabberly scores are
   real" page (required rating from people who actually went).
7. **Brand system = product system** — Feather Bold + character illustration + one
   green make site, app, and ads indistinguishable. Sunset gradient should work this
   hard for us.
8. **Programmatic pages on their core axis** (language pairs) feeding one funnel —
   directly validates the 1,626-place-page SEO-engine lean.

#### What they do WORST — the openings we exploit

1. **Fully JS-rendered marketing shell** — the homepage serves crawlers/no-JS clients
   a title tag and nothing else. Our place pages should be server-rendered/static so
   every word indexes.
2. **Hidden pricing** — third-party sites rank for "Duolingo cost" because the brand
   won't answer it; reviewers call the trial-to-paid handoff pushy. Erodes trust.
   We're free — say so loudly and unambiguously.
3. **Zero specificity or locality** — the site is the same generic promise for
   everyone everywhere. A San Diego visitor seeing actual local spots, neighborhoods,
   and dishes gets a visceral "this is MY city" hit Duolingo can never deliver.
4. **No human faces or real-world texture** — all illustration, no real food, real
   places, real people. Food is a photography/video category; our feed content is an
   asset their visual system structurally can't use.
5. **The nag brand cuts both ways** — "guilt owl" is a meme; some users churn on the
   pressure mechanics. Position Blabberly's social layer as pull (friends, plans,
   nights out) not push.
6. **Generic hero claim with no product visible** — you can leave the homepage without
   ever seeing the app. Showing our actual feed/video UI early is both differentiation
   and proof.

---

## T14. Linear (linear.app)

Researched live 2026-06-11. Role in the set: the one non-consumer craft bar — the marketing-site execution ceiling for typography, hierarchy, and restrained motion. Recently refreshed for the AI-agent era ("Linear Next" repositioning).

### Linear (Tier B)

#### Sitemap & page inventory — what pages exist and what each is for
Top nav: Product, Resources, Customers, Pricing, Now, Contact, Docs, plus Open app / Log in / Sign up.

- **/** — Homepage. Sells the full "product development system for teams and agents" narrative in five numbered chapters (Intake → Plan → Build → Diffs → Monitor).
- **/next** — Manifesto/announcement page, "Issue tracking is dead." The strategic repositioning artifact: declares the old category obsolete and re-frames Linear as "the shared product system that turns context into execution." Homepage hero links straight to it.
- **/pricing** — Four tiers: Free ($0, unlimited members, 250 issues), Basic ($10/user/mo yearly), Business ($16/user/mo yearly), Enterprise (custom). Feature-comparison table; AI/agent features and security are the upsell levers. Closes with "Built for the future. Available today."
- **/customers** — Filterable case-study hub (Featured, SaaS, AI, Fintech, Consumer, Hardware, Health, Enterprise). Hero stories: OpenAI ("Why OpenAI chose Linear and scaled to 3,000 users"), Cursor, Coinbase ("agent-first development"), Ramp, Oscar, Automattic. Headline stats: "2.0x Increase in filed issues," "3.3x Faster issue resolution," "28% Issues authored by agents." 60+ logo grid below.
- **/method** — "The Linear Method: Practices for building." A free essay collection (Introduction / Direction / Building, ~11 linked essays) on how to build software. Their signature thought-leadership asset.
- **/quality** — "Conversations on Quality." A video interview series (Dick Costolo, Jeff Weinstein, Henry Modisett, et al.) about craftsmanship. Pure brand artifact, zero product pitch.
- **/now** (blog) — Sections: Changelog, Community, News, Craft, AI, Practices, Press. Recent: "Code review should be fast" (5/28/26), "How we hire at Linear" (4/28/26), "Output isn't design" (4/17/26), "The coding agent behind 60% of Ramp's merged PRs" (4/27/26). Multiple posts/month.
- **/about** — "Building tools for the next era of product development." Founding story (2019), 8 named leaders + ~100 listed team members, investor wall (Accel, Sequoia, plus founder-investors: Dylan Field, Patrick Collison, Stewart Butterfield). Embedded brand video.
- **/switch** — Competitor-migration page targeting Jira, Asana, GitHub Issues. Includes Jira Sync / GitHub Issues Sync tooling, migration guide, and meta-resources: "Learn how to pitch, pilot, and switch your team to Linear" (pitch guide, pilot guide, migration guide).
- **/download** — "Download Linear. Available for web, macOS, Windows, iOS, and Android." Web → /login; desktop → releases.linear.app; mobile → QR codes + "Open store" links. Mobile framed as "designed for 'away from keyboard' workflows that complement the desktop experience."
- **/integrations** — Directory, 12 categories (Essentials, Agents, AI clients, Engineering, Linear crafted, Bug Reporting, Automations, Customer Experience, Security & Compliance, Analytics, Collaboration, Media & Design), each integration with its own URL (/integrations/github, /integrations/slack) — a programmatic SEO surface.
- **Product feature pages** — Intake, Plan, Build, Diffs, Monitor (mirroring homepage chapters) plus Asks, Agents, Customer Requests, Insights, Mobile, Changelog.
- **Footer extras** — Security, Brand (public brand guidelines at /brand), Developers, Status, Enterprise, Startups, Docs, Community, Careers, plus Privacy/Terms/DPA/AUP.

#### Hero analysis — headline, subhead, primary CTA, what's shown, the first-10-seconds story
- **Headline:** "The product development system for teams and agents"
- **Subhead:** "Purpose-built for planning and building products. Designed for the AI era."
- **CTAs:** "Get started" (/signup) and "Contact sales"; plus a provocation banner — "Issue tracking is dead" — linking to /next.
- **What's shown:** real product UI as the hero visual; Linear never uses lifestyle photography or abstract illustration — the app itself is the artwork. [Motion specifics NOT DIRECTLY OBSERVED — secondary sources describe subtle gradient/blur micro-motion behind crisp UI shots.]
- **First-10-seconds story:** category claim ("the system," not "a tool") + era claim ("designed for the AI era") + a deliberately heretical hook ("Issue tracking is dead") that makes you click to understand why the thing you currently use is obsolete. Zero feature-listing in the hero; pure positioning. The confidence IS the message.

#### Narrative arc — how the homepage sells, section by section, in order
A numbered, chaptered product story — literally labeled 1.0 through 5.0, like a spec document (form mirrors audience: engineers):
1. **1.0 Intake — "Make product operations self-driving"** — "Turn conversations and customer feedback into actionable issues that are routed, labeled, and prioritized for the right team."
2. **2.0 Plan — "Define the product direction"** — "Plan and navigate from idea to launch."
3. **3.0 Build — "Move work forward across teams and agents"** — "Build and deploy AI agents that work alongside your team… or delegate entire issues end-to-end."
4. **4.0 Diffs — "Review PRs and agent output"** — "Understand code changes at a glance… Review, discuss, and merge — all within Linear."
5. **5.0 Monitor — "Understand progress at scale"** — "Take the guesswork out of product development."
6. **Changelog strip** — recent shipped features with dates (May–June 2026), proving live velocity.
7. **Social proof** — "Linear powers over 33,000 product teams. From ambitious startups to major enterprises." + named-human testimonials (OpenAI, Ramp, Opendoor).
8. **Close** — "Built for the future. Available today." → Get started / Contact sales.

The arc is the product's own workflow: the homepage IS a walkthrough of a unit of work moving through the system. No "features vs. benefits" hedging — each chapter is one verb, one promise, one UI proof.

#### Conversion machinery — CTAs, waitlist/download flows, app-store funneling, social proof, urgency mechanics
- **Two CTAs everywhere, cleanly forked by segment:** "Get started" (self-serve, free tier, "Create a workspace. It's free and takes minutes.") vs. "Contact sales" (enterprise). No third option, no noise.
- **Free tier as the conversion engine:** unlimited members free — the product converts itself; the site only has to get you to /signup.
- **Download flow:** platform-detection-light page; mobile via QR code + app-store links — QR is the right desktop→phone bridge (steal this for Blabberly's desktop visitors).
- **Social proof at three altitudes:** scale stat (33,000+ teams), named-logo grid (OpenAI, Cursor, Coinbase, Vercel, Monzo, Substack), and quoted humans with names/titles — "You just have to use it and you will see, you will just feel it." (Gabriel Peal, OpenAI). Plus outcome math: "3.3x Faster issue resolution."
- **The /switch page weaponizes conversion:** it doesn't just compare against Jira — it arms your internal champion with a pitch guide, pilot guide, and migration guide. They convert the *advocate*, not just the buyer.
- **Urgency mechanics:** essentially none — no countdowns, no scarcity. The urgency is narrative ("the era changed; your tool didn't") via /next. Confidence replaces FOMO.

#### Visual language — layout system, typography, color, motion/animation, photography vs illustration vs product UI, how the app itself is shown
- **Layout:** generous single-column sections, numbered chapters, instrument-panel density inside UI mockups vs. lots of air between sections. Cards defined by 1px inset borders and soft shadows rather than colored fills. [Some specifics from secondary design analyses, NOT DIRECTLY OBSERVED.]
- **Typography:** Inter Variable at custom optical weights (~510 emphasis / 400 body), tight negative tracking on display sizes (≈ -0.022em at 72px). The famous "Linear look": dark, precise, engineering-grade sans. [Weight/tracking values from third-party design teardowns — NOT DIRECTLY OBSERVED.]
- **Color:** near-black canvas, tight monochrome gray scale, single accent rationed to one primary action per view; 2026 refresh moved from cool blue-grays to warmer grays (their own post: "A calmer interface for a product in motion"). Gradient sphere logo is the only lush element.
- **Motion:** restrained micro-motion — gradient glows, blurs, subtle parallax on UI panels; nothing that delays reading. The whole industry's "Linear style" trend (per LogRocket, Medium teardowns) derives from this. [NOT DIRECTLY OBSERVED in motion; static fetch only.]
- **Imagery:** zero photography, zero illustration. 100% real product UI, pixel-perfect, often annotated. The app is shown as evidence, not decoration. Their public /brand page even publishes the guidelines.
- **Lesson for Blabberly:** we are the inverse palette (sunset gradient, food video, warmth) but the same discipline applies — one accent, real product as hero, density inside the frame and air around it.

#### Copy voice — tone, vocabulary, taglines worth studying (quote them)
Declarative, compressed, era-defining. No exclamation points, no "supercharge," no emoji. Sentences read like commit messages from someone with taste.
- "The product development system for teams and agents"
- "Purpose-built for planning and building products. Designed for the AI era."
- "Issue tracking is dead."
- "Built for the future. Available today."
- "Make product operations self-driving"
- "Coordination has become the bottleneck, and most of the software responsible for it was designed for a slower, human-only era." (/switch — masterclass in reframing the competitor as a relic without naming it)
- "There is a lost art of building true quality software." (/method)
- "What is quality? It seems hard to describe and even harder to measure, but you can feel it when it's there." (/quality)
- "The best systems remove overhead so teams can focus on building." (/next)
Pattern worth stealing: **two-beat tagline construction** — bold claim, then grounding clause ("Built for the future. Available today."). And testimonial selection favoring *feel* over features: "you will just feel it."

#### SEO & content strategy — city pages, guides, blog, programmatic place pages; how big the content footprint is
No city/place pages (N/A for category). Their content footprint is moderate in page count but extremely high in authority-per-page:
- **/method** — evergreen essay hub that ranks for how-to-build-software queries and gets cited/shared for years. One asset, compounding returns.
- **/now blog** — multi-post/month cadence across Craft/AI/Practices/Press; product announcements double as linkable thought leadership ("Output isn't design").
- **/integrations/** — the one programmatic surface: ~12 categories × dozens of tools, each with a dedicated URL capturing "[tool] + Linear" intent.
- **/switch** — bottom-funnel comparison/migration SEO ("Jira alternative" intent) plus champion-enablement guides.
- **/customers/** — case studies as both proof and long-tail SEO ("how OpenAI uses Linear").
- **/quality** video series — brand reach via guests' audiences.
Notably absent: keyword-stuffed listicles, glossaries, "ultimate guides." They publish only what flatters the brand. [Search-traffic volumes NOT DIRECTLY OBSERVED.]

#### What they do BEST — steal-worthy moves, named specifically
1. **The manifesto page (/next, "Issue tracking is dead")** — declaring the old category obsolete and linking it from the hero. Blabberly equivalent: a page that declares star-ratings-from-strangers dead ("Reviews from people who never went are dead" energy — without the CEO-banned h-word).
2. **Numbered-chapter homepage (1.0–5.0)** that walks the product's own loop — form mirrors function. Blabberly's loop: Watch → Match → Go → Rate → Plan the night.
3. **Two-beat taglines** — "Built for the future. Available today." Compressed confidence; no adjectives doing the work.
4. **Product UI as the only imagery** — the app is the proof. No stock food photography; show the actual feed, the % match, the route builder.
5. **Method/Quality as brand moats** — content that sells a worldview, not a feature. Blabberly's version: a point-of-view hub on how to actually find good food (ratings only from people who went).
6. **Testimonials that quote feel, with names** — "You just have to use it and you will see, you will just feel it."
7. **/switch champion-enablement** — pitch/pilot/migration guides that arm an internal advocate. Blabberly version: "get your friend group off the group-chat-and-Yelp loop" share kit.
8. **QR-code app-store bridge on /download** — the cleanest desktop→phone handoff pattern; directly applicable to our waitlist/download page.
9. **One accent color, rationed** — discipline that makes every CTA unmissable. Sunset gradient as the single lush element on restrained neutrals.
10. **Changelog on the homepage** — shipped-with-dates proof of momentum; great pre-launch credibility pattern ("building in public" strip).

#### What they do WORST — the openings we exploit
1. **Emotionally cold.** Zero warmth, zero appetite, zero people. Food is sensory; we can out-feel them at every scroll. Their ceiling is admiration; ours is hunger.
2. **Insider vocabulary walls.** "Intake," "Diffs," "Triage Intelligence" — meaningless to outsiders. Our copy must pass the "hungry friend at 7pm" test; theirs wouldn't.
3. **Dark-mode monoculture.** The entire "Linear style" SaaS trend means near-black + glow now reads as *startup*, not *special*. A sunset-warm, light, appetizing site is instant differentiation while keeping their typographic discipline.
4. **No imagery beyond UI.** Their constraint is our weapon: real short-video of real plates is content they structurally cannot have.
5. **Manifesto assumes a sophisticated audience.** "Issue tracking is dead" lands because their buyers know the incumbent's pain intimately. Consumer manifestos must be plainer — our provocation has to be felt in one read ("ratings from people who actually went"), not decoded.
6. **No urgency or local texture.** Nothing on their site is *about somewhere*. Our 1,626 enriched place pages, San Diego County specificity, and launch-window waitlist give us scarcity and place-rootedness they can't model.
7. **Self-serve funnel hides the human story.** Team page aside, no community, no faces. A consumer food app can lead with real diners and creators; we should.

#### Sources
- Direct fetches: linear.app/ (home), /next, /pricing, /customers, /method, /quality, /about, /now (blog), /switch, /download, /integrations
- [Linear: A calmer interface for a product in motion (2026 refresh)](https://linear.app/now/behind-the-latest-design-refresh)
- [Linear: How we redesigned the Linear UI](https://linear.app/now/how-we-redesigned-the-linear-ui)
- [Linear Brand Guidelines](https://linear.app/brand)
- [LogRocket: Linear design — the SaaS design trend](https://blog.logrocket.com/ux-design/linear-design/)
- [Medium/Bootcamp: The rise of Linear style design](https://medium.com/design-bootcamp/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646)
- [getdesign.md: Design System Analysis — Linear](https://getdesign.md/linear.app/design-md)
- [frontendfyi: Rebuilding linear.app](https://github.com/frontendfyi/rebuilding-linear.app)
