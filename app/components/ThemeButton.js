import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../styles/theme';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ThemeButton({type, text, onPressEvent, icon}) {
  switch (type) {
    case 'primary': {
      return (
        <TouchableOpacity onPress={onPressEvent}>
          <View style={stylePrimary.button}>
            <Text style={stylePrimary.text}>{text}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    case 'secondary': {
      return (
        <TouchableOpacity onPress={onPressEvent}>
          <View style={styleSecondary.button}>
            <Text style={styleSecondary.text}>
              {icon ? (
                <Icon name={icon} size={16} color={COLORS.primaryLight} />
              ) : (
                <></>
              )}
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    case 'muted': {
      return (
        <TouchableOpacity onPress={onPressEvent}>
          <View style={styleMuted.button}>
            <Text style={styleMuted.text}>
              {icon ? (
                <Icon name={icon} size={16} color={COLORS.primaryLight} />
              ) : (
                <></>
              )}
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    default: {
      return (
        <TouchableOpacity onPress={onPressEvent}>
          <View style={stylePrimary.button}>
            <Text style={stylePrimary.text}>
              {icon ? (
                <Icon name={icon} size={16} color={COLORS.primaryLight} />
              ) : (
                <></>
              )}
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const stylePrimary = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    minHeight: 36,
    margin: 12,
    padding: 8,
  },
  text: {
    color: COLORS.lightText,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

const styleSecondary = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    minHeight: 36,
    margin: 12,
    padding: 8,
  },
  text: {
    color: COLORS.primaryLight,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

const styleMuted = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    minHeight: 36,
  },
  text: {
    color: COLORS.primaryLight,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
