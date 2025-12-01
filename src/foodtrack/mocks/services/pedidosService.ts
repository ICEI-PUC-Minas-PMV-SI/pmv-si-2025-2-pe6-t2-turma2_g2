import { Pedido, pedidosMock } from "@/mocks/pedidosMock";
import { carregarPedidos, salvarPedidos } from "@/mocks/storageService";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

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
        if (Platform.OS !== "web") {
          enviarNotificacaoPedidoPronto(pedido);
        } else {
          alert(`Pedido ${pedido.comanda} - Mesa ${pedido.numeroMesa} está pronto!`);
        }
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
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🍽 Pedido pronto!",
      body: `Mesa - ${pedido.numeroMesa} / Comanda - ${pedido.comanda} está pronto.`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: null,
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

