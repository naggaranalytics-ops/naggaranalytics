import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { ThemedText } from '../../../components/ui/ThemedText';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useTheme } from '../../../context/ThemeProvider';
import { useLanguage } from '../../../context/LanguageProvider';
import { TASK_PRICES } from '../../../types/database';
import { colors, spacing, borderRadius } from '../../../theme';

const TASKS = [
  { key: 'cleaning' as const, price: TASK_PRICES.cleaning },
  { key: 'descriptive' as const, price: TASK_PRICES.descriptive },
  { key: 'inferential' as const, price: TASK_PRICES.inferential },
  { key: 'writing' as const, price: TASK_PRICES.writing },
];

export default function Step3Screen() {
  const { tasks, updateTasks, calculateTotal } = useOnboarding();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const total = calculateTotal();
  const hasSelection = Object.values(tasks).some(Boolean);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.stepIndicator}>
          <ThemedText variant="caption" color="accent">
            {t('onboarding.step')} 3 {t('onboarding.of')} 4
          </ThemedText>
        </View>

        <ThemedText variant="h2" style={styles.title}>
          {t('onboarding.step3.title')}
        </ThemedText>

        <View style={styles.taskList}>
          {TASKS.map((task) => {
            const isSelected = tasks[task.key];
            return (
              <TouchableOpacity
                key={task.key}
                onPress={() => updateTasks({ [task.key]: !isSelected })}
                activeOpacity={0.7}
              >
                <GlassCard
                  style={[
                    styles.taskCard,
                    isSelected && {
                      borderColor: colors.primary,
                      borderWidth: 2,
                    },
                  ]}
                >
                  <View style={styles.taskHeader}>
                    <View style={styles.taskInfo}>
                      <ThemedText variant="body" style={{ fontWeight: '600' }}>
                        {t(`onboarding.step3.${task.key}`)}
                      </ThemedText>
                      <ThemedText variant="caption" color="secondary">
                        {t(`onboarding.step3.${task.key}Desc`)}
                      </ThemedText>
                    </View>
                    <View style={styles.taskRight}>
                      <ThemedText variant="body" color="accent" style={{ fontFamily: 'CourierPrime', fontWeight: '700' }}>
                        ${task.price}
                      </ThemedText>
                      <View
                        style={[
                          styles.checkbox,
                          {
                            backgroundColor: isSelected ? colors.primary : 'transparent',
                            borderColor: isSelected ? colors.primary : theme.inputBorder,
                          },
                        ]}
                      >
                        {isSelected && <Check size={14} color="#ffffff" />}
                      </View>
                    </View>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            );
          })}
        </View>

        <GlassCard style={styles.totalCard}>
          <ThemedText variant="body" color="secondary">
            {t('onboarding.step3.total')}
          </ThemedText>
          <ThemedText variant="h2" color="accent" style={{ fontFamily: 'CourierPrime' }}>
            ${total}
          </ThemedText>
        </GlassCard>

        <View style={styles.buttonRow}>
          <PrimaryButton
            title={t('onboarding.back')}
            onPress={() => router.back()}
            variant="outline"
            style={styles.halfButton}
          />
          <PrimaryButton
            title={t('onboarding.next')}
            onPress={() => router.push('/(tabs)/new-project/step-4')}
            disabled={!hasSelection}
            style={styles.halfButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.xl, paddingBottom: spacing['3xl'] },
  stepIndicator: { marginBottom: spacing.base },
  title: { marginBottom: spacing.xl },
  taskList: { gap: 12 },
  taskCard: { borderWidth: 1, borderColor: 'transparent' },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: { flex: 1, gap: 2 },
  taskRight: { alignItems: 'center', gap: 8 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: spacing['2xl'],
  },
  halfButton: { flex: 1 },
});
