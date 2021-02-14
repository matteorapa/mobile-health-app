import React, {Component} from 'react';
import {View} from 'react-native';

import ModalPickerImage from './ModalPickerImage';
import PhoneInput from 'react-native-phone-input';

class PhonePrefix extends Component {
  constructor() {
    super();

    this.state = {
      valid: '',
      type: '',
      value: '',
    };

    this.updateInfo = this.updateInfo.bind(this);
    // this.renderInfo = this.renderInfo.bind(this);
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue(),
    });
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }

  onPressFlag() {
    this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
  }

  render() {
    return (
      // <View style={styles.container}>
      <View>
        <PhoneInput
          ref={(ref) => {
            this.phone = ref;
          }}
          onPressFlag={this.onPressFlag}
        />

        <ModalPickerImage
          ref={(ref) => {
            this.myCountryPicker = ref;
          }}
          data={this.state.pickerData}
          onChange={(country) => {
            this.selectCountry(country);
          }}
          cancelText="Cancel"
        />

        {/* <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
          <Text>Get Info</Text>
        </TouchableOpacity> */}

        {/* {this.renderInfo()} */}
      </View>
    );
  }
}

module.exports = PhonePrefix;
