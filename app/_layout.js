import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "../context/AppTheme";
import ThemeToggle from "../components/ThemeToggle";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { AuthProvider } from "../context/AuthContext";

function StackLayout() {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            color: colors.text,
          },
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Register",
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            title: "Profile",
            headerRight: () => <ThemeToggle />,
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: "About",
            headerRight: () => <ThemeToggle />,
          }}
        />
      </Stack>
    </>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StackLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}