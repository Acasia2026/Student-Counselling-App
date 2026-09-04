import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layouts/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAuth } from '../../hooks/useAuth';
import { Colors } from '../../utils/colors';

export function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <ScreenContainer
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentStyle={styles.container}
    >
      {/* Student Welcome Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{user?.name || 'Student'}</Text>
          <Text style={styles.institution}>{user?.institutionName || 'Apex International Academy'}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </Text>
        </View>
      </View>

      {/* AI Daily Plan Card */}
      <Card style={styles.aiPlanCard}>
        <View style={styles.aiHeader}>
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>🤖 AI TUTOR RECOMMENDED</Text>
          </View>
          <Text style={styles.streakText}>🔥 7 Day Streak</Text>
        </View>
        <Text style={styles.planTitle}>Physics: Wave Optics & Interference</Text>
        <Text style={styles.planDesc}>
          Based on your recent quiz analysis, review Young's double slit interference formulas.
        </Text>
        <TouchableOpacity
          style={styles.planBtn}
          onPress={() => navigation.navigate('Learn')}
          activeOpacity={0.8}
        >
          <Text style={styles.planBtnText}>Start Guided Session (15 min) →</Text>
        </TouchableOpacity>
      </Card>

      {/* Key Metrics Grid */}
      <Text style={styles.sectionTitle}>Cognitive Metrics</Text>
      <View style={styles.metricsGrid}>
        <Card style={styles.metricCard}>
          <Text style={styles.metricIcon}>⏱️</Text>
          <Text style={styles.metricValue}>12.5 hrs</Text>
          <Text style={styles.metricLabel}>Learning Time</Text>
        </Card>

        <Card style={styles.metricCard}>
          <Text style={styles.metricIcon}>🎯</Text>
          <Text style={styles.metricValue}>88.4%</Text>
          <Text style={styles.metricLabel}>Avg Accuracy</Text>
        </Card>

        <Card style={styles.metricCard}>
          <Text style={styles.metricIcon}>📝</Text>
          <Text style={styles.metricValue}>24</Text>
          <Text style={styles.metricLabel}>Quizzes Passed</Text>
        </Card>

        <Card style={styles.metricCard}>
          <Text style={styles.metricIcon}>🧠</Text>
          <Text style={styles.metricValue}>91%</Text>
          <Text style={styles.metricLabel}>Retention Rate</Text>
        </Card>
      </View>

      {/* Active Subjects Progress */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Enrolled Subjects</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
          <Text style={styles.seeAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.subjectCard}>
        <View style={styles.subjectHeader}>
          <Text style={styles.subjectName}>📐 Advanced Mathematics</Text>
          <Badge label="Grade A" variant="success" size="small" />
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Module 4: Integration by Parts</Text>
          <Text style={styles.progressPercent}>78%</Text>
        </View>
        <ProgressBar progress={78} color={Colors.primary} height={6} />
      </Card>

      <Card style={styles.subjectCard}>
        <View style={styles.subjectHeader}>
          <Text style={styles.subjectName}>⚡ Physics Mechanics</Text>
          <Badge label="Review Needed" variant="warning" size="small" />
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Module 6: Rotational Dynamics</Text>
          <Text style={styles.progressPercent}>62%</Text>
        </View>
        <ProgressBar progress={62} color={Colors.secondary} height={6} />
      </Card>

      {/* Quick Launch Practice */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Daily Practice & Quizzes</Text>
      </View>
      <Card
        style={styles.quizActionCard}
        onPress={() => navigation.navigate('Practice')}
      >
        <View style={styles.quizActionContent}>
          <View style={styles.quizIconWrap}>
            <Text style={styles.quizIcon}>✨</Text>
          </View>
          <View style={styles.quizActionText}>
            <Text style={styles.quizActionTitle}>Adaptive Practice Test</Text>
            <Text style={styles.quizActionDesc}>10 questions targeted at your recent weak points</Text>
          </View>
          <Text style={styles.quizChevron}>→</Text>
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  greeting: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  institution: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  aiPlanCard: {
    backgroundColor: '#1E1B4B',
    borderColor: '#312E81',
    padding: 18,
    marginBottom: 20,
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  aiBadge: {
    backgroundColor: '#4338CA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  aiBadgeText: {
    color: '#C7D2FE',
    fontSize: 10,
    fontWeight: '700',
  },
  streakText: {
    color: '#FDE047',
    fontSize: 12,
    fontWeight: '700',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  planDesc: {
    fontSize: 13,
    color: '#C7D2FE',
    lineHeight: 18,
    marginBottom: 14,
  },
  planBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  planBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 6,
  },
  metricCard: {
    width: '48%',
    padding: 14,
    marginVertical: 0,
    alignItems: 'flex-start',
  },
  metricIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  subjectCard: {
    padding: 16,
    marginVertical: 4,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  quizActionCard: {
    backgroundColor: '#EEF2FF',
    borderColor: '#E0E7FF',
    padding: 16,
  },
  quizActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quizIcon: {
    fontSize: 20,
  },
  quizActionText: {
    flex: 1,
  },
  quizActionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  quizActionDesc: {
    fontSize: 12,
    color: '#6366F1',
    marginTop: 2,
  },
  quizChevron: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
});
