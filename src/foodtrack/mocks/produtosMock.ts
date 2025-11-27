export interface Produto {
  idProduto: number;
  nome: string;
  precoUnitario: number;
  estacao: "Chapa" | "Fritadeira" | "Forno" | "Bebidas" | "";
}

export const produtosMock: Produto[] = [
  { idProduto: 1, nome: "Hambúrguer Artesanal", precoUnitario: 25, estacao: "Chapa" },
  { idProduto: 2, nome: "Batata Frita", precoUnitario: 10, estacao: "Fritadeira" },
  { idProduto: 3, nome: "Pizza Marguerita", precoUnitario: 45, estacao: "Forno" },
  { idProduto: 4, nome: "Suco Natural", precoUnitario: 8, estacao: "Bebidas" },
];
