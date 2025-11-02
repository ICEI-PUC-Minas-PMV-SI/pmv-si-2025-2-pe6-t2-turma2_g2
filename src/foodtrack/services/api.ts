import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';

export const API_URLS = {
  autenticacao: 'http://192.168.1.4:5180/api/autenticacao',
  funcionarios: 'http://192.168.1.4:5099/api/funcionario',
  pedidos: 'http://192.168.1.4:5013/api/pedido',
  mesa: 'http://192.168.1.4:5015/api/mesa',
  pagamentos: 'http://192.168.1.4:5157/api/pagamento',
  kds: 'http://192.168.1.4:5157/api/kds',
  prato: 'http://192.168.1.4:5014/api/prato',
  relatorios: 'http://192.168.1.4:5093/api/funcionario',
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
