import {Text, View, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet} from 'react-native';
import {FAB, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeButton from '../../components/ThemeButton';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';

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
        <List.Item
          title="Pill 1"
        />
        <List.Item
          title="Pill 2"
        />
        <List.Item
          title="Pill 3"
        />
      </List.Section>

      <ThemeButton
        icon={'add'}
        text={'Add Medication'}
        onPress={() => {
          signOut();
        }}
      />

      <List.Section>
        <List.Subheader>Your Doctors</List.Subheader>
        <List.Item
          title="Doctor 1"
          left={() => <Icon name="face" size={24} />}
        />
        <List.Item
          title="Doctor 2"
          left={() => <Icon name="face" size={24} />}
        />
       
      </List.Section>

      <ThemeButton
        icon={'add'}
        text={'Add Doctor'}
        onPress={() => {
          signOut();
        }}
      />

     

    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 48,
    height: 48,
  },
});
