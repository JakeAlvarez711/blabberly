import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ensureUserDoc } from "../../data/userService";

const ONBOARDING_ROUTES = [
  "/onboarding/profile",
  "/onboarding/taste",
  "/onboarding/finetune",
];

// Routes anonymous visitors can stay on without being redirected.
const PUBLIC_ROUTES = ["/", "/auth"];

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

    // Not authenticated → keep on public routes, otherwise send to waitlist landing
    if (!user) {
      if (!PUBLIC_ROUTES.includes(path)) {
        navigate("/", { replace: true });
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
