import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Switch, ScrollView } from "react-native";
import { useTheme } from "../../../context/AppTheme";
import { useAuth } from "../../../context/AuthContext";
import { apiFetch } from "../../../lib/api";
import { emitBooksChanged } from "../../../lib/events";
import { useLocalSearchParams, router, Redirect } from "expo-router";

export default function EditBook() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { token, loading: authLoading, logout } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  // guard handled in render

  const load = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch(`/api/books/${id}`, { token, onUnauthorized: logout });
      const data = await res.json();
      setTitle(data.book?.title || "");
      setAuthor(data.book?.author || "");
      setDescription(data.book?.description || "");
      setGenre(data.book?.genre || "");
      setYear(data.book?.year ? String(data.book.year) : "");
      setPrice(typeof data.book?.price === 'number' ? String(data.book.price) : "");
      setAvailable(typeof data.book?.available === 'boolean' ? data.book.available : true);
    } finally {
      setLoading(false);
    }
  }, [id, token, logout]);

  useEffect(() => { load(); }, [load]);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const body = {
        ...(title ? { title: title.trim() } : {}),
        ...(author ? { author: author.trim() } : {}),
        ...(description ? { description: description.trim() } : {}),
        ...(genre ? { genre: genre.trim() } : {}),
        ...(year ? { year: Number(year) } : {}),
        ...(price ? { price: Number(price) } : {}),
        available,
      };
      const res = await apiFetch(`/api/books/${id}`, { method: 'PUT', body, token, onUnauthorized: logout });
      if (res.status === 400) {
        const data = await res.json();
        const msg = data?.errors?.[0]?.msg || data?.error || 'Validation error';
        throw new Error(msg);
      }
  if (!res.ok) throw new Error('Update failed');
  emitBooksChanged();
  router.replace('/books');
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  if (!authLoading && !token) return <Redirect href="/login" />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ padding: 16 }}>
      {loading ? <ActivityIndicator color={colors.primary} /> : (
        <>
          <Text style={[styles.title, { color: colors.text }]}>Edit Book</Text>
          <TextInput placeholder="Title" placeholderTextColor={colors.textSecondary} value={title} onChangeText={setTitle} style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: colors.cardBackground }]} />
          <TextInput placeholder="Author" placeholderTextColor={colors.textSecondary} value={author} onChangeText={setAuthor} style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: colors.cardBackground }]} />
          <TextInput placeholder="Description" placeholderTextColor={colors.textSecondary} value={description} onChangeText={setDescription} style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: colors.cardBackground }]} multiline />
          <TextInput placeholder="Genre" placeholderTextColor={colors.textSecondary} value={genre} onChangeText={setGenre} style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: colors.cardBackground }]} />
          <TextInput placeholder="Year" placeholderTextColor={colors.textSecondary} value={year} onChangeText={setYear} keyboardType="number-pad" style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: colors.cardBackground }]} />
          <TextInput placeholder="Price" placeholderTextColor={colors.textSecondary} value={price} onChangeText={setPrice} keyboardType="decimal-pad" style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: colors.cardBackground }]} />
          <View style={styles.row}><Text style={{ color: colors.text }}>Available</Text><Switch value={available} onValueChange={setAvailable} /></View>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onSubmit}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  button: { padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '800' },
});
