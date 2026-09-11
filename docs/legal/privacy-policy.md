# Privacy Policy

Effective: September 11, 2026 · Version 3 · Replaces the version dated August 24, 2026

> **In short:** Blabberly collects what it needs to run a social food app: your account, what you post, your taste preferences, the location you choose to share while using the app, and how you use it. We do not sell your information or use advertising trackers, and most of what you post is public, so please read the "Who can see what" section below.

## 1. Who we are and what this covers

Blabberly LLC ("Blabberly," "we," "us") makes the Blabberly app for iPhone (the "App") and runs the website at blabberly.com (the "Site"). Together we call them the "Service."

This policy explains what personal information we collect, why we collect it, who can see it, how long we keep it, and the choices you have. It applies to the App, including beta versions distributed through Apple TestFlight, and to the Site.

Blabberly is in beta with testers in San Diego County, California. The same policy applies to the public App Store release that follows.

If you have a question about anything here, email [support@blabberly.com](mailto:support@blabberly.com).

## 2. What we collect and why

Below is every kind of information we collect, where it comes from, and what we use it for. If something is not on this list, we do not collect it.

### Your account

- **Email address and sign-in method.** You sign up with Apple, Google, or an email address and password. Firebase Authentication (a Google service) stores your email address and, for email accounts, a scrambled (hashed) version of your password. We never see your password. If you use Sign in with Apple or Google sign-in, we receive the name and email address that service shares with us. Apple lets you hide your real email behind a relay address. We use this to create and secure your account and to send account emails such as email verification and password resets.
- **Age confirmation.** When you set up your profile you confirm that you are 13 or older. We do not ask for your birthday and we do not store the confirmation itself.

### Your profile

Your profile is public. It includes your username (handle), display name, profile photo, cover photo, bio, home city, and follower and following counts. It also includes your taste preferences (below) and, today, your notification and privacy settings and the activity counters that power awards and streaks. Anyone who opens your profile can read all of it, including people without a Blabberly account. See section 4.

- **Home city.** The first time the App gets a location fix, we fill in your home city from it (the city name only). You can change it in Edit Profile.

### Optional phone number

You can add a US phone number in Edit Profile. We store it in a private part of your account that only you and Blabberly can read. It is never shown on your profile. We use it so friends who already have your number can find you (see Contacts below), and it can help us confirm you are the account owner if you contact support. We also store a scrambled (SHA-256 hashed) version of your phone number and of your email address so that matching can happen without exposing the real values.

### Taste preferences and your taste profile

- **What you pick.** During setup and in Settings you choose cuisines, drinks, vibes, and lifestyle tags; a price range; dietary restrictions (vegetarian, vegan, gluten-free, no pork, halal, kosher, dairy-free, nut-free); and foods you avoid. We use these to rank places, posts, and events for you.
- **What we learn.** As you use the App we build a "taste vector": weighted scores for the tags, vibes, and price levels you respond to, learned from what you like, save, comment on, rate, watch, and how long you linger on things. It personalizes your feed, Explore, search, and the map. It is stored in your account and updated over time.
- **People with similar taste.** The App compares your taste vector with other users' vectors to find people whose taste is close to yours, then recommends places they saved. To do this, the App reads other users' taste vectors and saved places, and other users' apps can read yours. Nobody sees your name next to the result. They see recommended places.
- **A note on dietary restrictions.** Choices such as halal, kosher, or no pork can hint at a religion. We use them only to rank food for you. Today they are stored in your public profile record along with your other taste picks, which means anyone who reads your profile data can see them even though the App does not display them on your profile page. See section 4.

### Location

- **When we use it.** Only while you are using the App, and only if you allow it in iOS. We use your location to detect which restaurant you are at when you post, show nearby places, center the map, sort your saved places by distance, and let you share a location in a chat or on a live route when you choose to. We never collect location in the background.
- **What stays on your phone.** Your last known location is saved on your device so the App can start faster next time. We do not keep a history of where you have been.
- **When your precise location reaches our servers.** Only in three cases: (1) you share a location in a chat, where it becomes part of that message; (2) you turn on "Share my live location" during a route, which shares your position with that route's crew while the screen is open and clears it when you turn it off; or (3) you type in the place search, where the App may send your approximate position to Google Places through our server so nearby results come first.
- **Places, not you.** A post stores the location of the restaurant you tagged, not where you were standing. We use the place locations of recent posts to compute anonymous "hotspot" areas (roughly 200-meter cells with at least three posts) that carry no information about any user.

### What you post

Photos, videos (including their audio), captions, dish names, ratings and rating notes, tags, the place you tag, people you tag, comments, likes, saves, plans, routes, lists, and places you suggest we add. If you use captions, your video's audio is transcribed on your device using Apple's speech recognition. It never leaves your phone for that. If you add a soundtrack from our library, we store which track you picked. We compress and re-encode media on our servers to make thumbnails and feed versions of your videos.

### Messages

Direct messages and group chats of up to twelve people can include text, photos, videos, voice notes, shared locations, polls, and shared posts, places, plans, routes, and events. Messages are visible to the people in the conversation, and to Blabberly when we need to investigate a report or keep the Service running. Messages are encrypted in transit and while stored, but they are not end-to-end encrypted. You cannot delete or unsend an individual message today; deleting your account replaces your messages with a "message from deleted account" placeholder. When someone messages you, the push notification we send through Expo and Apple contains the sender's name and the first 100 characters of the message.

### Contacts (find friends during setup)

During first-time setup you can let the App check your contacts for friends already on Blabberly. iOS asks your permission first. Phone numbers and emails are scrambled (SHA-256 hashed) on your phone; only the hashes are sent to our server, compared against the hashed values other users stored, and then discarded. We never receive or store your contact list. This feature is only offered during setup.

### How you use the App

We record product events so we can tell whether Blabberly works: app opens, session length, screens viewed, whether you searched (not what you typed), places and posts viewed, posts created, plans created, places saved and rated, and setup steps. Each event carries your user ID, the day, a session ID, your platform (iOS), and the App version. We also keep per-day totals of those events, and per-restaurant counts of the menu views and dish taps and saves you make. None of this includes your location, your device model, or any advertising identifier. Raw events are deleted after 90 days (section 6).

### Push notifications

If you turn on notifications, we store an Expo push token for your device (a random address) and your platform so we can send you notifications about messages, follows, likes, saves, comments, mentions, plans, and awards. You choose which types in Settings. We also keep a history of the notifications you received so the App can show them, and a log of what we sent.

### Crash reports

When the App crashes or hits an error, Sentry receives a report with the error, your device model and iOS version, the App version, the screens you visited just before, and your user ID and username (or display name if you have no username). We do not send your email address. We do not use Sentry for performance monitoring or session replay.

### Reports and moderation records

When you report a post, comment, message, or user, we store your report: the reason, an optional description, and what you reported. When you post, an automated scan (section 5, Google Cloud Vision) scores your images and a few frames from each video for adult, violent, or racy content. If something is flagged, we store the scores and, for videos, the flagged frame, so a person at Blabberly can review it.

### The website

- **Waitlist.** If you join the waitlist we store the phone number or email address you enter, the page you were on, and, depending on the form, your browser type, the site that referred you, campaign tags, and any taste tags you picked. We use this to text or email you when Blabberly opens in your area.
- **Signed-in features.** If you sign in on the Site, it collects the same information as the App for the features you use there (posts, profile, messages).
- **No trackers.** The Site uses no analytics or advertising trackers and sets no cookies of its own. If you sign in, Firebase keeps a sign-in session in your browser's storage.

### Support

If you email us, we keep your email and anything you send with it so we can help you.

### What we do not collect

Your contact list, your location in the background, your birthday, advertising identifiers such as the IDFA, biometric data, and payment card details (nothing is sold in the App today). We do not use third-party analytics or advertising software in the App or on the Site.

## 3. How we use your information

- **To run the Service:** accounts, the feed, the map, search, posts, messages, plans, routes, lists, and events.
- **To personalize:** ranking places, posts, and events by your taste, and finding people whose taste is similar to yours.
- **To keep people safe:** automated scanning of post media, handling reports, blocking, rate limits, and preventing fraud and abuse.
- **To communicate:** the notifications you choose, account emails, support replies, and notices about changes to the Service or these policies.
- **To improve Blabberly:** usage events and crash reports, and anonymous aggregate numbers such as daily active users and retention.
- **To enrich place information:** we use short excerpts of public post captions and public route notes, without any account information, to help generate place descriptions and search tags (section 5 and our [Disclosures](/disclosures)).
- **To meet legal obligations:** complying with law, enforcing our [Terms of Service](/terms), and protecting rights and safety.

We do not use your information for targeted advertising, and we do not sell it.

## 4. Who can see what

| Information | Who can see it |
|---|---|
| Profile: username, display name, photos, bio, home city, follower counts, taste preferences and dietary restrictions, settings, activity counters | Anyone, including people without an account, who opens your profile or has its link. There is no private-account option yet. |
| Posts, captions, tagged places, comments, likes | Anyone, including people without an account. |
| Place ratings and rating notes | Anyone, including people without an account. Ratings are tied to your account. |
| Saved posts, saved places, saved events, who you follow and who follows you, your taste vector | Any signed-in Blabberly user's app can read them. The App does not display other people's saves, but they are not private. |
| Public routes | Any signed-in user. |
| Private routes, plans you create, lists | The people you invite. Anyone who receives a plan's link can open that plan, including the venue, the time, and who is going. |
| Your live position during a route | The route's crew, only while you have sharing turned on. |
| Messages | The people in the conversation. |
| Liked posts, your collections, saved routes, taste history, usage data, notification history, phone number, who you have blocked | Only you. The person you block can tell that you blocked them. |
| Reports you file | Only you and Blabberly. |

Blabberly staff can access any of this through administrative tools when needed to run the Service, review reports, or comply with law.

## 5. Who we share it with

We share information with companies that process it on our behalf ("service providers"). They may use it only to provide their service to us.

- **Google Firebase and Google Cloud.** Everything Blabberly stores lives here: sign-in (Firebase Authentication), the database (Firestore), photo and video storage, and our server code (Cloud Functions, in the United States). Google Cloud Vision scans post images and video frames for unsafe content.
- **Google Maps Platform (Places API).** When you search for a place or open place details and photos, your search text (and, for search suggestions, your approximate position) is sent to Google through our server. Google's privacy policy applies to that data. The map in the App is Apple Maps.
- **Apple.** Sign in with Apple; push notifications, which carry the notification's text; TestFlight during the beta; and on-device speech recognition for captions, which stays on your phone.
- **Google Sign-In,** if you use it to sign in.
- **Expo (EAS).** Delivers our push notifications, so it receives your push token and each notification's title and text. It also delivers App updates: your device asks Expo's servers for updates, which see your IP address and App version.
- **Sentry.** Crash reports, as described in section 2.
- **Anthropic.** We send place information, short excerpts of public post captions, and public route titles and notes, with no account information attached, to Anthropic's Claude models to generate place descriptions, tags, event listings, and search terms. Menu text from restaurants' own websites is also structured this way. This runs as a periodic batch job by Blabberly staff, never from your device.
- **Resend.** Sends our internal alert emails. When you file a report or our scan flags a post, the email to our team includes the relevant account IDs, username, a caption excerpt, your report text, and links to the content.
- **Restaurants and partners.** Restaurants do not receive information about you today. When we launch partner tools, restaurants will see counts (for example, how many people viewed their menu), not who you are. If that changes, we will update this policy first.
- **Other users,** as described in section 4.
- **Legal and safety.** We disclose information when required by law, subpoena, or court order; to report child sexual abuse material as the law requires; or to protect the rights, property, or safety of Blabberly, our users, or the public.
- **Business transfers.** If Blabberly is acquired, merges, or sells assets, your information may transfer with the business under this policy.

We do not sell personal information, and we do not share it for cross-context behavioral advertising.

## 6. How long we keep it

| Information | How long |
|---|---|
| Account, profile, posts, messages, taste profile, saves, plans, routes, lists | Until you delete them or delete your account. |
| Raw usage events | 90 days. |
| Per-day activity totals, notification history, awards | Until you delete your account. |
| Per-restaurant menu and dish counts | About 13 months (400 days). |
| Push tokens | Until you sign out on that device or delete your account. |
| Crash reports at Sentry | 90 days. |
| Contact hashes from find-friends | Not stored. Used during the request and discarded. |
| Reports and automated moderation records | Kept after an account is deleted so we can handle repeat abuse and legal requests. We are setting a fixed retention period and will publish it here. |
| Waitlist entries | Until Blabberly launches in your area, or until you ask us to remove you. |
| Server logs | 30 days. |
| Backups | Deleted data can remain in database backups for a short period until those backups expire. |

## 7. Deleting your account

Open Settings, then Your Data, then Delete Account. You confirm by typing DELETE and either entering your password or signing in again with Apple or Google. Deletion runs from your phone, and a server process finishes anything the phone could not.

**What is removed:** your profile and username, your posts with their comments and likes, your comments and likes on other posts, your saves, follows and followers, taste profile and taste history, plans, routes, lists you own, blocked list, phone number and contact hashes, push tokens, notification history, awards and counters, reports you filed, your photos and videos, and your login. If you signed in with Apple, we revoke Blabberly's Sign in with Apple access.

**What remains:** your messages in conversations with other people are replaced with a "message from deleted account" placeholder; lists you joined but did not own continue without you; posts where other people tagged you keep the tag (email us and we will remove it); anonymous aggregate metrics; reports about your account and moderation records; copies in backups until they expire; and anything we must keep by law.

You can also email [support@blabberly.com](mailto:support@blabberly.com) from the email on your account and we will delete it for you, normally within 30 days. If your phone loses its connection during deletion, sign in again and repeat it, or email us.

## 8. Your choices and rights

- **Export your data.** Settings, then Your Data, then Export Data creates a JSON file you can save or share. It includes your profile, posts, saves, routes, taste vector, conversations, follows, blocks, push tokens, and reports. A few records are not in the file yet (usage events, per-day totals, your phone number record). Email us for a complete copy.
- **Edit your profile and taste preferences** in Settings.
- **Notifications.** Turn each type on or off in Settings, then Privacy & Notifications, or turn them all off in iOS Settings.
- **Who can message you.** Everyone, people you follow, or nobody.
- **Block people.** A blocked person cannot message you, follow you, or see your profile from their account.
- **Permissions.** Location, camera, microphone, photos, and contacts are all controlled in iOS Settings. The App works without them; some features will not.
- **Routes** are private unless you make them public.
- **Sign out** removes the push token for that device.
- **Ask us.** You can ask to access, correct, delete, or receive a copy of your information by emailing support@blabberly.com. We verify requests using the email address on your account and may ask you to confirm from inside the App. An authorized agent may act for you with your signed permission. We respond within 45 days.

## 9. California residents

This section adds the disclosures the California Consumer Privacy Act (CCPA, as amended by the CPRA) asks for. Blabberly may fall below the law's size thresholds, but we honor these rights for everyone.

**Categories of personal information we have collected in the last 12 months:** identifiers (name, username, email, user ID, push token); customer records (phone number, if you add one); characteristics that may be inferred from dietary restrictions (religion, if you pick halal, kosher, or no pork); internet or network activity (how you use the App); precise geolocation (only when you share a location in a chat, on a live route, or in place search); audio, visual, and similar information (photos, videos, voice notes); and inferences (your taste profile). We collect them directly from you, from your device with your permission, and from Apple or Google when you sign in with them, for the purposes in section 3.

**Sensitive personal information.** Your account login, precise geolocation when you share it, and dietary restrictions that may reveal religion are sensitive personal information. We use them only to provide the features you ask for. We do not use them to infer anything about you beyond ranking food, and we do not sell or share them.

**Disclosure.** We disclose personal information to the service providers in section 5 for business purposes. We have not sold personal information and have not shared it for cross-context behavioral advertising, and we do not sell or share the personal information of anyone under 16.

**Your rights.** You may ask us what personal information we have about you and receive a copy; ask us to delete it; ask us to correct it; and you will not be treated differently for exercising these rights. Because we do not sell or share personal information, there is nothing to opt out of, and we do not offer financial incentives for your data. To make a request, email [support@blabberly.com](mailto:support@blabberly.com), or use Export Data and Delete Account in the App. We verify requests as described in section 8 and respond within 45 days.

**Do Not Track and Global Privacy Control.** The Site does not track you across other websites, so there is nothing for a Do Not Track or Global Privacy Control signal to turn off. We treat everyone as opted out of sale and sharing.

**Shine the Light.** We do not disclose personal information to third parties for their own direct marketing.

## 10. Children

Blabberly is for people 13 and older. You confirm your age when you create your profile, and we do not ask for a birthday. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has an account, email [support@blabberly.com](mailto:support@blabberly.com) and we will delete it. Users between 13 and 17 need a parent's or guardian's permission under our [Terms of Service](/terms).

## 11. Using Blabberly outside the United States

Blabberly is a US company and stores your information on Google's servers in the United States. The beta is limited to San Diego County, and we do not currently offer the Service to people in the European Union or the United Kingdom. If you use the Service from somewhere else, your information will be processed in the United States, where privacy law may differ from your country's.

## 12. Security

We protect your information with encryption in transit (TLS) and at rest (Google-managed encryption), access rules that limit each record to the people allowed to read it, a private area of your account for your phone number, API keys held on our servers rather than in the App, administrative access limited to Blabberly's founders, rate limits, alerts on reports and flagged content, and regular backups. No system is perfectly secure. If you find a security problem, email [support@blabberly.com](mailto:support@blabberly.com); our contact details are also published at blabberly.com/.well-known/security.txt.

## 13. Changes to this policy

When we change this policy we post the new version here with a new date and version number. For significant changes we will tell you in the App or by email before they take effect.

- Version 1: March 23, 2026.
- Version 2: July 6, 2026, with minor updates on August 24, 2026.
- Version 3: September 7, 2026. Full rewrite to describe the beta product in detail: taste profile, location, messages, contacts matching, usage events, crash reports, moderation, service providers, retention, deletion, and California rights.

## 14. Contact

Blabberly LLC
c/o Registered Agent, 2108 N St Ste N, Sacramento, CA 95816
[support@blabberly.com](mailto:support@blabberly.com)
