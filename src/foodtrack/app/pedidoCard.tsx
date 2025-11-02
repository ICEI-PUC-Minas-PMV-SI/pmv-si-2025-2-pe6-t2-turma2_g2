import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Pedido {
  id: string;
  cliente: string;
  produto: string;
  quantidade: number;
  status: 'Pendente' | 'Concluído' | 'Cancelado';
}

interface PedidoCardProps {
  pedido: Pedido;
  onEditar: (pedido: Pedido) => void;
  onCancelar: (pedido: Pedido) => void;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, onEditar, onCancelar }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cliente}>{pedido.cliente}</Text>
      <Text style={styles.produto}>{pedido.produto} - Qtd: {pedido.quantidade}</Text>
      <Text style={styles.status}>Status: {pedido.status}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editar} onPress={() => onEditar(pedido)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelar} onPress={() => onCancelar(pedido)}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PedidoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cliente: { fontSize: 16, fontWeight: '600', color: '#F97316', marginBottom: 4 },
  produto: { fontSize: 14, color: '#4B5563', marginBottom: 4 },
  status: { fontSize: 14, fontWeight: 'bold', color: '#16A34A', marginBottom: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  editar: { backgroundColor: '#F97316', padding: 8, borderRadius: 8 },
  cancelar: { backgroundColor: '#EF4444', padding: 8, borderRadius: 8 },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
});
