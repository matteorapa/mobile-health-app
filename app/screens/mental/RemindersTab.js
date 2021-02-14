import {getReminder} from '../../DBFunctions';
import React, {useState} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {LAYOUT, TYPE} from '../../styles/theme';
import {FAB} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';

export default function ReminderRoute(props) {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [frequency, setFrequency] = useState('Daily');

  return (
    <View style={LAYOUT.main}>
      <ScrollView>
        <Text style={TYPE.h1}>Your Reminders</Text>

        {getReminder()}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        color={'#FFF'}
        onPress={() =>
          navigation.navigate('Tasks', {
            screen: 'AddReminder',
          })
        }
        label="ADD REMINDER"
        accessibilityLabel="Add a new reminder to list."
        animated={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
