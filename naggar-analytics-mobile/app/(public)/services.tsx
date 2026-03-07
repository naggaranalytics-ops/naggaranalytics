import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart3, Database, FileCheck } from 'lucide-react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { GlassCard } from '../../components/ui/GlassCard';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { colors, spacing } from '../../theme';

export default function ServicesScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const services = [
    {
      icon: BarChart3,
      titleKey: 'services.s1.title',
      descKey: 'services.s1.desc',
      items: ['services.s1.item1', 'services.s1.item2', 'services.s1.item3'],
    },
    {
      icon: Database,
      titleKey: 'services.s2.title',
      descKey: 'services.s2.desc',
      items: ['services.s2.item1', 'services.s2.item2', 'services.s2.item3'],
    },
    {
      icon: FileCheck,
      titleKey: 'services.s3.title',
      descKey: 'services.s3.desc',
      items: ['services.s3.item1', 'services.s3.item2', 'services.s3.item3'],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText variant="h2">
          {t('services.title')}{' '}
          <ThemedText variant="h2" color="accent">
            {t('services.titleHighlight')}
          </ThemedText>
        </ThemedText>

        <View style={styles.cardList}>
          {services.map((svc, i) => (
            <GlassCard key={i} style={styles.serviceCard}>
              <View style={[styles.iconBg, { backgroundColor: colors.primaryFaint }]}>
                <svc.icon size={24} color={colors.primary} />
              </View>
              <ThemedText variant="h3" style={styles.cardTitle}>
                {t(svc.titleKey)}
              </ThemedText>
              <ThemedText variant="body" color="secondary" style={styles.cardDesc}>
                {t(svc.descKey)}
              </ThemedText>
              {svc.items.map((item, j) => (
                <View key={j} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <ThemedText variant="body" color="secondary">
                    {t(item)}
                  </ThemedText>
                </View>
              ))}
            </GlassCard>
          ))}
        </View>

        <GlassCard style={styles.customCard}>
          <ThemedText variant="h3">{t('services.custom.title')}</ThemedText>
          <ThemedText variant="body" color="secondary" style={{ marginTop: 8 }}>
            {t('services.custom.desc')}
          </ThemedText>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.base, paddingBottom: 40 },
  cardList: { gap: 16, marginTop: spacing.xl },
  serviceCard: { gap: 8 },
  iconBg: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { marginTop: 4 },
  cardDesc: { marginBottom: 4 },
  bulletRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 4 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary },
  customCard: { marginTop: spacing.xl },
});
