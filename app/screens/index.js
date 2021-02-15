import database from '@react-native-firebase/database';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {Text, Image, View, Alert, ScrollView} from 'react-native';
import {LAYOUT} from '../styles/theme';
import {styles} from '../styles/globals';
import love from '../assets/images/love.png';
import music from '../assets/images/music.png';

import React, {useState, useEffect} from 'react';
import {Card, Title, Paragraph, Chip, List, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import PaddedDivider from '../components/PaddedDivider';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function WelcomeScreen() {

  return (
    <View style={LAYOUT.main}>
      
      <Text style={styles.heading}>Medication Reminders</Text>
      
    <ScrollView>
      {ViewReminders()}
    </ScrollView>

    </View>
  )

}

export function ViewReminders(){
  const [notificationReminders, setNotificationReminders] = React.useState([]);

  const navigation = useNavigation();

  React.useEffect(() => {
    const notificationRemindersRef = database().ref('/notificationReminders');
    const onLoadingListener = notificationRemindersRef.on('value', (snapshot) => {
      setNotificationReminders([]);
      snapshot.forEach(function (childSnapshot) {
        setNotificationReminders((notificationReminders) => [...notificationReminders, childSnapshot.val()]);
      });
    });

    return () => {
      notificationRemindersRef.off('value', onLoadingListener);
    };
  }, []);
  if (notificationReminders.length > 0){
    return notificationReminders.map((element) => {

      if(element.medicationUserId == global.uid){

      return (
        <Card style={styles.card}>
          <Card.Content>
            <Title>{element.medicationName}</Title>
            <Text>Medication Start Date : {element.medicationStartDate}</Text>
            <Text>Medication End Date : {element.medicationEndDate}</Text>
            {element.medicationTimerArray.map((element, index) => {
            return (
              <Text>Dose {index + 1} - {element.hour}:{element.minute}</Text>
        )
      })}
          </Card.Content>
        </Card>
      );
    } else {
      return ( //This return will take effect when there are no entries in the database that relates to the userId of the currently logged in user
        <View style={styles.emptyStateContainer}>
        <Image source={music} style={styles.emptyState} />
        <Text>
          You do not yet have any medication reminders.
        </Text>
      </View>
      );
    }
    });
  } else {
    return ( //This return will take effect when there are no entries in the database
      <View style={styles.emptyStateContainer}>
        <Image source={music} style={styles.emptyState} />
        <Text>
        You do not yet have any medication reminders.
        </Text>
      </View>
    );

  } 
}