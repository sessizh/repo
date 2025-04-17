import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    try {
      const response = await axios.post('http://192.168.1.111/WaterTrackerApp/api/register.php', {
        email,
        password,
      });
      if (response.data.success) {
        Alert.alert('Kayıt Başarılı', response.data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Kayıt Başarısız', response.data.message || 'Bir hata oluştu');
      }
    } catch (error) {
      Alert.alert('Sunucu Hatası', 'API\'ye ulaşılamadı.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput style={styles.input} placeholder="E-posta" placeholderTextColor="#888" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Şifre" placeholderTextColor="#888" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Kayıt Ol" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, color: '#000' },
});