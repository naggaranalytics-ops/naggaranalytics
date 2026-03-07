import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from 'react-native';
import { ThemedText } from '../ui/ThemedText';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { fontFamilies, fontSizes, spacing, borderRadius } from '../../theme';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const isArabic = lang === 'ar';

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText variant="label" color="secondary" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <RNTextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBg,
            borderColor: error ? '#ef4444' : theme.inputBorder,
            color: theme.textPrimary,
            fontFamily: isArabic ? fontFamilies.arabic : fontFamilies.sans,
            textAlign: isArabic ? 'right' : 'left',
          },
          style,
        ]}
        placeholderTextColor={theme.textMuted}
        {...props}
      />
      {error && (
        <ThemedText variant="caption" color="error" style={styles.error}>
          {error}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: 14,
    fontSize: fontSizes.base,
  },
  error: {
    marginTop: spacing.xs,
  },
});
