import {Text, View, Button, TextInput, Alert} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

import {Picker} from '@react-native-picker/picker';
import {TimePickerModal} from 'react-native-paper-dates';
import {listHabitIds, editReminder} from '../../DBFunctions';
import {set} from 'react-native-reanimated';


export default function EditReminderScreen({navigation, route}) {

    //obtaining data from route send from DBFunctions
  const {reminder} = route.params;

  //array with the list of habits saved to choose a habit

  const [state, setState] = React.useState(reminder.habitId);
  const [title, setTitle] = useState(reminder.reminderTitle);
  const [hours1, setHours] = useState(reminder.hours);
  const [minutes1, setMinutes] = useState(reminder.minutes);
  const [frequency, setFrequency] = useState('Daily');

  const [visible, setVisible] = useState(false);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      setHours(hours);
      setMinutes(minutes);
    },
    [setVisible],
  );

  return (
    <View>
      <Text>Add Reminder Screen</Text>
      {/* dropdown to select habit for reminders */}
      <Picker
        selectedValue={state}
        style={{height: 50, width: 300}}
        onValueChange={(itemValue, itemIndex) => {
          setState(itemValue);
        }}>
          {listHabitIds()}

      </Picker>
  
      <TextInput
        placeholder="Title"
        onChangeText={(title) => setTitle(title)}
        defaultValue={title}
      />

      <Text>{hours1}</Text>

      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={hours1} // default: current hours
        minutes={minutes1} // default: current minutes
      />
      <Button onPress={() => setVisible(true)} title={'Pick Time'}></Button>

      <Button
        title="Submit"
        onPress={() => {
          console.log("habit: ",state)
          console.log("title: ",title)
            console.log("hour: ",hours1)
            console.log("minutes: ",minutes1)
            {editReminder(state, reminder.reminderId, title, hours1, minutes1);}
          
          navigation.goBack();
        }}
      />

      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
