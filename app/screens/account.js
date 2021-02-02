import {Text, View, Button} from 'react-native';
import React from 'react';
import {AuthContext} from '../auth';
import {
  sendLocalHabitNotification,
  getChannels,
  createHabitChannel,
  getSheduledNotifications,
  scheduleMedicationNotification,
  getDeliveredNotifications,
  clearDeliveredNotifications
} from '../notifications';
import ThemeButton from '../components/ThemeButton';

export default function AccountScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View>
      <Text>Account Screen</Text>
      <Button
        title="Sign out"
        onPress={() => {
          signOut();
        }}
      />
      <ThemeButton
        text={'Send Notification'}
        onPressEvent={() => {
          sendLocalHabitNotification(
            'Task Reminder: Short Walk',
            'Feeling under the weather? Do something to make you feel better.',
          );
        }}
      />

      <ThemeButton
        text={'Send scheduled notification'}
        onPressEvent={() => {
          scheduleMedicationNotification("Medication Reminder!", "Take 2 Panadols pill before lunch.", new Date(Date.now() + 10 * 1000))
        }}
      />

      <ThemeButton
        text={'Get scheduled notifications'}
        onPressEvent={() => {
          getSheduledNotifications();
        }}
      />

      <ThemeButton
        text={'Get delivered notifications'}
        onPressEvent={() => {
          getDeliveredNotifications()
        }}
      />

<ThemeButton
        text={'Clear delivered notifications'}
        onPressEvent={() => {
          clearDeliveredNotifications()
        }}
      />
    </View>
  );
}
