import { StyleSheet } from 'react-native';
import { COLORS } from './theme'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  subheading: {
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 0,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    paddingTop: 64
  },
  link: {
    color: COLORS.primaryDark,
    padding: 6,
    alignSelf: 'center',
  },
  textInput: {
    height: 40,
    borderColor: COLORS.primaryLight,
    borderBottomWidth: 1,
    marginTop: 8,
    marginBottom: 16,
    padding: 12,
  },
  signup: {
    marginTop: 64,
    marginBottom: 3,
  },
  button: {
    color: 'red',
  },
  tinyLogo: {
    height: 150,
    width: 160,
    resizeMode: 'cover',
    alignSelf: 'center',
    padding: 16,
  },
});

export { styles };
