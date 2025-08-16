import { useAppTheme } from '@/hooks/AppThemeContext';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Player } from '../types';
import { pickAndSaveImage } from './save-image';


type AddPlayerScreenProps = {
  addPlayer: (player: Player) => void;
};

export default function AddPlayerScreen({ addPlayer }: AddPlayerScreenProps) {
  const colors = useAppTheme().colors

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
            style={[styles.image, { borderColor: colors.imageBorder }]}
          />
          <View style={[styles.imageOverlay, { backgroundColor: colors.imageOverlayBackground }]}>
            <Text style={[styles.imageOverlayText, { color: colors.imageOverlayText }]}>Change</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Player Name</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor}]} 
            value={name} 
            onChangeText={setName}
            placeholder="Enter player name"
            placeholderTextColor={colors.inputPlaceholder}
          />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statInput}>
            <Text style={[styles.label, { color: colors.text }]}>Points</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor}]} 
              value={points} 
              onChangeText={setPoints} 
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.inputPlaceholder}
            />
          </View>

          <View style={styles.statInput}>
            <Text style={[styles.label, { color: colors.text }]}>Rebounds</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor}]} 
              value={rebounds} 
              onChangeText={setRebounds} 
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.inputPlaceholder}
            />
          </View>

          <View style={styles.statInput}>
            <Text style={[styles.label, { color: colors.text }]}>Assists</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor}]} 
              value={assists} 
              onChangeText={setAssists} 
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.inputPlaceholder}
            />
          </View>
        </View>

        <Pressable 
          style={({ pressed }) => [
            styles.addButton,
            { backgroundColor: colors.buttonBackground, shadowColor: colors.shadowColor },
            pressed && styles.addButtonPressed
          ]} 
          onPress={savePlayer}
        >
          <Text style={[styles.addButtonText, { color: colors.buttonText }]}>Add Player</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    alignItems: 'center',
  },
  imageOverlayText: {
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
    marginBottom: 8,
  },
  input: {
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
    borderWidth: 1,
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
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20,
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
    fontSize: 18,
    fontWeight: '700',
  },
});
