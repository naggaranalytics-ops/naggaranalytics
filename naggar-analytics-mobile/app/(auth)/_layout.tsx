import { Stack } from 'expo-router';
import { useTheme } from '../../context/ThemeProvider';

export default function AuthLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.bgTertiary },
        animation: 'slide_from_right',
      }}
    />
  );
}
