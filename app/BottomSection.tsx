import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const buttons = [
  ['AC', '⌫', '%', '÷'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['T', '0', '.', '='],
];

interface BottomSectionProps {
  onButtonPress: (buttonText: string) => void;
  isDarkTheme: boolean;
}

export default function BottomSection({ onButtonPress, isDarkTheme }: BottomSectionProps) {
  return (
    <View style={[styles.buttonContainer, isDarkTheme && styles.darkContainer]}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((buttonText, buttonIndex) => (
            <TouchableOpacity
              key={buttonIndex}
              style={[
                styles.button,
                buttonText === '0' ? styles.zeroButton : null,
                buttonText === '=' ? styles.equalButton : null,
              ]}
              onPress={() => onButtonPress(buttonText)}
            >
              <ThemedText
                isDarkTheme={isDarkTheme}
                style={[
                  styles.text,
                  buttonText === '=' ? styles.equalButtonText : null,
                  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(buttonText) ? styles.numberText : styles.otherText
                ]}
                lightColor="#000000"
                darkColor="#FFFFFF"
              >
                {buttonText}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 3,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
    height: '20%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  text: {
    fontSize: 27,
    textAlign: 'center',
  },
  equalButtonText: {
    color: '#000000',
  },
  zeroButton: {},
  numberText: {},
  otherText: {
    color: '#ffa500',
  },
  equalButton: {},
});
