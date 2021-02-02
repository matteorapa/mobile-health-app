import {StyleSheet} from 'react-native';

// Choice of colours
// https://material.io/design/color/the-color-system.html

export const COLORS = {
  primary: '#0d47a1',
  primaryLight: '#5472d3',
  primaryDark: '#002171',
  secondary: '#ffc107',
  secondaryLight: '#fff350',
  secondaryDark: '#c79100',
  lightText: '#fff',
  darkText: '#fff',
};

// Spacing guideline for Accessibility
// https://material.io/design/usability/accessibility.html

export const THEME = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  button: {
    height: 36,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  primary: {
    borderWidth: 1
  },
  secondary_button: {},
  muted_button: {},
});
