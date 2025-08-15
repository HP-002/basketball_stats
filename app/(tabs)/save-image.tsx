import * as ImagePicker from 'expo-image-picker';

export async function pickAndSaveImage(): Promise<string | null> {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    alert('Permission to access gallery is required!');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (result.canceled) {
    return null;
  }

  console.log(result)
  return result.assets[0].uri
}
