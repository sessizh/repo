import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    try {
      const response = await axios.post('http://192.168.1.111/WaterTrackerApp/api/login.php', {
        email,
        password,
      });

      const data = response.data;
      console.log('Login response:', data);

      if (data.success === true && data.user_id) {
        await AsyncStorage.setItem('user_id', data.user_id.toString());
        await AsyncStorage.setItem('user_email', email);
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else if (data.success === false) {
        Alert.alert('Giriş Başarısız', data.message || 'Geçersiz e-posta veya şifre.');
      } else {
        Alert.alert('Hata', 'Beklenmeyen bir cevap alındı.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Sunucu Hatası', 'Sunucuya bağlanılamadı.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Hesabınız yok mu? Kayıt olun
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, color: '#000' },
  link: { marginTop: 15, textAlign: 'center', color: 'blue' },
});
