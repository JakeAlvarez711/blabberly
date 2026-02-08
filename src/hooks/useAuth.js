import { useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../firebaseConfig";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      try {
        if (!u) {
          const cred = await signInAnonymously(auth);
          setUser(cred.user);
        } else {
          setUser(u);
        }
      } catch (e) {
        console.error("Auth init failed:", e);
        setUser(null);
      } finally {
        setReady(true);
      }
    });

    return () => unsub();
  }, []);

  return { user, uid: user?.uid || null, ready };
}
