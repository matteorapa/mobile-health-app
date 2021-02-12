import {Text, View, Button, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addHabit} from '../../DBFunctions';
import {Picker} from '@react-native-picker/picker';

import { DatePickerModal } from 'react-native-paper-dates'

export default function AddHabitScreen({navigation}) {

  //component state for addHabit form
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [numPerW, setNPW] = useState('');
  const [numPerD, setNPD] = useState('');
  const [category, setCat] = useState('');
  const [date, setDate] = useState(new Date());

  //const currentDate2 = new Date('2012-04-23T00:00:00.000Z').toISOString();


// date picker modal 

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
        keyboardType={'numeric'}
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

      {/* Add variable to store points */}

      <Button
        title="Submit"
        onPress={() => {
          //saveHabit(title,description,date.toDateString(),date.toTimeString(),numPerW,numPerD,category);
          {
            addHabit(
              title,
              description,
              date.toDateString(),
              numPerD,
              category,
              0,
              0,
              null,
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
