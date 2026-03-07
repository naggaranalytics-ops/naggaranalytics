import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Mail, MessageCircle } from 'lucide-react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { GlassCard } from '../../components/ui/GlassCard';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { colors, spacing } from '../../theme';

export default function ContactScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText variant="h2">
          {t('contact.title')}{' '}
          <ThemedText variant="h2" color="accent">
            {t('contact.titleHighlight')}
          </ThemedText>
        </ThemedText>

        <GlassCard style={styles.card}>
          <ThemedText variant="h3">{t('contact.inquiryTitle')}</ThemedText>
          <ThemedText variant="body" color="secondary" style={{ marginTop: 8 }}>
            {t('contact.inquiryDesc')}
          </ThemedText>
        </GlassCard>

        <GlassCard style={styles.infoCard}>
          <MapPin size={20} color={colors.primary} />
          <ThemedText variant="body" color="secondary">
            {t('contact.location')}
          </ThemedText>
        </GlassCard>

        <TouchableOpacity onPress={() => Linking.openURL('mailto:contact@naggaranalytics.com')}>
          <GlassCard style={styles.infoCard}>
            <Mail size={20} color={colors.primary} />
            <ThemedText variant="body" color="accent">
              contact@naggaranalytics.com
            </ThemedText>
          </GlassCard>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/966573657207')}>
          <GlassCard style={styles.infoCard}>
            <MessageCircle size={20} color={colors.whatsapp} />
            <ThemedText variant="body" color="accent">
              {t('dash.whatsapp')}
            </ThemedText>
          </GlassCard>
        </TouchableOpacity>

        <GlassCard style={styles.card}>
          <ThemedText variant="body" color="secondary">
            {t('contact.sendDesc')}
          </ThemedText>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.base, paddingBottom: 40 },
  card: { marginTop: spacing.lg },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: spacing.md },
});
