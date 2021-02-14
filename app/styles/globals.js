import {StyleSheet} from 'react-native';
import {COLORS} from './theme';

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
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 50,
    marginTop: 5,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    paddingTop: 64,
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
  LargeLogo: {
    height: 180,
    width: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    padding: 2,
  },
  surface: {
    padding: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 6,
    elevation: 4,
  },
  card: {
    marginTop: 8,
    marginBottom: 8,
  },
  emptyState: {
    display: 'flex',
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },
  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  navButtonsForm: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 6
  },
  navBackNext: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  phoneNumberInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testing: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  countryPickerContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: 'white',
  },
  filterInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  countryPickerStyle: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryPickerItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
  },
  countryPickerItemName: {
    flex: 1,
    fontSize: 16,
  },
  countryPickerItemDialCode: {
    fontSize: 16,
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center',
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: 'red',
  },
  flagImage: {
    marginRight: 10,
    width: 30,
    height: 16,
  },
});

export {styles};
