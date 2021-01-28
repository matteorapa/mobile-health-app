import { Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
 
 
 
export default function AddHabitScreen( {navigation} ) {
 
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
        placeholder="Title" /> 
 
        <TextInput
        placeholder="Description" /> 
 
      
 
      <Button title="Start Date" onPress={showDatepicker}></Button>

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
 
        <TextInput
        placeholder="Number per Week" /> 

        <TextInput
        placeholder="Number per day" />  
        
 
      <TextInput
        placeholder="Category"
      />
        <Button title="Go back" onPress={() => navigation.goBack()} /> 
 
 
      </View>
    );
  }
