export interface ItemPedido {
  idProduto: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  estacao?: "Chapa" | "Fritadeira" | "Forno" | "Bebidas";
  status?: "Pendente" | "Pronto" | "Cancelado";
}

export type StatusPedido = "Pendente" | "Pronto" | "Cancelado" | "Pago";
export type FormaPagamento = "Pix" | "Cartão" | "Dinheiro";

export interface Pedido {
  idPedido: number;
  numeroMesa: number;
  comanda: string;
  itens: ItemPedido[];
  valorTotal: number;
  status: StatusPedido;
  formaPagamento?: FormaPagamento;
  observacao?: string;
  data: Date;
}

const hoje = new Date();

export const pedidosMock: Pedido[] = [
  {
    idPedido: 1,
    numeroMesa: 5,
    comanda: "Jéssica",
    itens: [
      { idProduto: 1, nome: "X-Burger", precoUnitario: 25, quantidade: 2, estacao: "Chapa", status: "Pronto" },
      { idProduto: 2, nome: "Refrigerante", precoUnitario: 6, quantidade: 2, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 62,
    formaPagamento: "Pix",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 1),
  },
  {
    idPedido: 2,
    numeroMesa: 3,
    comanda: "Ricardo",
    itens: [
      { idProduto: 3, nome: "Pizza Calabresa", precoUnitario: 45, quantidade: 1, estacao: "Forno", status: "Pronto" },
      { idProduto: 4, nome: "Suco Natural", precoUnitario: 8, quantidade: 2, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 61,
    formaPagamento: "Cartão",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 2),
  },
  {
    idPedido: 3,
    numeroMesa: 1,
    comanda: "Thiago",
    itens: [
      { idProduto: 5, nome: "Porção de Batata", precoUnitario: 28, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
      { idProduto: 6, nome: "Cerveja", precoUnitario: 10, quantidade: 3, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 58,
    formaPagamento: "Dinheiro",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 3),
  },
  {
    idPedido: 4,
    numeroMesa: 7,
    comanda: "Andressa",
    itens: [
      { idProduto: 7, nome: "X-Salada", precoUnitario: 27, quantidade: 1, estacao: "Chapa", status: "Pronto" },
      { idProduto: 8, nome: "Refrigerante", precoUnitario: 6, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 33,
    formaPagamento: "Pix",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 4),
  },
  {
    idPedido: 5,
    numeroMesa: 4,
    comanda: "Andressa",
    itens: [
      { idProduto: 9, nome: "Pizza Portuguesa", precoUnitario: 52, quantidade: 1, estacao: "Forno", status: "Pronto" },
    ],
    valorTotal: 52,
    formaPagamento: "Cartão",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 5),
  },
  {
    idPedido: 6,
    numeroMesa: 9,
    comanda: "Andressa",
    itens: [
      { idProduto: 10, nome: "X-Bacon", precoUnitario: 30, quantidade: 2, estacao: "Chapa", status: "Pronto" },
      { idProduto: 11, nome: "Suco Natural", precoUnitario: 8, quantidade: 2, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 76,
    formaPagamento: "Dinheiro",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 6),
  },
  {
    idPedido: 7,
    numeroMesa: 2,
    comanda: "Andressa",
    itens: [
      { idProduto: 12, nome: "Hot Dog", precoUnitario: 18, quantidade: 3, estacao: "Chapa", status: "Pronto" },
      { idProduto: 13, nome: "Suco Natural", precoUnitario: 8, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 62,
    formaPagamento: "Cartão",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 7),
  },
  {
    idPedido: 8,
    numeroMesa: 10,
    comanda: "Andressa",
    itens: [
      { idProduto: 14, nome: "Porção de Calabresa", precoUnitario: 35, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
      { idProduto: 15, nome: "Cerveja", precoUnitario: 10, quantidade: 2, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 55,
    formaPagamento: "Pix",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 8),
  },
  {
    idPedido: 9,
    numeroMesa: 6,
    comanda: "Gabriel",
    itens: [
      { idProduto: 16, nome: "X-Burger", precoUnitario: 25, quantidade: 1, estacao: "Chapa", status: "Pronto" },
      { idProduto: 17, nome: "Batata Frita", precoUnitario: 20, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
    ],
    valorTotal: 45,
    formaPagamento: "Cartão",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 9),
  },
  {
    idPedido: 10,
    numeroMesa: 8,
    comanda: "Thais",
    itens: [
      { idProduto: 18, nome: "Pizza 4 Queijos", precoUnitario: 50, quantidade: 1, estacao: "Forno", status: "Pronto" },
      { idProduto: 19, nome: "Cerveja", precoUnitario: 10, quantidade: 2, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 70,
    formaPagamento: "Pix",
    status: "Pago",
    data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 10),
  },
];
