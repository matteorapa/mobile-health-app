import {Text, View, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  Button
} from 'react-native-paper';

import ProgressComponent from '../../components/ProgressComponent'

import { deleteHabit } from '../../DBFunctions';

export default function DetailsScreen({navigation, route}) {
  //obtaining data from route send from index screen
  const {habit} = route.params;

  return (
    <View>
      <Text>Details Screen {habit.habitId}</Text>
        <ProgressComponent habit={habit} />
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
