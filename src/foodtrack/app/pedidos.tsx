import PedidoCard from '@/app/pedidoCard';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addPedido, deletePedido, getPedidos, Pedido, updatePedido } from '../services/pedidosService';
import { StyleSheet } from 'react-native';

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null);
  const [novoPedido, setNovoPedido] = useState<{ cliente: string; produto: string; quantidade: string }>({ cliente: '', produto: '', quantidade: '' });

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const data = await getPedidos();
      setPedidos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleEditar = (pedido: Pedido) => {
    setPedidoSelecionado(pedido);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!pedidoSelecionado) return;

    try {
      await updatePedido(pedidoSelecionado.id, pedidoSelecionado);
      fetchPedidos();
      setModalVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelar = async (pedido: Pedido) => {
    try {
      await deletePedido(pedido.id);
      fetchPedidos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleNovoPedido = async () => {
    if (!novoPedido.cliente || !novoPedido.produto || !novoPedido.quantidade) return;

    try {
      await addPedido({ novoPedido.cliente, novoPedido.produto, novoPedido.quantidade });
      setNovoPedido({ cliente: '', produto: '', quantidade: '' });
      fetchPedidos();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pedidos</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PedidoCard pedido={item} onEditar={handleEditar} onCancelar={handleCancelar} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.novoPedidoContainer}>
        <TextInput placeholder="Cliente" value={novoPedido.cliente} onChangeText={(text) => setNovoPedido({ ...novoPedido, cliente: text })} style={styles.input} />
        <TextInput placeholder="Produto" value={novoPedido.produto} onChangeText={(text) => setNovoPedido({ ...novoPedido, produto: text })} style={styles.input} />
        <TextInput placeholder="Quantidade" value={novoPedido.quantidade} onChangeText={(text) => setNovoPedido({ ...novoPedido, quantidade: text })} style={styles.input} keyboardType="numeric" />
        <TouchableOpacity style={styles.botaoInserir} onPress={handleNovoPedido}>
          <Text style={styles.botaoText}>Inserir Pedido</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Editar Pedido</Text>
            <TextInput
              style={styles.input}
              value={pedidoSelecionado?.produto}
              onChangeText={(text) => setPedidoSelecionado((prev) => prev && { ...prev, produto: text })}
            />
            <TextInput
              style={styles.input}
              value={pedidoSelecionado?.quantidade.toString()}
              onChangeText={(text) => setPedidoSelecionado((prev) => prev && { ...prev, quantidade: Number(text) })}
              keyboardType="numeric"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <TouchableOpacity style={styles.botaoSalvar} onPress={salvarEdicao}>
                <Text style={styles.botaoText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoCancelar} onPress={() => setModalVisible(false)}>
                <Text style={styles.botaoText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FDF7F0' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#F97316', marginBottom: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF7F0' },
  novoPedidoContainer: { marginTop: 16, padding: 12, backgroundColor: '#FFFFFF', borderRadius: 16 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 8, marginBottom: 8 },
  botaoInserir: { backgroundColor: '#F97316', padding: 12, borderRadius: 8, alignItems: 'center' },
  botaoText: { color: '#FFFFFF', fontWeight: '600' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '90%', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16 },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', color: '#F97316', marginBottom: 12 },
  botaoSalvar: { backgroundColor: '#F97316', padding: 12, borderRadius: 8, flex: 1, marginRight: 8, alignItems: 'center' },
  botaoCancelar: { backgroundColor: '#EF4444', padding: 12, borderRadius: 8, flex: 1, marginLeft: 8, alignItems: 'center' },
});

export default Pedidos;
