import React from 'react';
import { View, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Play, FileText, ExternalLink } from 'lucide-react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { GlassCard } from '../../components/ui/GlassCard';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { colors, spacing } from '../../theme';

const resources = [
  {
    titleKey: 'SPSS Basics Tutorial',
    descKey: 'Learn the fundamentals of SPSS for statistical analysis',
    icon: Play,
    type: 'video',
  },
  {
    titleKey: 'APA Tables Template',
    descKey: 'Publication-ready table templates in APA format',
    icon: FileText,
    type: 'pdf',
  },
  {
    titleKey: 'Regression Analysis Guide',
    descKey: 'Step-by-step guide to regression modeling',
    icon: BookOpen,
    type: 'guide',
  },
  {
    titleKey: 'R Programming for Beginners',
    descKey: 'Introduction to R for statistical computing',
    icon: Play,
    type: 'video',
  },
];

export default function LibraryScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <BookOpen size={28} color={colors.primary} />
          <ThemedText variant="h2">{t('library.title')}</ThemedText>
        </View>
        <ThemedText variant="body" color="secondary" style={styles.desc}>
          {t('library.desc')}
        </ThemedText>

        <View style={styles.resourceList}>
          {resources.map((res, index) => (
            <GlassCard key={index} style={styles.resourceCard}>
              <View style={[styles.iconBg, { backgroundColor: colors.primaryFaint }]}>
                <res.icon size={22} color={colors.primary} />
              </View>
              <View style={styles.resourceInfo}>
                <ThemedText variant="body" style={{ fontWeight: '600' }}>
                  {res.titleKey}
                </ThemedText>
                <ThemedText variant="caption" color="secondary">
                  {res.descKey}
                </ThemedText>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: colors.primaryFaint }]}>
                <ThemedText variant="caption" color="accent">
                  {res.type}
                </ThemedText>
              </View>
            </GlassCard>
          ))}
        </View>

        <ThemedText variant="body" color="muted" style={styles.comingSoon}>
          {t('library.comingSoon')}
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.base, paddingBottom: 120 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: spacing.sm },
  desc: { marginBottom: spacing.xl },
  resourceList: { gap: 12 },
  resourceCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBg: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  resourceInfo: { flex: 1, gap: 2 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  comingSoon: { textAlign: 'center', marginTop: spacing['2xl'] },
});
