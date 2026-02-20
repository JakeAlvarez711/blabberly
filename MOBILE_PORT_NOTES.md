cd /mnt/c/Users/Jake/blabberly

# Create the file and open in nano (text editor)
nano MOBILE_PORT_NOTES.md

# Paste the content
# Press Ctrl+X, then Y, then Enter to savecd /mnt/c/Users/Jake/blabberly

# Create the file and open in nano (text editor)
nano MOBILE_PORT_NOTES.md

# Paste the content
# Press Ctrl+X, then Y, then Enter to save# Blabberly Web → Mobile Porting Guide

## What's Reusable (Copy Directly)
- `src/services/` - All Firebase services (auth, posts, messages, routes, storage)
- `src/config/firebase.js` - Firebase config
- `src/utils/` - Helper functions, algorithms
- `src/data/routePlanning.js` - Plan My Night algorithm
- `src/data/googlePlaces.js` - Google Places integration
- `.env` - All API keys

## What Needs Conversion
- All `src/pages/` → Convert to `src/screens/` (mobile UI)
- All `src/components/` → Adapt for React Native
- CSS → StyleSheet
- React Router → React Navigation

## Features Built (Priority Order for Mobile)
1. ✅ Auth (Login, Signup, Profile)
2. ✅ Onboarding (Taste profile)
3. ✅ Feed (Explore with algorithm)
4. ✅ Search (Places, users, posts)
5. ✅ Place Pages (Details, reviews)
6. ✅ Map (Google Places, personalized pins)
7. ✅ Plan My Night ⭐ (Route generation, navigation)
8. ✅ Create (Photo/video upload)
9. ✅ Messages (Real-time DM)
10. ✅ Settings (Account, privacy, preferences)

## Key Services to Copy First
1. `authService.js` - Works identically
2. `storageService.js` - Works identically
3. `postService.js` - Works identically
4. `messageService.js` - Works identically
5. `routePlanning.js` - Algorithm works identically

## Google Maps API Key
- Already in `.env`
- Use for react-native-maps (same key!)

## Firebase Storage Rules
- Already configured
- Works same on mobile

## Notes
- 70% of code is directly reusable
- Only UI layer changes
- Business logic stays identical
