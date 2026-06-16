"use client";
import { useEffect } from "react";
import { getMe, checkSessionServer } from "@/lib/api/serverApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    async function verify() {
      try {
        const session = await checkSessionServer();
        if (session) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      }
    }
    verify();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
