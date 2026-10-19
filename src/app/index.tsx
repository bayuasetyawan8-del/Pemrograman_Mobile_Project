import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

interface Catatan {
  id: string;
  mataKuliah: string;
  judul: string;
  isi: string;
}

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

  const [jumlahCatatan, setJumlahCatatan] = useState(
  catatan.length
);

useEffect(() => {
  setJumlahCatatan(catatan.length);
}, [catatan]);

  // Menampilkan pesan yang sesuai untuk web dan Android.
  const tampilkanPesan = (judulPesan: string, pesan: string) => {
    if (Platform.OS === "web") {
      window.alert(`${judulPesan}\n\n${pesan}`);
    } else {
      Alert.alert(judulPesan, pesan);
    }
  };

  // Menambahkan catatan baru.
  const tambahCatatan = () => {
    if (
      !mataKuliah.trim() ||
      !judul.trim() ||
      !isi.trim()
    ) {
      tampilkanPesan(
        "Peringatan",
        "Semua bagian harus diisi."
      );
      return;
    }

    const catatanBaru: Catatan = {
      id: Date.now().toString(),
      mataKuliah: mataKuliah.trim(),
      judul: judul.trim(),
      isi: isi.trim(),
    };

    setCatatan((dataLama) => [
      ...dataLama,
      catatanBaru,
    ]);

    setMataKuliah("");
    setJudul("");
    setIsi("");

    tampilkanPesan(
      "Berhasil",
      "Catatan berhasil ditambahkan."
    );
  };

  // Menghapus catatan setelah mendapatkan konfirmasi.
  const hapusCatatan = (id: string) => {
    const prosesHapus = () => {
      setCatatan((dataLama) =>
        dataLama.filter((item) => item.id !== id)
      );
    };

    if (Platform.OS === "web") {
      const yakin = window.confirm(
        "Yakin ingin menghapus catatan ini?"
      );

      if (yakin) {
        prosesHapus();
      }

      return;
    }

    Alert.alert(
      "Hapus Catatan",
      "Yakin ingin menghapus catatan ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: prosesHapus,
        },
      ]
    );
  };

  // Menampilkan setiap catatan beserta tombol aksinya.
  const tampilkanCatatan = ({
    item,
  }: {
    item: Catatan;
  }) => (
    <View style={styles.card}>
      <Text style={styles.mataKuliah}>
        {item.mataKuliah}
      </Text>

      <Text style={styles.judul}>
        {item.judul}
      </Text>

      <Text style={styles.isi}>
        {item.isi}
      </Text>

      <View style={styles.tombolBaris}>
        <Pressable
          style={styles.tombolDetail}
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
          <Text style={styles.textTombol}>
            Lihat Detail
          </Text>
        </Pressable>

        <Pressable
          style={styles.tombolHapus}
          onPress={() => hapusCatatan(item.id)}
        >
          <Text style={styles.textTombol}>
            Hapus
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={catatan}
      renderItem={tampilkanCatatan}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <>
          <Text style={styles.header}>
            Catatan Kuliah
          </Text>

          <Text style={styles.subHeader}>
            Simpan catatan kuliahmu di sini
          </Text>

        <Pressable
            style={styles.tombolPanduan}
            onPress={() => router.push("/explore")}>

          <Text style={styles.textTombolPanduan}>
            Panduan Penggunaan
          </Text>
        </Pressable>

          <Text style={styles.info}>
            Total catatan: {jumlahCatatan}
          </Text>

          <Text style={styles.label}>
            Mata Kuliah
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: Pemrograman Mobile"
            value={mataKuliah}
            onChangeText={setMataKuliah}
          />

          <Text style={styles.label}>
            Judul Catatan
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: Belajar React Native"
            value={judul}
            onChangeText={setJudul}
          />

          <Text style={styles.label}>
            Isi Catatan
          </Text>

          <TextInput
            style={[styles.input, styles.inputIsi]}
            placeholder="Tulis catatanmu di sini..."
            value={isi}
            onChangeText={setIsi}
            multiline
          />

          <Pressable
            style={styles.tombolTambah}
            onPress={tambahCatatan}
          >
            <Text style={styles.textTombol}>
              + Simpan Catatan
            </Text>
          </Pressable>

          <Text style={styles.daftar}>
            Daftar Catatan
          </Text>
        </>
      }
      ListEmptyComponent={
        <Text style={styles.kosong}>
          Belum ada catatan. Silakan tambahkan catatan baru.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 32,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subHeader: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5,
  },
  info: {
    fontSize: 14,
    color: "#2563EB",
    marginTop: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#111827",
  },
  inputIsi: {
    height: 75,
    textAlignVertical: "top",
  },
  tombolTambah: {
    backgroundColor: "#2563EB",
    padding: 13,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },
  textTombol: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  daftar: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  mataKuliah: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "bold",
  },
  judul: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 5,
  },
  isi: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 8,
    lineHeight: 20,
  },
  tombolBaris: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  tombolDetail: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  tombolHapus: {
    backgroundColor: "#EF4444",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  kosong: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 20,
  },

  tombolPanduan: {
  alignSelf: "flex-start",
  backgroundColor: "#DBEAFE",
  paddingVertical: 9,
  paddingHorizontal: 12,
  borderRadius: 8,
  marginTop: 12,
},
textTombolPanduan: {
  color: "#1D4ED8",
  fontWeight: "bold",
  fontSize: 13,
},
});
