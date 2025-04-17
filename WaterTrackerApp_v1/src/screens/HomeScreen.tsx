import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }: any) {
  const [totalWater, setTotalWater] = useState(0);
  const [email, setEmail] = useState('');

  const fetchTotalWater = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (!userId) return;
      const response = await axios.get(`http://192.168.1.111/WaterTrackerApp/api/get_daily_water.php?user_id=${userId}`);
      if (response.data.success) {
        setTotalWater(response.data.total);
      } else {
        setTotalWater(0);
      }
    } catch (error) {
      console.error('Su verisi alınamadı', error);
    }
  };

  const fetchEmail = async () => {
    const storedEmail = await AsyncStorage.getItem('user_email');
    if (storedEmail) setEmail(storedEmail);
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['user_id', 'user_email']);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  useFocusEffect(
    useCallback(() => {
      fetchTotalWater();
      fetchEmail();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz!</Text>
      {email ? <Text style={styles.email}>Giriş yapan: {email}</Text> : null}
      <Text style={styles.waterText}>Bugün içtiğiniz toplam su: {totalWater} ml</Text>
      <Button
        title="Su Ekle"
        onPress={async () => {
          await navigation.navigate('AddWater');
          fetchTotalWater();
        }}
      />
      <Button title="Çıkış Yap" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, marginBottom: 10, fontWeight: 'bold', color: '#000' },
  email: { fontSize: 16, marginBottom: 10, color: '#555' },
  waterText: { fontSize: 18, marginBottom: 30, color: '#000' },
});
