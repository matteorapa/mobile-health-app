import React, {useState, useEffect} from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';
import { ReadMedication, deleteMedication } from '../../DBFunctions';


export default function ViewMedication({route, navigation}) {
    // {console.log("Route ", route.params)}
    // {console.log("Nav ", navigation)}

    const {medication} = route.params;
    const typeOfMedication = ['Liquid Solution', 'Pill/Tablet', 'Capsule', 'Tropical (cream/ointment)', 'Drops', 'Inhaler', 'Injection', 'Patches', 'Other'];
    const metricsOfDosage = ['ml', 'mg', 'g', 'Pills'];
    const dailyDosageOptions = ['Yes', 'No'];

    return(
        <View>
            <Text>{medication.medicationName}</Text>
            <Text>{typeOfMedication[medication.medicationType]}</Text>
            <Text>{medication.medicationDosage} {metricsOfDosage[medication.medicationDosageMetric]}</Text>
            <Text>{medication.medicationReason}</Text>
            <Text>{dailyDosageOptions[medication.medicationDaily]}</Text>
            <Text>{medication.medicationDailyDosesNumber}</Text>
            <Text>{medication.medicationTimer}</Text>
            <Text>{medication.medicationStartDate}</Text>
            <Text>{medication.medicationEndDate}</Text>
            <Text>{medication.medicationInstructions}</Text>

            <View style={styles.navButtonsForm}>
                <ThemeButton
                    type={"secondary"}
                    icon={'edit'}
                    text={"Edit"}
                    onPressEvent={() => {
                        navigation.navigate('Medication', {
                            screen: 'AddMedication',
                            params: {loadedMedication: medication}
                        });
                    }}
                />
                <ThemeButton
                    type={"secondary"}
                    icon={'delete'}
                    text={"Delete"}
                    onPressEvent={() => {
                        {deleteMedication(medication.medicationName)}
                        navigation.navigate('Medication', {
                            screen: 'Index'
                        });
                    }}
                />
            </View>

            <ThemeButton
                type={"secondary"}
                text={"Back"}
                onPressEvent={() => {
                    navigation.navigate('Medication', {
                        screen: 'Index'
                    });
                }}
            />
        </View>
    );

}