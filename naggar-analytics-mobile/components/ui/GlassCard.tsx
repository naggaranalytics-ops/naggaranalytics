import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { borderRadius, spacing } from '../../theme';

interface GlassCardProps extends ViewProps {
  padding?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  padding = spacing.lg,
  style,
  children,
  ...props
}) => {
  const { theme, isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.glassBg,
          borderColor: theme.glassBorder,
          shadowColor: theme.glassShadow,
          padding,
        },
        !isDark && styles.lightShadow,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 8,
  },
  lightShadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
});
