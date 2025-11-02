import AsyncStorage from '@react-native-async-storage/async-storage';

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
