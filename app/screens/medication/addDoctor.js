import { Text, TextInput, View, Button, TouchableOpacity, Modal, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import {styles} from '../../styles/globals';
import AddMedDocForm from './AddMedDocForm';
//import PhonePrefix from './PhonePrefix';
// import CountryPicker from './ModalPickerImage';
// import countries from '../../node_modules/react-native-phone-input/lib/resources/countries.json'
// import CountryPicker from 'react-native-country-picker-modal'
// import { CountryCode, Country } from './src/types'
import {Countries} from './Countries';

function submitForm (docName, docSpeciality, docPhone, docEmail, cb){
  //check auth of form

  //submit to firebase table
  console.log('submit', docName, docSpeciality, docPhone, docEmail);

  cb();
}

export default function AddMedicationScreen( {navigation} ) {
  const [doctorName, onChangeDoctorName] = React.useState('');
  const [doctorSpeciality, onChangeDoctorSpeciality] = React.useState('');
  const [doctorPhonePrefix, onChangeDoctorPhonePrefix] = React.useState('');
  const [doctorPhone, onChangeDoctorPhone] = React.useState('');
  const [doctorEmail, onChangeDoctorEmail] = React.useState('');

  const specialitiesOfDoctors = ['Allergy and Immunology', 'Anesthesiology', 'Dermatology', 'Diagnostic Radiology', 'Emergency Medicine', 'Family Medicine',
                                  'Internal Medicine', 'Medical Genetics', 'Neurology', 'Nuclear Medicine', 'Obstetrics and Gynecology', 'Ophthalmology', 'Pathology',
                                  'Pediatrics', 'Physical Medicine and Rehabilitation', 'Preventive Medicine', 'Psychiatry', 'Radiation Oncology', 'Surgery', 'Urology'];

  //const listOfCountries = countries;
  
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [countryCode, setCountryCode] = useState('+356');
  const [countryPlaceholder, setCountryPlaceholder] = useState('1234 1234');

  const onShowHideCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible);
    filterCountries();
  }

  const filterCountries = (value) => {
    if (value) {
      const countryData = dataCountries.filter((obj) => (obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1))
      setDataCountries(countryData)
    }
    else {
      setDataCountries(Countries)
    }
  }

  const onCountryChange = (item) => {
    setCountryCode(item.dialCode);
    setCountryPlaceholder(item.mask);
    onShowHideCountryPicker();
  }

  let renderCountryPicker = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={countryPickerVisible}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.countryPickerContainer}>
            <View style={styles.filterInputContainer}>
              <TextInput 
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder={'Filter'}
                focusable={true}
                style={styles.filterInputStyle}
              />
            </View>
            <FlatList
              style={{flex: 1}}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={
                ({item}) => (
                  <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                    <View style={styles.countryPickerStyle}>
                      <View style={styles.countryPickerItemContainer}>
                        <Text style={styles.countryPickerItemName}>{item.en}</Text>
                        <Text style={styles.countryPickerItemDialCode}>{item.dialCode}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }
            />
          </View>
          <TouchableOpacity onPress={onShowHideCountryPicker} style={styles.closeButtonStyle}>
            <Text style={styles.closeTextStyle}>{'CLOSE'}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    )
  }

  return (
    <AddMedDocForm initialValues={{
      doctName: '',
      doctSpeciality: '',
      doctPhonePrefix: '',
      doctPhone: '',
      doctEmail: '',
    }}>


      <AddMedDocForm.Step>
        {({ onChangeValue, values }) => (
        <View>
          <Text>Doctor`s Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Doctor`s Name'}
            onChangeText={text => onChangeValue('doctName', text)}
            value={values.doctName}
            autoFocus={true}
          />
        </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({ onChangeValue, values }) => (
        <View>
          <Text>Doctor`s Speciality</Text>
          <Picker
            style={{width:'80%'}}
            selectedValue={values.doctSpeciality}
            onValueChange={(data) => onChangeValue('doctSpeciality', data)}
            value={values.doctSpeciality}>
            {specialitiesOfDoctors.map((item, index) => {
              return (<Picker.Item label={item} value={index} key={index}/>)
            })}
          </Picker>
        </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({ onChangeValue, values }) => (
        <View>
          <Text>Doctor`s Phone Number</Text>
          {/* <Picker
            style={{width:'50%'}}
            selectedValue={values.doctPhonePrefix}
            onValueChange={(data) => onChangeValue('doctPhonePrefix', data)}
            value={values.doctPhonePrefix}>
            {listOfCountries.map((item, index) => {
              return (<Picker.Item label={item} value={index} key={index}/>)
            })}
          </Picker> */}

          <View style={styles.phoneNumberInputs}>
            {/* <TextInput
              style={styles.textInput, {width: '10%'}}
              placeholder={'+356'}
              onChangeText={text => onChangeValue('doctPhonePrefix', text)}
              keyboardType={'phone-pad'}
              value={values.doctPhonePrefix}
            /> */}
            <TouchableOpacity onPress={onShowHideCountryPicker}>
              <View>
                <Text>{countryCode + " "}</Text>
              </View>
            </TouchableOpacity>
            {renderCountryPicker()}

            {/* {console.log(dataCountries)} */}
            <TextInput
              style={styles.textInput, {width: '40%'}}
              placeholder={countryPlaceholder}
              onChangeText={text => onChangeValue('doctPhone', text)}
              keyboardType={'phone-pad'}
              value={values.doctPhone}
              autoFocus={true}
            />
          </View>
        </View>
        )}
      </AddMedDocForm.Step>
      
      <AddMedDocForm.Step>
        {({ onChangeValue, values }) => (
        <View>
          <Text>Doctor`s Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Doctor`s Email'}
            onChangeText={text => onChangeValue('doctEmail', text)}
            keyboardType={'email-address'}
            value={values.doctEmail}
            autoFocus={true}
          />
        </View>
        )}
      </AddMedDocForm.Step>

    </AddMedDocForm>
  );
}