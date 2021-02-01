import {Text, View, Button} from 'react-native';
import React from 'react';
//import { Button } from '@material-ui/core'
//import 'fontsource-roboto'
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function MedicationScreen({navigation}) {
  return (
    <View>
      <Text>Medications</Text>
      <Text>Active Medications</Text>
      <Text>Past Medications</Text>
      <Text>Your Doctors</Text>

      <Button
            title="Add Doctor"
            color="#000000"
            accessibilityLabel="Add doctor to list"
            onPress={() => {
              navigation.navigate('Medication', {
                screen: 'AddDoctor'
              });
            }}
          />
      <Button
            title="Add Medication"
            color="#000000"
            accessibilityLabel="Add medication to list"
            onPress={() => {
              navigation.navigate('Medication', {
                screen: 'AddMedication'
              });
            }}
          />
        
          
    </View>
  );
}