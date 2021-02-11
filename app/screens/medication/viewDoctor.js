import React, {useState, useEffect} from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import { ReadDoctor, deleteDoctor } from '../../DBFunctions';


export default function ViewDoctor({route, navigation}) {
    // {console.log("Route ", route.params)}
    // {console.log("Nav ", navigation)}

    const {doctor} = route.params;

    return(
        <View>
            <Text>{doctor.doctorName}</Text>
            <Text>{doctor.doctorSpeciality}</Text>
            <Text>{doctor.doctorPhone}</Text>
            <Text>{doctor.doctorEmail}</Text>

            {/* <Button title={"Edit"} onPress={() => }></Button> */}
            <Button
                title={"Delete"}
                onPress={() => {
                    {deleteDoctor(doctor.doctorPhone)}
                    navigation.navigate('Medication', {
                        screen: 'Index'
                    });
                }}></Button>

        </View>
    );

}