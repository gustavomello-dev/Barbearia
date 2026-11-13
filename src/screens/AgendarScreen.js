import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAgendamentos } from '../context/AgendamentosContext';
import { SERVICOS, HORARIOS_DISPONIVEIS, DIAS_SEMANA } from '../data/servicos';

function getProximosDias(qtde = 14) {
  const dias = [];
  const hoje = new Date();
  for (let i = 0; i < qtde; i++) {
    const d = new Date(hoje);
    d.setDate(hoje.getDate() + i);
    dias.push({
      data: d,
      label: d.getDate().toString().padStart(2, '0'),
      mes: d.toLocaleDateString('pt-BR', { month: 'short' }),
      diaSemana: DIAS_SEMANA[d.getDay()],
      key: d.toISOString().split('T')[0],
    });
  }
  return dias;
}

export default function AgendarScreen() {
  const navigation = useNavigation();
  const { setAgendamentoEmAndamento, agendamentos } = useAgendamentos();
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const proximosDias = useMemo(() => getProximosDias(), []);

  const horariosOcupados = useMemo(() => {
    if (!dataSelecionada) return [];
    return agendamentos
      .filter((a) => a.data === dataSelecionada.key)
      .map((a) => a.horario);
  }, [agendamentos, dataSelecionada]);

  const horariosLivres = dataSelecionada
    ? HORARIOS_DISPONIVEIS.filter((h) => !horariosOcupados.includes(h))
    : [];

  const podeConfirmar =
    servicoSelecionado && dataSelecionada && horarioSelecionado && nome.trim() && telefone.trim();

  const irParaConfirmar = () => {
    if (!podeConfirmar) return;
    setAgendamentoEmAndamento({
      servico: servicoSelecionado,
      data: dataSelecionada,
      horario: horarioSelecionado,
      nome: nome.trim(),
      telefone: telefone.trim(),
    });
    navigation.navigate('ConfirmarAgendamento');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.secaoTitulo}>1. Serviço</Text>
      <View style={styles.chipRow}>
        {SERVICOS.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={[styles.chip, servicoSelecionado?.id === s.id && styles.chipAtivo]}
            onPress={() => setServicoSelecionado(s)}
          >
            <Text style={styles.chipTexto}>{s.nome}</Text>
            <Text style={styles.chipPreco}>R$ {s.preco}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.secaoTitulo}>2. Data</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScroll}>
        {proximosDias.map((dia) => (
          <TouchableOpacity
            key={dia.key}
            style={[styles.diaCard, dataSelecionada?.key === dia.key && styles.diaCardAtivo]}
            onPress={() => setDataSelecionada(dia)}
          >
            <Text style={[styles.diaLabel, dataSelecionada?.key === dia.key && styles.diaLabelAtivo]}>
              {dia.label}
            </Text>
            <Text style={[styles.diaMes, dataSelecionada?.key === dia.key && styles.diaLabelAtivo]}>
              {dia.mes}
            </Text>
            <Text style={[styles.diaSemana, dataSelecionada?.key === dia.key && styles.diaLabelAtivo]}>
              {dia.diaSemana}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.secaoTitulo}>3. Horário</Text>
      <View style={styles.horariosGrid}>
        {horariosLivres.length === 0 && dataSelecionada ? (
          <Text style={styles.semHorarios}>Selecione outra data</Text>
        ) : (
          horariosLivres.slice(0, 24).map((h) => (
            <TouchableOpacity
              key={h}
              style={[styles.horarioChip, horarioSelecionado === h && styles.horarioChipAtivo]}
              onPress={() => setHorarioSelecionado(h)}
            >
              <Text style={[styles.horarioTexto, horarioSelecionado === h && styles.horarioTextoAtivo]}>
                {h}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <Text style={styles.secaoTitulo}>4. Seus dados</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#666"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={[styles.botao, !podeConfirmar && styles.botaoDesabilitado]}
        onPress={irParaConfirmar}
        disabled={!podeConfirmar}
      >
        <Text style={styles.botaoTexto}>Continuar e confirmar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  conteudo: { padding: 24, paddingBottom: 48 },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d4af37',
    marginBottom: 12,
    marginTop: 8,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  chip: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  chipAtivo: { borderColor: '#d4af37', backgroundColor: '#2a2520' },
  chipTexto: { fontSize: 14, color: '#fff', fontWeight: '600' },
  chipPreco: { fontSize: 12, color: '#d4af37', marginTop: 2 },
  diasScroll: { marginHorizontal: -24, marginBottom: 16 },
  diaCard: {
    width: 72,
    marginLeft: 24,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  diaCardAtivo: { borderColor: '#d4af37', backgroundColor: '#2a2520' },
  diaLabel: { fontSize: 20, fontWeight: '800', color: '#fff' },
  diaMes: { fontSize: 12, color: '#888' },
  diaSemana: { fontSize: 11, color: '#666', marginTop: 2 },
  diaLabelAtivo: { color: '#d4af37' },
  horariosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  horarioChip: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  horarioChipAtivo: { borderColor: '#d4af37', backgroundColor: '#2a2520' },
  horarioTexto: { color: '#fff', fontWeight: '600' },
  horarioTextoAtivo: { color: '#d4af37' },
  semHorarios: { color: '#666', fontSize: 14 },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  botao: {
    backgroundColor: '#d4af37',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  botaoDesabilitado: { opacity: 0.5 },
  botaoTexto: { color: '#1a1a1a', fontWeight: '700', fontSize: 16 },
});
