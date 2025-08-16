import { useAppTheme } from '@/hooks/AppThemeContext';
import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { pickAndSaveImage } from '../../components/save-image';
import { defaultProfile, Player } from '../types';


type AddPlayerScreenProps = {
  addPlayer: (player: Player) => void;
};

export default function AddPlayerScreen({ addPlayer }: AddPlayerScreenProps) {
  const colors = useAppTheme().colors

  const [image, setImage] = useState(defaultProfile);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('');
  const [points, setPoints] = useState('');
  const [rebounds, setRebounds] = useState('');
  const [assists, setAssists] = useState('');
  const [ratings, setRatings] = useState('');

  let imageSource = defaultProfile

  if (image && typeof image === 'string' && (image.startsWith("http") || image.startsWith("file:") || image.startsWith("data:"))) {
    imageSource = { uri: image }
  }

  const pickImage = async () => {
    const localUri = await pickAndSaveImage();
    if (localUri) {
      setImage(localUri);
    }
  };

  const savePlayer = () => {
    if (!name.trim()) return

    const heightString = Number(height) ? `${(Number(height) / 12).toFixed(0)}' ${Number(height) % 12}"` : 'Unknown'
    addPlayer({
      key: name,
      image,
      name,
      location: location.trim() || 'Unknown',
      age: Number(age) || 0,
      height: heightString,
      points: Number(points) || 0,
      rebounds: Number(rebounds) || 0,
      assists: Number(assists) || 0,
      ratings: Number(ratings) || 0,
    })

    setImage(defaultProfile)
    setName('')
    setLocation('')
    setAge('')
    setHeight('')
    setLocation('')
    setPoints('')
    setRebounds('')
    setAssists('')
    setRatings('')
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: 0, paddingTop: 0 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{  marginTop: 0, paddingTop: 0 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20,  marginTop: 0, paddingTop: 0 }}
          keyboardShouldPersistTaps="handled"
        >
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
                  source={imageSource}
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
                  style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter player name"
                  placeholderTextColor={colors.inputPlaceholder}
                />
              </View>

              <View style={styles.statsRow}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text }]}>Location</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Location"
                    placeholderTextColor={colors.inputPlaceholder}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text }]}>Age</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    placeholder="0  "
                    placeholderTextColor={colors.inputPlaceholder}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text }]}>Height (inches)</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                    placeholder="inches"
                    placeholderTextColor={colors.inputPlaceholder}
                  />
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statInput}>
                  <Text style={[styles.label, { color: colors.text }]}>Points</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}
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
                    style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}
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
                    style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}
                    value={assists}
                    onChangeText={setAssists}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={colors.inputPlaceholder}
                  />
                </View>

                <View style={styles.statInput}>
                  <Text style={[styles.label, { color: colors.text }]}>Ratings</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}
                    value={ratings}
                    onChangeText={setRatings}
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

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
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
    gap: 8,
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
