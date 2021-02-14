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
    borderWidth: 1,
  },
  secondary_button: {},
  muted_button: {},
});

export const LAYOUT = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    padding: 12,
    height: '100%',
  },
  mainCenter: {
    padding: 12,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  mainOnboarding: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inner: {
    paddingLeft: 32,
  },
  flexed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 28,
  },
});

export const TYPE = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '500',
  },
  h2: {
    fontSize: 30,
    fontWeight: '500',
  },
  h3: {
    fontSize: 28,
    fontWeight: '700',
  },
  h4: {
    fontSize: 24,
    fontWeight: '700',
  },
  h5: {
    fontSize: 20,
    fontWeight: '700',
  },
  h6: {
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  body1: {
    fontSize: 16,
  },
  body2: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
  },
});
