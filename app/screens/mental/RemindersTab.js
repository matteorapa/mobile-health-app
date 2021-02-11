import {getReminder} from '../../DBFunctions';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {Text, View, ScrollView} from 'react-native';
import {
    Avatar,
    Button,
    Card,
    Title,
    Paragraph,
    ProgressBar,
    Colors,
  } from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';

export default function ReminderRoute(props){

  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [frequency, setFrequency] = useState('Daily')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };


  return (
    <ScrollView>
      <Text>Mind Screen</Text>

      <Card>
        <Title>Reminder Title</Title>
        <Paragraph>time</Paragraph>
        <Card.Actions>
          <Button>Remove</Button>
          <Button onPress={() => showTimepicker}>Edit</Button>
        </Card.Actions>
      </Card>

      {getReminder()}


      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Button
        icon="plus"
        mode="contained"
        onPress={() => {
          navigation.navigate('Tasks', {
            screen: 'AddReminder',
          });
        }}>
        Add Reminder
      </Button>
    </ScrollView>
  );
};
