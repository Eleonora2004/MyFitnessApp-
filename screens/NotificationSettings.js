import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function NotificationSettings() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check existing permissions on mount
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setIsEnabled(status === 'granted');
    })();
  }, []);

  const toggleSwitch = async () => {
    if (isEnabled) {
      Alert.alert('Notifications', 'Notifications disabled (simulate)');
      setIsEnabled(false);
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        Alert.alert('Notifications', 'Notifications enabled');
        setIsEnabled(true);
      } else {
        Alert.alert('Notifications', 'Permission denied');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
      <View style={styles.settingItem}>
        <Text>Enable Notifications</Text>
        <Switch onValueChange={toggleSwitch} value={isEnabled} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
