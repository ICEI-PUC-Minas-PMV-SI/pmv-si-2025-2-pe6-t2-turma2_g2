import { API_URLS } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) setToken(storedToken);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (usuario: string, senha: string) => {
    try {
      const response = await axios.post(`${API_URLS.autenticacao}/login`, { usuario, senha });

      if (!response.data.token) {
        throw new Error('Token não recebido');
      }

      setToken(response.data.token);
      await AsyncStorage.setItem('token', response.data.token);
    } catch (err: any) {
      throw new Error(err?.response?.data?.mensagem || 'Erro ao autenticar');
    }
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token');
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
