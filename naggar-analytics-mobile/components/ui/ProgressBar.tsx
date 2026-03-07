import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { PROJECT_STATUS_ORDER, type ProjectStatus } from '../../types/database';

interface ProgressBarProps {
  status: ProjectStatus;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ status }) => {
  const currentIndex = PROJECT_STATUS_ORDER.indexOf(status);
  const totalSteps = PROJECT_STATUS_ORDER.length;

  return (
    <View style={styles.container}>
      {PROJECT_STATUS_ORDER.map((_, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            {
              backgroundColor:
                index <= currentIndex ? colors.primary : 'rgba(255, 255, 255, 0.1)',
            },
            index === 0 && styles.firstSegment,
            index === totalSteps - 1 && styles.lastSegment,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 3,
    height: 6,
  },
  segment: {
    flex: 1,
    borderRadius: 3,
  },
  firstSegment: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  lastSegment: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
});
