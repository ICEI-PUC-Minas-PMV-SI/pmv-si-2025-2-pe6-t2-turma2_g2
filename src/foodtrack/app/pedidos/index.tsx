import {
  cancelarPedido,
  getPedidos,
  Pedido,
} from "@/services/pedidosService";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const carregarPedidos = async () => {
    setLoading(true);
    try {
      const data = await getPedidos();
      setPedidos(data);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar os pedidos");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (id: number) => {
    const confirm = window.confirm('Deseja excluir este pedido?');

    if (confirm) {      
      await cancelarPedido(id);
      Alert.alert("Sucesso", "Pedido cancelado com todos os itens.");
      carregarPedidos();
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarPedidos();
    }, [])
  );

  const renderPedido = ({ item }: { item: Pedido }) => (    
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.cliente}>Comanda {item.comanda} #{item.numeroComanda} / Mesa {item.numeroMesa}</Text>
        <Text
          style={[
            styles.status,
            item.status === "Pendente"
              ? styles.statusPendente
              : item.status === "Pronto"
              ? styles.statusPronto
              : item.status === "Pago"
              ? styles.statusPago
              : styles.statusCancelado,
          ]}
        >
          {item.status}
        </Text>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.valorTotal}>
          Total: R$ {item.valorTotal.toFixed(2)}
        </Text>
        <Text style={styles.pagamento}>💳 {item.formaPagamento}</Text>
      </View>

      <View style={styles.acoes}>
        {item.status == "Pendente" && (
          <TouchableOpacity
            style={[styles.botao, styles.botaoEditar]}
            onPress={() => router.push({
              pathname: "/pedidos/adicionar",
              params: { pedidoId: item.idPedido },
            })}
          >
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>
        )}

        {item.status !== "Cancelado" && item.status !== "Pago" && (
          <TouchableOpacity
            style={[styles.botao, styles.botaoCancelar]}
            onPress={() => handleCancelar(item.idPedido)}
          >
            <Text style={styles.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (    
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.replace("/dashboard")}
        >
          <Text style={styles.botaoVoltarTexto}>← Voltar ao Dashboard</Text>
        </TouchableOpacity>
        
        <Text style={styles.titulo}>Pedidos</Text>

        <TouchableOpacity
          style={styles.botaoNovo}
          onPress={() => router.push("/pedidos/adicionar")}
        >
          <Text style={styles.botaoNovoTexto}>+ Novo Pedido</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#d46a00" />
        ) : pedidos.length === 0 ? (
          <Text style={styles.vazio}>Nenhum pedido encontrado</Text>
        ) : (
          <FlatList
            data={pedidos}
            keyExtractor={(item) => item.idPedido.toString()}
            renderItem={renderPedido}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
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
  container: { flex: 1, backgroundColor: "#fff9f4", padding: 16 },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#d46a00",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cliente: { fontSize: 18, fontWeight: "600", color: "#333" },
  status: { fontSize: 14, fontWeight: "bold" },
  statusPendente: { color: "#d46a00" },
  statusPronto: { color: "green" },
  statusPago: { color: "blue" },
  statusCancelado: { color: "red" },
  footerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  valorTotal: { fontWeight: "bold", color: "#000" },
  pagamento: { color: "#666" },
  acoes: {
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
  botaoEditar: { backgroundColor: "#d46a00" },
  botaoCancelar: { backgroundColor: "#999" },
  textoBotao: { color: "#fff", fontWeight: "bold" },
  botaoNovo: {
    backgroundColor: "#d46a00",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  botaoNovoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  vazio: { textAlign: "center", color: "#999", marginTop: 40 },
  botaoVoltar: {
    alignSelf: "flex-start",
    backgroundColor: "#E67E22",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#BF6510",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  botaoVoltarTexto: {
    color: "#FFF8F1",
    fontWeight: "bold",
    fontSize: 16,
  },
});
