import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    accessTokenObj: { accessToken: string; accessTokenExpTime: string },
    refreshTokenObj: { refreshToken: string; refreshTokenExpTime: string }
  ) => void;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(Cookies.get("accessToken") || null);
  const [refreshToken, setRefreshToken] = useState<string | null>(Cookies.get("refreshToken") || null);

  const login = (
    accessTokenObj: { accessToken: string; accessTokenExpTime: string },
    refreshTokenObj: { refreshToken: string; refreshTokenExpTime: string }
  ) => {
    const accessToken = accessTokenObj.accessToken;
    const accessTokenExpTime = accessTokenObj.accessTokenExpTime;
    const refreshToken = refreshTokenObj.refreshToken;
    const refreshTokenExpTime = refreshTokenObj.refreshTokenExpTime;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    Cookies.set("accessToken", accessToken, {
      expires: new Date(accessTokenExpTime),
    });

    Cookies.set("refreshToken", refreshToken, {
      expires: new Date(refreshTokenExpTime),
    });
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    });
    navigate("/");
  };

  useEffect(() => {
    const id = setInterval(async () => {
      const access = Cookies.get("accessToken");
      const refresh = Cookies.get("refreshToken");
      const currentPath = window.location.pathname;

      if (!refresh) {
        if (!["/login", "/register"].includes(currentPath)) {
          logout();
        }
        return;
      }

      if (!access && ["/login", "/register"].includes(currentPath)) {
        return;
      }

      if (!access) {
        try {
          const response = await fetch("http://192.168.25.136:5102/api/Auth/refresh-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: refresh }),
          });

          if (!response.ok) {
            logout();
            return;
          }

          const result = await response.json();
          const {
            accessToken: accessTokenObj,
            refreshToken: refreshTokenObj,
          } = result.data;

          const accessToken = accessTokenObj.accessToken;
          const accessTokenExpTime = accessTokenObj.accessTokenExpTime;
          const refreshToken = refreshTokenObj.refreshToken;
          const refreshTokenExpTime = refreshTokenObj.refreshTokenExpTime;

          setAccessToken(accessToken);
          setRefreshToken(refreshToken);

          Cookies.set("accessToken", accessToken, {
            expires: new Date(accessTokenExpTime),
          });
          Cookies.set("refreshToken", refreshToken, {
            expires: new Date(refreshTokenExpTime),
          });
        } catch {
          logout();
        }
      }
    }, 300000); // 5 dakika

    return () => clearInterval(id);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};