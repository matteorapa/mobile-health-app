import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import ThemeButton from '../../components/ThemeButton';
import {LAYOUT} from '../../styles/theme';
import {ReadDoctor, ReadMedication} from '../../DBFunctions';

export default function MedicationScreen({navigation}) {
  const [myDoctors, setMyDoctors] = useState([]);
  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  return (
    <View style={LAYOUT.main}>
      <ScrollView style={{height: '40%'}}>
        <ReadMedication navigation={navigation} />
      </ScrollView>

      <ThemeButton
        icon={'add'}
        text={'Add Medication'}
        accessibilityLabel="Add medication to list"
        onPressEvent={() => {
          navigation.navigate('Medication', {
            screen: 'AddMedication',
            params: {loadedMedication: ''},
          });
        }}
      />

      <ScrollView style={{height: '40%'}}>
        <ReadDoctor navigation={navigation} />
      </ScrollView>

      <ThemeButton
        icon={'add'}
        text={'Add Doctor'}
        accessibilityLabel="Add doctor to list"
        onPressEvent={() => {
          navigation.navigate('Medication', {
            screen: 'AddDoctor',
            params: {loadedDoctor: ''},
          });
        }}
      />
    </View>
  );
}
