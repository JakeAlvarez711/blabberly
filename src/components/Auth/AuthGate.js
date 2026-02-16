import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ensureUserDoc } from "../../data/userService";

const ONBOARDING_ROUTES = [
  "/onboarding/profile",
  "/onboarding/taste",
  "/onboarding/finetune",
];

export default function AuthGate({ children }) {
  const { user, ready, onboardingCompleted } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure user doc exists
  useEffect(() => {
    if (!ready || !user) return;
    ensureUserDoc(user).catch(console.error);
  }, [ready, user]);

  // Routing logic
  useEffect(() => {
    if (!ready) return;

    const path = location.pathname;

    // Not authenticated → must sign in
    if (!user) {
      if (path !== "/auth") {
        navigate("/auth", { replace: true });
      }
      return;
    }

    // Authenticated, onboarding not completed
    if (!onboardingCompleted) {
      if (path === "/auth") {
        navigate("/onboarding/profile", { replace: true });
        return;
      }
      if (!ONBOARDING_ROUTES.includes(path)) {
        navigate("/onboarding/profile", { replace: true });
        return;
      }
      return;
    }

    // Authenticated, onboarding completed
    if (path === "/auth" || ONBOARDING_ROUTES.includes(path)) {
      navigate("/", { replace: true });
    }
  }, [ready, user, onboardingCompleted, location.pathname, navigate]);

  if (!ready) return null;

  return children;
}
