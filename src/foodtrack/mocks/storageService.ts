import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "foodtrack_pedidos";
const STORAGE_KEY_FUNCAO = "funcionario_funcao";

export const salvarFuncao = async (funcao: string) => {
  await AsyncStorage.setItem(STORAGE_KEY_FUNCAO, JSON.stringify(funcao));
};

export const carregarFuncaoStorage = async (): Promise<any> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY_FUNCAO);

  if (!json) {
    return "";  
  }

  return JSON.parse(json);
};

export const salvarPedidos = async (pedidos: any[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
};

export const carregarPedidos = async (): Promise<any[]> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  const lista = JSON.parse(json);
  return lista.map((p: any) => ({ ...p, data: new Date(p.data) }));
};
