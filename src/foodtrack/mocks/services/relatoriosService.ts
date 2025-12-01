import { getApi } from './api';

const api = getApi('relatorios');

export interface RelatorioVenda {
  id: number;
  garcom: string;
  comandas: string;
  quantidade: string;
  receita: string;
  tiqueteMedio: string;
  produto: string;
  detalhes: string;
}

export const getRelatorio = async (): Promise<RelatorioVenda[]> => {
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
