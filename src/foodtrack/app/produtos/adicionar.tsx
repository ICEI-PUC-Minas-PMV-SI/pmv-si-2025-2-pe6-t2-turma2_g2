import { criarProduto, getProdutoById, updateProduto } from "@/services/produtosService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Produto } from "../../mocks/produtosMock";

export default function AdicionarProduto() {
  const router = useRouter();
  const { idProduto } = useLocalSearchParams();
  const [produto, setProduto] = useState<Partial<Produto>>({
    nome: "",
    precoUnitario: 0,
    estacao: "",
  });

  useEffect(() => {
    if (idProduto) {
      const carregarProduto = async () => {
        const prod = await getProdutoById(Number(idProduto));
        if (prod) setProduto(prod);
      };
      carregarProduto();
    }
  }, [idProduto]);

  const salvar = async () => {
    if (!produto.nome || !produto.precoUnitario) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (idProduto) {
      await updateProduto(Number(idProduto), produto);
      Alert.alert("Sucesso", "Produto atualizado!");
    } else {
      await criarProduto(produto);
      Alert.alert("Sucesso", "Produto criado!");
    }
    router.replace("/produtos" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{idProduto ? "Editar Produto" : "Novo Produto"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={produto.nome}
        onChangeText={(t) => setProduto({ ...produto, nome: t })}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço (R$)"
        keyboardType="numeric"
        value={produto.precoUnitario?.toString() || ""}
        onChangeText={(t) => setProduto({ ...produto, precoUnitario: parseFloat(t) })}
      />

      <TextInput
        style={styles.input}
        placeholder="Estação (Chapa, Fritadeira, Forno, Bebidas)"
        value={produto.estacao}
        onChangeText={(t) => setProduto({ ...produto, estacao: t as any })}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.botaoSalvarTexto}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.replace("/produtos" as any)}
      >
        <Text style={styles.botaoVoltarTexto}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F1", padding: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#E67E22", marginBottom: 20 },
  input: {
    backgroundColor: "#F9E4C8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  botaoSalvar: {
    backgroundColor: "#E67E22",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoSalvarTexto: { color: "#FFF8F1", fontWeight: "bold", fontSize: 16 },
  botaoVoltar: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#E67E22",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  botaoVoltarTexto: { color: "#FFF8F1", fontWeight: "bold" },
});
