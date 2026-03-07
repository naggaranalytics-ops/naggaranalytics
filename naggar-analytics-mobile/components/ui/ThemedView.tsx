import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';

interface ThemedViewProps extends ViewProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  variant = 'primary',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const bgMap = {
    primary: theme.bgPrimary,
    secondary: theme.bgSecondary,
    tertiary: theme.bgTertiary,
  };

  return (
    <View style={[{ backgroundColor: bgMap[variant] }, style]} {...props}>
      {children}
    </View>
  );
};
