export interface Pagamento {
  id: number;
  pedidoId: number;
  cliente: string;
  formaPagamento: "Crédito" | "Débito" | "Pix" | "Dinheiro";
  valor: number;
  data: string;
  status: "Aprovado" | "Pendente" | "Cancelado";
}

export const pagamentosMock: Pagamento[] = [
  {
    id: 1,
    pedidoId: 1,
    cliente: "João Silva",
    formaPagamento: "Pix",
    valor: 36.4,
    data: "2025-11-03T12:35:00",
    status: "Aprovado",
  },
  {
    id: 2,
    pedidoId: 2,
    cliente: "Maria Oliveira",
    formaPagamento: "Crédito",
    valor: 45.0,
    data: "2025-11-03T11:25:00",
    status: "Aprovado",
  },
  {
    id: 3,
    pedidoId: 3,
    cliente: "Carlos Souza",
    formaPagamento: "Dinheiro",
    valor: 16.0,
    data: "2025-11-02T19:20:00",
    status: "Pendente",
  },
];
