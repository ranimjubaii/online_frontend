import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined" && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("AuthContext data recovery error:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);
  const login = async (formData) => {
    try {
      const response = await api.post("/auth/login", formData);
      const { token, user_id, username, email, user_type } = response.data;
      if (token) {
        const userData = { user_id, username, email, user_type };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return {
          success: true,
          user: userData,
        };
      } else {
        return {
          success: false,
          message: "Authentication payload token assignment failed.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);