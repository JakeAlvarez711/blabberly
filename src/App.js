import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import PublicProfilePage from "./pages/PublicProfilePage";
import PostPage from "./pages/PostPage";

import BottomNav from "./components/Navigation/BottomNav";
import AuthGate from "./components/Auth/AuthGate";

function AppShell() {
  const location = useLocation();

  // Hide BottomNav on fullscreen viewer routes
  const hideBottomNav =
    location.pathname.startsWith("/p/"); // add more later if needed

  return (
    <AuthGate>
      <div style={styles.app}>
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Public profiles */}
            <Route path="/u/:handle" element={<PublicProfilePage />} />

            {/* Single post viewer (fullscreen) */}
            <Route path="/p/:postId" element={<PostPage />} />
          </Routes>
        </div>

        {!hideBottomNav && <BottomNav />}
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
