import { ItemPedido } from "@/mocks/pedidosMock";
import { criarPedido, getPedidos, Pedido, updatePedido } from "@/services/pedidosService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Produto, produtosMock } from "../../mocks/produtosMock";

export default function AdicionarPedido() {
  const router = useRouter();

  const [numeroMesa, setNumeroMesa] = useState<number | null>(null);
  const [observacao, setObservacao] = useState("");
  const [comanda, setComanda] = useState("");
  const [itens, setItens] = useState<{ produto: Produto; quantidade: number }[]>([]);
  const { pedidoId } = useLocalSearchParams();

  useEffect(() => {
    const carregarPedido = async () => {
      if (pedidoId) {
        const pedidos = await getPedidos();
        const pedido = pedidos.find((p) => p.id === Number(pedidoId));
        if (pedido) {
          setNumeroMesa(pedido.numeroMesa);
          setComanda(pedido.comanda);
          setObservacao(pedido.observacao || "");
          setItens(
            pedido.itens.map((i: ItemPedido) => ({
              produto: {
                idProduto: i?.idProduto ?? i.idProduto,
                nome: i?.nome ?? i.nome,
                precoUnitario: i?.precoUnitario ?? i.precoUnitario,
                estacao: i?.estacao ?? i.estacao ?? "",
                status: i?.status ?? i.status,
              },
              quantidade: i.quantidade,
            }))
          );
        }
      }
    };
    carregarPedido();
  }, [pedidoId]);

  const adicionarItem = (produto: Produto) => {
    setItens((prev) => {
      const existente = prev.find((i) => i.produto.idProduto === produto.idProduto);
      if (existente) {
        return prev.map((i) =>
          i.produto.idProduto === produto.idProduto
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const removerItem = (id: number) => {
    setItens((prev) =>
      prev
        .map((i) =>
          i.produto.idProduto === id ? { ...i, quantidade: i.quantidade - 1 } : i
        )
        .filter((i) => i.quantidade > 0)
    );
  };

  const valorTotal = itens.reduce(
    (acc, i) => acc + i.produto.precoUnitario * i.quantidade,
    0
  );

  const salvarPedido = async () => {
    if (numeroMesa == 0) {
      Alert.alert("Atenção", "Informe o número da mesa!");
      return;
    }

    if (itens.length === 0) {
      Alert.alert("Atenção", "Adicione pelo menos um produto!");
      return;
    }

    const pedidoData = {
      numeroMesa,
      comanda,
      itens: itens.map((i) => ({
        idProduto: i.produto.idProduto,
        nome: i.produto.nome,
        quantidade: i.quantidade,
        precoUnitario: i.produto.precoUnitario,
        estacao: i.produto.estacao,
        status: "Pendente"
      })),
      valorTotal,
      status: "Pendente",
      observacao,
      data: new Date()
    } as Pedido;

    if (pedidoId) {
      await updatePedido(Number(pedidoId), pedidoData);
    } else {
      await criarPedido(pedidoData);
    }

    Alert.alert("Sucesso", "Pedido criado!");
    router.replace("/pedidos" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Pedido</Text>

      <TextInput
        placeholder="Nome da comanda"
        value={comanda}
        onChangeText={setComanda}
        style={styles.input}
      />

      <TextInput
        style={[styles.input]}
        placeholder="Número da mesa"
        keyboardType="numeric"
        value={numeroMesa !== null ? numeroMesa.toString() : ""}
        onChangeText={(text) => {
          setNumeroMesa(text ? Number(text) : null);
        }}
      />

      <TextInput
        style={[styles.input, styles.observacaoInput]}
        placeholder="Observações (ex: sem cebola, sem picles...)"
        value={observacao}
        onChangeText={setObservacao}
        multiline
        numberOfLines={3}
      />

      <FlatList
        data={produtosMock}
        keyExtractor={(item) => item.idProduto.toString()}
        renderItem={({ item }) => {
          const selecionado = itens.find((i) => i.produto.idProduto === item.idProduto);
          return (
            <View style={styles.produtoLinha}>
              <Text style={styles.produtoNome}>
                {item.nome} - R$ {item.precoUnitario.toFixed(2)}
              </Text>
              <View style={styles.qtdContainer}>
                <TouchableOpacity
                  style={styles.qtdBtn}
                  onPress={() => removerItem(item.idProduto)}
                >
                  <Text style={styles.qtdTexto}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtdValor}>
                  {selecionado?.quantidade || 0}
                </Text>
                <TouchableOpacity
                  style={styles.qtdBtn}
                  onPress={() => adicionarItem(item)}
                >
                  <Text style={styles.qtdTexto}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <Text style={styles.total}>Total: R$ {valorTotal.toFixed(2)}</Text>

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPedido}>
        <Text style={styles.botaoSalvarTexto}>Salvar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff9f4", padding: 16 },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#d46a00", marginBottom: 10 },
  input: {
    backgroundColor: "#fff",
    borderColor: "#d46a00",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  observacaoInput: {
    height: 80,
    textAlignVertical: "top", // ✅ garante alinhamento correto do texto
  },
  produtoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  produtoNome: { fontSize: 15, color: "#333" },
  qtdContainer: { flexDirection: "row", alignItems: "center" },
  qtdBtn: {
    backgroundColor: "#d46a00",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qtdTexto: { color: "#fff", fontWeight: "bold" },
  qtdValor: { marginHorizontal: 8, fontWeight: "bold", color: "#333" },
  total: { textAlign: "right", marginTop: 10, fontWeight: "bold", fontSize: 16 },
  botaoSalvar: {
    backgroundColor: "#d46a00",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  botaoSalvarTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
