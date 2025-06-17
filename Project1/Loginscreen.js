import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function LoginScreen({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleAuth = () => {
    if (isLogin) {
      const user = registeredUsers.find(
        user => user.email === email && user.password === password
      );
      if (user) {
        onLoginSuccess(user.email, user.username);
      } else {
        const userExists = registeredUsers.find(user => user.email === email);
        if (userExists) {
          Alert.alert('Password salah', 'Silakan periksa kembali password Anda');
        } else {
          Alert.alert('Akun belum terdaftar', 'Silakan daftar terlebih dahulu');
        }
      }
    } else {
      if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Semua kolom harus diisi');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Password tidak cocok');
        return;
      }

      const emailExists = registeredUsers.find(user => user.email === email);
      if (emailExists) {
        Alert.alert('Email sudah terdaftar', 'Silakan gunakan email lain');
        return;
      }

      const newUser = { username, email, password };
      setRegisteredUsers([...registeredUsers, newUser]);
      Alert.alert('Berhasil mendaftar', 'Silakan login dengan akun Anda');
      setIsLogin(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <View style={styles.formBox}>
          <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>

          {!isLogin && (
            <TextInput
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          )}

          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          {!isLogin && (
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
          </TouchableOpacity>

          {isLogin && (
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Reset Password', 'Fitur reset password akan diimplementasikan.')
              }>
              <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              setIsLogin(!isLogin);
              setUsername('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}>
            <Text style={styles.switchText}>
              {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  formBox: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 50,
    backgroundColor: '#2c2c2e',
    color: '#fff',
    borderColor: '#3a3a3c',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  switchText: {
    color: '#4faaff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
