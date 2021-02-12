import {Text, View, Button, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addHabit} from '../../DBFunctions';
import {Picker} from '@react-native-picker/picker';

export default function AddHabitScreen({navigation}) {

  //component state for addHabit form
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [numPerW, setNPW] = useState('');
  const [numPerD, setNPD] = useState('');
  const [category, setCat] = useState('');

  //const currentDate2 = new Date('2012-04-23T00:00:00.000Z').toISOString();

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
    <View>
      <Text>Add Habit Screen</Text>

      <TextInput
        placeholder="Title"
        onChangeText={(title) => setTitle(title)}
        defaultValue={title}
      />

      <TextInput
        placeholder="Description"
        onChangeText={(description) => setDesc(description)}
        defaultValue={description}
      />

      <Text>{date.toDateString()}</Text>
      <Button title="Start Date" onPress={showDatepicker}></Button>
      {/* <Text>{date.toTimeString()}</Text>
      <Button title="Time" onPress={showTimepicker}></Button> */}

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

      <TextInput
        placeholder="Number per day"
        onChangeText={(numPerD) => setNPD(numPerD)}
        defaultValue={numPerD}
      />


    <Picker
        selectedValue={category}
        style={{height: 50, width: 300}}
        onValueChange={(itemValue, itemIndex) => {
          setCat(itemValue);
        }}>
          <Picker.Item
            label="Fitness"
            value="Fitness"
      />
        <Picker.Item
            label="Health"
            value="Health"
      />
        <Picker.Item
            label="Fitness"
            value="Fitness"
      />
      </Picker>

      {/* Add variable to store points */}

      <Button
        title="Submit"
        onPress={() => {
          //saveHabit(title,description,date.toDateString(),date.toTimeString(),numPerW,numPerD,category);
          {
            addHabit(
              title,
              description,
              date.toISOString(),
              numPerD,
              category,
              0,
              0,
              currentDate,
              [0, 0, 0, 0, 0, 0]
            );
          }
          navigation.navigate('Tasks', {
            screen: 'Index',
          });
        }}
      />

      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
