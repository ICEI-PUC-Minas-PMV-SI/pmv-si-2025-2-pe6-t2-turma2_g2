import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from "expo-notifications";

export async function isAuthenticated() {
  const token = await AsyncStorage.getItem('token');
  return !!token;
}

export async function saveToken(token: string) {
  await AsyncStorage.setItem('token', token);
}

export async function logout() {
  await AsyncStorage.removeItem('token');
}

export const registrarPushToken = async () => {
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  salvarPushToken(token);
};

export const salvarPushToken = async (token: string) => {
  await AsyncStorage.setItem("token-push", token);
};

export const carregarPushToken = async (): Promise<string | null> => {
  const token = await AsyncStorage.getItem("token-push");
  return token;
};
