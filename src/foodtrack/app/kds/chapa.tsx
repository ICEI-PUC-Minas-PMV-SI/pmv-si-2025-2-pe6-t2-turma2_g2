import { getPedidos, updateItemPedido } from "@/services/pedidosService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pedido } from "../../mocks/pedidosMock";

export default function KdsChapa() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const ESTACAO = "Chapa";

  const carregarPedidos = async () => {
    const lista = await getPedidos();

    const pendentes = lista
      .filter(
        (p) =>
          p.itens.some(
            (i) => i.estacao === ESTACAO && i.status === "Pendente"
          )
      )
      .map((p) => ({
        ...p,
        itens: p.itens.filter(
          (i) => i.estacao === ESTACAO && i.status === "Pendente"
        ),
      }));

    setPedidos(pendentes);
  };

  useEffect(() => {
    carregarPedidos();
    const interval = setInterval(carregarPedidos, 5000);
    return () => clearInterval(interval);
  }, []);

  const marcarItemComoPronto = async (idPedido: number, idProduto: number) => {
    await updateItemPedido(idPedido, idProduto, "Pronto");
    carregarPedidos();
  };

  const renderPedido = ({ item }: { item: Pedido }) => (
    <View style={styles.card}>
      <Text style={styles.cliente}>Mesa {item.numeroMesa}</Text>
      {item.itens
        .filter((i) => i.estacao === ESTACAO)
        .map((i) => (
          <View key={i.idProduto} style={styles.itemRow}>
            <Text style={styles.item}>{i.quantidade}x {i.nome}</Text>
            <TouchableOpacity
              style={styles.botaoPronto}
              onPress={() => marcarItemComoPronto(item.id, i.idProduto)}
            >
              <Text style={styles.botaoTexto}>Pronto</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.replace("/kds")}
      >
        <Text style={styles.botaoVoltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>KDS - {ESTACAO}</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F1", padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#E67E22", marginBottom: 10 },
  card: {
    backgroundColor: "#F9E4C8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cliente: { fontWeight: "bold", fontSize: 16, color: "#4A3F35", marginBottom: 4 },
  item: { color: "#4A3F35" },
  botaoPronto: {
    marginTop: 10,
    backgroundColor: "#E67E22",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  botaoTexto: { color: "#FFF8F1", fontWeight: "bold" },
  botaoVoltar: {
    alignSelf: "flex-start",
    backgroundColor: "#E67E22",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  botaoVoltarTexto: {
    color: "#FFF8F1",
    fontWeight: "bold",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  }
});
