import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from "../context/AppTheme";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: "#ffffff" }]}>
        {isDarkMode ? "☀️" : "🌙"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default ThemeToggle;
