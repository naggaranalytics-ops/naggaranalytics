import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '../../../components/ui/ThemedText';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { TextInput } from '../../../components/forms/TextInput';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useTheme } from '../../../context/ThemeProvider';
import { useLanguage } from '../../../context/LanguageProvider';
import { colors, spacing, borderRadius } from '../../../theme';
import type { DegreeType } from '../../../context/OnboardingContext';

const DEGREES: { value: DegreeType; labelKey: string }[] = [
  { value: 'Masters', labelKey: 'dash.degree.masters' },
  { value: 'PhD', labelKey: 'dash.degree.phd' },
  { value: 'Other', labelKey: 'dash.degree.other' },
];

export default function Step1Screen() {
  const { academicDetails, updateAcademicDetails } = useOnboarding();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const canProceed = academicDetails.degree !== '' && academicDetails.thesisTitle.trim() !== '';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.stepIndicator}>
          <ThemedText variant="caption" color="accent">
            {t('onboarding.step')} 1 {t('onboarding.of')} 4
          </ThemedText>
        </View>

        <ThemedText variant="h2" style={styles.title}>
          {t('onboarding.step1.title')}
        </ThemedText>

        <ThemedText variant="label" color="secondary" style={styles.label}>
          {t('onboarding.step1.degree')}
        </ThemedText>

        <View style={styles.degreeRow}>
          {DEGREES.map((deg) => (
            <TouchableOpacity
              key={deg.value}
              style={[
                styles.degreeOption,
                {
                  backgroundColor:
                    academicDetails.degree === deg.value
                      ? colors.primaryFaint
                      : theme.inputBg,
                  borderColor:
                    academicDetails.degree === deg.value
                      ? colors.primary
                      : theme.inputBorder,
                },
              ]}
              onPress={() => updateAcademicDetails({ degree: deg.value })}
            >
              <ThemedText
                variant="body"
                color={academicDetails.degree === deg.value ? 'accent' : 'secondary'}
              >
                {t(deg.labelKey)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          label={t('onboarding.step1.thesis')}
          value={academicDetails.thesisTitle}
          onChangeText={(text) => updateAcademicDetails({ thesisTitle: text })}
          placeholder={t('onboarding.step1.thesisPlaceholder')}
          multiline
          numberOfLines={3}
          style={{ minHeight: 80, textAlignVertical: 'top' }}
        />

        <PrimaryButton
          title={t('onboarding.next')}
          onPress={() => router.push('/(tabs)/new-project/step-2')}
          disabled={!canProceed}
          style={styles.nextButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  stepIndicator: {
    marginBottom: spacing.base,
  },
  title: {
    marginBottom: spacing.xl,
  },
  label: {
    marginBottom: spacing.sm,
  },
  degreeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.xl,
  },
  degreeOption: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  nextButton: {
    marginTop: spacing.xl,
  },
});
