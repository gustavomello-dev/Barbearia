import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SERVICOS } from '../data/servicos';

function ItemServico({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icone}>{item.icone}</Text>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <View style={styles.meta}>
          <Text style={styles.duracao}>⏱ {item.duracao} min</Text>
          <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ServicosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitulo}>Escolha o que você precisa</Text>
      <FlatList
        data={SERVICOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemServico item={item} />}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
  },
  subtitulo: {
    color: '#888',
    fontSize: 14,
    marginBottom: 16,
  },
  lista: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    alignItems: 'center',
  },
  icone: {
    fontSize: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  descricao: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  duracao: {
    fontSize: 13,
    color: '#d4af37',
  },
  preco: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d4af37',
  },
});
