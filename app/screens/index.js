import {Text, View, Card, Title} from 'react-native';
import React from 'react';
import {COLORS, LAYOUT, TYPE} from '../styles/theme';
import database from '@react-native-firebase/database';
import {styles} from '../styles/globals'

export default function WelcomeScreen() {
  const [notificationReminders, setNotificationReminders] = React.useState([]);
  
  React.useEffect(() => {
    const medicationRef = database().ref('/notificationReminders');
    const onLoadingListener = medicationRef.on('value', (snapshot) => {
      setNotificationReminders([]);
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val())
        setNotificationReminders((notificationReminders) => [...notificationReminders, childSnapshot.val()]);
      });
    });
    return () => {
      medicationRef.off('value', onLoadingListener);
    };
  }, []);

  return(
    <View></View>)

  // return notificationReminders.map((element) => {
  //   return (
  //     <Card style={styles.card}>
  //         <Title>{element.medicationName}</Title>
  //         <Text>Available till {element.medicationEndDate}</Text>
  //     </Card>
  //   );
  // })

}
