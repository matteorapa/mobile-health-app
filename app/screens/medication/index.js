import React, {useState, useEffect} from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FAB, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeButton from '../../components/ThemeButton';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MedicationScreen({navigation}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (
    <View style={LAYOUT.main}>

      <List.Section>
        <List.Subheader>Your Medication</List.Subheader>
        <TouchableOpacity>
          <List.Item
            title="Pill 1"
            left={() => <Image source={require('./drugs.png')} style={{width: 22, height: 22}} />}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <List.Item
            title="Pill 2"
            left={() => <Image source={require('./drugs.png')} style={{width: 22, height: 22}} />}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <List.Item
            title="Pill 3"
            left={() => <Image source={require('./drugs.png')} style={{width: 22, height: 22}} />}
          />
        </TouchableOpacity>
      </List.Section>

      <ThemeButton
        icon={'add'}
        text={'Add Medication'}
        accessibilityLabel="Add medication to list"
        onPressEvent={() => {
          navigation.navigate('Medication', {
            screen: 'AddMedication'
          });
        }}
      />

      <List.Section>
        <List.Subheader>Your Doctors</List.Subheader>
        <TouchableOpacity>
        <List.Item
          title="Doctor 1"
          left={() => <Icon name="face" size={24} />}
        />
        </TouchableOpacity>
        <TouchableOpacity>
        <List.Item
          title="Doctor 2"
          left={() => <Icon name="face" size={24} />}
        />
        </TouchableOpacity>
      </List.Section>

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

    // <View>
    //   <Text>Medications</Text>
    //   <Text>Active Medications</Text>
    //   <Text>Past Medications</Text>
    //   <Text>Your Doctors</Text>

    //   <Button
    //         title="Add Doctor"
    //         color="#000000"
    //         accessibilityLabel="Add doctor to list"
    //         onPress={() => {
    //           navigation.navigate('Medication', {
    //             screen: 'AddDoctor'
    //           });
    //         }}
    //       />
    //   <Button
    //         title="Add Medication"
    //         color="#000000"
    //         accessibilityLabel="Add medication to list"
    //         onPress={() => {
    //           navigation.navigate('Medication', {
    //             screen: 'AddMedication'
    //           });
    //         }}
    //       />
    // </View>
  );
}
