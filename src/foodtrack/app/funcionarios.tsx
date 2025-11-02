import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { addFuncionario, deleteFuncionario, Funcionario, getFuncionarios, updateFuncionario } from '../services/funcionariosService';
import { sharedStyles } from '../theme/styles';

export default function FuncionariosScreen() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null);
  const [nome, setNome] = useState('');
  const [funcao, setCargo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const loadFuncionarios = async () => {
    try {
      const data = await getFuncionarios();
      setFuncionarios(data);
    } catch (error) {
      console.error('Falha ao carregar funcionários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os funcionários. Verifique o console.');
    }
  };

  useEffect(() => { loadFuncionarios(); }, []);

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

  return (
    <View style={sharedStyles.container}>
      <Pressable style={sharedStyles.buttonPrimary} onPress={() => openModal()}>
        <Text style={sharedStyles.buttonTextPrimary}>Adicionar Funcionário</Text>
      </Pressable>

      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.idFuncionario!.toString()}
        renderItem={({ item }) => (
          <View style={sharedStyles.funcionarioItem}>
            <Text style={sharedStyles.funcionarioText}>{item.nome} - {item.funcao}</Text>
            <View style={sharedStyles.actions}>
              <Pressable onPress={() => handleEdit(item)} style={sharedStyles.editButton}>
                <Text style={sharedStyles.editButtonText}>Editar</Text>
              </Pressable>
              <Pressable onPress={() => handleDelete(item.idFuncionario!)} style={sharedStyles.deleteButton}>
                <Text style={sharedStyles.deleteButtonText}>Excluir</Text>
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
  );
}
