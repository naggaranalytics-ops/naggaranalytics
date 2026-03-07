import React, { useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronRight, Shield, User, Calendar, DollarSign } from 'lucide-react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { GlassCard } from '../../components/ui/GlassCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAllProjects } from '../../hooks/useProjects';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { supabase } from '../../lib/supabase';
import { PROJECT_STATUS_ORDER, type ProjectStatus } from '../../types/database';
import { colors, spacing } from '../../theme';
import { pickDocument, uploadFile, downloadAndShareFile } from '../../lib/storage';

export default function AdminScreen() {
  const { projects, loading, refresh } = useAllProjects();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const advanceStatus = async (projectId: string, currentStatus: ProjectStatus) => {
    const currentIndex = PROJECT_STATUS_ORDER.indexOf(currentStatus);
    if (currentIndex >= PROJECT_STATUS_ORDER.length - 1) return;

    const nextStatus = PROJECT_STATUS_ORDER[currentIndex + 1];
    const { error } = await supabase
      .from('projects')
      .update({ status: nextStatus, is_verified: nextStatus !== 'Pending' })
      .eq('id', projectId);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      refresh();
    }
  };

  const handleUploadDelivery = async (projectId: string, userId: string) => {
    const result = await pickDocument();
    if (!result || result.length === 0) return;

    try {
      const file = result[0];
      const path = `${userId}/${projectId}/delivery_${file.name}`;
      const fileUrl = await uploadFile('delivery_files', path, file.uri, file.mimeType || 'application/octet-stream');

      await supabase.from('project_files').insert({
        project_id: projectId,
        file_url: fileUrl,
        file_type: 'Final Result',
        uploaded_by: userId,
      });

      Alert.alert(t('admin.deliveryUploaded'));
      refresh();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const handleDownloadReceipt = async (receiptUrl: string) => {
    if (!receiptUrl) return;
    const filename = receiptUrl.split('/').pop() || 'receipt';
    await downloadAndShareFile(receiptUrl, filename);
  };

  const renderProject = ({ item }: { item: any }) => {
    const clientName = item.profiles
      ? `${item.profiles.first_name || ''} ${item.profiles.last_name || ''}`.trim()
      : 'Unknown';
    const clientEmail = item.profiles?.email || '';
    const dateStr = new Date(item.created_at).toLocaleDateString();
    const isCompleted = item.status === 'Completed';

    return (
      <GlassCard style={styles.projectCard}>
        <View style={styles.cardHeader}>
          <StatusBadge status={item.status} />
          <ThemedText variant="caption" color="muted">{dateStr}</ThemedText>
        </View>

        <ThemedText variant="body" style={{ fontWeight: '600' }} numberOfLines={2}>
          {item.thesis_title}
        </ThemedText>

        <View style={styles.clientRow}>
          <User size={14} color={theme.textMuted} />
          <ThemedText variant="caption" color="secondary">
            {clientName} ({clientEmail})
          </ThemedText>
        </View>

        <View style={styles.metaRow}>
          <ThemedText variant="caption" color="muted">{item.degree}</ThemedText>
          <ThemedText variant="caption" color="accent" style={{ fontFamily: 'CourierPrime' }}>
            ${item.total_price} ({item.payment_phase})
          </ThemedText>
        </View>

        <ProgressBar status={item.status} />

        <View style={styles.actions}>
          {item.receipt_url && (
            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: theme.inputBorder }]}
              onPress={() => handleDownloadReceipt(item.receipt_url)}
            >
              <ThemedText variant="caption" color="secondary">
                {t('admin.downloadReceipt')}
              </ThemedText>
            </TouchableOpacity>
          )}

          {!isCompleted && (
            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: colors.primary, backgroundColor: colors.primaryFaint }]}
              onPress={() => advanceStatus(item.id, item.status)}
            >
              <ThemedText variant="caption" color="accent">
                {t('admin.advanceStatus')}
              </ThemedText>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: theme.inputBorder }]}
            onPress={() => handleUploadDelivery(item.id, item.user_id)}
          >
            <ThemedText variant="caption" color="secondary">
              {t('admin.uploadDelivery')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </GlassCard>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={22} color={theme.textPrimary} />
        </TouchableOpacity>
        <Shield size={22} color={colors.primary} />
        <ThemedText variant="h2">{t('admin.title')}</ThemedText>
      </View>

      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          !loading ? (
            <ThemedText variant="body" color="muted" style={styles.empty}>
              {t('admin.noProjects')}
            </ThemedText>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: spacing.base },
  backButton: { padding: 4 },
  listContent: { padding: spacing.base, paddingBottom: 40 },
  projectCard: { marginBottom: 14, gap: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  clientRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  empty: { textAlign: 'center', marginTop: spacing['3xl'] },
});
