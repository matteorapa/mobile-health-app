import {Text, View, Button, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { TimePickerModal } from 'react-native-paper-dates'
import {
  addHabit,
  getHabit,
  editItem,
  listHabitIds,
  addReminder,
} from '../../DBFunctions';
import nanoid from 'nanoid'

export default function AddReminderScreen({navigation}) {
  //array with the list of habits saved to choose a habit

  const [state, setState] = React.useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [frequency, setFrequency] = useState('Daily');

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
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

  <>
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12} // default: current hours
        minutes={14} // default: current minutes
        label="Select time" // optional, default 'Select time'
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale={'en'} // optional, default is automically detected by your system
      />
      <Button onPress={()=> setVisible(true)}>
        Pick time
      </Button>
    </>

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

      <Text>{date.toTimeString()}</Text>
      <Button title="Time" onPress={showTimepicker}></Button>

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
        title="Submit"
        onPress={() => {
          addReminder(state, null, title, date.toTimeString());

          navigation.navigate('Tasks', {
            screen: 'Index',
          });
        }}
      />

      <Button title="Go back" onPress={() => navigation.goBack()} />

      <>
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12} // default: current hours
        minutes={14} // default: current minutes
        label="Select time" // optional, default 'Select time'
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale={'en'} // optional, default is automically detected by your system
      />
      <Button onPress={()=> setVisible(true)}>
        Pick time
      </Button>
    </>
      
    </View>
  );
}
