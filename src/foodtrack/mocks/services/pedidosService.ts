import { Pedido, pedidosMock } from "@/mocks/pedidosMock";
import { carregarPedidos, salvarPedidos } from "@/mocks/storageService";

let pedidos: Pedido[] = [];

export const initPedidos = async () => {
  const existentes = await carregarPedidos();
  if (existentes.length === 0) {
    pedidos = pedidosMock;
    await salvarPedidos(pedidos);
  } else {
    pedidos = existentes;
  }
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getPedidos = async () => {
  if (pedidos.length === 0) {
    pedidos = await carregarPedidos();
  }

  await delay(400);
  return pedidos;
};

export const getItensByPedido = async (id: number) => {
  const itens = pedidos.find((p) => p.idPedido === id)!.itens;
  await delay(400);
  return itens;
};

export const getPedidoById = async (id: number) => {
  const result = pedidos.find((p) => p.idPedido === id);
  await delay(400);
  return result;
};

export async function getUltimoNumeroComanda(): Promise<number> {
  const ultimoPedido = pedidos.length > 0 ? pedidos[pedidos.length - 1] : null;
  const numeroComanda = ultimoPedido ? ultimoPedido.numeroComanda : 0;
  await delay(400);
  return numeroComanda;
};

export async function criarPedido(novoPedido: Omit<Pedido, "id" | "data">): Promise<Pedido> {
  await delay(400);
  const id = pedidos.length ? Math.max(...pedidos.map((p) => p.idPedido)) + 1 : 1;
  const novo = { ...novoPedido, id, data: new Date() };
  pedidos.push(novo);
  await salvarPedidos(pedidos);
  return novo;
}

export async function updatePedido(id: number, data: Partial<Pedido>): Promise<Pedido | null> {
  await delay(400);
  const index = pedidos.findIndex((p) => p.idPedido === id);
  if (index === -1) return null;
  pedidos[index] = { ...pedidos[index], ...data };  
  await salvarPedidos(pedidos);
  return pedidos[index];
}

export const updateItemPedido = async (
  idPedido: number,
  idProduto: number,
  status: "Pendente" | "Pronto" | "Cancelado"
) => {
  pedidos = pedidos.map((pedido) => {
    if (pedido.idPedido === idPedido) {
      const novosItens = pedido.itens.map((item) =>
        item.idProduto === idProduto ? { ...item, status } : item
      );

      const todosProntos = novosItens.every((i) => i.status === "Pronto");
      const todosCancelados = novosItens.every((i) => i.status === "Cancelado");

      let novoStatus: "Pendente" | "Pronto" | "Cancelado" = "Pendente";

      if (todosProntos) novoStatus = "Pronto";
      else if (todosCancelados) novoStatus = "Cancelado";

      if (todosProntos) {
        enviarNotificacaoPedidoPronto(pedido);
        alert(`Pedido ${pedido.comanda} - Mesa ${pedido.numeroMesa} está pronto!`);
      }

      return {
        ...pedido,
        itens: novosItens,
        status: novoStatus,
      };
    }
    return pedido;
  });

  await salvarPedidos(pedidos);
};

async function enviarNotificacaoPedidoPronto(pedido: any) {
  const userId = 2;

  await fetch('http://10.0.2.2:5244/push/send-notification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      title: "🍽 Pedido pronto!",
      body: `Mesa - ${pedido.numeroMesa} / Comanda - ${pedido.comanda} #${pedido.numeroComanda} está pronto.`
    })
  });
}

export const cancelarPedido = async (idPedido: number) => {
  try {
    const lista = await carregarPedidos();

    const atualizada = lista.map((pedido) => {
      if (pedido.id === idPedido) {
        const itensCancelados = pedido.itens.map((item: Pedido) => ({
          ...item,
          status: "Cancelado" as const,
        }));

        return {
          ...pedido,
          status: "Cancelado" as const,
          itens: itensCancelados,
        };
      }
      return pedido;
    });

    await salvarPedidos(atualizada);
    console.log("✅ Pedido cancelado e salvo com sucesso!");
  } catch (err) {
    console.error("Erro ao cancelar pedido:", err);
  }
};

export { Pedido };

