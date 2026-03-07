import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from '../context/ThemeProvider';
import { LanguageProvider } from '../context/LanguageProvider';
import { AuthProvider } from '../context/AuthProvider';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isDark, theme } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.bgTertiary },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after a brief delay to ensure context providers are ready
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
