import { Text, View, Button } from 'react-native';
import React from 'react';

export default function MindScreen( {navigation} ) {
    return (
      <View>
        <Text>Mind Screen</Text>

        <Button
        title = "Add Habit"
        onPress={() => {
          navigation.navigate('Tasks', {
            screen: 'AddHabit'
          });
        }}
        />

      </View>
    );
  }