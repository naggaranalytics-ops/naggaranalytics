import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { useLanguage } from '../../context/LanguageProvider';
import { fontFamilies, fontSizes } from '../../theme';
import type { ProjectStatus } from '../../types/database';

interface StatusBadgeProps {
  status: ProjectStatus;
}

const statusStyleMap: Record<ProjectStatus, { bg: string; text: string; border: string }> = {
  'Pending': colors.status.pending,
  'Payment Verified': colors.status.verified,
  'Analysis In Progress': colors.status.inProgress,
  'Review': colors.status.review,
  'Completed': colors.status.completed,
};

const statusTranslationMap: Record<ProjectStatus, string> = {
  'Pending': 'dash.status.pending',
  'Payment Verified': 'dash.status.paymentVerified',
  'Analysis In Progress': 'dash.status.analysisInProgress',
  'Review': 'dash.status.review',
  'Completed': 'dash.status.completed',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t, lang } = useLanguage();
  const statusStyle = statusStyleMap[status];
  const isArabic = lang === 'ar';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: statusStyle.bg,
          borderColor: statusStyle.border,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: statusStyle.text,
            fontFamily: isArabic ? fontFamilies.arabic : fontFamilies.sans,
          },
        ]}
      >
        {t(statusTranslationMap[status])}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: fontSizes.xs,
    fontWeight: '600',
  },
});
