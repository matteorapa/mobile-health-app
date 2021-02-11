import React, {useState, useEffect} from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FAB, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeButton from '../../components/ThemeButton';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ReadDoctor, ReadMedication, readMedication } from '../../DBFunctions';

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

      <ReadMedication navigation = {navigation} />

      <ThemeButton
        icon={'add'}
        text={'Add Medication'}
        accessibilityLabel="Add medication to list"
        onPressEvent={() => {
          navigation.navigate('Medication', {
            screen: 'AddMedication',
            params: {loadedMedication: ''}
          });
        }}
      />

      <ReadDoctor navigation = {navigation} />

      <ThemeButton
        icon={'add'}
        text={'Add Doctor'}
        accessibilityLabel="Add doctor to list"
        onPressEvent={() => {
          navigation.navigate('Medication', {
            screen: 'AddDoctor'
          });
        }}
      />

    </View>
    
  );
}
