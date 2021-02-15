import database from '@react-native-firebase/database';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {Text, Image, View, Alert, ScrollView} from 'react-native';
import {LAYOUT, TYPE} from '../styles/theme';
import {styles} from '../styles/globals';
import music from '../assets/images/music.png';

import React, {useState, useEffect} from 'react';
import {Card, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import ThemeButton from '../components/ThemeButton';
import { clearDeliveredNotifications, getDeliveredNotifications, getScheduledNotifications, sendLocalHabitNotification } from '../notifications';
import {List} from 'react-native-paper';

export default function WelcomeScreen() {

  const [deliveredNotifications, setDeliveredNotifications] = React.useState([]);
  const [scheduledNotifications, setScheduledNotifications] = React.useState([]);

  const [expandedScheduled, setExpandedScheduled] = React.useState(true);
  const handlePressScheduled = () => setExpandedScheduled(!expandedScheduled);

  const [expandedDelievered, setExpandedDelievered] = React.useState(true);
  const handlePressDelievered = () => setExpandedDelievered(!expandedDelievered);
  

  React.useEffect(()=>{

    getScheduledNotifications((data)=>{
      setScheduledNotifications(data)
    })

    getDeliveredNotifications((data)=>{
      setDeliveredNotifications(data)
    })

  },[])

  
  

  return (
    <View style={LAYOUT.main}>
      <Text style={TYPE.h1}>Your Reminders</Text>
      <ScrollView >

          <List.Accordion
            title="Scheduled Notifications"
          
            expanded={expandedScheduled}
            onPress={handlePressScheduled}>
              {scheduledNotifications.map((notification) => <List.Item key={notification.id} title={notification.title} />)}
          </List.Accordion>

          <List.Accordion
            title="Delivered Notifications"
            expanded={expandedDelievered}
            onPress={handlePressDelievered}>
              {deliveredNotifications.map((notification, index) => <List.Item key={index} title={notification.title} />)}
          </List.Accordion>

          <ThemeButton 
            type="secondary"
            accessibilityLabel="Press button to clear your remidners in the notification tray."
            text="CLEAR DELIVERED NOTIFICATIONS"
            onPressEvent={()=>{
              clearDeliveredNotifications()
              setDeliveredNotifications([]);
            }}
          />

        <ThemeButton 
            type="secondary"
            accessibilityLabel="Press button to clear your remidners in the notification tray."
            text="Send Notification (demo)"
            onPressEvent={()=>{
              sendLocalHabitNotification("title", "msg here", new Date() + 5000)
              getDeliveredNotifications((data)=>{
                setDeliveredNotifications(data)
              })
            }}
          />

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
    return notificationReminders.map((element, index) => {
      const endingDate = new Date(element.medicationEndDate);
      if(element.medicationUserId == uid){
        if (endingDate.setDate(endingDate.getDate() + 1) > (new Date)) {
          return (
            <Card style={styles.card} key={index}>
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
        }
    }
    })
  } else {
    return ( //This return will take effect when there are no entries in the database
      <View>
         <Text>You do not yet have any medication reminders.</Text>
      </View>
    );
  }
    // return ( //This return will take effect when there are no entries in the database
    //   <View>
    //     <Image source={music} style={styles.emptyState} />
       
    //   </View>
    // );

   
}