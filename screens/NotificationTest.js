import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function NotificationTest() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      status = newStatus;
    }
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Failed to get push token for notifications!');
      return;
    }
  }

  const triggerNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: 'This is a test notification alert!',
        sound: true,
      },
      trigger: null, // immediately
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Send Test Notification" onPress={triggerNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
});
 
