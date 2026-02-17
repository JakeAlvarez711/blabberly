import { BrowserRouter, Routes, Route } from "react-router-dom";

import FeedPage from "./pages/FeedPage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/ProfilePage/EditProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import AuthPage from "./pages/AuthPage";
import OnboardingTasteProfile from "./pages/OnboardingTasteProfile";
import OnboardingProfileSetup from "./pages/OnboardingProfileSetup";
import FineTunePreferences from "./pages/FineTunePreferences";

import AuthGate from "./components/Auth/AuthGate";

function AppShell() {
  return (
    <AuthGate>
      <div style={styles.app}>
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Public profiles */}
            <Route path="/u/:handle" element={<ProfilePage />} />

            {/* Single post viewer (fullscreen) */}
            <Route path="/p/:postId" element={<PostPage />} />

            {/* Place detail */}
            <Route path="/place/:placeId" element={<PlaceDetailPage />} />

            {/* Auth & Onboarding */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/onboarding/profile" element={<OnboardingProfileSetup />} />
            <Route path="/onboarding/taste" element={<OnboardingTasteProfile />} />
            <Route path="/onboarding/finetune" element={<FineTunePreferences />} />

            {/* Explore */}
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </div>
      </div>
    </AuthGate>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

const styles = {
  app: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    overflow: "hidden",
  },
};
