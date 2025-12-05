import { logout } from "@/services/authHelper";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import {
  Alert, FlatList, Modal, Platform, Pressable,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { addFuncionario, deleteFuncionario, Funcionario, getFuncionarios, updateFuncionario } from '../../services/funcionariosService';
import { sharedStyles } from '../../theme/styles';

export default function FuncionariosScreen() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null);
  const [nome, setNome] = useState('');
  const [funcao, setCargo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  const loadFuncionarios = async () => {
    try {
      const data = await getFuncionarios();
      setFuncionarios(data);
    } catch (error) {
      console.error('Falha ao carregar funcionários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os funcionários. Verifique o console.');
    }
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      navigation.setOptions({ title: "Funcionários" });
      document.title = "Funcionários";
    }
    
    loadFuncionarios(); }, []);

  const openModal = (func?: Funcionario) => {
    if (func) {
      setEditingFuncionario(func);
      setNome(func.nome);
      setUsuario(func.usuario);
      setSenha(func.senha);
      setCargo(func.funcao);
    } else {
      setEditingFuncionario(null);
      setNome('');
      setCargo('');
      setUsuario('');
      setSenha('');
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!nome || !funcao || !usuario || !senha) {
      return Alert.alert('Preencha todos os campos');
    }

    try {
      if (editingFuncionario) {
        await updateFuncionario(editingFuncionario.idFuncionario!, { nome, funcao, usuario, senha });
      }
      else {
        await addFuncionario({ nome, funcao, usuario, senha });
      }

      setModalVisible(false);
      loadFuncionarios();
    } catch (error) {
      console.error('Falha ao salvar funcionário:', error);
      Alert.alert('Erro', 'Não foi possível salvar o funcionário. Verifique o console.');
    }
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm('Deseja excluir este funcionário?');

    if (confirm) {
      deleteF(id);
    }
  };

  function handleEdit(funcionario: Funcionario) {
    setEditingFuncionario(funcionario);
    setNome(funcionario.nome);
    setCargo(funcionario.funcao);
    setUsuario(funcionario.usuario);
    setSenha(funcionario.senha);
    setModalVisible(true);
  }

  async function deleteF(id: number) {
    try {
      await deleteFuncionario(id);
      loadFuncionarios();
    } catch (err) {
      console.error('Erro ao excluir funcionário:', err);
    }
  };

  const handleDeslogar = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (e) {
      console.log("Erro", "Não foi possível deslogar");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.replace("/dashboard")}
        >
          <Text style={styles.botaoVoltarTexto}>← Voltar ao Dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Funcionários</Text>
        
        <Pressable style={styles.botaoNovo} onPress={() => openModal()}>
          <Text style={styles.botaoNovoTexto}>+ Novo Funcionário</Text>
        </Pressable>
        
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
          data={funcionarios}
          keyExtractor={(item) => item.idFuncionario!.toString()}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={sharedStyles.funcionarioItem}>
              <Text style={sharedStyles.funcionarioText}>{item.nome} - {item.funcao}</Text>
              <View style={styles.actions}>
                <Pressable onPress={() => handleEdit(item)} style={[styles.botao, styles.botaoEditar]}>
                  <Text style={styles.botaoTexto}>Editar</Text>
                </Pressable>
                <Pressable onPress={() => handleDelete(item.idFuncionario!)} style={[styles.botao, styles.botaoExcluir]}>
                  <Text style={styles.botaoTexto}>Excluir</Text>
                </Pressable>
              </View>
            </View>
          )}
        />

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={sharedStyles.modalContainer}>
            <View style={sharedStyles.modalContent}>
              <Text style={sharedStyles.modalTitle}>{editingFuncionario ? 'Editar' : 'Adicionar'} Funcionário</Text>
              <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={sharedStyles.input} />
              <TextInput placeholder="Usuário" value={usuario} onChangeText={setUsuario} style={sharedStyles.input} />
              <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={sharedStyles.input} />
              <TextInput placeholder="Cargo" value={funcao} onChangeText={setCargo} style={sharedStyles.input} />

              <View style={sharedStyles.modalActions}>
                <Pressable style={sharedStyles.modalButton} onPress={handleSave}>
                  <Text style={sharedStyles.modalButtonText}>Salvar</Text>
                </Pressable>
                <Pressable style={[sharedStyles.modalButton, { backgroundColor: '#999' }]} onPress={() => setModalVisible(false)}>
                  <Text style={sharedStyles.modalButtonText}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
  container: { flex: 1, backgroundColor: "#fff9f4", padding: 16 },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#d46a00",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cliente: { fontSize: 18, fontWeight: "600", color: "#333" },
  status: { fontSize: 14, fontWeight: "bold" },
  statusPendente: { color: "#d46a00" },
  statusPronto: { color: "green" },
  statusPago: { color: "blue" },
  statusCancelado: { color: "red" },
  itensContainer: { marginBottom: 6 },
  itemTexto: { color: "#555", fontSize: 14 },
  footerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  valorTotal: { fontWeight: "bold", color: "#000" },
  pagamento: { color: "#666" },  
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  botao: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botaoEditar: { backgroundColor: "#d46a00" },
  botaoCancelar: { backgroundColor: "#999" },
  textoBotao: { color: "#fff", fontWeight: "bold" },
  botaoNovo: {
    backgroundColor: "#d46a00",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  botaoNovoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  vazio: { textAlign: "center", color: "#999", marginTop: 40 },
  botaoVoltar: {
    alignSelf: "flex-start",
    backgroundColor: "#E67E22",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#BF6510",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  botaoVoltarTexto: {
    color: "#FFF8F1",
    fontWeight: "bold",
    fontSize: 16,
  },  
  botaoTexto: { color: "#FFF8F1", fontWeight: "bold" },
  botaoExcluir: { backgroundColor: "#C0392B" },
});
