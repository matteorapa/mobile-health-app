import { Text, TextInput, View, Button } from 'react-native';
import React from 'react';
import {styles} from '../../styles/globals';
import AddMedDocForm from './AddMedDocForm';

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
    <AddMedDocForm initialValues={{
      doctName: '',
      doctSpeciality: '',
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
          <TextInput
            style={styles.textInput}
            placeholder={'Doctor`s Speciality'}
            onChangeText={text => onChangeValue('doctSpeciality', text)}
            value={values.doctSpeciality}
            autoFocus={true}
        //drop-down with choices
          />
        </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({ onChangeValue, values }) => (
        <View>
          <Text>Doctor`s Phone Number</Text>
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



    // return (
    //   <View style={styles.container}>
    //     <View style={styles.box}>
    //       <Text style={styles.heading}>New Doctor</Text>

    //       <Text>Doctor's Name</Text>
    //       <TextInput
    //         style={styles.textInput}
    //         placeholder={'Doctor Name'}
    //         onChangeText={(text) => onChangeDoctorName(text)}
    //         //value={text}
    //       />

    //       <Text>Doctor`s Speciality</Text>
    //       <TextInput
    //         style={styles.textInput}
    //         placeholder={'Doctor Speciality'}
    //         onChangeText={(text) => onChangeDoctorSpeciality(text)}
    //         //value={text}
    //       />

    //       <Text>Doctor`s Phone</Text>
    //       <TextInput
    //         style={styles.textInput}
    //         placeholder={'Doctor Phone'}
    //         onChangeText={(text) => onChangeDoctorPhone(text)}
    //         //value={text}
    //         keyboardType={'numeric'}
    //       />

    //       <Text>Doctor`s Email</Text>
    //       <TextInput
    //         style={styles.textInput}
    //         placeholder={'Doctor Email'}
    //         onChangeText={(text) => onChangeDoctorEmail(text)}
    //         //value={email}
    //       />

    //       <Button
    //         title="Add New Doctor"
    //         color="#000000"
    //         accessibilityLabel="Add doctor to list"
    //         onPress={() => {
    //           submitForm(doctorName, doctorSpeciality, doctorPhone, doctorEmail, () => {
    //             navigation.navigate('Medication', {
    //               screen: 'Index'
    //             });
    //           });
    //         }}
    //       />

    //     </View>
    //   </View>
    // );
  }