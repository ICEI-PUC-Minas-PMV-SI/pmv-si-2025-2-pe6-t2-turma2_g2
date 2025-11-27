import { deleteProduto, getProdutos } from "@/services/produtosService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Produto } from "../../mocks/produtosMock";

export default function ProdutosScreen() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const carregarProdutos = async () => {
    const lista = await getProdutos();
    setProdutos(lista);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const excluirProduto = async (id: number) => {
    const confirm = window.confirm('Deseja excluir este produto?');

    if (confirm) {
      await deleteProduto(id);
      carregarProdutos();
    }
  };

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>R$ {item.precoUnitario.toFixed(2)}</Text>
      <Text style={styles.estacao}>Estação: {item.estacao}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoEditar]}
          onPress={() =>
            router.push({
              pathname: "/produtos/adicionar",
              params: { idProduto: item.idProduto.toString() },
            })
          }
        >
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, styles.botaoExcluir]}
          onPress={() => excluirProduto(item.idProduto)}
        >
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.replace("/dashboard")}
      >
        <Text style={styles.botaoVoltarTexto}>← Voltar ao Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Produtos</Text>

      <TouchableOpacity
        style={styles.botaoNovo}
        onPress={() => router.push("/produtos/adicionar")}
      >
        <Text style={styles.botaoNovoTexto}>+ Novo Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.idProduto.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F1", padding: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#E67E22", marginBottom: 10 },
  card: {
    backgroundColor: "#F9E4C8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  nome: { fontWeight: "bold", fontSize: 16, color: "#4A3F35" },
  preco: { color: "#4A3F35", marginTop: 4 },
  estacao: { color: "#7F5539", marginTop: 2 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  botao: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botaoEditar: { backgroundColor: "#E67E22" },
  botaoExcluir: { backgroundColor: "#C0392B" },
  botaoTexto: { color: "#FFF8F1", fontWeight: "bold" },
  botaoNovo: {
    backgroundColor: "#d46a00",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  botaoNovoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
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
    fontSize: 16,
  },
});
