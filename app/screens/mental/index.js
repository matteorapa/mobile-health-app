<<<<<<< HEAD
import {Text, View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import { useRoute } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {Button, FAB, Snackbar} from 'react-native-paper';
import ReminderRoute from './RemindersTab';
import {TabView, TabBar} from 'react-native-tab-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';
import {getHabit} from '../../DBFunctions';

=======
import { Text, View, Button,ScrollView,  } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
 
 
export default function MindScreen( {navigation} ) {
>>>>>>> origin/master

const HabitRoute = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [snackbarText, setSnackbarText] = React.useState('');
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);


<<<<<<< HEAD
  const route = useRoute();

  // console.log(route.params)

  React.useEffect(()=>{
    if(route.params !== undefined){
        const {snackbar} = route.params;
        setSnackbarText(snackbar)
        setVisible(true)
    }
  }),[]

  return (
    <View style={LAYOUT.main}>

      <Text style={TYPE.h1}>Your Habits</Text>
      
      <ScrollView>{getHabit()}</ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        color={'#FFF'}
        onPress={() =>
          navigation.navigate('Tasks', {
            screen: 'AddHabit',
          })
        }
        label="ADD HABIT"
        accessibilityLabel="Add a new habit to list."
        animated={true}
      />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}>
        {snackbarText}
      </Snackbar>

    </View>
  );
};


export default function MindScreen() {
  const [points, setPoints] = useState(0);
  const [consPts, setCPts] = useState(0);
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'habits', title: 'Habits', icon: "plus"},
    {key: 'reminders', title: 'Reminders'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'habits':
        return (
          <HabitRoute
            points={points}
            setPoints={setPoints}
            consPts={consPts}
            setCPts={setCPts}
          />
        );
      case 'reminders':
        return (
          <ReminderRoute
            points={points}
            setPoints={setPoints}
            consPts={consPts}
            setCPts={setCPts}
          />
        );
      default:
        return (
          <HabitRoute
            points={points}
            setPoints={setPoints}
            consPts={consPts}
            setCPts={setCPts}
          />
        );
    }
  };

  //add step counter

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={(props)=>
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabbar}
        />
      }
    />
  );
}

export function editTime() {
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
        onChangeText={(numPerW) => setNPW(numPerW)}
        defaultValue={numPerW}
      />

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

      {/* Add variable to store points */}

      <Button
        title="Submit"
=======
    return (
      <ScrollView>
        <Text>Mind Screen</Text>
        <Button
        title = "Add Habit"
>>>>>>> origin/master
        onPress={() => {
          //saveHabit(title,description,date.toDateString(),date.toTimeString(),numPerW,numPerD,category);
          navigation.navigate('Tasks', {
            screen: 'Index',
          });
        }}
<<<<<<< HEAD
      />

      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
=======
        />
      </ScrollView>
    );
  }
>>>>>>> origin/master

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  screen: {
    height: '100%',
  },
  tabbar: {
    backgroundColor: COLORS.primary,
  },
  indicator: {
    backgroundColor: COLORS.secondary,
  },
});
