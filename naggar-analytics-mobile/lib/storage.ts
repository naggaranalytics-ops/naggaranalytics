import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { supabase } from './supabase';

export async function pickDocument() {
  const result = await DocumentPicker.getDocumentAsync({
    type: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      'application/pdf',
    ],
    copyToCacheDirectory: true,
    multiple: true,
  });

  if (result.canceled) return null;
  return result.assets;
}

export async function pickReceiptImage() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Photo library permission required');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.8,
    allowsEditing: false,
  });

  if (result.canceled) return null;
  return result.assets[0];
}

export async function uploadFile(
  bucket: 'client_uploads' | 'delivery_files',
  path: string,
  fileUri: string,
  contentType: string
): Promise<string> {
  const response = await fetch(fileUri);
  const blob = await response.blob();

  const arrayBuffer = await new Response(blob).arrayBuffer();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, arrayBuffer, {
      contentType,
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

export async function downloadAndShareFile(url: string, filename: string) {
  const downloadDir = FileSystem.documentDirectory;
  if (!downloadDir) throw new Error('No document directory available');

  const localUri = downloadDir + filename;
  const downloadResult = await FileSystem.downloadAsync(url, localUri);

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(downloadResult.uri);
  }

  return downloadResult.uri;
}
