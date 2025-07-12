import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? "#0a0a0f" : "#ffffff",
      backgroundPattern: isDarkMode ? "#1a1a2e" : "#f8f9fa",
      surface: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
      
      primary: isDarkMode ? "#667eea" : "#007bff",
      primaryLight: isDarkMode ? "rgba(102, 126, 234, 0.15)" : "rgba(0, 123, 255, 0.1)",
      primaryBorder: isDarkMode ? "rgba(102, 126, 234, 0.3)" : "rgba(0, 123, 255, 0.2)",
      
      text: isDarkMode ? "#ffffff" : "#1a202c",
      textSecondary: isDarkMode ? "#94a3b8" : "#6c757d",
      textMuted: isDarkMode ? "#64748b" : "#868e96",
      
      cardBackground: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#ffffff",
      cardBorder: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      
      skillReact: {
        bg: isDarkMode ? "rgba(97, 218, 251, 0.15)" : "rgba(97, 218, 251, 0.2)",
        border: isDarkMode ? "rgba(97, 218, 251, 0.3)" : "rgba(97, 218, 251, 0.4)"
      },
      skillJs: {
        bg: isDarkMode ? "rgba(247, 223, 30, 0.15)" : "rgba(247, 223, 30, 0.2)",
        border: isDarkMode ? "rgba(247, 223, 30, 0.3)" : "rgba(247, 223, 30, 0.4)"
      },
      skillHtml: {
        bg: isDarkMode ? "rgba(228, 77, 38, 0.15)" : "rgba(228, 77, 38, 0.2)",
        border: isDarkMode ? "rgba(228, 77, 38, 0.3)" : "rgba(228, 77, 38, 0.4)"
      },
      skillPython: {
        bg: isDarkMode ? "rgba(55, 118, 171, 0.15)" : "rgba(55, 118, 171, 0.2)",
        border: isDarkMode ? "rgba(55, 118, 171, 0.3)" : "rgba(55, 118, 171, 0.4)"
      },
      skillNode: {
        bg: isDarkMode ? "rgba(104, 160, 99, 0.15)" : "rgba(104, 160, 99, 0.2)",
        border: isDarkMode ? "rgba(104, 160, 99, 0.3)" : "rgba(104, 160, 99, 0.4)"
      },
      skillDb: {
        bg: isDarkMode ? "rgba(74, 155, 108, 0.15)" : "rgba(74, 155, 108, 0.2)",
        border: isDarkMode ? "rgba(74, 155, 108, 0.3)" : "rgba(74, 155, 108, 0.4)"
      },
      
      statusOnline: "#4ade80",

      profileRing: isDarkMode ? "#667eea" : "#007bff",
      
      floatingCircle1: {
        bg: isDarkMode ? "rgba(102, 126, 234, 0.08)" : "rgba(0, 123, 255, 0.1)",
        border: isDarkMode ? "rgba(102, 126, 234, 0.15)" : "rgba(0, 123, 255, 0.2)"
      },
      floatingCircle2: {
        bg: isDarkMode ? "rgba(118, 75, 162, 0.08)" : "rgba(111, 66, 193, 0.1)",
        border: isDarkMode ? "rgba(118, 75, 162, 0.15)" : "rgba(111, 66, 193, 0.2)"
      }
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
