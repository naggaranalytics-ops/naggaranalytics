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
import { spacing } from '../../theme';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp } = useAuth();
  const { isDark, theme } = useTheme();
  const { t } = useLanguage();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    const result = await signUp(email.trim(), password, firstName.trim(), lastName.trim());
    if (result.error) {
      setError(result.error);
    } else {
      router.replace('/(tabs)');
    }
    setLoading(false);
  };

  const isValid = firstName && lastName && email && password && confirmPassword;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.bgTertiary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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
          {t('auth.createTitle')}
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.subtitle}>
          {t('auth.createSub')}
        </ThemedText>

        {error ? (
          <View style={styles.errorBox}>
            <ThemedText variant="caption" color="error">
              {error}
            </ThemedText>
          </View>
        ) : null}

        <View style={styles.nameRow}>
          <View style={styles.nameField}>
            <TextInput
              label={t('auth.firstName')}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Mohammed"
              autoCapitalize="words"
            />
          </View>
          <View style={styles.nameField}>
            <TextInput
              label={t('auth.lastName')}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Elnaggar"
              autoCapitalize="words"
            />
          </View>
        </View>

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

        <TextInput
          label={t('auth.confirmPassword')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="********"
          secureTextEntry
          autoCapitalize="none"
        />

        <PrimaryButton
          title={t('auth.register')}
          onPress={handleRegister}
          loading={loading}
          disabled={!isValid}
        />

        <View style={styles.footer}>
          <ThemedText variant="body" color="secondary">
            {t('auth.hasAccount')}{' '}
          </ThemedText>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText variant="body" color="accent">
              {t('auth.signInLink')}
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
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
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
});
