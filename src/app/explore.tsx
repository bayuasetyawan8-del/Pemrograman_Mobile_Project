import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.header}>
        Panduan Penggunaan
      </Text>

      <Text style={styles.subtitle}>
        Edu Notes - Catatan Kuliah
      </Text>

      <Text style={styles.description}>
        Gunakan Edu Notes untuk mencatat dan mengelola
        materi perkuliahanmu dengan mudah.
      </Text>

      <View style={styles.card}>
        <Text style={styles.number}>01</Text>
        <Text style={styles.cardTitle}>
          Menambahkan Catatan
        </Text>
        <Text style={styles.cardText}>
          Isi nama mata kuliah, judul catatan, dan isi
          catatan pada formulir di halaman utama.
          Tekan tombol Simpan Catatan untuk menambahkan
          catatan baru. Semua kolom wajib diisi.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>02</Text>
        <Text style={styles.cardTitle}>
          Melihat Daftar Catatan
        </Text>
        <Text style={styles.cardText}>
          Catatan yang tersedia akan ditampilkan pada
          bagian Daftar Catatan. Jumlah catatan juga
          ditampilkan pada halaman utama.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>03</Text>
        <Text style={styles.cardTitle}>
          Melihat Detail Catatan
        </Text>
        <Text style={styles.cardText}>
          Tekan tombol Lihat Detail pada salah satu
          catatan untuk melihat informasi mata kuliah,
          judul, dan isi catatan pada halaman detail.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>04</Text>
        <Text style={styles.cardTitle}>
          Menghapus Catatan
        </Text>
        <Text style={styles.cardText}>
          Tekan tombol Hapus pada catatan yang ingin
          dihilangkan. Periksa pesan konfirmasi, lalu
          pilih Hapus untuk melanjutkan atau Batal
          untuk membatalkan tindakan.
        </Text>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteTitle}>
          Catatan Penting
        </Text>
        <Text style={styles.noteText}>
          Pada versi saat ini, data catatan disimpan
          sementara dalam state aplikasi. Catatan yang
          ditambahkan belum tersimpan secara permanen
          setelah aplikasi dimuat ulang.
        </Text>
      </View>

      <Pressable
        style={styles.homeButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>
          Kembali ke Beranda
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  container: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 36,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#6B7280",
    marginTop: 12,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginTop: 14,
  },
  number: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2563EB",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
    marginTop: 8,
  },
  note: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 15,
    marginTop: 18,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1D4ED8",
  },
  noteText: {
    fontSize: 13,
    lineHeight: 21,
    color: "#374151",
    marginTop: 6,
  },
  homeButton: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 22,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
