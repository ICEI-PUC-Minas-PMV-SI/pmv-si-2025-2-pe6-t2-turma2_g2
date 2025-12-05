import { AuthProvider } from "@/context/authContext";
import { initPedidos } from "@/mocks/services/pedidosService";
import Constants from 'expo-constants';
import * as Notifications from "expo-notifications";
import { Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    initPedidos();
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token ?? ""));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    const isEmulatorAndroid = Platform.OS === 'android' && !Constants.isDevice;

    if (isEmulatorAndroid) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permissão de notificações negada!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);
    } else {
      console.log('Use um dispositivo físico ou emulador com Development Build');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    return token;
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
