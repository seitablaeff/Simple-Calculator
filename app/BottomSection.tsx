import React from 'react';
import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const buttonSize = width * 0.2;
const iconSize = width * 0.095; // Общий размер иконок
const orangeColor = '#ffa500'; // Оранжевый цвет для кнопок

const buttons = [
  ['AC', '⌫', '%', '÷'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['T', '0', '.', '='],
];

const iconMapping: { [key: string]: { family: string, name: string } } = {
  '+': { family: 'AntDesign', name: 'plus' },
  '-': { family: 'AntDesign', name: 'minus' },
  'x': { family: 'AntDesign', name: 'close' },
  '÷': { family: 'Feather', name: 'divide' }, // Используем Feather для операции деления
  '%': { family: 'MaterialIcons', name: 'percent' },
  '⌫': { family: 'Ionicons', name: 'backspace-outline' },
};

interface BottomSectionProps {
  onButtonPress: (buttonText: string) => void;
  isDarkTheme: boolean;
}

export default function BottomSection({ onButtonPress, isDarkTheme }: BottomSectionProps) {
  const renderButton = (buttonText: string) => {
    if (iconMapping[buttonText]) {
      const { family, name } = iconMapping[buttonText];
      const IconComponent = getIconComponent(family);
      return (
        <IconComponent
          name={name as any}
          size={iconSize}
          color={orangeColor}
        />
      );
    } else {
      return (
        <Text
          style={[
            styles.text,
            buttonText === '=' ? styles.equalButtonText : null,
            isDarkTheme ? styles.darkText : styles.lightText,
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(buttonText) ? styles.numberText : styles.otherText
          ]}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {buttonText}
        </Text>
      );
    }
  };

  return (
    <View style={[styles.buttonContainer, isDarkTheme && styles.darkContainer]}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((buttonText, buttonIndex) => (
            <View style={styles.buttonContainer} key={buttonIndex}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && (isDarkTheme ? styles.pressedButtonDark : styles.pressedButtonLight),
                  (['+', '-', 'x', '÷', '%', '⌫'].includes(buttonText) ? styles.orangeButton : null)
                ]}
                onPress={() => onButtonPress(buttonText)}
              >
                {renderButton(buttonText)}
              </Pressable>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function getIconComponent(family: string) {
  switch (family) {
    case 'AntDesign':
      return AntDesign;
    case 'FontAwesome5':
      return FontAwesome5;
    case 'MaterialIcons':
      return MaterialIcons;
    case 'Feather':
      return Feather;
    case 'Ionicons':
      return Ionicons;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '20%',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeButton: {
    //backgroundColor: orangeColor, // Оранжевый цвет для кнопок
  },
  pressedButtonLight: {
    backgroundColor: '#f0f0f0', // Цвет при нажатии в светлой теме
  },
  pressedButtonDark: {
    backgroundColor: '#292929', // Цвет при нажатии в темной теме
  },
  text: {
    fontSize: iconSize,
    textAlign: 'center',
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  equalButtonText: {
    color: '#000000',
  },
  zeroButton: {},
  numberText: {},
  otherText: {
    color: orangeColor,
  },
  equalButton: {},
});
