import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

function DashboardApp({ userEmail, onLogout }) {
  const [screen, setScreen] = useState('main'); // 'main' | 'mahasiswa' | 'dosen'
  const [mahasiswa, setMahasiswa] = useState([
    {
      id: '1',
      nim: '17042001',
      nama: 'Shin Ryu-Jin',
      jurusan: 'ITZY',
      fakultas: 'JYP Entertaiment',
    },
    {
      id: '2',
      nim: '01021997',
      nama: 'jihyo',
      jurusan: 'Twice',
      fakultas: 'JYP Entertaiment',
    },
    {
      id: '3',
      nim: '01091997',
      nama: 'Jeon Jung-kook',
      jurusan: 'BTS',
      fakultas: 'SM Entertaiment',
    },
  ]);

const [dosen, setDosen] = useState([
  {
    id: '1',
    nidn: '001234567',
    nama: 'Dr. Rudi Hartono',
    fakultas: 'Teknik',
  },
  {
    id: '2',
    nidn: '008765432',
    nama: 'Prof. Siti Aminah',
    fakultas: 'Ilmu Komputer',
  },
  {
    id: '3',
    nidn: '003456789',
    nama: 'Ir. Bambang Triyono',
    fakultas: 'Teknik',
  },
]);

// Tambahkan state untuk form dosen
const [formDosen, setFormDosen] = useState({
  nidn: '',
  nama: '',
  fakultas: '',
});

  const [formData, setFormData] = useState({
    nim: '',
    nama: '',
    jurusan: '',
    fakultas: '',
  });

  const handleAddMahasiswa = () => {
    if (formData.nim && formData.nama && formData.jurusan && formData.fakultas) {
      const newMahasiswa = {
        id: (mahasiswa.length + 1).toString(),
        ...formData,
      };
      setMahasiswa([...mahasiswa, newMahasiswa]);
      setFormData({ nim: '', nama: '', jurusan: '', fakultas: '' });
    }
  };
// Fungsi untuk menambahkan dosen
  const handleAddDosen = () => {
    if (formDosen.nidn && formDosen.nama && formDosen.fakultas) {
    const newDosen = {
      id: (dosen.length + 1).toString(),
      ...formDosen,
     };
    setDosen([...dosen, newDosen]);
    setFormDosen({ nidn: '', nama: '', fakultas: '' });
     }
   };
  
  const renderMainDashboard = () => (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userEmail) }}
          style={styles.avatar}
        />
        <Text style={styles.welcomeText}>👋 Selamat Datang</Text>
        <Text style={styles.userText}>{userEmail}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007bff' }]}
          onPress={() => setScreen('mahasiswa')}>
          <Text style={styles.buttonText}>Dashboard Mahasiswa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#28a745' }]}
          onPress={() => setScreen('dosen')}>
          <Text style={styles.buttonText}>Dashboard Dosen</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMahasiswaItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>NIM: {item.nim}</Text>
      <Text style={styles.itemText}>Nama: {item.nama}</Text>
      <Text style={styles.itemText}>Jurusan: {item.jurusan}</Text>
      <Text style={styles.itemText}>Fakultas: {item.fakultas}</Text>
    </View>
  );

  const renderDosenItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>NIDN: {item.nidn}</Text>
      <Text style={styles.itemText}>Nama: {item.nama}</Text>
      <Text style={styles.itemText}>Fakultas: {item.fakultas}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        {screen === 'main' && renderMainDashboard()}

        {screen === 'mahasiswa' && (
          <ScrollView>
            <Text style={styles.title}>Daftar Mahasiswa</Text>
            <FlatList
              data={mahasiswa}
              keyExtractor={(item) => item.id}
              renderItem={renderMahasiswaItem}
              style={{ width: '100%' }}
            />

            <Text style={[styles.title, { fontSize: 20 }]}>Tambah Mahasiswa</Text>
            <TextInput
              style={styles.input}
              placeholder="NIM"
              placeholderTextColor="#888"
              value={formData.nim}
              onChangeText={(text) => setFormData({ ...formData, nim: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Nama"
              placeholderTextColor="#888"
              value={formData.nama}
              onChangeText={(text) => setFormData({ ...formData, nama: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Jurusan"
              placeholderTextColor="#888"
              value={formData.jurusan}
              onChangeText={(text) => setFormData({ ...formData, jurusan: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Fakultas"
              placeholderTextColor="#888"
              value={formData.fakultas}
              onChangeText={(text) => setFormData({ ...formData, fakultas: text })}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#17a2b8', marginTop: 12 }]}
              onPress={handleAddMahasiswa}>
              <Text style={styles.buttonText}>Tambah</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { marginTop: 16 }]}
              onPress={() => setScreen('main')}>
              <Text style={styles.buttonText}>Kembali</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

{screen === 'dosen' && (
  <ScrollView>
    <Text style={styles.title}>Daftar Dosen</Text>
    <FlatList
      data={dosen}
      keyExtractor={(item) => item.id}
      renderItem={renderDosenItem}
      style={{ width: '100%' }}
    />

    <Text style={[styles.title, { fontSize: 20 }]}>Tambah Dosen</Text>
    <TextInput
      style={styles.input}
      placeholder="NIDN"
      placeholderTextColor="#888"
      value={formDosen.nidn}
      onChangeText={(text) => setFormDosen({ ...formDosen, nidn: text })}
    />
    <TextInput
      style={styles.input}
      placeholder="Nama"
      placeholderTextColor="#888"
      value={formDosen.nama}
      onChangeText={(text) => setFormDosen({ ...formDosen, nama: text })}
    />
    <TextInput
      style={styles.input}
      placeholder="Fakultas"
      placeholderTextColor="#888"
      value={formDosen.fakultas}
      onChangeText={(text) => setFormDosen({ ...formDosen, fakultas: text })}
    />
    <TouchableOpacity
      style={[styles.button, { backgroundColor: '#ffc107', marginTop: 12 }]}
      onPress={handleAddDosen}>
      <Text style={styles.buttonText}>Tambah</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.button, { marginTop: 16 }]}
      onPress={() => setScreen('main')}>
      <Text style={styles.buttonText}>Kembali</Text>
    </TouchableOpacity>
  </ScrollView>
)}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userText: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  bottomArea: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 4,
  },
  logoutButton: {
    alignSelf: 'center',
    width: '60%',
    marginHorizontal: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  listItem: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
});

export default DashboardApp;
