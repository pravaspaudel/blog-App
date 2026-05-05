"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext, User } from "./AuthContext";
import fetchApi from "@/utils/fetchApi";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const res = await fetchApi("/auth/check", "GET");

        if (!res.success) {
          setUser(null);
          return;
        }

        setUser(res.data);
      } catch (error) {
        console.log("some error :", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth error");
  }
  return context;
};
