import {Text, View, TextInput} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Picker} from '@react-native-picker/picker';
import {TimePickerModal} from 'react-native-paper-dates';
import {listHabitIds, editReminder} from '../../DBFunctions';
import {LAYOUT} from '../../styles/theme';
import ThemeButton from '../../components/ThemeButton';
import {Surface} from 'react-native-paper';
import {styles} from '../../styles/globals';

export default function EditReminderScreen({navigation, route}) {
  //obtaining data from route send from DBFunctions
  const {reminder} = route.params;

  //array with the list of habits saved to choose a habit

  const [state, setState] = React.useState(reminder.habitId);
  const [title, setTitle] = useState(reminder.reminderTitle);
  const [hours1, setHours] = useState(reminder.hours);
  const [minutes1, setMinutes] = useState(reminder.minutes);
  const [frequency, setFrequency] = useState('Daily');

  const [visible, setVisible] = useState(false);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      setHours(hours);
      setMinutes(minutes);
    },
    [setVisible],
  );

  return (
    <View style={LAYOUT.mainCenter}>
      <Surface style={styles.surface}>
        <Text>Select Habit</Text>
        {/* dropdown to select habit for reminders */}
        <Picker
          selectedValue={state}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) => {
            setState(itemValue);
          }}>
          {listHabitIds()}
        </Picker>
        <Text>Reminder title</Text>
        <TextInput
          placeholder="Title"
          onChangeText={(titleInput) => setTitle(titleInput)}
          defaultValue={title}
          style={styles.textInput}
        />

        <Text>
          Selected time: {hours1}:{minutes1}
        </Text>

        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={hours1} // default: current hours
          minutes={minutes1} // default: current minutes
        />

        <ThemeButton
          accessibilityLabel="Pick the time of your reminder."
          text="Pick Time"
          type="secondary"
          onPressEvent={() => setVisible(true)}
        />
      </Surface>

      <ThemeButton
        accessibilityLabel="Press button to save changed made to your remidner."
        text="SAVE CHANGES"
        onPressEvent={() => {
          editReminder(state, reminder.reminderId, title, hours1, minutes1);
          navigation.goBack();
        }}
      />
    </View>
  );
}
