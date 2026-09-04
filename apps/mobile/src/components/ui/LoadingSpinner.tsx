import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

interface LoadingSpinnerProps {
  color?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;
  message?: string;
}

export function LoadingSpinner({
  color = Colors.primary,
  size = 'large',
  fullScreen = false,
  message,
}: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size={size} color={color} />
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.inline}>
      <ActivityIndicator size={size} color={color} />
      {message ? <Text style={styles.inlineMessage}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  inline: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 14,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  inlineMessage: {
    marginTop: 8,
    fontSize: 13,
    color: '#64748B',
  },
});
