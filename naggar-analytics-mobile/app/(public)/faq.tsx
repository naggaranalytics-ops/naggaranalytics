import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { GlassCard } from '../../components/ui/GlassCard';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { colors, spacing } from '../../theme';

const FAQ_ITEMS = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
];

export default function FAQScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText variant="h2">
          {t('faq.title')}{' '}
          <ThemedText variant="h2" color="accent">
            {t('faq.titleHighlight')}
          </ThemedText>
        </ThemedText>

        <View style={styles.faqList}>
          {FAQ_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setExpanded(expanded === index ? null : index)}
              activeOpacity={0.8}
            >
              <GlassCard style={styles.faqCard}>
                <View style={styles.questionRow}>
                  <ThemedText variant="body" style={styles.question}>
                    {t(item.q)}
                  </ThemedText>
                  {expanded === index ? (
                    <ChevronUp size={20} color={colors.primary} />
                  ) : (
                    <ChevronDown size={20} color={theme.textMuted} />
                  )}
                </View>
                {expanded === index && (
                  <ThemedText variant="body" color="secondary" style={styles.answer}>
                    {t(item.a)}
                  </ThemedText>
                )}
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.base, paddingBottom: 40 },
  faqList: { gap: 12, marginTop: spacing.xl },
  faqCard: {},
  questionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  question: { flex: 1, fontWeight: '600', marginRight: 8 },
  answer: { marginTop: 12, lineHeight: 22 },
});
