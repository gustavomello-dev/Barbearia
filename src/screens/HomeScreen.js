import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.emoji}>💈</Text>
        <Text style={styles.titulo}>Barbearia</Text>
        <Text style={styles.subtitulo}>Agende seu horário com praticidade</Text>
      </View>

      <View style={styles.cards}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Agendar')}
          activeOpacity={0.8}
        >
          <Text style={styles.cardEmoji}>📅</Text>
          <Text style={styles.cardTitulo}>Novo agendamento</Text>
          <Text style={styles.cardTexto}>Escolha o serviço e o horário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Servicos')}
          activeOpacity={0.8}
        >
          <Text style={styles.cardEmoji}>✂️</Text>
          <Text style={styles.cardTitulo}>Serviços</Text>
          <Text style={styles.cardTexto}>Veja cortes, barba e mais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('MeusAgendamentos')}
          activeOpacity={0.8}
        >
          <Text style={styles.cardEmoji}>📋</Text>
          <Text style={styles.cardTitulo}>Meus horários</Text>
          <Text style={styles.cardTexto}>Suas reservas agendadas</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.rodape}>Horário de funcionamento: Seg–Sáb, 8h–19h</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
    paddingTop: 16,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#d4af37',
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 15,
    color: '#999',
    marginTop: 4,
  },
  cards: {
    gap: 16,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  cardTexto: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  rodape: {
    marginTop: 'auto',
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
  },
});
