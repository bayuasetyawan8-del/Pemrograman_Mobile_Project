
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

interface Catatan {
  id: string;
  mataKuliah: string;
  judul: string;
  isi: string;
}

interface Buku {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  edition_count?: number;
}

interface ResponsPencarianBuku {
  docs: Buku[];
  numFound?: number;
}

// Fungsi untuk mengambil data buku dari API
const ambilDataBuku = (
  kataKunci: string
): Promise<ResponsPencarianBuku> => {
  return new Promise((resolve, reject) => {
    const url =
      `https://openlibrary.org/search.json?q=${encodeURIComponent(kataKunci)}` +
      `&fields=key,title,author_name,first_publish_year,edition_count&limit=10`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Gagal mengambil data buku."));
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (data) {
          resolve(data as ResponsPencarianBuku);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default function Index() {
  const router = useRouter();

  const [mataKuliah, setMataKuliah] = useState("");
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");

  const [catatan, setCatatan] = useState<Catatan[]>([
    {
      id: "1",
      mataKuliah: "Pemrograman Mobile",
      judul: "Belajar React Native",
      isi: "Belajar View, Text, TextInput, dan FlatList.",
    },
    {
      id: "2",
      mataKuliah: "Basis Data",
      judul: "Belajar Database",
      isi: "Mempelajari tabel, primary key, dan relasi.",
    },
  ]);

  // State untuk pencarian buku
  const [kataKunci, setKataKunci] = useState("");
  const [daftarBuku, setDaftarBuku] = useState<Buku[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tampilkanPesan = (pesan: string) => {
    if (Platform.OS === "web") {
      window.alert(pesan);
    } else {
      Alert.alert("Informasi", pesan);
    }
  };

  // Fungsi async untuk mencari buku
  const cariBuku = async () => {
    if (!kataKunci.trim()) {
      tampilkanPesan("Masukkan judul atau nama buku terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");
    setDaftarBuku([]);

    try {
      const hasil = await ambilDataBuku(kataKunci.trim());

      setDaftarBuku(hasil.docs || []);

      if (!hasil.docs || hasil.docs.length === 0) {
        setError("Buku tidak ditemukan. Coba kata kunci lain.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data. Periksa internet kamu.");
    } finally {
      setLoading(false);
    }
  };

  const tambahCatatan = () => {
    if (!mataKuliah.trim() || !judul.trim() || !isi.trim()) {
      tampilkanPesan("Semua kolom catatan harus diisi!");
      return;
    }

    const catatanBaru: Catatan = {
      id: Date.now().toString(),
      mataKuliah,
      judul,
      isi,
    };

    setCatatan((dataSebelumnya) => [
      ...dataSebelumnya,
      catatanBaru,
    ]);

    setMataKuliah("");
    setJudul("");
    setIsi("");

    tampilkanPesan("Catatan berhasil ditambahkan!");
  };

  const hapusCatatan = (id: string) => {
    const konfirmasi = () => {
      setCatatan((dataSebelumnya) =>
        dataSebelumnya.filter((item) => item.id !== id)
      );
    };

    if (Platform.OS === "web") {
      if (window.confirm("Apakah kamu yakin ingin menghapus catatan ini?")) {
        konfirmasi();
      }
    } else {
      Alert.alert("Hapus Catatan", "Yakin ingin menghapus catatan ini?", [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: konfirmasi },
      ]);
    }
  };

  const tampilkanCatatan = ({ item }: { item: Catatan }) => (
    <View style={styles.card}>
      <Text style={styles.mataKuliah}>{item.mataKuliah}</Text>
      <Text style={styles.judulCatatan}>{item.judul}</Text>
      <Text style={styles.isiCatatan}>{item.isi}</Text>

      <View style={styles.buttonRow}>
        <Pressable
          style={styles.detailButton}
          onPress={() =>
            router.push({
              pathname: "/detail",
              params: {
                id: item.id,
                mataKuliah: item.mataKuliah,
                judul: item.judul,
                isi: item.isi,
              },
            })
          }
        >
          <Text style={styles.buttonText}>Detail</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => hapusCatatan(item.id)}
        >
          <Text style={styles.buttonText}>Hapus</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={catatan}
      keyExtractor={(item) => item.id}
      renderItem={tampilkanCatatan}
      ListHeaderComponent={
        <View>
          <Text style={styles.header}>Catatan Kuliah</Text>
          <Text style={styles.subHeader}>
            Simpan dan kelola catatan perkuliahanmu.
          </Text>

          <Pressable
            style={styles.guideButton}
            onPress={() => router.push("/explore")}
          >
            <Text style={styles.buttonText}>Panduan Penggunaan</Text>
          </Pressable>

          <Text style={styles.total}>
            Total Catatan: {catatan.length}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tambah Catatan Baru</Text>

            <TextInput
              style={styles.input}
              placeholder="Nama Mata Kuliah"
              value={mataKuliah}
              onChangeText={setMataKuliah}
            />

            <TextInput
              style={styles.input}
              placeholder="Judul Catatan"
              value={judul}
              onChangeText={setJudul}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Isi Catatan"
              value={isi}
              onChangeText={setIsi}
              multiline
            />

            <Pressable
              style={styles.addButton}
              onPress={tambahCatatan}
            >
              <Text style={styles.buttonText}>Simpan Catatan</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Cari Buku dari Open Library
            </Text>

            <Text style={styles.description}>
              Cari buku berdasarkan judul atau topik yang ingin kamu pelajari.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Contoh: Java Programming"
              value={kataKunci}
              onChangeText={setKataKunci}
              onSubmitEditing={cariBuku}
            />

            <Pressable
              style={[styles.searchButton, loading && styles.disabledButton]}
              onPress={cariBuku}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Sedang Mencari..." : "Cari Buku"}
              </Text>
            </Pressable>

            {loading && (
              <Text style={styles.infoText}>Mengambil data dari API...</Text>
            )}

            {!!error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {daftarBuku.length > 0 && (
              <View>
                <Text style={styles.resultTitle}>
                  Hasil Pencarian ({daftarBuku.length} buku)
                </Text>

                {daftarBuku.map((buku) => (
                  <View style={styles.bookCard} key={buku.key}>
                    <Text style={styles.bookTitle}>{buku.title}</Text>

                    <Text style={styles.bookInfo}>
                      Penulis:{" "}
                      {buku.author_name?.join(", ") || "Tidak diketahui"}
                    </Text>

                    <Text style={styles.bookInfo}>
                      Tahun Terbit: {buku.first_publish_year || "Tidak diketahui"}
                    </Text>

                    <Text style={styles.bookInfo}>
                      Jumlah Edisi: {buku.edition_count || "Tidak diketahui"}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <Text style={styles.listTitle}>Daftar Catatan Saya</Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          Belum ada catatan. Silakan tambahkan catatan baru.
        </Text>
      }
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#243B53",
    marginTop: 15,
  },
  subHeader: {
    fontSize: 14,
    color: "#627D98",
    marginTop: 5,
    marginBottom: 15,
  },
  guideButton: {
    backgroundColor: "#486581",
    padding: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#243B53",
    marginVertical: 18,
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#243B53",
    marginBottom: 12,
  },
  description: {
    color: "#627D98",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    color: "#243B53",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#26856B",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButton: {
    backgroundColor: "#3867D6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  infoText: {
    textAlign: "center",
    color: "#3867D6",
    marginTop: 12,
  },
  errorText: {
    color: "#D64545",
    marginTop: 12,
  },
  resultTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#243B53",
    marginTop: 18,
    marginBottom: 10,
  },
  bookCard: {
    backgroundColor: "#F0F4F8",
    padding: 13,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#243B53",
    marginBottom: 6,
  },
  bookInfo: {
    fontSize: 13,
    color: "#486581",
    marginTop: 3,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#243B53",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5EAF0",
  },
  mataKuliah: {
    color: "#26856B",
    fontWeight: "bold",
    fontSize: 13,
  },
  judulCatatan: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#243B53",
    marginTop: 5,
  },
  isiCatatan: {
    color: "#627D98",
    marginTop: 8,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  detailButton: {
    flex: 1,
    backgroundColor: "#3867D6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#D64545",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  emptyText: {
    color: "#627D98",
    textAlign: "center",
    padding: 20,
  },
});
