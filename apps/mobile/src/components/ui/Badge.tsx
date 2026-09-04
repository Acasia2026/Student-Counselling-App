import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../utils/colors';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'small' | 'medium';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}: BadgeProps) {
  const variantStyles = {
    primary: { bg: '#EEF2FF', text: Colors.primary },
    success: { bg: '#ECFDF5', text: Colors.success },
    warning: { bg: '#FFFBEB', text: '#D97706' },
    error: { bg: '#FEF2F2', text: Colors.error },
    neutral: { bg: '#F1F5F9', text: '#475569' },
  };

  const currentVariant = variantStyles[variant];

  return (
    <View
      style={[
        styles.badge,
        size === 'small' ? styles.badgeSmall : styles.badgeMedium,
        { backgroundColor: currentVariant.bg },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'small' ? styles.textSmall : styles.textMedium,
          { color: currentVariant.text },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9999,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeMedium: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 11,
  },
  textMedium: {
    fontSize: 12,
  },
});
