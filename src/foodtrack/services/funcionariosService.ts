import { getApi } from './api';
const api = getApi('funcionarios');

export interface Funcionario {
  idFuncionario?: number;
  nome: string;
  usuario: string;
  senha: string;
  funcao: string;
}

export const getFuncionarios = async (): Promise<Funcionario[]> => {
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

export const getByUsername = async (login: string): Promise<Funcionario> => {
  try {
    const response = await api.get(`login/${login}`);
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

export const addFuncionario = async (func: Funcionario) => {
  const response = await api.post('/', func);
  return response.data;
};

export const updateFuncionario = async (id: number, func: Funcionario) => {
  const response = await api.put(`/${id}`, func);
  return response.data;
};

export const deleteFuncionario = async (id: number) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
