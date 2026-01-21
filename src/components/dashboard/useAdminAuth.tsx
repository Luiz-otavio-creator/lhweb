"use client";

import { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export function useAdminAuth() {
  const [user, setUser] = useState<typeof auth.currentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        setIsAdmin(false);
        setToken(null);
        return;
      }

      const idToken = await currentUser.getIdToken();
      setToken(idToken);

      const response = await fetch("/api/admin/check", {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      setIsAdmin(response.ok);
    });
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, loading, isAdmin, token, login, logout };
}
