import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Player } from '../types';

type AddPlayerScreenProps = {
  addPlayer: (player: Player) => void;
};

export default function AddPlayerScreen({ addPlayer }: AddPlayerScreenProps) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
  const [rebounds, setRebounds] = useState('');
  const [assists, setAssists] = useState('');

  const savePlayer = () => {
    if (!name.trim()) return;
    addPlayer({
      image, 
      name,
      points: Number(points),
      rebounds: Number(rebounds),
      assists: Number(assists),
    });
    setName('');
    setPoints('');
    setRebounds('');
    setAssists('');
  };

  return (
    <View style={styles.container}>
      <Text>Player Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text>Points</Text>
      <TextInput style={styles.input} value={points} onChangeText={setPoints} keyboardType="numeric" />

      <Text>Rebounds</Text>
      <TextInput style={styles.input} value={rebounds} onChangeText={setRebounds} keyboardType="numeric" />

      <Text>Assists</Text>
      <TextInput style={styles.input} value={assists} onChangeText={setAssists} keyboardType="numeric" />

      <Button title="Add Player" onPress={savePlayer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
  },
  headings: {
    fontSize: 24,
    fontWeight: 'semibold',
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 8, 
    marginBottom: 12 
  },
});
