import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "foodtrack_pedidos";

export const salvarPedidos = async (pedidos: any[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
};

export const carregarPedidos = async (): Promise<any[]> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  const lista = JSON.parse(json);
  return lista.map((p: any) => ({ ...p, data: new Date(p.data) }));
};
