import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface PedidoKDS {
  id: string;
  mesa: string;
  itens: { nome: string; quantidade: number }[];
  status: 'Pendente' | 'Em preparo' | 'Pronto';
  hora: string;
}

interface PedidoKDSCardProps {
  pedido: PedidoKDS;
  onAtualizarStatus: (id: string, novoStatus: PedidoKDS['status']) => void;
}

const PedidoKDSCard: React.FC<PedidoKDSCardProps> = ({ pedido, onAtualizarStatus }) => {

  const proximoStatus = () => {
    if (pedido.status === 'Pendente') return 'Em preparo';
    if (pedido.status === 'Em preparo') return 'Pronto';
    return 'Pronto';
  }

  const statusColor = () => {
    switch (pedido.status) {
      case 'Pendente': return '#F59E0B';
      case 'Em preparo': return '#F97316';
      case 'Pronto': return '#10B981';
      default: return '#D1D5DB';
    }
  }

  return (
    <View style={[styles.card, { borderLeftColor: statusColor() }]}>
      <Text style={styles.mesa}>Mesa {pedido.mesa}</Text>
      <FlatList
        data={pedido.itens}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.nome} x{item.quantidade}</Text>}
      />
      <View style={styles.rodape}>
        <Text style={[styles.status, { color: statusColor() }]}>{pedido.status}</Text>
        {pedido.status !== 'Pronto' && (
          <TouchableOpacity style={[styles.botao, { backgroundColor: statusColor() }]} onPress={() => onAtualizarStatus(pedido.id, proximoStatus())}>
            <Text style={styles.botaoText}>Próximo Status</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PedidoKDSCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  mesa: { fontSize: 18, fontWeight: '700', color: '#F97316', marginBottom: 8 },
  item: { fontSize: 16, color: '#4B5563', marginBottom: 2 },
  rodape: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  status: { fontWeight: 'bold', fontSize: 16 },
  botao: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  botaoText: { color: '#FFFFFF', fontWeight: '600' },
});
