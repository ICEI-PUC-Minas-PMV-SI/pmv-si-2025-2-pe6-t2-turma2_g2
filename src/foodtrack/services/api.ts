import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';

export const API_URLS = {
  autenticacao: 'http://192.168.1.8:5180/api/autenticacao',
  funcionarios: 'http://192.168.1.8:5099/api/funcionario',
  produtos: 'http://192.168.1.8:5203/api/produto',
  pedidos: 'http://192.168.1.8:5013/api/pedido'
};

export function getApi(service: keyof typeof API_URLS): AxiosInstance {
  const api = axios.create({
    baseURL: API_URLS[service],
    timeout: 10000,
  });

  api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.log('Detalhes do erro:', error.response.status, error.response.data);
      } else {
        console.log('Erro sem resposta:', error);
      }
      return Promise.reject(error);
    }
  );

  return api;
}
