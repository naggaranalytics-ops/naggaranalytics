import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Upload, File, X } from 'lucide-react-native';
import { ThemedText } from '../../../components/ui/ThemedText';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useTheme } from '../../../context/ThemeProvider';
import { useLanguage } from '../../../context/LanguageProvider';
import { pickDocument } from '../../../lib/storage';
import { colors, spacing } from '../../../theme';

export default function Step2Screen() {
  const { files, setFiles } = useOnboarding();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const handlePickFiles = async () => {
    const result = await pickDocument();
    if (result) {
      const mapped = result.map((f) => ({
        uri: f.uri,
        name: f.name,
        size: f.size ?? undefined,
        mimeType: f.mimeType ?? undefined,
      }));
      setFiles([...files, ...mapped]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.stepIndicator}>
          <ThemedText variant="caption" color="accent">
            {t('onboarding.step')} 2 {t('onboarding.of')} 4
          </ThemedText>
        </View>

        <ThemedText variant="h2" style={styles.title}>
          {t('onboarding.step2.title')}
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.desc}>
          {t('onboarding.step2.desc')}
        </ThemedText>

        <TouchableOpacity onPress={handlePickFiles}>
          <GlassCard style={styles.uploadArea}>
            <Upload size={32} color={colors.primary} />
            <ThemedText variant="body" color="accent" style={{ marginTop: 8 }}>
              {t('onboarding.step2.selectFiles')}
            </ThemedText>
            <ThemedText variant="caption" color="muted">
              .xlsx, .csv, .pdf
            </ThemedText>
          </GlassCard>
        </TouchableOpacity>

        {files.length > 0 && (
          <View style={styles.fileList}>
            <ThemedText variant="label" color="secondary" style={styles.fileCount}>
              {t('onboarding.step2.filesSelected', { count: String(files.length) })}
            </ThemedText>
            {files.map((file, index) => (
              <View
                key={index}
                style={[styles.fileItem, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}
              >
                <File size={16} color={colors.primary} />
                <View style={styles.fileInfo}>
                  <ThemedText variant="caption" numberOfLines={1}>
                    {file.name}
                  </ThemedText>
                  {file.size ? (
                    <ThemedText variant="caption" color="muted">
                      {formatSize(file.size)}
                    </ThemedText>
                  ) : null}
                </View>
                <TouchableOpacity onPress={() => removeFile(index)}>
                  <X size={16} color={theme.textMuted} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {files.length === 0 && (
          <ThemedText variant="body" color="muted" style={styles.noFiles}>
            {t('onboarding.step2.noFiles')}
          </ThemedText>
        )}

        <View style={styles.buttonRow}>
          <PrimaryButton
            title={t('onboarding.back')}
            onPress={() => router.back()}
            variant="outline"
            style={styles.halfButton}
          />
          <PrimaryButton
            title={t('onboarding.next')}
            onPress={() => router.push('/(tabs)/new-project/step-3')}
            disabled={files.length === 0}
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
  title: { marginBottom: spacing.sm },
  desc: { marginBottom: spacing.xl },
  uploadArea: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    borderStyle: 'dashed',
  },
  fileList: { marginTop: spacing.lg },
  fileCount: { marginBottom: spacing.sm },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  fileInfo: { flex: 1 },
  noFiles: { textAlign: 'center', marginTop: spacing.xl },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: spacing['2xl'],
  },
  halfButton: { flex: 1 },
});
