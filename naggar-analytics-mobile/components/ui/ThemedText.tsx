import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { fontFamilies, fontSizes } from '../../theme';

interface ThemedTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label' | 'mono';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'error';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'body',
  color = 'primary',
  style,
  children,
  ...props
}) => {
  const { theme, colors } = useTheme();
  const { lang } = useLanguage();

  const isArabic = lang === 'ar';
  const fontFamily = variant === 'mono'
    ? fontFamilies.mono
    : isArabic
      ? fontFamilies.arabic
      : fontFamilies.sans;

  const colorMap = {
    primary: theme.textPrimary,
    secondary: theme.textSecondary,
    muted: theme.textMuted,
    accent: colors.primary,
    error: colors.error,
  };

  const variantStyles = {
    h1: { fontSize: fontSizes['3xl'], fontWeight: '800' as const },
    h2: { fontSize: fontSizes['2xl'], fontWeight: '700' as const },
    h3: { fontSize: fontSizes.xl, fontWeight: '600' as const },
    body: { fontSize: fontSizes.base, fontWeight: '400' as const },
    caption: { fontSize: fontSizes.sm, fontWeight: '400' as const },
    label: { fontSize: fontSizes.sm, fontWeight: '600' as const },
    mono: { fontSize: fontSizes.base, fontWeight: '400' as const },
  };

  return (
    <Text
      style={[
        { color: colorMap[color], fontFamily },
        variantStyles[variant],
        isArabic && { textAlign: 'right' as const },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
