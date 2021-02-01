import { Text, TextInput, View, Button } from 'react-native';
import React from 'react';
import {styles} from '../../styles/globals';

function submitForm (docName, docSpeciality, docPhone, docEmail, cb){
  //check auth of form

  //submit to firebase table
  console.log('submit', docName, docSpeciality, docPhone, docEmail);

  cb();
}

export default function AddMedicationScreen( {navigation} ) {
  const [doctorName, onChangeDoctorName] = React.useState('');
  const [doctorSpeciality, onChangeDoctorSpeciality] = React.useState('');
  const [doctorPhone, onChangeDoctorPhone] = React.useState('');
  const [doctorEmail, onChangeDoctorEmail] = React.useState('');
  
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.heading}>New Doctor</Text>

          <Text>Doctor's Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Doctor Name'}
            onChangeText={(text) => onChangeDoctorName(text)}
            //value={text}
          />

          <Text>Doctor`s Speciality</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Doctor Speciality'}
            onChangeText={(text) => onChangeDoctorSpeciality(text)}
            //value={text}
          />

          <Text>Doctor`s Phone</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Doctor Phone'}
            onChangeText={(text) => onChangeDoctorPhone(text)}
            //value={text}
            keyboardType={'numeric'}
          />

          <Text>Doctor`s Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Doctor Email'}
            onChangeText={(text) => onChangeDoctorEmail(text)}
            //value={email}
          />

          <Button
            title="Add New Doctor"
            color="#000000"
            accessibilityLabel="Add doctor to list"
            onPress={() => {
              submitForm(doctorName, doctorSpeciality, doctorPhone, doctorEmail, () => {
                navigation.navigate('Medication', {
                  screen: 'Index'
                });
              });
            }}
          />

        </View>
      </View>
    );
  }