import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WaterAddScreen({ navigation }: any) {
  const [waterAmount, setWaterAmount] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loadUserId = async () => {
      const storedId = await AsyncStorage.getItem('user_id');
      if (storedId) setUserId(storedId);
    };
    loadUserId();
  }, []);

  const handleAdd = async () => {
    if (waterAmount === '') {
      Alert.alert('Hata', 'Lütfen miktar girin');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.111/WaterTrackerApp/api/add_water.php', {
        user_id: parseInt(userId),
        amount: parseInt(waterAmount),
      });

      if (response.data.success) {
        Alert.alert('Başarılı', `${waterAmount} ml su eklendi.`, [
          {
            text: 'Tamam',
            onPress: () => navigation.goBack(),
          },
        ]);
        setWaterAmount('');
      } else {
        Alert.alert('Hata', response.data.message);
      }
    } catch (error) {
      Alert.alert('Sunucu Hatası', 'API\'ye ulaşılamadı.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Su Ekle</Text>
      <TextInput
        style={styles.input}
        placeholder="İçtiğiniz su miktarı (ml)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={waterAmount}
        onChangeText={setWaterAmount}
      />
      <Button title="Ekle" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, color: '#000' },
});