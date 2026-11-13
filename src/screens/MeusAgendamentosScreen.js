import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAgendamentos } from '../context/AgendamentosContext';

function ItemAgendamento({ item, onCancelar }) {
  const { servico, data, horario, nome } = item;
  const dataFormatada = data ? `${data.label} ${data.mes} (${data.diaSemana})` : '';

  return (
    <View style={styles.card}>
      <View style={styles.cabecalho}>
        <Text style={styles.icone}>{servico?.icone || '💈'}</Text>
        <View style={styles.tituloLinha}>
          <Text style={styles.servicoNome}>{servico?.nome || 'Serviço'}</Text>
          <Text style={styles.dataHorario}>
            {dataFormatada} às {horario}
          </Text>
        </View>
      </View>
      <Text style={styles.cliente}>{nome}</Text>
      <Text style={styles.preco}>R$ {servico?.preco?.toFixed(2) ?? '0,00'}</Text>
      <TouchableOpacity style={styles.botaoCancelar} onPress={() => onCancelar(item.id)}>
        <Text style={styles.botaoCancelarTexto}>Cancelar agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function MeusAgendamentosScreen() {
  const { agendamentos, cancelarAgendamento } = useAgendamentos();

  return (
    <View style={styles.container}>
      {agendamentos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioEmoji}>📋</Text>
          <Text style={styles.vazioTitulo}>Nenhum agendamento</Text>
          <Text style={styles.vazioTexto}>Agende um horário na aba "Agendar"</Text>
        </View>
      ) : (
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemAgendamento item={item} onCancelar={cancelarAgendamento} />
          )}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
  lista: { paddingBottom: 24 },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  cabecalho: { flexDirection: 'row', alignItems: 'center' },
  icone: { fontSize: 36, marginRight: 14 },
  tituloLinha: { flex: 1 },
  servicoNome: { fontSize: 18, fontWeight: '700', color: '#fff' },
  dataHorario: { fontSize: 14, color: '#d4af37', marginTop: 2 },
  cliente: { fontSize: 14, color: '#888', marginTop: 10 },
  preco: { fontSize: 16, fontWeight: '600', color: '#d4af37', marginTop: 6 },
  botaoCancelar: {
    marginTop: 14,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  botaoCancelarTexto: { color: '#e57373', fontSize: 14, fontWeight: '600' },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  vazioEmoji: { fontSize: 64, marginBottom: 16 },
  vazioTitulo: { fontSize: 20, fontWeight: '700', color: '#fff' },
  vazioTexto: { fontSize: 15, color: '#666', marginTop: 8 },
});
