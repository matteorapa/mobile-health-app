import React, {useState, useEffect} from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';
import { ReadDoctor, deleteDoctor } from '../../DBFunctions';


export default function ViewDoctor({route, navigation}) {
    // {console.log("Route ", route.params)}
    // {console.log("Nav ", navigation)}

    const {doctor} = route.params;
    const specialitiesOfDoctors = ['Allergy and Immunology', 'Anesthesiology', 'Dermatology', 'Diagnostic Radiology', 'Emergency Medicine', 'Family Medicine',
                                  'Internal Medicine', 'Medical Genetics', 'Neurology', 'Nuclear Medicine', 'Obstetrics and Gynecology', 'Ophthalmology', 'Pathology',
                                  'Pediatrics', 'Physical Medicine and Rehabilitation', 'Preventive Medicine', 'Psychiatry', 'Radiation Oncology', 'Surgery', 'Urology'];

    return(
        <View>
            <Text>{doctor.doctorName}</Text>
            <Text>{specialitiesOfDoctors[doctor.doctorSpeciality]}</Text>
            <Text>{doctor.doctorPhonePrefix} {doctor.doctorPhone}</Text>
            <Text>{doctor.doctorEmail}</Text>

            <View style={styles.navButtonsForm}>
                <ThemeButton
                    type={"secondary"}
                    icon={'edit'}
                    text={"Edit"}
                    onPressEvent={() => {
                        navigation.navigate('Medication', {
                            screen: 'AddDoctor',
                            params: {loadedDoctor: doctor}
                        });
                    }}
                />
                <ThemeButton
                    type={"secondary"}
                    icon={'delete'}
                    text={"Delete"}
                    onPressEvent={() => {
                        {deleteDoctor(doctor.doctorPhone)}
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