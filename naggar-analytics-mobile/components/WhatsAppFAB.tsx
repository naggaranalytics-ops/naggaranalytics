import React from 'react';
import { TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { colors } from '../theme';

const WHATSAPP_NUMBER = '966573657207';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WhatsAppFAB: React.FC = () => {
  const handlePress = () => {
    Linking.openURL(WHATSAPP_URL);
  };

  return (
    <TouchableOpacity style={styles.fab} onPress={handlePress} activeOpacity={0.8}>
      <MessageCircle size={26} color="#ffffff" fill="#ffffff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.whatsapp,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.whatsapp,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
});
