import { Produto, produtosMock } from "@/mocks/produtosMock";

let produtos = [...produtosMock];

export const getProdutos = async () => produtos;
export const getProdutoById = async (id: number) => produtos.find((p) => p.idProduto === id);
export const criarProduto = async (novo: Partial<Produto>) => {
  const novoProduto = { ...novo, id: Date.now() } as Produto;
  produtos.push(novoProduto);
};
export const updateProduto = async (id: number, dados: Partial<Produto>) => {
  produtos = produtos.map((p) => (p.idProduto === id ? { ...p, ...dados } : p));
};
export const deleteProduto = async (id: number) => {
  produtos = produtos.filter((p) => p.idProduto !== id);
};
