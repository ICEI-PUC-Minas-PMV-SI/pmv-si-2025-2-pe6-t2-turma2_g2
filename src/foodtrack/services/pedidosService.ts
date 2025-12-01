import * as Notifications from "expo-notifications";
import { getApi } from './api';

const api = getApi('pedidos');

export interface ItemPedido {
  idProduto: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  estacao: string;
  status: string;
}

export interface Pedido {
  idPedido: number;
  numeroMesa: number;
  comanda: string;
  numeroComanda: number;
  valorTotal: number;
  status: string;
  formaPagamento?: string;
  observacao?: string;
  data: Date;
}

export type StatusPedido = "Pendente" | "Pronto" | "Cancelado" | "Pago";
export type FormaPagamento = "Pix" | "Cartão" | "Dinheiro";

export const getPedidos = async () => {
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

export const getItensByPedido = async (pedidoId: number) => {
  try {
    const response = await api.get(`/itemPedido/${pedidoId}`);
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

export const getPedidoById = async (pedidoId: number) => {
  try {
    const response = await api.get(`/${pedidoId}`);
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

export async function criarPedido(novoPedido: Pedido): Promise<Pedido> {
  const response = await api.post('/', novoPedido);
  return response.data;
};

export async function updatePedido(id: number, data: Pedido): Promise<Pedido | null> {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

export const updateItemPedido = async (
  idPedido: number,
  idProduto: number,
  status: "Pendente" | "Pronto" | "Cancelado"
) => {
};

async function enviarNotificacaoPedidoPronto(pedido: any) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🍽 Pedido pronto!",
      body: `Mesa - ${pedido.numeroMesa} / Comanda - ${pedido.comanda} #${pedido.numeroComanda} está pronto.`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: null,
  });
}

export const cancelarPedido = async (idPedido: number) => {
  try {    
    const response = await api.post('/cancelar', idPedido);
    return response.data;
  } catch (err) {
    console.error("Erro ao cancelar pedido:", err);
  }
};
