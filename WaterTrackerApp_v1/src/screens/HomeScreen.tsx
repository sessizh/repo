import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WaterEntry {
  amount: number;
  created_at: string;
}

export default function HomeScreen({ navigation }: any) {
  const [totalWater, setTotalWater] = useState(0);
  const [email, setEmail] = useState('');
  const [lastWaters, setLastWaters] = useState<WaterEntry[]>([]);

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

  const fetchLastWaters = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (!userId) return;
      const response = await axios.get(`http://192.168.1.111/WaterTrackerApp/api/get_last_10_water.php?user_id=${userId}`);
      if (response.data.success) {
        setLastWaters(response.data.data);
      }
    } catch (error) {
      console.error('Son su kayıtları alınamadı', error);
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
      fetchLastWaters();
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
          fetchLastWaters();
        }}
      />
      <Button title="Çıkış Yap" onPress={handleLogout} color="red" />

      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.profileButtonText}>Profilimi Gör</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Son 10 Su Kaydı</Text>
      <FlatList
        data={lastWaters}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.amount} ml - {new Date(item.created_at).toLocaleString()}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, marginBottom: 10, fontWeight: 'bold', color: '#000' },
  email: { fontSize: 16, marginBottom: 10, color: '#555' },
  waterText: { fontSize: 18, marginBottom: 20, color: '#000' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#000' },
  listItem: { fontSize: 16, marginBottom: 5, color: '#333' },
  profileButton: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
