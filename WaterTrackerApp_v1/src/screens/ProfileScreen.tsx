import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ navigation }: any) {
  const [email, setEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const fetchUserData = async () => {
    const storedEmail = await AsyncStorage.getItem('user_email');
    const storedUserId = await AsyncStorage.getItem('user_id');
    if (storedEmail) setEmail(storedEmail);
    if (storedUserId) setUserId(storedUserId);
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['user_id', 'user_email']);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Bilgileriniz</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email}</Text>
      <Text style={styles.label}>Kullanıcı ID:</Text>
      <Text style={styles.value}>{userId}</Text>
      <Button title="Çıkış Yap" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#111827'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },
});
