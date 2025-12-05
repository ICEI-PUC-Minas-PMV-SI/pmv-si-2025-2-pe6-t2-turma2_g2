import { logout } from '@/services/authHelper';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface Tela {
  key: string;
  nome: string;
  route: string;
}

const telas: Tela[] = [
  { key: 'funcionarios', nome: 'Funcionários', route: '/funcionarios' },
  { key: 'produtos', nome: 'Produtos', route: '/produtos' },
  { key: 'pedidos', nome: 'Pedidos', route: '/pedidos' },
  { key: 'kds', nome: 'KDS - Estações', route: '/kds' },
  { key: 'pagamento', nome: 'Pagamentos', route: '/pagamento' },
  { key: 'relatorio-vendas', nome: 'Relatório de Vendas', route: '/relatorio-vendas' },
  { key: 'relatorio-itens-mais-vendidos', nome: 'Relatório de Itens Mais Vendidos', route: '/relatorio-itens-mais-vendidos' },
  { key: 'relatorio-itens-menos-vendidos', nome: 'Relatório de Itens Menos Vendidos', route: '/relatorio-itens-menos-vendidos' },
  { key: 'relatorio-pedidos-forma-pagamento', nome: 'Relatório de Pedidos por Forma de Pagamento', route: '/relatorio-pedidos-forma-pagamento' },
  { key: 'relatorio-cancelamentos', nome: 'Relatório de Cancelamentos', route: '/relatorio-cancelamentos' }
];

export default function Dashboard() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === "web") {      
      navigation.setOptions({ title: "Dashboard" });
      document.title = "Dashboard";
    }
    }, []);

  const handleDeslogar = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (e) {
      console.log("Erro", "Não foi possível deslogar");
    }
  };

  const renderItem = ({ item }: { item: typeof telas[0] }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(item.route as any)}
    >
      <Text style={styles.cardText}>{item.nome}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
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
          data={telas}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingBottom: 50 }}
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E67E22',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F9E4C8',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#BF6510',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardText: {
    color: '#4A3F35',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  }
});
