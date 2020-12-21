import {Text, View, Button} from 'react-native';
import React from 'react';

export default function MedicationScreen({navigation}) {
  return (
    <View>
      <Text>Medication Screen</Text>
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
