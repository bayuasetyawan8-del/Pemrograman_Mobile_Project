
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function DetailScreen() {
  const router = useRouter();

  const { mataKuliah, judul, isi } = useLocalSearchParams<{
    mataKuliah: string;
    judul: string;
    isi: string;
  }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Detail Catatan</Text>

      <Text style={styles.label}>Mata Kuliah</Text>
      <Text style={styles.value}>{mataKuliah}</Text>

      <Text style={styles.label}>Judul Catatan</Text>
      <Text style={styles.value}>{judul}</Text>

      <Text style={styles.label}>Isi Catatan</Text>
      <Text style={styles.value}>{isi}</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Kembali</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.homeButton]}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
    padding: 24,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1F2937",
  },
  label: {
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    color: "#374151",
    marginTop: 6,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  homeButton: {
    backgroundColor: "#059669",
    marginTop: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
