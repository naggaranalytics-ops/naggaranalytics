import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Download, FileText } from 'lucide-react-native';
import { GlassCard } from './ui/GlassCard';
import { ThemedText } from './ui/ThemedText';
import { StatusBadge } from './ui/StatusBadge';
import { ProgressBar } from './ui/ProgressBar';
import { useLanguage } from '../context/LanguageProvider';
import { useTheme } from '../context/ThemeProvider';
import { colors, spacing } from '../theme';
import { downloadAndShareFile } from '../lib/storage';
import type { Project } from '../types/database';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const degreeKey = `dash.degree.${project.degree.toLowerCase()}` as string;
  const dateStr = new Date(project.created_at).toLocaleDateString();

  const resultFiles = project.project_files?.filter((f) => f.file_type === 'Final Result') ?? [];
  const hasResults = resultFiles.length > 0 && project.status === 'Completed';

  const handleDownload = async () => {
    if (resultFiles.length > 0) {
      const file = resultFiles[0];
      const filename = file.file_url.split('/').pop() || 'results';
      await downloadAndShareFile(file.file_url, filename);
    }
  };

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <StatusBadge status={project.status} />
        <ThemedText variant="caption" color="muted">
          {dateStr}
        </ThemedText>
      </View>

      <View style={styles.titleRow}>
        <FileText size={16} color={colors.primary} />
        <ThemedText variant="body" style={styles.title} numberOfLines={2}>
          {project.thesis_title}
        </ThemedText>
      </View>

      <View style={styles.metaRow}>
        <ThemedText variant="caption" color="secondary">
          {t(degreeKey)}
        </ThemedText>
        <ThemedText variant="caption" color="accent" style={{ fontFamily: 'CourierPrime' }}>
          ${project.total_price}
        </ThemedText>
      </View>

      <ProgressBar status={project.status} />

      {hasResults && (
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Download size={14} color={colors.primary} />
          <ThemedText variant="caption" color="accent">
            {t('dash.downloadResults')}
          </ThemedText>
        </TouchableOpacity>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
});
