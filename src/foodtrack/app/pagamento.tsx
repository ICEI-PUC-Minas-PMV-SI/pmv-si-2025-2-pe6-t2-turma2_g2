import ItemPagamentoCard, { PedidoPagamento } from '@/app/itemPagamentoCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Pagamento: React.FC<{ pedidoId: string }> = ({ pedidoId }) => {
  const [pedido, setPedido] = useState<PedidoPagamento | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPedido = async () => {
    try {
      setLoading(true);
      const response = await axios.get<PedidoPagamento>(`http://192.168.1.4:5013/api/pedido/${pedidoId}`);
      setPedido(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedido();
  }, [pedidoId]);

  const handlePagamento = async (forma: string) => {
    try {
      await axios.post(`http://192.168.1.4:5157/api/pedidos/${pedidoId}/pagar`, { forma });
      Alert.alert('Sucesso', `Pagamento realizado com ${forma}`);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível processar o pagamento');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  if (!pedido) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#6B7280' }}>Pedido não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pagamento - Mesa {pedido.mesa}</Text>

      <FlatList
        data={pedido.itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemPagamentoCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Total:</Text>
        <Text style={styles.totalValor}>R$ {pedido.total.toLocaleString()}</Text>
      </View>

      <View style={styles.formasPagamento}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#F97316' }]} onPress={() => handlePagamento('Cartão')}>
          <Text style={styles.botaoText}>Cartão</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#10B981' }]} onPress={() => handlePagamento('Dinheiro')}>
          <Text style={styles.botaoText}>Dinheiro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#6366F1' }]} onPress={() => handlePagamento('PIX')}>
          <Text style={styles.botaoText}>PIX</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FDF7F0' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#F97316', marginBottom: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF7F0' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  totalTexto: { fontSize: 18, fontWeight: '600', color: '#4B5563' },
  totalValor: { fontSize: 18, fontWeight: 'bold', color: '#F97316' },
  formasPagamento: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
  botao: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  botaoText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});

export default Pagamento;
