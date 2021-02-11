import React, {useState, useEffect} from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import { ReadMedication, deleteMedication } from '../../DBFunctions';


export default function ViewMedication({route, navigation}) {
    // {console.log("Route ", route.params)}
    // {console.log("Nav ", navigation)}

    const {medication} = route.params;

    return(
        <View>
            <Text>{medication.medicationName}</Text>
            <Text>{medication.medicationType}</Text>
            <Text>{medication.medicationDosage} {medication.medicationDosageMetric}</Text>
            <Text>{medication.medicationReason}</Text>
            <Text>{medication.medicationDaily}</Text>
            <Text>{medication.medicationDailyDosesNumber}</Text>
            <Text>{medication.medicationTimer}</Text>
            <Text>{medication.medicationStartDate}</Text>
            <Text>{medication.medicationEndDate}</Text>
            <Text>{medication.medicationInstructions}</Text>

            <Button
                title={"Edit"}
                onPress={() => {
                    navigation.navigate('Medication', {
                        screen: 'AddMedication',
                        params: {loadedMedication: medication}
                    });
                }}>

            </Button>
            <Button
                title={"Delete"}
                onPress={() => {
                    {deleteMedication(medication.medicationName)}
                    navigation.navigate('Medication', {
                        screen: 'Index'
                    });
                }}>
            </Button>

        </View>
    );

}