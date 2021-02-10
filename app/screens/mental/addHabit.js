import { Text, View, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addHabit, deleteItem, editItem} from '../../DBFunctions';
 




export default function AddHabitScreen( {navigation} ) {

  const [itemId, setItemId] = useState();
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);

    const [title, setTitle] = useState(''); 
    const [description, setDesc] = useState(''); 
    const [numPerW, setNPW] = useState(''); 
    const [numPerD, setNPD] = useState(''); 
    const [category, setCat] = useState(''); 

    const currentDate = new Date().toDateString();
    
 
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
        onChangeText={title => setTitle(title)}
        defaultValue={title}/> 
 
        <TextInput
        placeholder="Description" 
        onChangeText={description => setDesc(description)}
        defaultValue={description}/> 
 
      
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
        onChangeText={numPerD => setNPD(numPerD)}
        defaultValue={numPerD}/>  
        
 
      <TextInput
        placeholder="Category"
        onChangeText={category => setCat(category)}
        defaultValue={category}
      />

      {/* Add variable to store points */}

      <Button title="Submit" onPress={() => {
        //saveHabit(title,description,date.toDateString(),date.toTimeString(),numPerW,numPerD,category);
        {addHabit(title, description, date.toDateString(), numPerD, category, 0, 0, currentDate);}
        navigation.navigate('Tasks', {
          screen: 'Index'
        });
        
        }} />  

        <Button title="Go back" onPress={() => navigation.goBack()} /> 

 
 
      </View>
    );
  }

