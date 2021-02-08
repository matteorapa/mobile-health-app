import { Text, TextInput, View, Button, Image, TouchableOpacity, Modal, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import {styles} from '../../styles/globals';
import AddMedDocForm from './AddMedDocForm';
import { Countries } from './Countries';
import { TextInputMask } from 'react-native-masked-text';
import { countryFlags } from './countryFlags';

function submitForm (docName, docSpeciality, docPhonePrefix, docPhone, docEmail, cb){
  //check auth of form

  //submit to firebase table
  console.log('submit', docName, docSpeciality, docPhonePrefix, docPhone, docEmail);

  //cb();
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
  
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [countryCode, setCountryCode] = useState('+356');
  const [countryPlaceholder, setCountryPlaceholder] = useState('9999 9999');
  const [countryFlagCode, setCountryFlagCode] = useState(require('./images/mt.png'));

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
    onChangeDoctorPhonePrefix(item.dialCode);
    setCountryFlagCode(countryFlags.flags[item.code.toLowerCase()]);
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
                        <Image source={countryFlags.flags[item.code.toLowerCase()]} style={styles.flagImage}/>
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
            onChangeText={ function(text) {{onChangeValue('doctName', text)}; {onChangeDoctorName(text)}} }
            value={values.doctName}
            autoFocus={true}
            autoCapitalize={'words'}
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
            onValueChange={ function(data) {{onChangeValue('doctSpeciality', data)}; {onChangeDoctorSpeciality(specialitiesOfDoctors[data])}} }
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

          <View style={styles.phoneNumberInputs}>
            <TouchableOpacity onPress={onShowHideCountryPicker}>
              <View style={styles.testing}>
                <Image source={countryFlagCode} style={styles.flagImage}/>
                <Text>{countryCode}</Text>
              </View>
            </TouchableOpacity>
            {renderCountryPicker()}
            
            <TextInputMask
              type={'custom'}
              style={styles.textInput, styles.phoneNumberInputs}
              options={{mask: countryPlaceholder}}
              onChangeText={ function(text) {{onChangeValue('doctPhone', text)}; {onChangeDoctorPhone(text)}} }
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
            onChangeText={ function(text) {{onChangeValue('doctEmail', text)}; {onChangeDoctorEmail(text)}} }
            keyboardType={'email-address'}
            value={values.doctEmail}
            autoFocus={true}
            autoCapitalize={'none'}
          />
          
    {/* for testing purposes */}
    {submitForm(doctorName, doctorSpeciality, doctorPhonePrefix, doctorPhone, doctorEmail)}

        </View>
        )}
      </AddMedDocForm.Step>

    </AddMedDocForm>

    
      
    
  );
}