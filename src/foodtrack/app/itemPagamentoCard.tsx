import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface ItemPedido {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
}

export interface PedidoPagamento {
  id: string;
  mesa: string;
  itens: ItemPedido[];
  total: number;
}

interface ItemPagamentoCardProps {
  item: ItemPedido;
}

const ItemPagamentoCard: React.FC<ItemPagamentoCardProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.quantidade}>x{item.quantidade}</Text>
      <Text style={styles.preco}>R$ {(item.preco * item.quantidade).toLocaleString()}</Text>
    </View>
  );
};

export default ItemPagamentoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  nome: { fontSize: 16, fontWeight: '600', color: '#F97316' },
  quantidade: { fontSize: 14, color: '#4B5563' },
  preco: { fontSize: 16, fontWeight: 'bold', color: '#10B981' },
});
