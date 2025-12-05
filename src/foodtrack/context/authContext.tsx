import { API_URLS } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import '../firebase.ts';

interface AuthContextData {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  token: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) setToken(storedToken);
      setLoading(false);
    };
    loadToken();

    AsyncStorage.getItem('@expoPushToken').then(storedToken => {
      if (storedToken) setExpoPushToken(storedToken);
    });

  }, []);

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync().then(token => {
        setExpoPushToken(token ?? '');
        if (token) {
          AsyncStorage.setItem('@expoPushToken', token);

          fetch('http://localhost:5000/push/save-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user, token }),
          })
          .then(res => res.json())
          .then(console.log)
          .catch(console.error);
        }
      });
    }
  }, [user]);

  const login = async (usuario: string, senha: string) => {
    try {
      const response = await axios.post(`${API_URLS.autenticacao}/login`, { usuario, senha });

      if (!response.data.token) {
        throw new Error('Token não recebido');
      }

      setUser(usuario);
      setToken(response.data.token);
      await AsyncStorage.setItem('token', response.data.token);
    } catch (err: any) {
      throw new Error(err?.response?.data?.mensagem || 'Erro ao autenticar');
    }
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token');
    setUser('');
    setExpoPushToken('');
    AsyncStorage.removeItem('@expoPushToken');
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

let currentToken: string | null = null;

export function setToken(token: string) {
  currentToken = token;
}

export function getToken() {
  return currentToken;
}

export const useAuth = () => useContext(AuthContext);

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permissão de notificações negada!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
  } else {
    Alert.alert('Use um dispositivo físico ou emulador com Development Build');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}
