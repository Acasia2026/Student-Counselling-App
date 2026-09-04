import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../utils/colors';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const variantStyles = {
    primary: styles.primaryBg,
    secondary: styles.secondaryBg,
    danger: styles.dangerBg,
    outline: styles.outlineBg,
  };

  const textVariantStyles = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    danger: styles.dangerText,
    outline: styles.outlineText,
  };

  const sizeStyles = {
    small: styles.smallPadding,
    medium: styles.mediumPadding,
    large: styles.largePadding,
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'secondary' ? Colors.primary : '#FFFFFF'}
        />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, textVariantStyles[variant], textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryBg: {
    backgroundColor: Colors.primary,
  },
  secondaryBg: {
    backgroundColor: '#F1F5F9',
  },
  dangerBg: {
    backgroundColor: Colors.error,
  },
  outlineBg: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  smallPadding: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  mediumPadding: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  largePadding: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  text: {
    fontWeight: '600',
    fontSize: 15,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#334155',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: Colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});
