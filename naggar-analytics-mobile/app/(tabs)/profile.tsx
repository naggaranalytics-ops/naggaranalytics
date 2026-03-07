import React from 'react';
import { View, ScrollView, StyleSheet, Switch, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { User, Sun, Moon, Globe, Bell, MessageCircle, LogOut, Shield, ChevronRight } from 'lucide-react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { GlassCard } from '../../components/ui/GlassCard';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { colors, spacing } from '../../theme';

export default function ProfileScreen() {
  const { profile, signOut } = useAuth();
  const { isDark, toggleTheme, theme } = useTheme();
  const { t, toggleLang, lang } = useLanguage();

  const handleSignOut = () => {
    Alert.alert(
      t('profile.signOut'),
      t('profile.signOutConfirm'),
      [
        { text: t('profile.cancel'), style: 'cancel' },
        {
          text: t('profile.signOut'),
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgTertiary }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText variant="h2" style={styles.pageTitle}>
          {t('profile.title')}
        </ThemedText>

        {/* User Info */}
        <GlassCard style={styles.userCard}>
          <View style={[styles.avatar, { backgroundColor: colors.primaryFaint }]}>
            <User size={28} color={colors.primary} />
          </View>
          <View style={styles.userInfo}>
            <ThemedText variant="h3">
              {profile?.first_name} {profile?.last_name}
            </ThemedText>
            <ThemedText variant="caption" color="secondary">
              {profile?.email}
            </ThemedText>
            {isAdmin && (
              <View style={styles.adminBadge}>
                <Shield size={12} color={colors.primary} />
                <ThemedText variant="caption" color="accent">Admin</ThemedText>
              </View>
            )}
          </View>
        </GlassCard>

        {/* Admin Link */}
        {isAdmin && (
          <TouchableOpacity onPress={() => router.push('/(admin)')}>
            <GlassCard style={styles.settingRow}>
              <Shield size={20} color={colors.primary} />
              <ThemedText variant="body" style={styles.settingLabel}>
                {t('admin.title')}
              </ThemedText>
              <ChevronRight size={18} color={theme.textMuted} />
            </GlassCard>
          </TouchableOpacity>
        )}

        {/* Settings */}
        <ThemedText variant="label" color="muted" style={styles.sectionTitle}>
          {t('profile.settings')}
        </ThemedText>

        <GlassCard style={styles.settingsGroup}>
          <View style={styles.settingRow}>
            {isDark ? <Moon size={20} color={theme.textSecondary} /> : <Sun size={20} color={theme.textSecondary} />}
            <ThemedText variant="body" style={styles.settingLabel}>
              {isDark ? t('profile.darkMode') : t('profile.lightMode')}
            </ThemedText>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.borderColor }]} />

          <TouchableOpacity style={styles.settingRow} onPress={toggleLang}>
            <Globe size={20} color={theme.textSecondary} />
            <ThemedText variant="body" style={styles.settingLabel}>
              {t('profile.language')}
            </ThemedText>
            <ThemedText variant="caption" color="accent">
              {lang === 'en' ? 'English' : 'العربية'}
            </ThemedText>
          </TouchableOpacity>
        </GlassCard>

        {/* Support */}
        <ThemedText variant="label" color="muted" style={styles.sectionTitle}>
          {t('profile.support')}
        </ThemedText>

        <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/966573657207')}>
          <GlassCard style={styles.settingRow}>
            <MessageCircle size={20} color={colors.whatsapp} />
            <ThemedText variant="body" style={styles.settingLabel}>
              {t('profile.whatsapp')}
            </ThemedText>
            <ChevronRight size={18} color={theme.textMuted} />
          </GlassCard>
        </TouchableOpacity>

        {/* Sign Out */}
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <LogOut size={20} color={colors.error} />
          <ThemedText variant="body" color="error" style={{ fontWeight: '600' }}>
            {t('profile.signOut')}
          </ThemedText>
        </TouchableOpacity>

        <ThemedText variant="caption" color="muted" style={styles.version}>
          {t('profile.version')} 1.0.0
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.base, paddingBottom: 120 },
  pageTitle: { marginBottom: spacing.lg },
  userCard: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: spacing.lg },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  userInfo: { flex: 1, gap: 2 },
  adminBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  sectionTitle: { marginTop: spacing.lg, marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 1 },
  settingsGroup: { gap: 0, padding: 0, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: spacing.base },
  settingLabel: { flex: 1 },
  divider: { height: 1, marginHorizontal: spacing.base },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing['2xl'],
    padding: spacing.base,
  },
  version: { textAlign: 'center', marginTop: spacing.lg },
});
