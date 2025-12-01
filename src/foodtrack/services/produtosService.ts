import { getApi } from './api';
const api = getApi('produtos');

export interface Produto {
  idProduto: number;
  nome: string;
  precoUnitario: number;
  estacao: string;
}

export const getProdutos = async (): Promise<Produto[]> => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('Detalhes:', error.response.status, error.response.data);
    }
    else {
      console.log('Erro sem resposta:', error);
    }
    
    throw error;
  }
};

export const getProdutoById = async (id: number): Promise<Produto> => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const criarProduto = async (produto: Produto) => {
  const response = await api.post('/', produto);
  return response.data;
};

export const updateProduto = async (id: number, produto: Produto) => {
  const response = await api.put(`/${id}`, produto);
  return response.data;
};

export const deleteProduto = async (id: number) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
