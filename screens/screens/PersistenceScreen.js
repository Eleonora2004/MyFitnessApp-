import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PersistenceScreen() {
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');

  // Load stored data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem('user_name');
        if (value !== null) {
          setStoredName(value);
        }
      } catch (e) {
        Alert.alert('Error', 'Failed to load data');
      }
    };
    loadData();
  }, []);

  const saveName = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }
    try {
      await AsyncStorage.setItem('user_name', name);
      setStoredName(name);
      Alert.alert('Success', 'Name saved!');
      setName('');
    } catch (e) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Type your name here"
        onChangeText={setName}
      />
      <Button title="Save Name" onPress={saveName} />
      
      <View style={styles.storedDataContainer}>
        <Text style={styles.storedLabel}>Stored Name (from local storage):</Text>
        <Text style={styles.storedValue}>{storedName || 'No name stored yet'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 6 },
  storedDataContainer: { marginTop: 30, alignItems: 'center' },
  storedLabel: { fontSize: 16, fontWeight: 'bold' },
  storedValue: { fontSize: 18, marginTop: 5, color: '#333' },
});
