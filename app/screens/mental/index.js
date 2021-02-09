import { Text, View, Button,ScrollView,  } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
 
 
export default function MindScreen( {navigation} ) {



    return (
      <View style={LAYOUT.main}>
        <Text style={TYPE.h1}>Your tasks</Text>
      </View>
    );
  }

