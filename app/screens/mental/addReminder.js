import {Text, View, TextInput, Alert} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Picker} from '@react-native-picker/picker';
import {TimePickerModal} from 'react-native-paper-dates';
import {listHabitIds, addReminder} from '../../DBFunctions';
import {LAYOUT} from '../../styles/theme';
import ThemeButton from '../../components/ThemeButton';
import {Surface} from 'react-native-paper';
import {styles} from '../../styles/globals';

export default function AddReminderScreen({navigation}) {
  //array with the list of habits saved to choose a habit

  const [state, setState] = React.useState('');
  const [title, setTitle] = useState('');
  const [hours1, setHours] = useState('12');
  const [minutes1, setMinutes] = useState('00');

  const [visible, setVisible] = useState(false);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      console.log(hours);
      console.log(minutes);

      setHours(hours.toString());
      setMinutes(minutes.toString());
    },
    [setVisible],
  );

  return (
    <View style={LAYOUT.mainCenter}>
      <Surface style={styles.surface}>
        {/* dropdown to select habit for reminders */}
        <Text>Select habit</Text>
        <Picker
          selectedValue={state}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) => {
            setState(itemValue);
          }}>
          {listHabitIds()}
        </Picker>
        <Text>Reminder title</Text>
        <TextInput
          placeholder="Your reminder's title"
          onChangeText={(title) => setTitle(title)}
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
          hours={12} // default: current hours
          minutes={30} // default: current minutes
        />

        <ThemeButton
          accessibilityLabel="Pick the time of your reminder."
          text="Pick Time"
          type="secondary"
          onPressEvent={() => setVisible(true)}
        />
      </Surface>

      <ThemeButton
        accessibilityLabel="Press button to create your remidner."
        text="ADD REMINDER"
        onPressEvent={() => {
          if (title == '' ){
            Alert.alert('Failed to Add Reminder', 'Do not leave empty fields', [
              {
                text: 'Try Again',
                onPress: () => navigation.navigate('AddReminder'),
              },
            ]);
          }else{
          addReminder(state, title, hours1, minutes1);
          navigation.navigate('Tasks', {
            screen: 'Index',
            params: {
              snackbar: "Added your reminder " + title
            },
          })
        }
   
        }}
      />
    </View>
  );
}
