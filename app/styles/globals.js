import {StyleSheet} from 'react-native';

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
  box: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    paddingTop: 64
  },
  link: {
    color: 'slategrey',
    padding: 6,
    alignSelf: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'lightslategrey',
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

  navButtonsForm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  phoneNumberInputs: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  testing: {
    flexDirection: 'row'
  },
  countryPickerContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: 'white'
  },
  filterInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242'
  },
  countryPickerStyle: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  countryPickerItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row'
  },
  countryPickerItemName: {
    flex: 1,
    fontSize: 16
  },
  countryPickerItemDialCode: {
    fontSize: 16
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center'
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: 'red'
  },
  flagImage: {
    marginRight: 10,
    width: 30,
    height: 16
  }
});

export {styles};
