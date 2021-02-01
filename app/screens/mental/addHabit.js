import { Text, View, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

 




export default function AddHabitScreen( {navigation} ) {
  // firebase.initializeApp({
  //   clientId: '569751018067-9coa1aj6lehue711mstgnfo689d0jni4.apps.googleusercontent.com',
  //   appId: '1:569751018067:android:ffabc1450547b6b26dc4a6',
  //   apiKey: 'AIzaSyDjsEikDKMSuBZmSGKBkd3YmpjgV9NumFI',
  //   databaseURL: 'https://Health-app.firebaseio.com',
  //   storageBucket: 'health-app-caec8.appspot.com',
  //   messagingSenderId: '569751018067',
  //   projectId: 'health-app-caec8',
  // });

  


    const [title, setTitle] = useState(''); 
    const [description, setDesc] = useState(''); 
    const [numPerW, setNPW] = useState(''); 
    const [numPerD, setNPD] = useState(''); 
    const [category, setCat] = useState(''); 
    
 
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
 
        <TextInput
        placeholder="Number per Week" 
        onChangeText={numPerW => setNPW(numPerW)}
        defaultValue={numPerW}/> 

        <TextInput
        placeholder="Number per day" 
        onChangeText={numPerD => setNPD(numPerD)}
        defaultValue={numPerD}/>  
        
 
      <TextInput
        placeholder="Category"
        onChangeText={category => setCat(category)}
        defaultValue={category}
      />

      <Button title="Submit" onPress={async () => {
        //saveHabit(title,description,date.toDateString(),date.toTimeString(),numPerW,numPerD,category);
        console.log("button pressed");
        // await firestore()
        // .collection('Habits')
        // .doc('test')
        // .set({
        // name: 'Ada Lovelace',
        // age: 30,
        // })
        // .then(() => {
        // console.log('User added!');
        // });
        console.log(await firestore().collection('Habits').doc('test').get());
        // navigation.navigate('Tasks', {
        //   screen: 'Index'
        // });
        
        }} />  

        <Button title="Go back" onPress={() => navigation.goBack()} /> 

 
 
      </View>
    );
  }

