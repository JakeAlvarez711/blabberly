import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [userDoc, setUserDoc] = useState(null);
  const [userDocReady, setUserDocReady] = useState(false);

  // Firebase Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setAuthReady(true);
    });

    return () => unsub();
  }, []);

  // Firestore user doc listener (real-time)
  useEffect(() => {
    if (!user?.uid) {
      setUserDoc(null);
      setUserDocReady(true);
      return;
    }

    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      (snap) => {
        setUserDoc(snap.exists() ? snap.data() : null);
        setUserDocReady(true);
      },
      (err) => {
        console.error("User doc listener error:", err);
        setUserDoc(null);
        setUserDocReady(true);
      }
    );

    return () => unsub();
  }, [user?.uid]);

  return {
    user,
    uid: user?.uid || null,
    ready: authReady && userDocReady,
    onboardingCompleted: userDoc?.onboardingCompleted === true,
    userDoc,
  };
}
