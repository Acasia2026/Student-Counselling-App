import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layouts/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../utils/colors';

const SAMPLE_QUESTION = {
  id: 'q101',
  subject: 'Physics: Mechanics',
  question: 'A mass of 2.0 kg is attached to a spring with spring constant k = 200 N/m. What is the angular frequency (ω) of the oscillation?',
  options: [
    '5.0 rad/s',
    '10.0 rad/s',
    '20.0 rad/s',
    '100.0 rad/s',
  ],
  correctAnswer: 1,
  explanation: 'Angular frequency is given by ω = √(k/m). Substituting k = 200 and m = 2 gives ω = √(200 / 2) = √100 = 10 rad/s.',
};

export function PracticeScreen() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmitAnswer = () => {
    if (selectedOption !== null) {
      setIsAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
  };

  return (
    <ScreenContainer contentStyle={styles.container}>
      <Text style={styles.title}>Practice & Assessment</Text>
      <Text style={styles.subtitle}>
        Active retrieval quiz engine with real-time step-by-step cognitive feedback.
      </Text>

      {/* Quiz Modes Grid */}
      <View style={styles.modesRow}>
        <Card style={styles.modeCard}>
          <Text style={styles.modeIcon}>⚡</Text>
          <Text style={styles.modeTitle}>Speed Drill</Text>
          <Text style={styles.modeDesc}>5 mins • 10 Qs</Text>
        </Card>
        <Card style={styles.modeCard}>
          <Text style={styles.modeIcon}>🎯</Text>
          <Text style={styles.modeTitle}>Weakness Focus</Text>
          <Text style={styles.modeDesc}>Custom Pacing</Text>
        </Card>
        <Card style={styles.modeCard}>
          <Text style={styles.modeIcon}>🏆</Text>
          <Text style={styles.modeTitle}>Mock Exam</Text>
          <Text style={styles.modeDesc}>Full Syllabus</Text>
        </Card>
      </View>

      {/* Interactive Active Question Card */}
      <Card style={styles.quizCard}>
        <View style={styles.quizHeader}>
          <Badge label={SAMPLE_QUESTION.subject} variant="primary" size="small" />
          <Text style={styles.questionCounter}>Question 1 of 10</Text>
        </View>

        <Text style={styles.questionText}>{SAMPLE_QUESTION.question}</Text>

        {/* Options */}
        <View style={styles.optionsList}>
          {SAMPLE_QUESTION.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === SAMPLE_QUESTION.correctAnswer;
            let optionBg = '#F8FAFC';
            let optionBorder = '#E2E8F0';
            let optionTextColor = '#0F172A';

            if (isAnswered) {
              if (isCorrect) {
                optionBg = '#ECFDF5';
                optionBorder = Colors.success;
                optionTextColor = '#065F46';
              } else if (isSelected && !isCorrect) {
                optionBg = '#FEF2F2';
                optionBorder = Colors.error;
                optionTextColor = '#991B1B';
              }
            } else if (isSelected) {
              optionBg = '#EEF2FF';
              optionBorder = Colors.primary;
              optionTextColor = Colors.primary;
            }

            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionButton,
                  { backgroundColor: optionBg, borderColor: optionBorder },
                ]}
                onPress={() => !isAnswered && setSelectedOption(idx)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.optionLetter,
                    {
                      backgroundColor: isSelected ? Colors.primary : '#E2E8F0',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLetterText,
                      { color: isSelected ? '#FFFFFF' : '#475569' },
                    ]}
                  >
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: optionTextColor }]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* AI Hint Section */}
        {showHint && !isAnswered && (
          <View style={styles.hintBox}>
            <Text style={styles.hintTitle}>💡 Socratic AI Hint:</Text>
            <Text style={styles.hintText}>
              Recall the relationship between mass, spring stiffness, and simple harmonic frequency: ω = √(k/m).
            </Text>
          </View>
        )}

        {/* Explanation when answered */}
        {isAnswered && (
          <View
            style={[
              styles.explanationBox,
              selectedOption === SAMPLE_QUESTION.correctAnswer
                ? styles.correctBox
                : styles.wrongBox,
            ]}
          >
            <Text style={styles.explanationTitle}>
              {selectedOption === SAMPLE_QUESTION.correctAnswer
                ? '✅ Correct Answer!'
                : '❌ Incorrect Answer'}
            </Text>
            <Text style={styles.explanationText}>
              {SAMPLE_QUESTION.explanation}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.quizActions}>
          {!isAnswered ? (
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.hintToggleBtn}
                onPress={() => setShowHint(!showHint)}
              >
                <Text style={styles.hintToggleText}>
                  {showHint ? 'Hide Hint' : '💡 Need a Hint?'}
                </Text>
              </TouchableOpacity>
              <Button
                title="Submit Answer"
                onPress={handleSubmitAnswer}
                disabled={selectedOption === null}
                style={styles.submitActionBtn}
              />
            </View>
          ) : (
            <Button
              title="Next Question →"
              onPress={handleNextQuestion}
              style={styles.nextBtn}
            />
          )}
        </View>
      </Card>
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
  modesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  modeCard: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    marginVertical: 0,
  },
  modeIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  modeTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  modeDesc: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  quizCard: {
    padding: 18,
    marginBottom: 12,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  questionCounter: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 22,
    marginBottom: 16,
  },
  optionsList: {
    gap: 10,
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 12,
    fontWeight: '700',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  hintBox: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEF3C7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  hintTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
    marginBottom: 2,
  },
  hintText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },
  explanationBox: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
  },
  correctBox: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  wrongBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  explanationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
  quizActions: {
    marginTop: 6,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  hintToggleBtn: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  hintToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  submitActionBtn: {
    flex: 1,
  },
  nextBtn: {
    width: '100%',
  },
});
