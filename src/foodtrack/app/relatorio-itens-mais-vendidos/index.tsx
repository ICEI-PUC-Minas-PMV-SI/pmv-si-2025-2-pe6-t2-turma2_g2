import { ItemPedidoRelatorio, Pedido } from "@/mocks/pedidosMock";
import { getPedidos } from "@/mocks/services/pedidosService";
//import { getPedidos, Pedido } from "@/services/pedidosService";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Relatorio() {
  const router = useRouter();
  const navigation = useNavigation();

  const [itens, setItens] = useState<ItemPedidoRelatorio[]>([]);

  const now = new Date();
  const primeiroDiaDoMes = new Date(now.getFullYear(), now.getMonth(), 1);
  primeiroDiaDoMes.setHours(3,0,0,0);
  const fim = new Date();
  fim.setHours(3,0,0,0);

  const [dataInicio, setDataInicio] = useState<Date>(primeiroDiaDoMes);
  const [dataFim, setDataFim] = useState<Date>(fim);
  const [itensAgrupados, setItensAgrupados] = useState<
    Array<{ nome: string; quantidade: number }>
  >([]);

  const carregarPedidos = async () => {
    const lista = await getPedidos();

    const pedidosFiltrados = lista.filter((p: Pedido) => {
      const dataPedido = new Date(p.data);
      return dataPedido >= dataInicio && dataPedido <= dataFim;
    });

    const produtoMap = new Map<number, { nome: string; quantidade: number }>();

    pedidosFiltrados.forEach((pedido) => {
      pedido.itens.forEach((item) => {
        if (produtoMap.has(item.idProduto)) {
          produtoMap.get(item.idProduto)!.quantidade += item.quantidade;
        } else {
          produtoMap.set(item.idProduto, { nome: item.nome, quantidade: item.quantidade });
        }
      });
    });

    const produtosAgrupados = Array.from(produtoMap.values())
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5);
      
    setItensAgrupados(produtosAgrupados);
  };

  useEffect(() => {
    carregarPedidos();
    
    if (Platform.OS === "web") {
      navigation.setOptions({ title: "Relatório" });
      document.title = "Relatório";
    }
  }, [dataInicio, dataFim]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.replace("/dashboard")}
        >
          <Text style={styles.botaoVoltarTexto}>← Voltar ao Dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>📊 Relatório de Itens Mais Vendidos</Text>

        <View style={styles.filtroContainer}>
          <Text style={styles.subtitulo}>Filtrar por Período</Text>

          <TouchableOpacity
            style={styles.botaoData}
          >
            <Text style={styles.textoData}>
              Início:
            </Text>
          </TouchableOpacity>

          {Platform.OS === "web" && (
            <input
              type="date"
              value={dataInicio.toISOString().split("T")[0]}
              onChange={(e) => setDataInicio(new Date(e.target.value))}
              style={styles.inputWeb}
            />
          )}

          <TouchableOpacity
            style={styles.botaoData}
          >
            <Text style={styles.textoData}>
              Fim:
            </Text>
          </TouchableOpacity>

          {Platform.OS === "web" && (
            <input
              type="date"
              value={dataFim.toISOString().split("T")[0]}
              onChange={(e) => setDataFim(new Date(e.target.value))}
              style={styles.inputWeb}
            />
          )}

          <TouchableOpacity style={styles.botaoFiltrar} onPress={carregarPedidos}>
            <Text style={styles.textoBotaoFiltrar}>Aplicar Filtro</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitulo}>Itens</Text>
          <FlatList
            data={itensAgrupados}
            keyExtractor={(item) => item.nome}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.cardPedido}>
                <Text style={styles.cliente}>
                  {item.nome} — {item.quantidade} vendidos
                </Text>
              </View>
            )}
          />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  screen: {
    flex: 1,
    backgroundColor: "#F97316",
    padding: 16,
  },
  scroll: { flex: 1, backgroundColor: "#FFF8F1" },
  container: { padding: 20, paddingBottom: 60 },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#E67E22", marginBottom: 10 },
  subtitulo: { fontSize: 18, fontWeight: "600", color: "#4A3F35", marginVertical: 10 },
  filtroContainer: {
    backgroundColor: "#F9E4C8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  inputWeb: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E67E22",
    padding: 6,
    backgroundColor: "#FFF8F1",
    color: "#4A3F35",
    marginVertical: 5,
  },
  botaoData: {
    backgroundColor: "#FBEAD1",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  textoData: { color: "#4A3F35", fontWeight: "600" },
  botaoFiltrar: {
    backgroundColor: "#E67E22",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  textoBotaoFiltrar: {
    textAlign: "center",
    color: "#FFF8F1",
    fontWeight: "bold",
    fontSize: 16,
  },
  resumoContainer: {
    backgroundColor: "#F9E4C8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resumoTexto: { fontSize: 16, color: "#4A3F35", marginBottom: 4 },
  graficoContainer: { alignItems: "center", marginBottom: 20 },
  grafico: { marginVertical: 8, borderRadius: 12 },
  cardPedido: {
    backgroundColor: "#FBEAD1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cliente: { fontWeight: "bold", color: "#4A3F35", fontSize: 16 },
  valor: { color: "#7F5539", fontSize: 14, marginTop: 4 },
  botaoVoltar: {
    alignSelf: "flex-start",
    backgroundColor: "#E67E22",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  botaoVoltarTexto: { color: "#FFF8F1", fontWeight: "bold", fontSize: 16 },
  itensContainer: {
    marginTop: 6,
    paddingLeft: 8,
  },
  itemText: {
    color: "#7F5539",
    fontSize: 13,
    marginTop: 2,
  },
});
