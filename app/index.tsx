import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import TopSection from './TopSection';
import BottomSection from './BottomSection';

export default function HomeScreen() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isNewInput, setIsNewInput] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleButtonPress = (buttonText: string) => {
    const operators = ['+', '-', 'x', '÷'];

    if (buttonText === '=') {
      calculateResult();
    } else if (buttonText === 'AC') {
      clear();
    } else if (buttonText === '⌫') {
      backspace();
    } else if (buttonText === '%') {
      findPercent();
    } else if (buttonText === 'T') {
      toggleTheme();
    } else {
      // Проверка последовательных операторов
      if (operators.includes(buttonText)) {
        if (operators.includes(expression.slice(-1))) {
          // Заменяем последний оператор новым
          setExpression(prev => prev.slice(0, -1) + buttonText);
        } else {
          setExpression(prev => prev + buttonText);
        }
      } else {
        if (isNewInput) {
          setExpression(buttonText);
          setIsNewInput(false);
        } else {
          setExpression(prev => prev + buttonText);
        }
        setResult('');
      }
    }
  };

  const calculateResult = () => {
    try {
      // Если последний символ - оператор, удаляем его
      const finalExpression = expression.replace(/[\+\-x÷]$/, '');
      const evaluatedResult = eval(finalExpression.replace('x', '*').replace('÷', '/'));
      setHistory((prev) => [...prev, `${expression} = ${evaluatedResult}`]);
      setExpression(evaluatedResult.toString());
      setResult('');
      setIsNewInput(true);
    } catch (error) {
      setResult('Error');
    }
  };

  const clear = () => {
    setExpression('');
    setResult('');
    setHistory([]);
  };

  const backspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const findPercent = () => {
    try {
      const finalExpression = expression.replace(/[\+\-x÷]$/, '');
      const evaluatedResult = eval(finalExpression.replace('x', '*').replace('÷', '/')) / 100;
      setExpression(evaluatedResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <ThemedView style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <TopSection 
        expression={expression} 
        result={result} 
        history={history} 
        isDarkTheme={isDarkTheme} 
      />
      <BottomSection 
        onButtonPress={handleButtonPress} 
        isDarkTheme={isDarkTheme} 
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
});
