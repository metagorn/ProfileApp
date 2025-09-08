import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useTheme } from "../context/AppTheme";
import { useAuth } from "../context/AuthContext";
import { Link, router } from "expo-router";

export default function Login() {
  const { colors } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace("/");
    } catch (e) {
      Alert.alert("Login failed", e.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: colors.cardBackground }]}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: colors.cardBackground }]}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={{ color: colors.textSecondary }}>No account? </Text>
        <Link href="/register" style={[styles.link, { color: colors.primary }]}>Register</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "900", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 },
  button: { padding: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "800" },
  row: { flexDirection: "row", justifyContent: "center", marginTop: 12 },
  link: { fontWeight: "700" },
});
