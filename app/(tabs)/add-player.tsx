import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
    // setImage(require('../../assets/images/react-logo.png'))
    setName('');
    setPoints('');
    setRebounds('');
    setAssists('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Player</Text>
      <View style={styles.imageSection}>
        <Pressable 
          onPress={pickImage} 
          style={({ pressed }) => [
            styles.imagePressable,
            pressed && styles.imagePressed
          ]}
        >
          <Image 
            source={typeof image === 'string' ? { uri: image } : image}
            style={styles.image}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.imageOverlayText}>Tap to change</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Player Name</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName}
            placeholder="Enter player name"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statInput}>
            <Text style={styles.label}>Points</Text>
            <TextInput 
              style={styles.input} 
              value={points} 
              onChangeText={setPoints} 
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.statInput}>
            <Text style={styles.label}>Rebounds</Text>
            <TextInput 
              style={styles.input} 
              value={rebounds} 
              onChangeText={setRebounds} 
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.statInput}>
            <Text style={styles.label}>Assists</Text>
            <TextInput 
              style={styles.input} 
              value={assists} 
              onChangeText={setAssists} 
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <Pressable 
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed
          ]} 
          onPress={savePlayer}
        >
          <Text style={styles.addButtonText}>Add Player</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e4e7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  imagePressable: {
    position: 'relative',
    borderRadius: 60,
    overflow: 'hidden',
  },
  imagePressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 6,
    alignItems: 'center',
  },
  imageOverlayText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '600',
  },
  formSection: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 30,
  },
  statInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  addButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});
