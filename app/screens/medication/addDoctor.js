import { Text, TextInput, View, Button } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-community/picker';
import {styles} from '../../styles/globals';
import AddMedDocForm from './AddMedDocForm';
import PhonePrefix from './PhonePrefix';

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

  return (
    <AddMedDocForm initialValues={{
      doctName: '',
      doctSpeciality: '',
      doctPhoneCountry: '',
      doctPhoneCallingCode: '',
      doctPhoneNumber: '',
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
          {/* <PhonePrefix /> */}
          <TextInput
            style={styles.textInput}
            placeholder={'Doctor`s Phone Number'}
            onChangeText={text => onChangeValue('doctPhone', text)}
            keyboardType={'phone-pad'}
            value={values.doctPhone}
            autoFocus={true}
          />
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