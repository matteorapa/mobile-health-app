import { Text, View, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
 




export default function AddReminderScreen( {navigation} ) {

    //array with the list of habits saved to choose a habit

    
    const [title, setTitle] = useState(''); 

    
 
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
        <Text>Add Reminder Screen</Text>

        {/* check if you add one reminder at a time or multiple reminders */}
 
 
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
 




      <Button title="Submit" onPress={() => {
        //saveHabit(title,description,date.toDateString(),date.toTimeString(),numPerW,numPerD,category);
        navigation.navigate('Tasks', {
          screen: 'Index'
        });
        
        }} />  

        <Button title="Go back" onPress={() => navigation.goBack()} /> 

 
 
      </View>
    );
  }

