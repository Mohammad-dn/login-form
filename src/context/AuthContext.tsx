"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

type UserType = any;

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserType | null>(null);

  const setUser = (user: UserType) => {
    setUserState(user);
    if (user) {
      Cookies.set("auth", "true", {
        path: "/",
        sameSite: "lax",
      });
    } else {
      Cookies.remove("user");
    }
  };

  const logout = () => {
    setUserState(null);
    Cookies.remove("user");
  };

  useEffect(() => {
    const saved = Cookies.get("auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserState(parsed);
      } catch {
        Cookies.remove("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
