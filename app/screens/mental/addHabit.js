import {Text, View, TextInput, Alert} from 'react-native';
import {Surface} from 'react-native-paper';
import React, {useState} from 'react';
import {addHabit} from '../../DBFunctions';
import {Picker} from '@react-native-picker/picker';
import {DatePickerModal} from 'react-native-paper-dates';
import ThemeButton from '../../components/ThemeButton';
import {LAYOUT} from '../../styles/theme';
import {styles} from '../../styles/globals';

export default function AddHabitScreen({navigation}) {
  //component state for addHabit form
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [numPerD, setNPD] = useState('1');
  const [category, setCat] = useState('Workout');
  const [date, setDate] = useState(new Date());

  // date picker modal

  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onChange = React.useCallback(
    ({date}) => {
      setVisible(false);
      setDate(date);
    },
    [setVisible, setDate],
  );

  return (
    <View style={LAYOUT.mainCenter}>
      <Surface style={styles.surface}>
        <Text>Habit's Name</Text>
        <TextInput
          placeholder="Brisk walk in the forest."
          onChangeText={(title) => setTitle(title)}
          defaultValue={title}
          style={styles.textInput}
        />

        <Text>Describe your habit</Text>
        <TextInput
          placeholder="Description"
          onChangeText={(description) => setDesc(description)}
          defaultValue={description}
          style={styles.textInput}
        />

        <Text>Frequency per day</Text>
        <TextInput
          placeholder=""
          onChangeText={(numPerD) => setNPD(numPerD)}
          defaultValue={numPerD}
          keyboardType="numeric"
          style={styles.textInput}
        />

        <Text>Select category</Text>
        <Picker
          selectedValue={category}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) => {
            setCat(itemValue);
          }}>
          <Picker.Item label="Workout" value="Workout" />
          <Picker.Item label="Physical Health" value="Physical Health" />
          <Picker.Item label="Mental Health" value="Mental Health" />
          <Picker.Item label="Daily Routines" value="Daily Routines" />
          <Picker.Item label="Pet" value="Pet" />
        </Picker>

        <Text>Selected date: {date.toLocaleDateString()}</Text>
        <ThemeButton
          accessibilityLabel="Pick the date of your habit."
          text="Pick Date"
          type="secondary"
          onPressEvent={() => setVisible(true)}
        />

        <DatePickerModal
          mode="single"
          visible={visible}
          onDismiss={onDismiss}
          date={date}
          onConfirm={onChange}
          saveLabel="Save" // optional
          label="Select date" // optional
          animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
          locale={'en'} // optional, default is automically detected by your system
        />
      </Surface>

      <ThemeButton
        accessibilityLabel="Submit your new habit."
        text="ADD HABIT"
        onPressEvent={() => {
          if (title == '' || description == ''){
            Alert.alert('Failed to Add Habit', 'Do not leave empty fields', [
              {
                text: 'Try Again',
                onPress: () => navigation.navigate('AddHabit'),
              },
            ]);
          }else{
          {
            addHabit(
              title,
              description,
              date.toDateString(),
              numPerD,
              category,
              0,
              0,
              null,
              [0, 0, 0, 0, 0, 0],
            );
          }
          navigation.navigate('Tasks', {
            screen: 'Index',
            params: {
              snackbar: "Added your habit " + title,
            },
          });
        }}
      }
      />
    </View>
  );
}
