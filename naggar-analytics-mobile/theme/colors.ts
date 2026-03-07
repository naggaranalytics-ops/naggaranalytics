export const colors = {
  primary: '#16a085',
  primaryLight: '#48c9b0',
  primaryHover: '#149174',
  primaryFaint: 'rgba(22, 160, 133, 0.1)',
  accent: '#fbbf24',
  white: '#ffffff',
  black: '#000000',
  whatsapp: '#25D366',
  error: '#ef4444',
  warning: '#f59e0b',

  dark: {
    bgPrimary: '#111821',
    bgSecondary: '#0d141d',
    bgTertiary: '#050a10',
    bgCard: 'rgba(17, 24, 33, 0.6)',
    bgCardHover: 'rgba(22, 160, 133, 0.05)',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderHover: 'rgba(255, 255, 255, 0.1)',
    glassBg: 'rgba(17, 24, 33, 0.85)',
    glassBorder: 'rgba(248, 249, 250, 0.08)',
    glassShadow: 'rgba(0, 0, 0, 0.8)',
    navbarBg: 'rgba(17, 24, 33, 0.7)',
    inputBg: 'rgba(255, 255, 255, 0.05)',
    inputBorder: 'rgba(255, 255, 255, 0.1)',
  },

  light: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    bgCard: 'rgba(255, 255, 255, 0.7)',
    bgCardHover: 'rgba(22, 160, 133, 0.03)',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#64748b',
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderHover: 'rgba(0, 0, 0, 0.1)',
    glassBg: 'rgba(255, 255, 255, 0.8)',
    glassBorder: 'rgba(255, 255, 255, 0.4)',
    glassShadow: 'rgba(0, 0, 0, 0.05)',
    navbarBg: 'rgba(255, 255, 255, 0.8)',
    inputBg: 'rgba(0, 0, 0, 0.02)',
    inputBorder: 'rgba(0, 0, 0, 0.06)',
  },

  status: {
    pending: { bg: 'rgba(234, 179, 8, 0.1)', text: '#facc15', border: 'rgba(234, 179, 8, 0.2)' },
    verified: { bg: 'rgba(59, 130, 246, 0.1)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.2)' },
    inProgress: { bg: 'rgba(59, 130, 246, 0.1)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.2)' },
    review: { bg: 'rgba(168, 85, 247, 0.1)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.2)' },
    completed: { bg: 'rgba(34, 197, 94, 0.1)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.2)' },
  },
} as const;

export type ThemeColors = typeof colors.dark;

export function getThemeColors(isDark: boolean): ThemeColors {
  return isDark ? colors.dark : colors.light;
}
