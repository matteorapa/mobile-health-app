import {Text, View, Button, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addHabit, deleteItem, editItem, deleteHabit} from '../../DBFunctions';
import { DatePickerModal } from 'react-native-paper-dates'
import {Picker} from '@react-native-picker/picker';

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



  const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onChange = React.useCallback(({ date }) => {
    setVisible(false)
    setDate( date )
  }, [setVisible, setDate])

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

      <DatePickerModal
        mode="single"
        visible={visible}
        onDismiss={onDismiss}
        date={date}
        onConfirm={onChange}
        saveLabel="Save" // optional
        label="Select date" // optional
        animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        locale={'en'} // optional, default is automically detected by your system
      />
      <Button onPress={()=> setVisible(true) } title="Pick date"/>

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
            label="Workout"
            value="Workout"
      />
        <Picker.Item
            label="Physical Health"
            value="Physical Health"
      />
        <Picker.Item
            label="Mental Health"
            value="Mental Health"
      />
      <Picker.Item
            label="Daily Routines"
            value="Daily Routines"
      />
      <Picker.Item
            label="Pet"
            value="Pet"
      />
      </Picker>

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
