import { Text, View, Button,ScrollView,  } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
 
 
export default function MindScreen( {navigation} ) {



    return (
      <ScrollView>
        <Text>Mind Screen</Text>
        <Button
        title = "Add Habit"
        onPress={() => {
          navigation.navigate('Tasks', {
            screen: 'AddHabit'
          });
        }}
        />
      </ScrollView>
    );
  }

