import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAgendamentos } from '../context/AgendamentosContext';

export default function ConfirmarAgendamentoScreen() {
  const navigation = useNavigation();
  const { agendamentoEmAndamento, adicionarAgendamento } = useAgendamentos();

  if (!agendamentoEmAndamento) {
    navigation.goBack();
    return null;
  }

  const { servico, data, horario, nome, telefone } = agendamentoEmAndamento;

  const confirmar = () => {
    adicionarAgendamento({
      servico,
      data,
      horario,
      nome,
      telefone,
    });
    navigation.navigate('MeusAgendamentos');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icone}>{servico.icone}</Text>
        <Text style={styles.servicoNome}>{servico.nome}</Text>
        <Text style={styles.preco}>R$ {servico.preco.toFixed(2)}</Text>

        <View style={styles.linha} />
        <Text style={styles.dataTexto}>
          📅 {data.label} {data.mes} ({data.diaSemana}) às {horario}
        </Text>
        <Text style={styles.dadosTexto}>{nome}</Text>
        <Text style={styles.dadosTexto}>{telefone}</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={confirmar}>
        <Text style={styles.botaoTexto}>Confirmar agendamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelar} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelarTexto}>Voltar e editar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  icone: { fontSize: 48, marginBottom: 8 },
  servicoNome: { fontSize: 20, fontWeight: '700', color: '#fff' },
  preco: { fontSize: 18, color: '#d4af37', fontWeight: '600', marginTop: 4 },
  linha: {
    width: '100%',
    height: 1,
    backgroundColor: '#2a2a2a',
    marginVertical: 20,
  },
  dataTexto: { color: '#ccc', fontSize: 16 },
  dadosTexto: { color: '#888', fontSize: 14, marginTop: 4 },
  botao: {
    backgroundColor: '#d4af37',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoTexto: { color: '#1a1a1a', fontWeight: '700', fontSize: 16 },
  cancelar: { alignItems: 'center', marginTop: 16 },
  cancelarTexto: { color: '#666', fontSize: 14 },
});
