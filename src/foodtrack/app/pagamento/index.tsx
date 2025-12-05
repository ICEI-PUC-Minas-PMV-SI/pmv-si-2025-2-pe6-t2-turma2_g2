import { FormaPagamento, Pedido } from "@/mocks/pedidosMock";
//import { FormaPagamento, getPedidos, Pedido, updatePedido } from "@/services/pedidosService";
import { getPedidos, updatePedido } from "@/mocks/services/pedidosService";
import { carregarFuncaoStorage } from "@/mocks/storageService";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pagamento() {
  const router = useRouter();
  const navigation = useNavigation();
  const [pedidosPendentes, setPedidosPendentes] = useState<Pedido[]>([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(
    null
  );
  const [formaPagamento, setFormaPagamento] = useState<string>("");
  const [funcao, setFuncao] = useState<any>("");

  const carregarFuncao = async () => {
    const data = await carregarFuncaoStorage();
    setFuncao(data);
  };

  const carregarPedidos = async () => {
    const lista = await getPedidos();
    const pendentes = lista.filter(
      (p: Pedido) => p.status === "Pronto"
    );
    setPedidosPendentes(pendentes);
  };

  useEffect(() => {
    carregarPedidos();
    carregarFuncao();
    
    if (Platform.OS === "web") {
      navigation.setOptions({ title: "Pagamentos" });
      document.title = "Pagamentos";
    }
  }, []);

  const selecionarPedido = (pedido: Pedido) => {
    setPedidoSelecionado(pedido);
  };

  const confirmarPagamento = async () => {
    if (!pedidoSelecionado) {
      Alert.alert("Atenção", "Selecione um pedido para pagamento.");
      return;
    }

    if (!formaPagamento) {
      Alert.alert("Atenção", "Escolha uma forma de pagamento.");
      return;
    }

    await updatePedido(pedidoSelecionado.idPedido, {
      formaPagamento: formaPagamento as FormaPagamento,
      status: "Pago",
    });

    Alert.alert("Sucesso", "Pagamento registrado com sucesso!");
    setPedidoSelecionado(null);
    setFormaPagamento("");
    await carregarPedidos();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {funcao === "GERENTE" && (
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.replace("/dashboard")}
          >
            <Text style={styles.botaoVoltarTexto}>← Voltar ao Dashboard</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.titulo}>💳 Pagamentos</Text>

        <Text style={styles.subtitulo}>Pedidos pendentes:</Text>
        <FlatList
          data={pedidosPendentes}
          keyExtractor={(item) => item.idPedido.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.cardPedido,
                pedidoSelecionado?.idPedido === item.idPedido && styles.cardSelecionado,
              ]}
              onPress={() => selecionarPedido(item)}
            >
              <Text style={styles.cliente}>Comanda {item.comanda} / Mesa {item.numeroMesa}</Text>
              <Text style={styles.valor}>R$ {item.valorTotal.toFixed(2)}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ color: "#7F5539" }}>
              Nenhum pedido pendente no momento.
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        />

        {pedidoSelecionado && (
          <View style={styles.pagamentoContainer}>
            <Text style={styles.infoPedido}>
              Pedido selecionado: {pedidoSelecionado.numeroMesa}
            </Text>
            <Text style={styles.valorTotal}>
              Total: R$ {pedidoSelecionado.valorTotal.toFixed(2)}
            </Text>

            <Text style={styles.subtitulo}>Forma de pagamento:</Text>
            <View style={styles.botoesPagamento}>
              {["Pix", "Cartão", "Dinheiro"].map((forma) => (
                <TouchableOpacity
                  key={forma}
                  style={[
                    styles.botaoForma,
                    formaPagamento === forma && styles.botaoFormaSelecionado,
                  ]}
                  onPress={() => setFormaPagamento(forma)}
                >
                  <Text
                    style={[
                      styles.textoForma,
                      formaPagamento === forma && styles.textoFormaSelecionado,
                    ]}
                  >
                    {forma}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.botaoConfirmar}
              onPress={confirmarPagamento}
            >
              <Text style={styles.textoConfirmar}>Confirmar Pagamento</Text>
            </TouchableOpacity>
          </View>
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
  container: { flex: 1, backgroundColor: "#FFF8F1", padding: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#E67E22", marginBottom: 10 },
  subtitulo: { fontSize: 16, fontWeight: "600", color: "#4A3F35", marginVertical: 10 },
  cardPedido: {
    backgroundColor: "#F9E4C8",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardSelecionado: {
    backgroundColor: "#E67E22",
  },
  cliente: { fontWeight: "bold", color: "#4A3F35", fontSize: 16 },
  valor: { color: "#7F5539", fontSize: 14 },
  status: { color: "#7F5539", fontStyle: "italic", fontSize: 13 },

  pagamentoContainer: {
    backgroundColor: "#FBEAD1",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  infoPedido: { fontSize: 16, color: "#4A3F35", marginBottom: 6 },
  valorTotal: { fontSize: 18, fontWeight: "bold", color: "#E67E22", marginBottom: 10 },
  botoesPagamento: { flexDirection: "row", justifyContent: "space-between" },
  botaoForma: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F9E4C8",
    alignItems: "center",
  },
  botaoFormaSelecionado: {
    backgroundColor: "#E67E22",
  },
  textoForma: { color: "#4A3F35", fontWeight: "bold" },
  textoFormaSelecionado: { color: "#FFF8F1" },

  botaoConfirmar: {
    marginTop: 16,
    backgroundColor: "#E67E22",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  textoConfirmar: {
    color: "#FFF8F1",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoVoltar: {
    alignSelf: "flex-start",
    backgroundColor: "#E67E22",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  botaoVoltarTexto: { color: "#FFF8F1", fontWeight: "bold", fontSize: 16 },
});
