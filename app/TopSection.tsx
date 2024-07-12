import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
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
            <ThemedText key={index} style={styles.historyText} isDarkTheme={isDarkTheme} lightColor="#d1d1d1" darkColor="#d1d1d1">
              {item}
            </ThemedText>
          ))}
        </ScrollView>
      </View>

      <View style={styles.currentExpressionContainer}>
        <ThemedText 
          style={styles.currentExpression} 
          isDarkTheme={isDarkTheme} 
          lightColor="#000000" 
          darkColor="#FFFFFF"
        >
          {expression}
        </ThemedText>
        {result !== '' && (
          <ThemedText 
            style={styles.result} 
            isDarkTheme={isDarkTheme} 
            lightColor="#000000" 
            darkColor="#FFFFFF"
          >
            {result}
          </ThemedText>
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
    marginBottom: 10,
  },
});
