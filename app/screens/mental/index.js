import { Text, View, ScrollView, Alert, Dimensions, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {TabView, SceneMap} from 'react-native-tab-view';
import { exp } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
 

 
const HabitRoute = () => {
  let points = 0;
  const navigation = useNavigation();
  
  
  return(

  <ScrollView>

        <Text>Mind Screen</Text>

        <Card>
          <Title>Habit Title</Title>
          <Paragraph>
            Description
            start date
            time
          </Paragraph>
          <Card.Actions>
            <Button onPress={() => {
              points = points + 10;
              reward(points);
              }}>Done</Button>
            <Button>Fail</Button>
            <Button onPress={() => {
          navigation.navigate('Tasks', {
            screen: 'EditHabit'
          });
        }}>Edit</Button>
          </Card.Actions>
        </Card>

        {/* add FAB button from react native paper */}
        <Button
        icon="plus"
        mode="contained"
        onPress={() => {
          navigation.navigate('Tasks', {
            screen: 'AddHabit'
          });
        }}
        >Add Habit</Button>

      </ScrollView>
  );
}
 
const ReminderRoute = () => {
  const navigation = useNavigation();
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

return(
  <ScrollView>

        <Text>Mind Screen</Text>

        <Card>
          <Title>Reminder Title</Title>
          <Paragraph>
            time
          </Paragraph>
          <Card.Actions>

            <Button>Remove</Button>
            <Button onPress={showTimepicker}>Edit</Button>
          </Card.Actions>
        </Card>

        {/* try setting the value from here */}

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
        icon="plus"
        mode="contained"
        onPress={() => {
          navigation.navigate('Tasks', {
            screen: 'AddReminder'
          });
        }}
        >Add Reminder</Button>

      </ScrollView>
);
      }
 
const initialLayout = { width: Dimensions.get('window').width };

 
export default function MindScreen() {
      
      const [index, setIndex] = React.useState(0);
      const [routes] = React.useState([
        { key: 'habits', title: 'Habits' },
        { key: 'reminders', title: 'Reminders' },
      ]);
    
      const renderScene = SceneMap({
        habits: HabitRoute,
        reminders: ReminderRoute,
      });

 //add step counter

    return (
<TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />

      
    );
  }


  export function reward(points){
    

    if(points == 50 ){Alert.alert("Reward", "beginner achievement");}
    if(points == 100 ){Alert.alert("Reward", "amateur achievement");}
    if(points == 200 ){Alert.alert("Reward", "pro achievement");}
  }

  export function editTime(){
 
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

      {/* Add variable to store points */}

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

  const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
  });