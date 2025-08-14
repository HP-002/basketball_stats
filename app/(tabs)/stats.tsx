import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Player } from '../types';

type StatsScreenProps = {
  players: Player[];
};

export default function StatsScreen({ players }: StatsScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats Screen</Text>
      <Text>Total Players: {players.length}</Text>
      {/* Later: add charts here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
