import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ensureUserDoc } from "../../data/userService";

export default function AuthGate({ children }) {
  const { user, ready } = useAuth();

  useEffect(() => {
    if (!ready || !user) return;
    ensureUserDoc(user).catch(console.error);
  }, [ready, user]);

  if (!ready) return null; // silent boot, avoids UI flicker

  return children;
}
