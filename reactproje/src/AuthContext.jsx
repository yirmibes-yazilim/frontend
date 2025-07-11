import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// LoginResponse örnek tipi açıklama olarak bırakıldı
// { accessToken, refreshToken, accessTokenExpTime, refreshTokenExpTime }

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken") || null);
  const [refreshToken, setRefreshToken] = useState(Cookies.get("refreshToken") || null);

  const login = (data) => {
    setAccessToken(data.accessToken.accessToken);
    setRefreshToken(data.refreshToken.refreshToken);
    const accessExp = new Date(data.accessToken.accessTokenExpTime);
    const refreshExp = new Date(data.refreshToken.refreshTokenExpTime);
    Cookies.set("accessToken", data.accessToken.accessToken, { expires: accessExp });
    Cookies.set("refreshToken", data.refreshToken.refreshToken, { expires: refreshExp });
  };

  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    });
    // window.location.href = "/"; // Sürekli yenileme olmaması için yoruma alındı
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
          const response = await fetch(
            "http://192.168.25.122:5102/api/Auth/refresh-token",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: refresh }),
            }
          );
          if (!response.ok) {
            logout();
            return;
          }
          const result = await response.json();
          setAccessToken(result.data.accessToken.accessToken);
          setRefreshToken(result.data.refreshToken.refreshToken);
          Cookies.set("accessToken", result.data.accessToken.accessToken, {
            expires: new Date(result.data.accessToken.accessTokenExpTime),
          });
          Cookies.set("refreshToken", result.data.refreshToken.refreshToken, {
            expires: new Date(result.data.refreshToken.refreshTokenExpTime),
          });
        } catch {
          logout();
        }
      }
    }, 500); // 5 saniye
    return () => clearInterval(id);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: accessToken ?? null,
        refreshToken: refreshToken ?? null,
        login,
        logout,
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