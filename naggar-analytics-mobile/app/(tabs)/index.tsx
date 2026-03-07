import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FileText, Clock, CheckCircle, PlusCircle, BookOpen, MessageCircle } from 'lucide-react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { GlassCard } from '../../components/ui/GlassCard';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { ProjectCard } from '../../components/ProjectCard';
import { WhatsAppFAB } from '../../components/WhatsAppFAB';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { useProjects } from '../../hooks/useProjects';
import { colors, spacing } from '../../theme';

export default function DashboardScreen() {
  const { profile } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { projects, loading, error, refresh, stats } = useProjects();

  const userName = profile?.first_name || t('dash.subtitle');

  const statCards = [
    { label: t('dash.totalProjects'), value: stats.total, icon: FileText, color: colors.primary },
    { label: t('dash.active'), value: stats.active, icon: Clock, color: '#60a5fa' },
    { label: t('dash.completed'), value: stats.completed, icon: CheckCircle, color: '#4ade80' },
  ];

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <ThemedText variant="h2">
        {t('dash.welcome', { name: userName })}
      </ThemedText>
      <ThemedText variant="body" color="secondary" style={styles.subtitle}>
        {t('dash.subtitle')}
      </ThemedText>

      <View style={styles.statsRow}>
        {statCards.map((stat, index) => (
          <GlassCard key={index} style={styles.statCard} padding={spacing.base}>
            <stat.icon size={20} color={stat.color} />
            <ThemedText variant="h3" style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
            </ThemedText>
            <ThemedText variant="caption" color="muted" numberOfLines={1}>
              {stat.label}
            </ThemedText>
          </GlassCard>
        ))}
      </View>

      <PrimaryButton
        title={t('dash.newProject')}
        onPress={() => router.push('/(tabs)/new-project/step-1')}
        style={styles.newProjectButton}
      />

      <ThemedText variant="h3" style={styles.sectionTitle}>
        {t('dash.currentProjects')}
      </ThemedText>
    </View>
  );

  const renderEmpty = () => (
    <GlassCard style={styles.emptyCard}>
      <FileText size={40} color={theme.textMuted} />
      <ThemedText variant="body" color="muted" style={styles.emptyText}>
        {t('dash.empty')}
      </ThemedText>
      <PrimaryButton
        title={t('dash.newProject')}
        onPress={() => router.push('/(tabs)/new-project/step-1')}
        variant="outline"
      />
    </GlassCard>
  );

  const renderFooter = () => (
    <View style={styles.footerCards}>
      <GlassCard style={styles.infoCard}>
        <BookOpen size={20} color={colors.primary} />
        <View style={styles.infoCardContent}>
          <ThemedText variant="body" style={{ fontWeight: '600' }}>
            {t('dash.library')}
          </ThemedText>
          <ThemedText variant="caption" color="secondary">
            {t('dash.libraryDesc')}
          </ThemedText>
        </View>
      </GlassCard>

      <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/966573657207')}>
        <GlassCard style={styles.infoCard}>
          <MessageCircle size={20} color={colors.whatsapp} />
          <View style={styles.infoCardContent}>
            <ThemedText variant="body" style={{ fontWeight: '600' }}>
              {t('dash.support')}
            </ThemedText>
            <ThemedText variant="caption" color="secondary">
              {t('dash.supportDesc')}
            </ThemedText>
          </View>
        </GlassCard>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <FlatList
        data={projects}
        renderItem={({ item }) => <ProjectCard project={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!loading ? renderEmpty : null}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
      <WhatsAppFAB />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: spacing.base,
    paddingBottom: 120,
  },
  headerSection: {
    marginBottom: spacing.base,
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontFamily: 'CourierPrime',
  },
  newProjectButton: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  emptyCard: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: spacing['2xl'],
  },
  emptyText: {
    textAlign: 'center',
  },
  footerCards: {
    marginTop: spacing.xl,
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoCardContent: {
    flex: 1,
    gap: 2,
  },
});
