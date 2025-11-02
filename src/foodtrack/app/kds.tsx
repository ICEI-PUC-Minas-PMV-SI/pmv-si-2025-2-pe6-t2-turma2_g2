import PedidoKDSCard, { PedidoKDS } from '@/app/pedidosKdsCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const KDS: React.FC = () => {
  const [pedidos, setPedidos] = useState<PedidoKDS[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const response = await axios.get<PedidoKDS[]>('http://192.168.1.4:5013/api/pedidos');
      setPedidos(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPedidos();
  }, []);

  const atualizarStatus = async (id: string, novoStatus: PedidoKDS['status']) => {
    try {
      await axios.patch(`http://192.168.1.4:5013/api/pedidos/${id}`, { status: novoStatus });
      fetchPedidos();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#F97316" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PedidoKDSCard pedido={item} onAtualizarStatus={atualizarStatus} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      {pedidos.length === 0 && <Text style={styles.semPedidos}>Nenhum pedido ativo</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FDF7F0' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF7F0' },
  semPedidos: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#6B7280' },
});


export default KDS;
