import { salvarFuncao } from '@/mocks/storageService';
import { getByUsername } from '@/services/funcionariosService';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { useAuth } from '../context/authContext';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === "web") {
      navigation.setOptions({ title: "Login" });
      document.title = "Login";
    }
  }, []);

  const handleLogin = async () => {
    if (!usuario || !senha) return Alert.alert('Preencha usuário e senha');
    try {
      await login(usuario, senha);

      const funcionario = await getByUsername(usuario);

      if (funcionario.funcao == "GERENTE") {
        router.push('/dashboard');
      } else if (funcionario.funcao == "CAIXA") {
        router.push('/pagamento');
      } else if (funcionario.funcao == "ATENDENTE") {
        router.push('/pedidos');
      } else if (funcionario.funcao == "CHAPA") {
        router.push('/kds/chapa');
      } else if (funcionario.funcao == "FORNO") {
        router.push('/kds/forno');
      } else if (funcionario.funcao == "FRITADEIRA") {
        router.push('/kds/fritadeira');
      } else if (funcionario.funcao == "BEBIDAS") {
        router.push('/kds/bebidas');
      }

      await salvarFuncao(funcionario.funcao);
      
    } catch (error) {
      Alert.alert('Erro', 'Usuário ou senha inválidos');
    }
  };

  const contentWidth = Math.min(width * 0.9, 400);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { width: contentWidth }]}>
        <Text style={styles.title}>FoodTrack</Text>
        <Text style={styles.subtitle}>Acesse sua conta</Text>

        <TextInput
          placeholder="Usuário"
          placeholderTextColor="#7D6F60"
          value={usuario}
          onChangeText={setUsuario}
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#7D6F60"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFDF9',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#BF6510',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E67E22',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7D6F60',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F9E4C8',
    color: '#4A3F35',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D7BFA6',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#E67E22',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
    shadowColor: '#BF6510',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#FFFDF9',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
