import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { Camera, Image as ImageIcon, Check, Copy } from 'lucide-react-native';
import { ThemedText } from '../../../components/ui/ThemedText';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useAuth } from '../../../context/AuthProvider';
import { useTheme } from '../../../context/ThemeProvider';
import { useLanguage } from '../../../context/LanguageProvider';
import { pickReceiptImage, uploadFile } from '../../../lib/storage';
import { supabase } from '../../../lib/supabase';
import { colors, spacing, borderRadius } from '../../../theme';

const IBAN = 'SA58 8000 0865 6080 1764 0585';
const SWIFT = 'RJHISARI';

export default function Step4Screen() {
  const { tasks, calculateTotal, files, academicDetails, receipt, setReceipt, paymentPhase, setPaymentPhase, reset } = useOnboarding();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState('');

  const total = calculateTotal();
  const amountDue = paymentPhase === 'Deposit 70%' ? Math.round(total * 0.7) : total;

  const handlePickReceipt = async () => {
    try {
      const result = await pickReceiptImage();
      if (result) {
        setReceipt({
          uri: result.uri,
          name: result.fileName || 'receipt.jpg',
          mimeType: result.mimeType || 'image/jpeg',
        });
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const handleCopy = async (text: string, field: string) => {
    await Clipboard.setStringAsync(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSubmit = async () => {
    if (!user || !receipt) return;
    setSubmitting(true);

    try {
      // Upload receipt
      const receiptPath = `${user.id}/${Date.now()}/receipt_${receipt.name}`;
      const receiptUrl = await uploadFile('client_uploads', receiptPath, receipt.uri, receipt.mimeType || 'image/jpeg');

      // Create project record
      const { data: project, error: projError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          thesis_title: academicDetails.thesisTitle,
          degree: academicDetails.degree,
          status: 'Pending',
          selected_tasks: tasks,
          total_price: total,
          payment_phase: paymentPhase,
          receipt_url: receiptUrl,
          is_verified: false,
        })
        .select()
        .single();

      if (projError) throw projError;

      // Upload data files
      for (const file of files) {
        const filePath = `${user.id}/${project.id}/${file.name}`;
        const fileUrl = await uploadFile('client_uploads', filePath, file.uri, file.mimeType || 'application/octet-stream');

        await supabase.from('project_files').insert({
          project_id: project.id,
          file_url: fileUrl,
          file_type: 'Raw Data',
          uploaded_by: user.id,
        });
      }

      reset();
      Alert.alert(t('onboarding.success'), t('onboarding.successMsg'), [
        { text: t('common.ok'), onPress: () => router.replace('/(tabs)') },
      ]);
    } catch (err: any) {
      Alert.alert(t('common.error'), err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = receipt !== null && !submitting;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.stepIndicator}>
          <ThemedText variant="caption" color="accent">
            {t('onboarding.step')} 4 {t('onboarding.of')} 4
          </ThemedText>
        </View>

        <ThemedText variant="h2" style={styles.title}>
          {t('onboarding.step4.title')}
        </ThemedText>

        {/* Bank Details */}
        <GlassCard style={styles.bankCard}>
          <ThemedText variant="h3" style={styles.bankTitle}>
            {t('onboarding.step4.bankTitle')}
          </ThemedText>

          <View style={styles.bankRow}>
            <ThemedText variant="caption" color="muted">Bank</ThemedText>
            <ThemedText variant="body">{t('onboarding.step4.bankName')}</ThemedText>
          </View>

          <View style={styles.bankRow}>
            <ThemedText variant="caption" color="muted">Account Name</ThemedText>
            <ThemedText variant="body">{t('onboarding.step4.accountName')}</ThemedText>
          </View>

          <View style={styles.bankRow}>
            <ThemedText variant="caption" color="muted">{t('onboarding.step4.iban')}</ThemedText>
            <TouchableOpacity style={styles.copyRow} onPress={() => handleCopy(IBAN, 'iban')}>
              <ThemedText variant="mono" style={styles.ibanText}>{IBAN}</ThemedText>
              {copied === 'iban' ? (
                <Check size={14} color={colors.primary} />
              ) : (
                <Copy size={14} color={theme.textMuted} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.bankRow}>
            <ThemedText variant="caption" color="muted">{t('onboarding.step4.swift')}</ThemedText>
            <TouchableOpacity style={styles.copyRow} onPress={() => handleCopy(SWIFT, 'swift')}>
              <ThemedText variant="mono">{SWIFT}</ThemedText>
              {copied === 'swift' ? (
                <Check size={14} color={colors.primary} />
              ) : (
                <Copy size={14} color={theme.textMuted} />
              )}
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Amount Due */}
        <GlassCard style={styles.amountCard}>
          <ThemedText variant="body" color="secondary">
            {t('onboarding.step4.amountDue')}
          </ThemedText>
          <ThemedText variant="h1" color="accent" style={{ fontFamily: 'CourierPrime' }}>
            ${amountDue}
          </ThemedText>
        </GlassCard>

        {/* Payment Phase */}
        <ThemedText variant="label" color="secondary" style={styles.sectionLabel}>
          {t('onboarding.step4.paymentPhase')}
        </ThemedText>
        <View style={styles.phaseRow}>
          {(['Deposit 70%', 'Paid in Full'] as const).map((phase) => (
            <TouchableOpacity
              key={phase}
              style={[
                styles.phaseOption,
                {
                  backgroundColor: paymentPhase === phase ? colors.primaryFaint : theme.inputBg,
                  borderColor: paymentPhase === phase ? colors.primary : theme.inputBorder,
                },
              ]}
              onPress={() => setPaymentPhase(phase)}
            >
              <ThemedText
                variant="body"
                color={paymentPhase === phase ? 'accent' : 'secondary'}
              >
                {phase === 'Deposit 70%' ? t('onboarding.step4.deposit') : t('onboarding.step4.full')}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Receipt Upload */}
        <TouchableOpacity onPress={handlePickReceipt}>
          <GlassCard style={styles.receiptArea}>
            {receipt ? (
              <View style={styles.receiptDone}>
                <Check size={24} color={colors.primary} />
                <ThemedText variant="body" color="accent">
                  {t('onboarding.step4.receiptUploaded')}
                </ThemedText>
                <ThemedText variant="caption" color="muted" numberOfLines={1}>
                  {receipt.name}
                </ThemedText>
              </View>
            ) : (
              <View style={styles.receiptPlaceholder}>
                <ImageIcon size={32} color={colors.primary} />
                <ThemedText variant="body" color="accent" style={{ marginTop: 8 }}>
                  {t('onboarding.step4.uploadReceipt')}
                </ThemedText>
              </View>
            )}
          </GlassCard>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <PrimaryButton
            title={t('onboarding.back')}
            onPress={() => router.back()}
            variant="outline"
            style={styles.halfButton}
          />
          <PrimaryButton
            title={submitting ? t('onboarding.submitting') : t('onboarding.submit')}
            onPress={handleSubmit}
            loading={submitting}
            disabled={!canSubmit}
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
  bankCard: { marginBottom: spacing.base, gap: 12 },
  bankTitle: { marginBottom: 4 },
  bankRow: { gap: 2 },
  copyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ibanText: { fontSize: 13 },
  amountCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  sectionLabel: { marginBottom: spacing.sm },
  phaseRow: { flexDirection: 'row', gap: 10, marginBottom: spacing.xl },
  phaseOption: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  receiptArea: { alignItems: 'center', paddingVertical: spacing['2xl'] },
  receiptPlaceholder: { alignItems: 'center' },
  receiptDone: { alignItems: 'center', gap: 4 },
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: spacing['2xl'] },
  halfButton: { flex: 1 },
});
