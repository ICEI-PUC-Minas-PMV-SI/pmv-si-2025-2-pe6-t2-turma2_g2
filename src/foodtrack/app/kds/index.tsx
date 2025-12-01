import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Estacao {
  key: string;
  nome: string;
  emoji: string;
  route: string;
}

const estacoes: Estacao[] = [
  { key: "chapa", nome: "Chapa", emoji: "🍔", route: "/kds/chapa" },
  { key: "fritadeira", nome: "Fritadeira", emoji: "🍟", route: "/kds/fritadeira" },
  { key: "forno", nome: "Forno", emoji: "🍕", route: "/kds/forno" },
  { key: "bebidas", nome: "Bebidas", emoji: "🍹", route: "/kds/bebidas" },
];

export default function KdsMain() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Estacao }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(item.route as any)}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.cardText}>{item.nome}</Text>
    </TouchableOpacity>
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

        <Text style={styles.titulo}>KDS - Estações</Text>

        <FlatList
          data={estacoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 40 }}
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
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#E67E22",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#F9E4C8",
    marginHorizontal: 5,
    paddingVertical: 40,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#BF6510",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A3F35",
  },
  botaoVoltar: {
    alignSelf: "flex-start",
    backgroundColor: "#E67E22",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  botaoVoltarTexto: {
    color: "#FFF8F1",
    fontWeight: "bold",
    fontSize: 16,
  },
});
