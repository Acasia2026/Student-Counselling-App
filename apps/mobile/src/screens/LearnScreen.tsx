import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layouts/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { PillFilter } from '../../components/ui/PillFilter';
import { Colors } from '../../utils/colors';

const SUBJECT_CATEGORIES = [
  { id: 'all', label: 'All Subjects' },
  { id: 'stem', label: 'STEM & Math' },
  { id: 'sciences', label: 'Sciences' },
  { id: 'humanities', label: 'Languages' },
];

const SUBJECTS_DATA = [
  {
    id: 'math',
    title: 'Advanced Mathematics',
    grade: 'Grade 11 - Higher Level',
    icon: '📐',
    category: 'stem',
    progress: 74,
    totalChapters: 12,
    completedChapters: 9,
    currentTopic: 'Integration by Substitution & Parts',
    color: '#4F46E5',
  },
  {
    id: 'physics',
    title: 'Physics Mechanics & Waves',
    grade: 'Grade 11 - Core',
    icon: '⚡',
    category: 'sciences',
    progress: 62,
    totalChapters: 10,
    completedChapters: 6,
    currentTopic: 'Harmonic Motion & Wave Superposition',
    color: '#06B6D4',
  },
  {
    id: 'chem',
    title: 'Organic Chemistry',
    grade: 'Grade 11 - Advanced',
    icon: '🧪',
    category: 'sciences',
    progress: 45,
    totalChapters: 8,
    completedChapters: 4,
    currentTopic: 'Reaction Mechanisms & Isomerism',
    color: '#10B981',
  },
  {
    id: 'eng',
    title: 'Academic English & Rhetoric',
    grade: 'Grade 11 - Standard',
    icon: '📚',
    category: 'humanities',
    progress: 90,
    totalChapters: 6,
    completedChapters: 5,
    currentTopic: 'Critical Essay Structure & Argumentation',
    color: '#8B5CF6',
  },
];

export function LearnScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const filteredSubjects = SUBJECTS_DATA.filter((s) => {
    if (selectedFilter === 'all') return true;
    return s.category === selectedFilter;
  });

  return (
    <ScreenContainer contentStyle={styles.container}>
      <Text style={styles.title}>Academic Curriculum</Text>
      <Text style={styles.subtitle}>
        Master core syllabi with AI-guided checkpoints and cognitive pacing.
      </Text>

      {/* Filter bar */}
      <PillFilter
        options={SUBJECT_CATEGORIES}
        selectedId={selectedFilter}
        onSelect={setSelectedFilter}
        style={styles.filterBar}
      />

      {/* Subject cards */}
      {filteredSubjects.map((item) => (
        <Card
          key={item.id}
          style={styles.card}
          onPress={() => setActiveSubject(activeSubject === item.id ? null : item.id)}
        >
          <View style={styles.cardTop}>
            <View style={[styles.iconWrap, { backgroundColor: item.color + '15' }]}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.subjectInfo}>
              <Text style={styles.subjectTitle}>{item.title}</Text>
              <Text style={styles.grade}>{item.grade}</Text>
            </View>
            <Badge
              label={`${item.completedChapters}/${item.totalChapters} Ch.`}
              variant="neutral"
              size="small"
            />
          </View>

          <View style={styles.topicBox}>
            <Text style={styles.topicLabel}>Current Focus:</Text>
            <Text style={styles.topicValue}>{item.currentTopic}</Text>
          </View>

          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Overall Mastery</Text>
            <Text style={[styles.progressPercent, { color: item.color }]}>
              {item.progress}%
            </Text>
          </View>
          <ProgressBar progress={item.progress} color={item.color} height={6} />

          {activeSubject === item.id && (
            <View style={styles.expandedSection}>
              <Text style={styles.expandedTitle}>Active Chapters:</Text>
              <View style={styles.chapterItem}>
                <Text style={styles.chapterCheck}>✅</Text>
                <Text style={styles.chapterName}>Chapter 1: Foundational Principles</Text>
              </View>
              <View style={styles.chapterItem}>
                <Text style={styles.chapterCheck}>✅</Text>
                <Text style={styles.chapterName}>Chapter 2: Problem Synthesis</Text>
              </View>
              <View style={styles.chapterItem}>
                <Text style={styles.chapterCheck}>⏳</Text>
                <Text style={[styles.chapterName, styles.activeChapterName]}>
                  Chapter 3: Advanced Applications
                </Text>
              </View>

              <TouchableOpacity style={[styles.tutorBtn, { backgroundColor: item.color }]}>
                <Text style={styles.tutorBtnText}>Launch AI Socratic Tutor 💬</Text>
              </TouchableOpacity>
            </View>
          )}
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
    marginBottom: 12,
  },
  filterBar: {
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  grade: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  topicBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  topicLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  topicValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginTop: 2,
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
  },
  expandedSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  expandedTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  chapterCheck: {
    fontSize: 14,
    marginRight: 8,
  },
  chapterName: {
    fontSize: 13,
    color: '#64748B',
  },
  activeChapterName: {
    color: '#0F172A',
    fontWeight: '600',
  },
  tutorBtn: {
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tutorBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
