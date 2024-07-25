import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface TopSectionProps {
  expression: string;
  result: string;
  history: string[];
  isDarkTheme: boolean;
}

export default function TopSection({ expression, result, history, isDarkTheme }: TopSectionProps) {
  return (
    <ThemedView style={[styles.topSection, isDarkTheme && styles.darkSection]}>
      <View style={styles.historyWrapper}>
        <ScrollView
          style={styles.historyContainer}
          contentContainerStyle={styles.historyContentContainer}
        >
          {history.map((item, index) => (
            <ThemedText key={index} style={styles.historyText} isDarkTheme={isDarkTheme} lightColor="#f0f0f0" darkColor="#292929">
              {item}
            </ThemedText>
          ))}
        </ScrollView>
      </View>

      <View style={styles.currentExpressionContainer}>
        <Text
          style={[
            styles.currentExpression,
            isDarkTheme ? { color: '#FFFFFF' } : { color: '#000000' },
          ]}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {expression}
        </Text>
        {result !== '' && (
          <Text
            style={[
              styles.result,
              isDarkTheme ? { color: '#FFFFFF' } : { color: '#000000' },
            ]}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {result}
          </Text>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topSection: {
    height: '40%',
    backgroundColor: '#ffffff',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  darkSection: {
    backgroundColor: '#1e1e1e',
  },
  historyWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  historyText: {
    fontSize: 20,
    color: '#d1d1d1',
    textAlign: 'right',
  },
  result: {
    fontSize: 26,
    textAlign: 'right',
  },
  historyContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  historyContentContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexGrow: 1,
  },
  currentExpressionContainer: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  currentExpression: {
    fontSize: 40,
    textAlign: 'right',
    minWidth: 60,
    minHeight: 60,
  },
});
