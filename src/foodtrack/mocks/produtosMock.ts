export interface Produto {
  idProduto: number;
  nome: string;
  precoUnitario: number;
  estacao: "Chapa" | "Fritadeira" | "Forno" | "Bebidas" | "";
}

export const produtosMock: Produto[] = [
  { idProduto: 1, nome: "Hambúrguer Artesanal", precoUnitario: 25.90, estacao: "Chapa" },
  { idProduto: 2, nome: "Cachorro-Quente", precoUnitario: 12.30, estacao: "Chapa" },
  { idProduto: 3, nome: "Cheeseburger", precoUnitario: 22.50, estacao: "Chapa" },
  { idProduto: 4, nome: "Hambúrguer Vegano", precoUnitario: 27.40, estacao: "Chapa" },
  { idProduto: 5, nome: "Misto Quente", precoUnitario: 11.20, estacao: "Chapa" },

  { idProduto: 6, nome: "Batata Frita", precoUnitario: 10.50, estacao: "Fritadeira" },
  { idProduto: 7, nome: "Anéis de Cebola", precoUnitario: 13.40, estacao: "Fritadeira" },
  { idProduto: 8, nome: "Frango Empanado", precoUnitario: 18.25, estacao: "Fritadeira" },
  { idProduto: 9, nome: "Churros", precoUnitario: 9.25, estacao: "Fritadeira" },
  { idProduto: 10, nome: "Nuggets", precoUnitario: 15.10, estacao: "Fritadeira" },

  { idProduto: 11, nome: "Pizza Marguerita", precoUnitario: 45.00, estacao: "Forno" },
  { idProduto: 12, nome: "Pizza Pepperoni", precoUnitario: 47.90, estacao: "Forno" },
  { idProduto: 13, nome: "Pizza Portuguesa", precoUnitario: 49.80, estacao: "Forno" },
  { idProduto: 14, nome: "Pizza Calabresa", precoUnitario: 42.70, estacao: "Forno" },
  { idProduto: 15, nome: "Pizza Quatro Queijos", precoUnitario: 51.50, estacao: "Forno" },

  { idProduto: 16, nome: "Suco Natural", precoUnitario: 8.75, estacao: "Bebidas" },
  { idProduto: 17, nome: "Milkshake Chocolate", precoUnitario: 16.90, estacao: "Bebidas" },
  { idProduto: 18, nome: "Refrigerante Lata", precoUnitario: 6.00, estacao: "Bebidas" },
  { idProduto: 19, nome: "Vitamina de Morango", precoUnitario: 14.90, estacao: "Bebidas" },
  { idProduto: 20, nome: "Limonada", precoUnitario: 7.80, estacao: "Bebidas" },
];