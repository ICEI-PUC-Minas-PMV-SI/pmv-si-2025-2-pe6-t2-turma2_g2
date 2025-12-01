import { AuthProvider } from "@/context/authContext";
//import { initPedidos } from "@/services/pedidosService";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    //initPedidos();
    async function registerForPushNotifications() {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus === "granted") {
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          setExpoPushToken(token);
          console.log("Expo Push Token:", token);
        }
      }
    }

    registerForPushNotifications();
  }, []);

  return (
    <AuthProvider>
        <Slot />
    </AuthProvider>
  );
}
