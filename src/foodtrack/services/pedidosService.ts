import { getApi } from './api';

const api = getApi('pedidos');

export interface Pedido {
  id: number;
  cliente: string;
  produto: string;
  quantidade: number;
  status: string;
}

export const getPedidos = async (): Promise<Pedido[]> => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('Detalhes:', error.response.status, error.response.data);
    }
    else {
      console.log('Erro sem resposta (provável network):', error);
    }
    
    throw error;
  }
};

export const addPedido = async (func: Pedido) => {
  const response = await api.post('/', func);
  return response.data;
};

export const updatePedido = async (id: number, func: Pedido) => {
  const response = await api.put(`/${id}`, func);
  return response.data;
};

export const deletePedido = async (id: number) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
