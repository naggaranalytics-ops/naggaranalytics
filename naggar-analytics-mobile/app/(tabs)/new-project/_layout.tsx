import { Stack } from 'expo-router';
import { OnboardingProvider } from '../../../context/OnboardingContext';
import { useTheme } from '../../../context/ThemeProvider';

export default function NewProjectLayout() {
  const { theme } = useTheme();

  return (
    <OnboardingProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.bgTertiary },
          animation: 'slide_from_right',
        }}
      />
    </OnboardingProvider>
  );
}
