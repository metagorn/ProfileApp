import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useTheme } from "../../context/AppTheme";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";
import { emitBooksChanged } from "../../lib/events";
import { useLocalSearchParams, router, Redirect } from "expo-router";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { token, loading: authLoading, logout } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // guard handled below

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true); setError("");
    try {
      const res = await apiFetch(`/api/books/${id}`, { token, onUnauthorized: logout });
      if (!res.ok) throw new Error("Failed to load book");
      const data = await res.json();
      setBook(data.book);
    } catch (e) {
      setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }, [id, token, logout]);

  useEffect(() => { load(); }, [load]);

  const onDelete = () => {
    Alert.alert("Delete", "Are you sure to delete this book?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
        const res = await apiFetch(`/api/books/${id}`, { method: 'DELETE', token, onUnauthorized: logout });
        if (!res.ok) {
          Alert.alert("Error", "Failed to delete book");
          return;
        }
  emitBooksChanged();
  router.replace("/books");
      }}
    ]);
  };

  if (!authLoading && !token) return <Redirect href="/login" />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading ? (
        <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>
      ) : error ? (
        <Text style={{ color: 'crimson', margin: 16, fontWeight: '700' }}>{error}</Text>
      ) : book ? (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
          <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
            <Text style={[styles.title, { color: colors.text }]}>{book.title}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{book.author}</Text>
            {!!book.description && (
              <Text style={[styles.desc, { color: colors.text }]}>{book.description}</Text>
            )}
            <View style={styles.metaRow}>
              {!!book.genre && <Text style={[styles.meta, { color: colors.textSecondary }]}>Genre: {book.genre}</Text>}
              {!!book.year && <Text style={[styles.meta, { color: colors.textSecondary }]}>Year: {book.year}</Text>}
              {typeof book.price === 'number' && <Text style={[styles.meta, { color: colors.textSecondary }]}>Price: ${book.price.toFixed(2)}</Text>}
              {typeof book.available === 'boolean' && <Text style={[styles.meta, { color: colors.textSecondary }]}>Available: {book.available? 'Yes':'No'}</Text>}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={() => router.push(`/books/${book._id}/edit`)}>
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#dc2626' }]} onPress={onDelete}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { borderWidth: 1, borderRadius: 16, padding: 16 },
  title: { fontSize: 22, fontWeight: '900' },
  subtitle: { fontSize: 16, fontWeight: '700', marginTop: 6 },
  desc: { marginTop: 12, lineHeight: 20 },
  metaRow: { marginTop: 12, gap: 6 },
  meta: { fontSize: 14, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: '800' },
});
