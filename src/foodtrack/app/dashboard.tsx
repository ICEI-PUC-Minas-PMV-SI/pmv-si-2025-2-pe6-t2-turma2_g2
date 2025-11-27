import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

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
  { key: 'relatorio', nome: 'Relatório de Vendas', route: '/relatorio' },
  { key: 'pagamento', nome: 'Pagamentos', route: '/pagamento' }
];

export default function Dashboard() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof telas[0] }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(item.route as any)}
    >
      <Text style={styles.cardText}>{item.nome}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <FlatList
        data={telas}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
