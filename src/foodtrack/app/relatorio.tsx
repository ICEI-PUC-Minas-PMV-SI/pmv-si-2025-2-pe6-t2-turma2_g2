import { RelatorioVenda, getRelatorio } from '@/services/relatoriosService';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { sharedStyles } from '../theme/styles';

const [dadosVendas, setItens] = useState<RelatorioVenda[]>([]);

const loadItens = async () => {
  try {
    const data = await getRelatorio();
    setItens(data);
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível carregar os dados.');
  }
};

useEffect(() => { loadItens(); }, []);

const RelatorioVendas: React.FC = () => {

  const renderItem = ({ item }: { item: RelatorioVenda }) => (
    <View style={sharedStyles.card}>
      <Text style={sharedStyles.produto}>{item.produto}</Text>
      <View style={sharedStyles.detalhes}>
        <Text style={sharedStyles.quantidade}>Qtd: {item.quantidade}</Text>
        <Text style={sharedStyles.receita}>R$ {item.receita.toLocaleString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.titulo}>Resumo de Vendas</Text>
      <FlatList
        data={dadosVendas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default RelatorioVendas;
