import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/layouts/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Colors } from '../../utils/colors';

const WEAK_AREAS = [
  { id: 'w1', subject: 'Physics', topic: 'Doppler Effect in Optics', accuracy: 42, severity: 'high' as const },
  { id: 'w2', subject: 'Chemistry', topic: 'Reaction Kinetics & Catalysts', accuracy: 55, severity: 'medium' as const },
  { id: 'w3', subject: 'Math', topic: 'Trigonometric Substitutions', accuracy: 68, severity: 'low' as const },
];

export function AnalyticsScreen() {
  return (
    <ScreenContainer contentStyle={styles.container}>
      <Text style={styles.title}>Cognitive Analytics</Text>
      <Text style={styles.subtitle}>
        Memory retention intervals, syllabus mastery trends, and targeted weakness reports.
      </Text>

      {/* Retention Summary Card */}
      <Card style={styles.summaryCard}>
        <View style={styles.summaryTop}>
          <Text style={styles.summaryLabel}>Cognitive Index Score</Text>
          <Badge label="Upper 5th Percentile" variant="success" size="small" />
        </View>
        <Text style={styles.summaryScore}>92.4 / 100</Text>
        <Text style={styles.summaryDesc}>
          Your long-term retention curve across STEM topics is 14% higher than cohort baseline.
        </Text>
      </Card>

      {/* Mastery Breakdown by Subject */}
      <Text style={styles.sectionTitle}>Syllabus Mastery Breakdown</Text>
      
      <Card style={styles.breakdownCard}>
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>📐 Advanced Mathematics</Text>
          <Text style={styles.itemPercent}>88%</Text>
        </View>
        <ProgressBar progress={88} color={Colors.primary} height={6} />
      </Card>

      <Card style={styles.breakdownCard}>
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>⚡ Physics Mechanics</Text>
          <Text style={styles.itemPercent}>74%</Text>
        </View>
        <ProgressBar progress={74} color={Colors.secondary} height={6} />
      </Card>

      <Card style={styles.breakdownCard}>
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>🧪 Organic Chemistry</Text>
          <Text style={styles.itemPercent}>62%</Text>
        </View>
        <ProgressBar progress={62} color={Colors.success} height={6} />
      </Card>

      {/* Weakness Diagnostic */}
      <Text style={styles.sectionTitle}>Targeted Weakness Intervention</Text>
      {WEAK_AREAS.map((item) => (
        <Card key={item.id} style={styles.weaknessCard}>
          <View style={styles.weaknessTop}>
            <View>
              <Text style={styles.weaknessSubject}>{item.subject}</Text>
              <Text style={styles.weaknessTopic}>{item.topic}</Text>
            </View>
            <Badge
              label={item.severity === 'high' ? 'High Priority' : 'Moderate'}
              variant={item.severity === 'high' ? 'error' : 'warning'}
              size="small"
            />
          </View>
          <View style={styles.weaknessProgress}>
            <Text style={styles.weaknessAccuracy}>Accuracy: {item.accuracy}%</Text>
            <ProgressBar
              progress={item.accuracy}
              color={item.severity === 'high' ? Colors.error : Colors.warning}
              height={5}
            />
          </View>
        </Card>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    padding: 18,
    marginBottom: 20,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryScore: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
  },
  summaryDesc: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 18,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 14,
    marginBottom: 10,
  },
  breakdownCard: {
    padding: 14,
    marginVertical: 4,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  itemPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  weaknessCard: {
    padding: 14,
    marginVertical: 4,
  },
  weaknessTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  weaknessSubject: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  weaknessTopic: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  weaknessProgress: {
    gap: 4,
  },
  weaknessAccuracy: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
