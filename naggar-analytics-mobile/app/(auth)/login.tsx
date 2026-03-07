import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '../../components/ui/ThemedText';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { TextInput } from '../../components/forms/TextInput';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { colors, spacing } from '../../theme';
import { Sun, Moon, Globe } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();
  const { isDark, toggleTheme, theme } = useTheme();
  const { t, toggleLang, lang } = useLanguage();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    const result = await signIn(email.trim(), password);
    if (result.error) {
      setError(result.error);
    } else {
      router.replace('/(tabs)');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.bgTertiary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
            {isDark ? (
              <Sun size={20} color={theme.textSecondary} />
            ) : (
              <Moon size={20} color={theme.textSecondary} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleLang} style={styles.iconButton}>
            <Globe size={20} color={theme.textSecondary} />
            <ThemedText variant="caption" color="secondary" style={{ marginLeft: 4 }}>
              {t('lang.toggle')}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={
              isDark
                ? require('../../assets/images/logo-dark.png')
                : require('../../assets/images/logo-light.png')
            }
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <ThemedText variant="h2" style={styles.title}>
          {t('auth.welcome')}
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.subtitle}>
          {t('auth.welcomeSub')}
        </ThemedText>

        {error ? (
          <View style={styles.errorBox}>
            <ThemedText variant="caption" color="error">
              {error}
            </ThemedText>
          </View>
        ) : null}

        <TextInput
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          placeholder="email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          label={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          secureTextEntry
          autoCapitalize="none"
        />

        <PrimaryButton
          title={t('auth.login')}
          onPress={handleLogin}
          loading={loading}
          disabled={!email || !password}
        />

        <View style={styles.footer}>
          <ThemedText variant="body" color="secondary">
            {t('auth.noAccount')}{' '}
          </ThemedText>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <ThemedText variant="body" color="accent">
              {t('auth.registerLink')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
    paddingBottom: spacing['2xl'],
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing['2xl'],
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  logo: {
    width: 180,
    height: 60,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
});
