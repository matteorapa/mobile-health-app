import {Text, View, Button, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addHabit, deleteItem, editItem, deleteHabit} from '../../DBFunctions';

//to do
//placeholders, date and time set as current values

export default function EditHabitScreen({navigation, route}) {
  const {habit} = route.params;

  //fill component state with habit details from db

  const [title, setTitle] = useState(habit.habitId);
  const [description, setDesc] = useState(habit.habitDesc);
  const [numPerD, setNPD] = useState(habit.numPerD);
  const [category, setCat] = useState(habit.category);
  const [date, setDate] = useState(new Date(habit.startDate));
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
      <Text>Edit Habit Screen</Text>
      <Text>date - {habit.startDate}</Text>

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

      <TextInput
        placeholder="Category"
        onChangeText={(category) => setCat(category)}
        defaultValue={category}
      />

      <Button
        title="Save Changes"
        onPress={() => {

          //edit using db function
          addHabit(title, description, date.toISOString(), numPerD, category, habit.consPts, habit.points, habit.date, habit.graphData);
          navigation.navigate('Tasks', {
            screen: 'Index',
          });
        }}
      />

      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
