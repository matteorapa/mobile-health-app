import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import ModalPickerImage from './ModalPickerImage';
import PhoneInput from "react-native-phone-input";

class PhonePrefix extends Component {
  constructor() {
    super();

    this.state = {
      valid: "",
      type: "",
      value: ""
    };

    this.updateInfo = this.updateInfo.bind(this);
    // this.renderInfo = this.renderInfo.bind(this);
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });
  }

  componentDidMount(){
    this.setState({
        pickerData: this.phone.getPickerData()
    })
  }

  onPressFlag(){
      this.myCountryPicker.open()
  }

  selectCountry(country){
      this.phone.selectCountry(country.iso2)
  }

  // renderInfo() {
  //   if (this.state.value) {
  //     return (
  //       <View style={styles.info}>
  //         <Text>
  //           Is Valid:{" "}
  //           <Text style={{ fontWeight: "bold" }}>
  //             {this.state.valid.toString()}
  //           </Text>
  //         </Text>
  //         <Text>
  //           Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
  //         </Text>
  //         <Text>
  //           Value:{" "}
  //           <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
  //         </Text>
  //       </View>
  //     );
  //   }
  // }

  render() {
    return (
      // <View style={styles.container}>
      <View>
        <PhoneInput
          ref={ ref => {this.phone = ref;} }
          onPressFlag={this.onPressFlag}
        />

        <ModalPickerImage
          ref={(ref) => { this.myCountryPicker = ref; }}
          data={this.state.pickerData}
          onChange={(country)=>{ this.selectCountry(country) }}
          cancelText='Cancel'
        />

        {/* <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
          <Text>Get Info</Text>
        </TouchableOpacity> */}

        {/* {this.renderInfo()} */}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 60
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 20
  },
  button: {
    marginTop: 20,
    padding: 10
  }
});

module.exports = PhonePrefix;