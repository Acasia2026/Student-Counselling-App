import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { ScreenContainer } from '../../components/layouts/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../hooks/useAuth';
import { Colors } from '../../utils/colors';

export function ProfileScreen() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [offlineSync, setOfflineSync] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to end your current session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer contentStyle={styles.container}>
      {/* Student Profile Card */}
      <Card style={styles.profileCard}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Student'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <View style={styles.badgeRow}>
          <Badge label={user?.grade || 'Grade 11 - STEM Track'} variant="primary" />
          <Badge label="Verified Student" variant="success" />
        </View>
      </Card>

      {/* Institution Details */}
      <Text style={styles.sectionTitle}>Academic Affiliation</Text>
      <Card style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Institution</Text>
          <Text style={styles.infoVal}>{user?.institutionName || 'Apex International Academy'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Student ID</Text>
          <Text style={styles.infoVal}>{user?.id || 'STD-2026-882'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Academic Counselor</Text>
          <Text style={styles.infoVal}>Dr. Sarah Jenkins</Text>
        </View>
      </Card>

      {/* Preferences & Settings */}
      <Text style={styles.sectionTitle}>Preferences</Text>
      <Card style={styles.card}>
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleTitle}>Daily Learning Reminders</Text>
            <Text style={styles.toggleDesc}>Push alerts for recommended study sessions</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#E2E8F0', true: Colors.primary }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleTitle}>AI Pacing & Hint Engine</Text>
            <Text style={styles.toggleDesc}>Adaptive difficulty based on response speed</Text>
          </View>
          <Switch
            value={aiSuggestions}
            onValueChange={setAiSuggestions}
            trackColor={{ false: '#E2E8F0', true: Colors.primary }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleTitle}>Offline Sync</Text>
            <Text style={styles.toggleDesc}>Cache notes and problem sets locally</Text>
          </View>
          <Switch
            value={offlineSync}
            onValueChange={setOfflineSync}
            trackColor={{ false: '#E2E8F0', true: Colors.primary }}
          />
        </View>
      </Card>

      {/* Sign Out Button */}
      <Button
        title="Sign Out of Portal"
        variant="danger"
        size="large"
        onPress={handleLogout}
        style={styles.logoutBtn}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  userEmail: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
    marginBottom: 8,
  },
  card: {
    padding: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  infoVal: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  toggleDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  logoutBtn: {
    marginTop: 12,
  },
});
