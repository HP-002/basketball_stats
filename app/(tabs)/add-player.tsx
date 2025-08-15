import React, { useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Player } from '../types';
import { pickAndSaveImage } from './save-image';

type AddPlayerScreenProps = {
  addPlayer: (player: Player) => void;
};

export default function AddPlayerScreen({ addPlayer }: AddPlayerScreenProps) {
  const [image, setImage] = useState<string>(require('../../assets/images/react-logo.png'));
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
  const [rebounds, setRebounds] = useState('');
  const [assists, setAssists] = useState('');

  const pickImage = async () => {
    const localUri = await pickAndSaveImage();
    if (localUri) {
      console.log(localUri)
      setImage(localUri);
    }
  };

  const savePlayer = () => {
    if (!name.trim()) return;
    addPlayer({
      image,
      name,
      points: Number(points),
      rebounds: Number(rebounds),
      assists: Number(assists),
    });
    setImage(require('../../assets/images/react-logo.png'))
    setName('');
    setPoints('');
    setRebounds('');
    setAssists('');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage} style={styles.image}>
        <Image 
          source={typeof image === 'string' ? { uri: image } : image}
          style={styles.image}
        ></Image>
      </Pressable>

      <Text style={styles.headings}>Player Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.headings}>Points</Text>
      <TextInput style={styles.input} value={points} onChangeText={setPoints} keyboardType="numeric" />

      <Text style={styles.headings}>Rebounds</Text>
      <TextInput style={styles.input} value={rebounds} onChangeText={setRebounds} keyboardType="numeric" />

      <Text style={styles.headings}>Assists</Text>
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
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000000"
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
