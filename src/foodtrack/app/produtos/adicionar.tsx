import { criarProduto, getProdutoById, Produto, updateProduto } from "@/services/produtosService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import { Produto } from "../../mocks/produtosMock";

export default function AdicionarProduto() {
  const router = useRouter();
  const { idProduto } = useLocalSearchParams();
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState<number | null>(null);
  const [estacao, setEstacao] = useState("");

  useEffect(() => {
    const carregar = async () => {
      const produto = await getProdutoById(Number(idProduto));

      setNomeProduto(produto.nome);
      setPrecoUnitario(produto.precoUnitario);
      setEstacao(produto.estacao);
    };
    carregar();
  }, [idProduto]);

  const salvar = async () => {
    if (precoUnitario) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const nome = nomeProduto;

    const produtoData = {
      nome,
      precoUnitario,
      estacao
    } as Produto;

    if (idProduto) {
      await updateProduto(Number(idProduto), produtoData);
      Alert.alert("Sucesso", "Produto atualizado!");
    } else {
      await criarProduto(produtoData);
      Alert.alert("Sucesso", "Produto criado!");
    }
    router.replace("/produtos" as any);
  };

  return (    
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.titulo}>{idProduto ? "Editar Produto" : "Novo Produto"}</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={nomeProduto}
          onChangeText={(text) => {
            setNomeProduto(text);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Preço (R$)"
          keyboardType="decimal-pad"
          value={precoUnitario !== null ? precoUnitario.toString() : ""}
          onChangeText={(text) => {
            setPrecoUnitario(text ? Number(text) : null);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Estação (Chapa, Fritadeira, Forno, Bebidas)"
          value={estacao}
          onChangeText={(t) => setEstacao(estacao)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  screen: {
    flex: 1,
    backgroundColor: "#F97316",
    padding: 16,
  },
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
