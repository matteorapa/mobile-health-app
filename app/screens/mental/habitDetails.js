import {Text, View, Dimensions, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';

import ProgressComponent from '../../components/ProgressComponent';

import {addHabit, deleteHabit} from '../../DBFunctions';
import {LineChart, Grid} from 'react-native-chart-kit';

export default function DetailsScreen({navigation, route}) {
  //obtaining data from route send from index screen
  const {habit} = route.params;
  let data = [0, 0, 0, 0, 0, 0];
  let counter = 0;

  const currentMonth = new Date().getMonth() + 1;

  // React.useEffect(() => {

  habit.graphData.map((element) => {
    data[counter] = element;
    counter = counter + 1;
  });

  if (currentMonth <= 2) {
    data[0] = habit.points;
  }
  if (currentMonth > 2 && currentMonth <= 4) {
    data[1] = habit.points;
  }
  if (currentMonth > 4 && currentMonth <= 6) {
    data[2] = habit.points;
  }
  if (currentMonth > 6 && currentMonth <= 8) {
    data[3] = habit.points;
  }
  if (currentMonth > 8 && currentMonth <= 10) {
    data[4] = habit.points;
  }
  if (currentMonth > 10 && currentMonth <= 12) {
    data[5] = habit.points;
  }

  addHabit(
    habit.habitId,
    habit.habitDesc,
    habit.startDate,
    habit.numPerD,
    habit.category,
    habit.consPts,
    habit.points,
    habit.date,
    data,
  );

  return (
    <View>
      <Text>Details Screen {habit.habitId}</Text>
      <ProgressComponent habit={habit} />

      <LineChart
        data={{
          labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
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

      <Text>Description: {habit.habitDesc}</Text>
      <Text>Start Date: {habit.startDate}</Text>
      <Text>Number Per Day: {habit.numPerD}</Text>
      <Text>Category: {habit.category}</Text>
      <Text>Consecutive Points: {habit.consPts}</Text>
      <Text>Points: {habit.points}</Text>

      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('Tasks', {
            screen: 'EditHabit',
            params: {
              habit: habit,
            },
          });
        }}>
        Edit
      </Button>

      <Button
        mode="contained"
        onPress={() => {
          deleteHabit(habit.habitId);
          navigation.navigate('Tasks', {
            screen: 'Index',
          });
        }}>
        Delete
      </Button>
      <Button mode="contained" onPress={() => navigation.goBack()}>
        Go Back
      </Button>
    </View>
  );
}
