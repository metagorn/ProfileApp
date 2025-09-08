import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from "react-native";
import { useTheme } from "../../context/AppTheme";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";
import { Link, router, Redirect } from "expo-router";
import { onBooksChanged } from "../../lib/events";
import { useFocusEffect } from "@react-navigation/native";

export default function BooksList() {
  const { colors } = useTheme();
  const { token, loading: authLoading, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // guard handled by Redirect in render

  const load = useCallback(async (resetPage = true) => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const p = resetPage ? 1 : page;
      const res = await apiFetch(`/api/books?limit=10&page=${p}&search=${encodeURIComponent(search)}`, {
        token,
        onUnauthorized: logout,
      });
      if (!res.ok) throw new Error("Failed to load books");
      const data = await res.json();
      setBooks(data.books || []);
      setPage(data.pagination?.page || 1);
      setPages(data.pagination?.pages || 1);
    } catch (e) {
      setError(e.message || "Error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, page, search, logout]);

  useEffect(() => {
    load(true);
  }, [search]);

  useEffect(() => {
    const off = onBooksChanged(() => load(true));
    return off;
  }, [load]);

  useFocusEffect(useCallback(() => {
    load(true);
  }, [load]));

  const onRefresh = () => {
    setRefreshing(true);
    load(true);
  };

  const ListHeader = useMemo(() => (
    <View style={styles.headerRow}>
      <TextInput
        placeholder="Search books..."
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={setSearch}
        style={[styles.search, { borderColor: colors.cardBorder, backgroundColor: colors.cardBackground, color: colors.text }]}
      />
      <TouchableOpacity style={[styles.createBtn, { backgroundColor: colors.primary }]} onPress={() => router.push("/books/create") }>
        <Text style={styles.createText}>+ New</Text>
      </TouchableOpacity>
    </View>
  ), [search, colors]);

  if (!authLoading && !token) return <Redirect href="/login" />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }] }>
      {loading && !refreshing ? (
        <View style={styles.center}> 
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item._id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}
              onPress={() => router.push(`/books/${item._id}`)}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
                {item.available === false && (
                  <Text style={[styles.badge, { color: colors.textSecondary }]}>Unavailable</Text>
                )}
              </View>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>{item.author}</Text>
              <View style={styles.metaRow}>
                {!!item.genre && <Text style={[styles.meta, { color: colors.textSecondary }]}>{item.genre}</Text>}
                {!!item.year && <Text style={[styles.meta, { color: colors.textSecondary }]}>{item.year}</Text>}
                {typeof item.price === 'number' && <Text style={[styles.meta, { color: colors.textSecondary }]}>${item.price.toFixed(2)}</Text>}
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            pages > 1 ? (
              <View style={styles.pagination}>
                <TouchableOpacity disabled={page <= 1} onPress={() => { setPage((p)=>p-1); load(false); }}>
                  <Text style={[styles.pageBtn, { color: page<=1? colors.textMuted: colors.primary }]}>Prev</Text>
                </TouchableOpacity>
                <Text style={{ color: colors.textSecondary }}>Page {page} / {pages}</Text>
                <TouchableOpacity disabled={page >= pages} onPress={() => { setPage((p)=>p+1); load(false); }}>
                  <Text style={[styles.pageBtn, { color: page>=pages? colors.textMuted: colors.primary }]}>Next</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
      {!!error && <Text style={[styles.error, { color: 'crimson' }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  search: { flex: 1, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  createBtn: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  createText: { color: '#fff', fontWeight: '800' },
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: '800' },
  subtitle: { fontSize: 14, fontWeight: '600', marginTop: 4 },
  metaRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  meta: { fontSize: 12, fontWeight: '600' },
  badge: { fontSize: 12, fontWeight: '700' },
  pagination: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  pageBtn: { fontWeight: '800' },
  error: { textAlign: 'center', margin: 8, fontWeight: '700' },
});
