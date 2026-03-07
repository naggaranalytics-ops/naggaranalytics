import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../components/ui/ThemedText';
import { GlassCard } from '../../components/ui/GlassCard';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { spacing } from '../../theme';

export default function AboutScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText variant="h2">
          {t('about.title')}{' '}
          <ThemedText variant="h2" color="accent">
            {t('about.titleHighlight')}
          </ThemedText>
        </ThemedText>

        <GlassCard style={styles.card}>
          <ThemedText variant="body" color="secondary" style={styles.paragraph}>
            {t('about.p1')}
          </ThemedText>
          <ThemedText variant="body" color="secondary">
            {t('about.p2')}
          </ThemedText>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.base, paddingBottom: 40 },
  card: { marginTop: spacing.xl, gap: 16 },
  paragraph: { lineHeight: 24 },
});
