import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { API_BASE_URL } from "../lib/api";

const TOKEN_KEY = "auth_token";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const saveToken = async (token) => {
  try {
    if (token) await SecureStore.setItemAsync(TOKEN_KEY, token);
    else await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (e) {
    // noop
  }
};

const getStoredToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async (silent = false) => {
    setToken(null);
    setUser(null);
    await saveToken(null);
    if (!silent) Alert.alert("Session expired", "Please log in again.");
  }, []);

  const fetchProfile = useCallback(async (tkn) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${tkn}` },
      });
      if (res.status === 401) {
        await logout();
        return null;
      }
      if (!res.ok) throw new Error("Profile fetch failed");
      const data = await res.json();
      setUser(data.user);
      return data.user;
    } catch (e) {
      return null;
    }
  }, [logout]);

  useEffect(() => {
    (async () => {
      const stored = await getStoredToken();
      if (stored) {
        setToken(stored);
        await fetchProfile(stored);
      }
      setLoading(false);
    })();
  }, [fetchProfile]);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.status === 401) throw new Error("Invalid email or password");
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setToken(data.token);
    await saveToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (username, email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (res.status === 400) {
      const data = await res.json();
      const msg = data?.errors?.[0]?.msg || data?.error || "Validation error";
      throw new Error(msg);
    }
    if (!res.ok) throw new Error("Registration failed");
    const data = await res.json();
    setToken(data.token);
    await saveToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const value = useMemo(() => ({
    token,
    user,
    loading,
    login,
    register,
    logout,
    setUser,
  }), [token, user, loading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
