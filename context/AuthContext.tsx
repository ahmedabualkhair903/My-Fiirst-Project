"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  initializeAdmin,
  logoutUser,
} from "@/lib/auth";

import { TUser } from "@/types/user";

type AuthContextType = {
  user: TUser | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // Refresh Current User
  // =========================

  const refreshUser = () => {
    const currentUser = getCurrentUser();

    setUser(currentUser);
  };

  // =========================
  // Initial Auth Check
  // =========================

  useEffect(() => {
    initializeAdmin();
    refreshUser();
    setLoading(false);
  }, []);

  // =========================
  // Listen For Storage Changes
  // =========================

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "currentUser") {
        refreshUser();
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // =========================
  // Logout
  // =========================

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// useAuth Hook
// =========================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};