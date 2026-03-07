import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, PlusCircle, BookOpen, User } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { colors } from '../../theme';

export default function TabLayout() {
  const { theme, isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          backgroundColor: isDark ? '#111821' : '#ffffff',
          borderTopColor: theme.borderColor,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 85,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.dashboard'),
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="new-project"
        options={{
          title: t('tab.newProject'),
          tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: t('tab.library'),
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tab.profile'),
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
