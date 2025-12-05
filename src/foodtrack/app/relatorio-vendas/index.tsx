import { Pedido } from "@/mocks/pedidosMock";
import { getPedidos } from "@/mocks/services/pedidosService";
//import { getPedidos, Pedido } from "@/services/pedidosService";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Relatorio() {
  const router = useRouter();
  const navigation = useNavigation();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [totalVendas, setTotalVendas] = useState(0);
  const [ticketMedio, setTicketMedio] = useState(0);

  const now = new Date();
  const primeiroDiaDoMes = new Date(now.getFullYear(), now.getMonth(), 1);
  primeiroDiaDoMes.setHours(3,0,0,0);
  const fim = new Date();
  fim.setHours(3,0,0,0);

  const [dataInicio, setDataInicio] = useState<Date>(primeiroDiaDoMes);
  const [dataFim, setDataFim] = useState<Date>(fim);

  const carregarPedidos = async () => {
    const lista = await getPedidos();

    const pedidosFiltrados = lista.filter((p: Pedido) => {
      const dataPedido = new Date(p.data);

      return (
        ["Pago"].includes(p.status) &&
        dataPedido >= dataInicio &&
        dataPedido <= dataFim
      );
    });

    setPedidos(pedidosFiltrados);

    const total = pedidosFiltrados.reduce((acc: number, p: Pedido) => acc + p.valorTotal, 0);
    setTotalVendas(total);
    setTicketMedio(
      pedidosFiltrados.length ? total / pedidosFiltrados.length : 0
    );
  };

  useEffect(() => {
    carregarPedidos();
        
    if (Platform.OS === "web") {
      navigation.setOptions({ title: "Relatório" });
      document.title = "Relatório";
    }
  }, [dataInicio, dataFim]);

  const chartConfig = {
    backgroundColor: "#FFF8F1",
    backgroundGradientFrom: "#FFF8F1",
    backgroundGradientTo: "#FFF8F1",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(230, 126, 34, ${opacity})`,
    labelColor: () => "#4A3F35",
    style: { borderRadius: 12 },
  };

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

        <Text style={styles.titulo}>📊 Relatório de Vendas</Text>

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

        <View style={styles.resumoContainer}>
          <Text style={styles.resumoTexto}>💰 Total Vendido: R$ {totalVendas.toFixed(2)}</Text>
          <Text style={styles.resumoTexto}>📦 Pedidos Finalizados: {pedidos.length}</Text>
          <Text style={styles.resumoTexto}>📊 Ticket Médio: R$ {ticketMedio.toFixed(2)}</Text>
        </View>

        {pedidos.length > 0 && (
          <View style={styles.graficoContainer}>
            <Text style={styles.subtitulo}>Evolução das Vendas</Text>
            <BarChart
              data={{
                labels: pedidos.map((p) =>
                  new Date(p.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                ),
                datasets: [{ data: pedidos.map((p) => p.valorTotal) }],
              }}
              width={Dimensions.get("window").width - 40}
              height={220}
              yAxisLabel="R$ "
              yAxisSuffix=""
              chartConfig={chartConfig}
              style={styles.grafico}
            />
          </View>
        )}
        
        <Text style={styles.subtitulo}>Últimos pedidos</Text>
        <FlatList
          data={pedidos.slice(-5).reverse()}
          keyExtractor={(item) => item.idPedido.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.cardPedido}>
              <Text style={styles.cliente}>Comanda {item.comanda}</Text>
              <Text style={styles.valor}>
                {new Date(item.data).toLocaleDateString("pt-BR")} — R${" "}
                {item.valorTotal.toFixed(2)} — {item.formaPagamento}
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
});
