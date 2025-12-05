//import { getPedidos, Pedido, updateItemPedido } from "@/services/pedidosService";
import { Pedido } from "@/mocks/pedidosMock";
import { getPedidos, updateItemPedido } from "@/mocks/services/pedidosService";
import { carregarFuncaoStorage } from "@/mocks/storageService";
import { logout } from "@/services/authHelper";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KdsChapa() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const ESTACAO = "Bebidas";
  const navigation = useNavigation();
  const [funcao, setFuncao] = useState<any>("");

  const carregarFuncao = async () => {
    const data = await carregarFuncaoStorage();
    setFuncao(data);
  };

  const carregarPedidos = async () => {
    const lista = await getPedidos();

    const pendentes = lista
      .filter(
        (p: Pedido) =>
          p.itens.some(
            (i) => i.estacao === ESTACAO && i.status === "Pendente"
          )
      )
      .map((p: Pedido) => ({
        ...p,
        itens: p.itens.filter(
          (i) => i.estacao === ESTACAO && i.status === "Pendente"
        ),
      }));

    setPedidos(pendentes);
  };

  useEffect(() => {
    carregarPedidos();
    carregarFuncao();
    const interval = setInterval(carregarPedidos, 5000);

    if (Platform.OS === "web") {
      navigation.setOptions({ title: "KDS - Bebidas" });
      document.title = "KDS - Bebidas";
    }

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
              onPress={() => marcarItemComoPronto(item.idPedido, i.idProduto)}
            >
              <Text style={styles.botaoTexto}>Pronto</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );

  const handleDeslogar = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (e) {
      console.log("Erro", "Não foi possível deslogar");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {funcao === "GERENTE" && (
          <TouchableOpacity
            style={styles.botaoVoltar}
          onPress={() => router.replace("/kds")}
          >
            <Text style={styles.botaoVoltarTexto}>← Voltar ao Dashboard</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.titulo}>KDS - {ESTACAO}</Text>
        
        <TouchableOpacity
          onPress={handleDeslogar}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
          }}
        >
        <Text style={{ color: "white", textAlign: "center" }}>Sair</Text>
        </TouchableOpacity>

        <FlatList
          data={pedidos}
          keyExtractor={(item) => (item.idPedido ?? 0).toString()}
          renderItem={renderPedido}
        />
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
