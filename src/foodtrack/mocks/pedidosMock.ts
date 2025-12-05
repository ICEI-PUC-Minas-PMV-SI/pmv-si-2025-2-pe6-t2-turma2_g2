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
  numeroComanda: number;
  itens: ItemPedido[];
  valorTotal: number;
  status: StatusPedido;
  formaPagamento?: FormaPagamento;
  observacao?: string;
  data: Date;
}

export interface ItemPedidoRelatorio {
  idProduto: number;
  nome: string;
  quantidade: number;
  data: Date;
}

const hoje = new Date();

export const pedidosMock: Pedido[] = [
  {
    idPedido: 1,
    numeroMesa: 1,
    comanda: "Jéssica",
    numeroComanda: 1,
    itens: [
      { idProduto: 1, nome: "Hambúrguer Artesanal", precoUnitario: 25.90, quantidade: 2, estacao: "Chapa", status: "Pronto" },
      { idProduto: 18, nome: "Refrigerante Lata", precoUnitario: 6.00, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 57.80,
    formaPagamento: "Pix",
    status: "Pago",
    data: new Date(2025, 11, 1, 0, 0, 0, 0),
  },
  {
    idPedido: 2,
    numeroMesa: 2,
    comanda: "Carlos",
    numeroComanda: 2,
    itens: [
      { idProduto: 11, nome: "Pizza Marguerita", precoUnitario: 45.00, quantidade: 1, estacao: "Forno", status: "Pronto" },
      { idProduto: 16, nome: "Suco Natural", precoUnitario: 8.75, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 53.75,
    formaPagamento: "Cartão",
    status: "Pago",
    data: new Date(2025, 11, 1, 0, 0, 0, 0),
  },
  {
    idPedido: 3,
    numeroMesa: 3,
    comanda: "Marcos",
    numeroComanda: 3,
    itens: [
      { idProduto: 3, nome: "Cheeseburger", precoUnitario: 22.50, quantidade: 1, estacao: "Chapa", status: "Pronto" },
      { idProduto: 6, nome: "Batata Frita", precoUnitario: 10.50, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
      { idProduto: 18, nome: "Refrigerante Lata", precoUnitario: 6.00, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 39.00,
    formaPagamento: "Dinheiro",
    status: "Pago",
    data: new Date(2025, 11, 1, 0, 0, 0, 0),
  },
  {
    idPedido: 4,
    numeroMesa: 4,
    comanda: "Bianca",
    numeroComanda: 4,
    itens: [
      { idProduto: 4, nome: "Hambúrguer Vegano", precoUnitario: 27.40, quantidade: 1, estacao: "Chapa", status: "Pronto" },
      { idProduto: 9, nome: "Churros", precoUnitario: 9.25, quantidade: 2, estacao: "Fritadeira", status: "Pronto" },
    ],
    valorTotal: 45.90,
    formaPagamento: "Pix",
    status: "Pago",
    data: new Date(2025, 11, 2, 0, 0, 0, 0),
  },
  {
    idPedido: 5,
    numeroMesa: 5,
    comanda: "Rafael",
    numeroComanda: 5,
    itens: [
      { idProduto: 1, nome: "Hambúrguer Artesanal", precoUnitario: 25.90, quantidade: 1, estacao: "Chapa", status: "Pronto" },
      { idProduto: 7, nome: "Anéis de Cebola", precoUnitario: 13.40, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
      { idProduto: 20, nome: "Limonada", precoUnitario: 7.80, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 47.10,
    formaPagamento: "Cartão",
    status: "Pago",
    data: new Date(2025, 11, 2, 0, 0, 0, 0),
  },
  {
    idPedido: 6,
    numeroMesa: 6,
    comanda: "Fernanda",
    numeroComanda: 6,
    itens: [
      { idProduto: 11, nome: "Pizza Marguerita", precoUnitario: 45.00, quantidade: 1, estacao: "Forno", status: "Pronto" },
      { idProduto: 17, nome: "Milkshake Chocolate", precoUnitario: 16.90, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 61.90,
    formaPagamento: "Dinheiro",
    status: "Pago",
    data: new Date(2025, 11, 2, 0, 0, 0, 0),
  },
  {
    idPedido: 7,
    numeroMesa: 7,
    comanda: "Patrícia",
    numeroComanda: 7,
    itens: [
      { idProduto: 15, nome: "Pizza Quatro Queijos", precoUnitario: 51.50, quantidade: 1, estacao: "Forno", status: "Pronto" },
    ],
    valorTotal: 51.50,
    formaPagamento: "Pix",
    status: "Pago",
    data: new Date(2025, 11, 3, 0, 0, 0, 0),
  },
  {
    idPedido: 8,
    numeroMesa: 8,
    comanda: "Daniel",
    numeroComanda: 8,
    itens: [
      { idProduto: 10, nome: "Nuggets", precoUnitario: 15.10, quantidade: 2, estacao: "Fritadeira", status: "Pronto" },
      { idProduto: 16, nome: "Suco Natural", precoUnitario: 8.75, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 38.95,
    formaPagamento: "Cartão",
    status: "Pago",
    data: new Date(2025, 11, 3, 0, 0, 0, 0),
  },
  {
    idPedido: 9,
    numeroMesa: 9,
    comanda: "Henrique",
    numeroComanda: 9,
    itens: [
      { idProduto: 13, nome: "Pizza Portuguesa", precoUnitario: 49.80, quantidade: 1, estacao: "Forno", status: "Pronto" },
      { idProduto: 18, nome: "Refrigerante Lata", precoUnitario: 6.00, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 55.80,
    formaPagamento: "Pix",
    status: "Pago",
    data: new Date(2025, 11, 3, 0, 0, 0, 0),
  },
  {
    idPedido: 10,
    numeroMesa: 10,
    comanda: "Lucas",
    numeroComanda: 10,
    itens: [
      { idProduto: 14, nome: "Pizza Calabresa", precoUnitario: 42.70, quantidade: 1, estacao: "Forno", status: "Pronto" },
      { idProduto: 6, nome: "Batata Frita", precoUnitario: 10.50, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
    ],
    valorTotal: 53.20,
    formaPagamento: "Dinheiro",
    status: "Pago",
    data: new Date(2025, 11, 4, 0, 0, 0, 0),
  },

  {
    idPedido: 11,
    numeroMesa: 11,
    comanda: "Mariana",
    numeroComanda: 11,
    itens: [
      { idProduto: 8, nome: "Frango Empanado", precoUnitario: 18.25, quantidade: 1, estacao: "Fritadeira", status: "Cancelado" },
      { idProduto: 9, nome: "Churros", precoUnitario: 9.25, quantidade: 1, estacao: "Fritadeira", status: "Cancelado" },
    ],
    valorTotal: 27.50,
    status: "Cancelado",
    formaPagamento: undefined,
    data: new Date(2025, 11, 4, 0, 0, 0, 0),
  },
  {
    idPedido: 12,
    numeroMesa: 12,
    comanda: "Bruno",
    numeroComanda: 12,
    itens: [
      { idProduto: 2, nome: "Cachorro-Quente", precoUnitario: 12.30, quantidade: 2, estacao: "Chapa", status: "Cancelado" },
    ],
    valorTotal: 24.60,
    status: "Cancelado",
    data: new Date(2025, 11, 5, 0, 0, 0, 0),
  },
  {
    idPedido: 13,
    numeroMesa: 13,
    comanda: "Sofia",
    numeroComanda: 13,
    itens: [
      { idProduto: 20, nome: "Limonada", precoUnitario: 7.80, quantidade: 3, estacao: "Bebidas", status: "Cancelado" },
      { idProduto: 18, nome: "Refrigerante Lata", precoUnitario: 6.00, quantidade: 1, estacao: "Bebidas", status: "Cancelado" },
    ],
    valorTotal: 30.40,
    status: "Cancelado",
    data: new Date(2025, 11, 5, 0, 0, 0, 0),
  },
  {
    idPedido: 14,
    numeroMesa: 14,
    comanda: "Patrícia",
    numeroComanda: 14,
    itens: [
      { idProduto: 7, nome: "Anéis de Cebola", precoUnitario: 13.40, quantidade: 2, estacao: "Fritadeira", status: "Cancelado" },
      { idProduto: 19, nome: "Vitamina de Morango", precoUnitario: 14.90, quantidade: 1, estacao: "Bebidas", status: "Cancelado" },
    ],
    valorTotal: 41.70,
    status: "Cancelado",
    data: new Date(2025, 11, 5, 0, 0, 0, 0),
  },
  {
    idPedido: 15,
    numeroMesa: 15,
    comanda: "Rafael",
    numeroComanda: 15,
    itens: [
      { idProduto: 10, nome: "Nuggets", precoUnitario: 15.10, quantidade: 2, estacao: "Fritadeira", status: "Cancelado" },
      { idProduto: 9, nome: "Churros", precoUnitario: 9.25, quantidade: 1, estacao: "Fritadeira", status: "Cancelado" },
    ],
    valorTotal: 39.45,
    status: "Cancelado",
    data: new Date(2025, 11, 4, 0, 0, 0, 0),
  },

  {
    idPedido: 16,
    numeroMesa: 16,
    comanda: "Emanuel",
    numeroComanda: 16,
    itens: [
      { idProduto: 5, nome: "Misto Quente", precoUnitario: 11.20, quantidade: 2, estacao: "Chapa", status: "Pronto" },
    ],
    valorTotal: 22.40,
    status: "Pronto",
    data: new Date(2025, 11, 1, 0, 0, 0, 0),
  },
  {
    idPedido: 17,
    numeroMesa: 17,
    comanda: "Fábio",
    numeroComanda: 17,
    itens: [
      { idProduto: 1, nome: "Hambúrguer Artesanal", precoUnitario: 25.90, quantidade: 1, estacao: "Chapa", status: "Pronto" },
      { idProduto: 6, nome: "Batata Frita", precoUnitario: 10.50, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
    ],
    valorTotal: 36.40,
    status: "Pronto",
    data: new Date(2025, 11, 2, 0, 0, 0, 0),
  },
  {
    idPedido: 18,
    numeroMesa: 18,
    comanda: "Gisele",
    numeroComanda: 18,
    itens: [
      { idProduto: 11, nome: "Pizza Marguerita", precoUnitario: 45.00, quantidade: 1, estacao: "Forno", status: "Pronto" },
      { idProduto: 20, nome: "Limonada", precoUnitario: 7.80, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 52.80,
    status: "Pronto",
    data: new Date(2025, 11, 2, 0, 0, 0, 0),
  },
  {
    idPedido: 19,
    numeroMesa: 19,
    comanda: "Hugo",
    numeroComanda: 19,
    itens: [
      { idProduto: 12, nome: "Pizza Pepperoni", precoUnitario: 47.90, quantidade: 1, estacao: "Forno", status: "Pronto" },
      { idProduto: 18, nome: "Refrigerante Lata", precoUnitario: 6.00, quantidade: 2, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 59.90,
    status: "Pronto",
    data: new Date(2025, 11, 3, 0, 0, 0, 0),
  },
  {
    idPedido: 20,
    numeroMesa: 20,
    comanda: "Isabela",
    numeroComanda: 20,
    itens: [
      { idProduto: 2, nome: "Cachorro-Quente", precoUnitario: 12.30, quantidade: 1, estacao: "Chapa", status: "Pronto" },
      { idProduto: 9, nome: "Churros", precoUnitario: 9.25, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
      { idProduto: 16, nome: "Suco Natural", precoUnitario: 8.75, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 30.30,
    status: "Pronto",
    data: new Date(2025, 11, 3, 0, 0, 0, 0),
  },
  {
    idPedido: 21,
    numeroMesa: 21,
    comanda: "João",
    numeroComanda: 21,
    itens: [
      { idProduto: 15, nome: "Pizza Quatro Queijos", precoUnitario: 51.50, quantidade: 1, estacao: "Forno", status: "Pronto" },
      { idProduto: 17, nome: "Milkshake Chocolate", precoUnitario: 16.90, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 68.40,
    status: "Pronto",
    data: new Date(2025, 11, 4, 0, 0, 0, 0),
  },
  {
    idPedido: 22,
    numeroMesa: 22,
    comanda: "Andressa",
    numeroComanda: 22,
    itens: [
      { idProduto: 8, nome: "Frango Empanado", precoUnitario: 18.25, quantidade: 2, estacao: "Fritadeira", status: "Pronto" },
    ],
    valorTotal: 36.50,
    status: "Pronto",
    data: new Date(2025, 11, 4, 0, 0, 0, 0),
  },
  {
    idPedido: 23,
    numeroMesa: 23,
    comanda: "Bruno",
    numeroComanda: 23,
    itens: [
      { idProduto: 4, nome: "Hambúrguer Vegano", precoUnitario: 27.40, quantidade: 1, estacao: "Chapa", status: "Pronto" },
      { idProduto: 6, nome: "Batata Frita", precoUnitario: 10.50, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
    ],
    valorTotal: 37.90,
    status: "Pronto",
    data: new Date(2025, 11, 5, 0, 0, 0, 0),
  },
  {
    idPedido: 24,
    numeroMesa: 24,
    comanda: "Clara",
    numeroComanda: 24,
    itens: [
      { idProduto: 1, nome: "Hambúrguer Artesanal", precoUnitario: 25.90, quantidade: 1, estacao: "Chapa", status: "Pronto" },
      { idProduto: 10, nome: "Nuggets", precoUnitario: 15.10, quantidade: 1, estacao: "Fritadeira", status: "Pronto" },
      { idProduto: 16, nome: "Suco Natural", precoUnitario: 8.75, quantidade: 1, estacao: "Bebidas", status: "Pronto" },
    ],
    valorTotal: 49.75,
    status: "Pronto",
    data: new Date(2025, 11, 5, 0, 0, 0, 0),
  },

  {
    idPedido: 25,
    numeroMesa: 25,
    comanda: "Daniela",
    numeroComanda: 25,
    itens: [
      { idProduto: 13, nome: "Pizza Portuguesa", precoUnitario: 49.80, quantidade: 1, estacao: "Forno", status: "Pendente" },
    ],
    valorTotal: 49.80,
    status: "Pendente",
    data: new Date(2025, 11, 1, 0, 0, 0, 0),
  },
  {
    idPedido: 26,
    numeroMesa: 26,
    comanda: "Emanuel",
    numeroComanda: 26,
    itens: [
      { idProduto: 14, nome: "Pizza Calabresa", precoUnitario: 42.70, quantidade: 1, estacao: "Forno", status: "Pendente" },
      { idProduto: 18, nome: "Refrigerante Lata", precoUnitario: 6.00, quantidade: 1, estacao: "Bebidas", status: "Pendente" },
    ],
    valorTotal: 48.70,
    status: "Pendente",
    data: new Date(2025, 11, 2, 0, 0, 0, 0),
  },
  {
    idPedido: 27,
    numeroMesa: 27,
    comanda: "Fábio",
    numeroComanda: 27,
    itens: [
      { idProduto: 7, nome: "Anéis de Cebola", precoUnitario: 13.40, quantidade: 1, estacao: "Fritadeira", status: "Pendente" },
      { idProduto: 19, nome: "Vitamina de Morango", precoUnitario: 14.90, quantidade: 1, estacao: "Bebidas", status: "Pendente" },
    ],
    valorTotal: 28.30,
    status: "Pendente",
    data: new Date(2025, 11, 2, 0, 0, 0, 0),
  },
  {
    idPedido: 28,
    numeroMesa: 28,
    comanda: "Gisele",
    numeroComanda: 28,
    itens: [
      { idProduto: 5, nome: "Misto Quente", precoUnitario: 11.20, quantidade: 1, estacao: "Chapa", status: "Pendente" },
      { idProduto: 9, nome: "Churros", precoUnitario: 9.25, quantidade: 1, estacao: "Fritadeira", status: "Pendente" },
    ],
    valorTotal: 20.45,
    status: "Pendente",
    data: new Date(2025, 11, 2, 0, 0, 0, 0),
  },
  {
    idPedido: 29,
    numeroMesa: 29,
    comanda: "Hugo",
    numeroComanda: 29,
    itens: [
      { idProduto: 12, nome: "Pizza Pepperoni", precoUnitario: 47.90, quantidade: 1, estacao: "Forno", status: "Pendente" },
    ],
    valorTotal: 47.90,
    status: "Pendente",
    data: new Date(2025, 11, 3, 0, 0, 0, 0),
  },
  {
    idPedido: 30,
    numeroMesa: 30,
    comanda: "Isabela",
    numeroComanda: 30,
    itens: [
      { idProduto: 2, nome: "Cachorro-Quente", precoUnitario: 12.30, quantidade: 1, estacao: "Chapa", status: "Pendente" },
      { idProduto: 6, nome: "Batata Frita", precoUnitario: 10.50, quantidade: 1, estacao: "Fritadeira", status: "Pendente" },
    ],
    valorTotal: 22.80,
    status: "Pendente",
    data: new Date(2025, 11, 3, 0, 0, 0, 0),
  },
  {
    idPedido: 31,
    numeroMesa: 31,
    comanda: "João",
    numeroComanda: 31,
    itens: [
      { idProduto: 20, nome: "Limonada", precoUnitario: 7.80, quantidade: 2, estacao: "Bebidas", status: "Pendente" },
      { idProduto: 17, nome: "Milkshake Chocolate", precoUnitario: 16.90, quantidade: 1, estacao: "Bebidas", status: "Pendente" },
    ],
    valorTotal: 32.50,
    status: "Pendente",
    data: new Date(2025, 11, 3, 0, 0, 0, 0),
  },
  {
    idPedido: 32,
    numeroMesa: 32,
    comanda: "Sofia",
    numeroComanda: 32,
    itens: [
      { idProduto: 15, nome: "Pizza Quatro Queijos", precoUnitario: 51.50, quantidade: 1, estacao: "Forno", status: "Pendente" },
      { idProduto: 18, nome: "Refrigerante Lata", precoUnitario: 6.00, quantidade: 2, estacao: "Bebidas", status: "Pendente" },
    ],
    valorTotal: 63.50,
    status: "Pendente",
    data: new Date(2025, 11, 4, 0, 0, 0, 0),
  },
  {
    idPedido: 33,
    numeroMesa: 33,
    comanda: "Rodrigo",
    numeroComanda: 33,
    itens: [
      { idProduto: 1, nome: "Hambúrguer Artesanal", precoUnitario: 25.90, quantidade: 1, estacao: "Chapa", status: "Pendente" },
      { idProduto: 13, nome: "Pizza Portuguesa", precoUnitario: 49.80, quantidade: 1, estacao: "Forno", status: "Pendente" },
    ],
    valorTotal: 75.70,
    status: "Pendente",
    data: new Date(2025, 11, 4, 0, 0, 0, 0),
  },
  {
    idPedido: 34,
    numeroMesa: 34,
    comanda: "Tatiana",
    numeroComanda: 34,
    itens: [
      { idProduto: 11, nome: "Pizza Marguerita", precoUnitario: 45.00, quantidade: 1, estacao: "Forno", status: "Pendente" },
      { idProduto: 10, nome: "Nuggets", precoUnitario: 15.10, quantidade: 1, estacao: "Fritadeira", status: "Pendente" },
    ],
    valorTotal: 60.10,
    status: "Pendente",
    data: new Date(2025, 11, 5, 0, 0, 0, 0),
  },
  {
    idPedido: 35,
    numeroMesa: 35,
    comanda: "Marcos",
    numeroComanda: 35,
    itens: [
      { idProduto: 4, nome: "Hambúrguer Vegano", precoUnitario: 27.40, quantidade: 1, estacao: "Chapa", status: "Pendente" },
      { idProduto: 19, nome: "Vitamina de Morango", precoUnitario: 14.90, quantidade: 1, estacao: "Bebidas", status: "Pendente" },
    ],
    valorTotal: 42.30,
    status: "Pendente",
    data: new Date(2025, 11, 5, 0, 0, 0, 0),
  },
  {
    idPedido: 36,
    numeroMesa: 36,
    comanda: "Flávia",
    numeroComanda: 36,
    itens: [
      { idProduto: 7, nome: "Anéis de Cebola", precoUnitario: 13.40, quantidade: 1, estacao: "Fritadeira", status: "Pendente" },
      { idProduto: 5, nome: "Misto Quente", precoUnitario: 11.20, quantidade: 1, estacao: "Chapa", status: "Pendente" },
    ],
    valorTotal: 24.60,
    status: "Pendente",
    data: new Date(2025, 11, 3, 0, 0, 0, 0),
  },
  {
    idPedido: 37,
    numeroMesa: 37,
    comanda: "Sérgio",
    numeroComanda: 37,
    itens: [
      { idProduto: 12, nome: "Pizza Pepperoni", precoUnitario: 47.90, quantidade: 2, estacao: "Forno", status: "Pendente" },
    ],
    valorTotal: 95.80,
    status: "Pendente",
    data: new Date(2025, 11, 2, 0, 0, 0, 0),
  },
  {
    idPedido: 38,
    numeroMesa: 38,
    comanda: "Bruna",
    numeroComanda: 38,
    itens: [
      { idProduto: 3, nome: "Cheeseburger", precoUnitario: 22.50, quantidade: 1, estacao: "Chapa", status: "Pendente" },
      { idProduto: 6, nome: "Batata Frita", precoUnitario: 10.50, quantidade: 1, estacao: "Fritadeira", status: "Pendente" },
      { idProduto: 18, nome: "Refrigerante Lata", precoUnitario: 6.00, quantidade: 1, estacao: "Bebidas", status: "Pendente" },
    ],
    valorTotal: 39.00,
    status: "Pendente",
    data: new Date(2025, 11, 1, 0, 0, 0, 0),
  },
  {
    idPedido: 39,
    numeroMesa: 39,
    comanda: "Cláudia",
    numeroComanda: 39,
    itens: [
      { idProduto: 15, nome: "Pizza Quatro Queijos", precoUnitario: 51.50, quantidade: 1, estacao: "Forno", status: "Pendente" },
      { idProduto: 20, nome: "Limonada", precoUnitario: 7.80, quantidade: 1, estacao: "Bebidas", status: "Pendente" },
    ],
    valorTotal: 59.30,
    status: "Pendente",
    data: new Date(2025, 11, 5, 0, 0, 0, 0),
  },
  {
    idPedido: 40,
    numeroMesa: 40,
    comanda: "Felipe",
    numeroComanda: 40,
    itens: [
      { idProduto: 1, nome: "Hambúrguer Artesanal", precoUnitario: 25.90, quantidade: 1, estacao: "Chapa", status: "Pendente" },
    ],
    valorTotal: 25.90,
    status: "Pendente",
    data: new Date(2025, 11, 5, 0, 0, 0, 0),
  },
];