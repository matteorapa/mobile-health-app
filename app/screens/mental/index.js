import {
  Text,
  View,
  ScrollView,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ProgressBar,
  Colors,
} from 'react-native-paper';
import ReminderRoute from './RemindersTab'
import {TabView, SceneMap} from 'react-native-tab-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {LineChart, Grid} from 'react-native-chart-kit';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';
import {
  getHabit
} from '../../DBFunctions';


const HabitRoute = () => {
  const navigation = useNavigation();

  const [boolean, setBool] = useState(false);
  const [counter, setCounter] = useState(1);
  return (
    <ScrollView>
      <Text>Mind Screen</Text>

      {getHabit()}

      {/* add FAB button from react native paper */}
      <Button
        icon="plus"
        mode="contained"
        onPress={() => {
          navigation.navigate('Tasks', {
            screen: 'AddHabit',
          });
        }}>
        Add Habit
      </Button>
    </ScrollView>
  );
};

const ProgressRoute = (props) => {
  const data = [0, 60, 50, 60, 30, 70];

  return (
    <View>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="pts"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#0963F0',
          backgroundGradientFrom: '#3579F3',
          backgroundGradientTo: '#3579F3',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};



const initialLayout = {width: Dimensions.get('window').width};

export default function MindScreen() {
  const [points, setPoints] = useState(0);
  const [consPts, setCPts] = useState(0);

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'habits', title: 'Habits'},
    {key: 'progress', title: 'Progress'},
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
      case 'progress':
        return (
          <ProgressRoute
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
      initialLayout={initialLayout}
    />
  );
}

export function reward(consPoints) {
  if (consPoints == 50) {
    Alert.alert('Reward', 'beginner achievement');
  }
  if (consPoints == 100) {
    Alert.alert('Reward', 'amateur achievement');
  }
  if (consPoints == 200) {
    Alert.alert('Reward', 'pro achievement');
  }
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
        onPress={() => {
          //saveHabit(title,description,date.toDateString(),date.toTimeString(),numPerW,numPerD,category);
          navigation.navigate('Tasks', {
            screen: 'Index',
          });
        }}
      />

      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
