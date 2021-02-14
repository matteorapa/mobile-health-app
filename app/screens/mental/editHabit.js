import {Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {addHabit} from '../../DBFunctions';
import {DatePickerModal} from 'react-native-paper-dates';
import {Picker} from '@react-native-picker/picker';
import {styles} from '../../styles/globals';
import {LAYOUT} from '../../styles/theme';
import {Surface, DataTable} from 'react-native-paper';
import ThemeButton from '../../components/ThemeButton';

export default function EditHabitScreen({navigation, route}) {
  const {habit} = route.params;

  //fill component state with habit details from db

  const [title, setTitle] = useState(habit.habitId);
  const [description, setDesc] = useState(habit.habitDesc);
  const [numPerD, setNPD] = useState(habit.numPerD);
  const [category, setCat] = useState(habit.category);
  const [date, setDate] = useState(new Date(habit.startDate));

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
          placeholder="Number per day"
          onChangeText={(numPerD) => setNPD(numPerD)}
          defaultValue={numPerD}
          style={styles.textInput}
          keyboardType="numeric"
        />
        <Text>Select category</Text>
        <Picker
          selectedValue={category}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) => {
            setCat(itemValue);
          }}>
          <Picker.Item label="Workout" value="Workout" />
          <Picker.Item label="Physical Health" value="Physical Health" />
          <Picker.Item label="Mental Health" value="Mental Health" />
          <Picker.Item label="Daily Routines" value="Daily Routines" />
          <Picker.Item label="Pet" value="Pet" />
        </Picker>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>Start date</DataTable.Cell>
            <DataTable.Cell numeric>{date.toLocaleDateString()}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
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
        {/* <Button onPress={()=> setVisible(true) } title="Pick date"/> */}
        <ThemeButton
          accessibilityLabel="Pick the date of your habit."
          text="Pick Date"
          type="secondary"
          onPressEvent={() => setVisible(true)}
        />
      </Surface>

      <ThemeButton
        accessibilityLabel="Save changes made to the habit.."
        text="SAVE CHANGES"
        onPressEvent={() => {
          //edit using db function
          addHabit(
            title,
            description,
            date.toISOString(),
            numPerD,
            category,
            habit.consPts,
            habit.points,
            habit.date,
            habit.graphData,
          );
          navigation.navigate('Tasks', {
            screen: 'Index',
          });
        }}
      />
    </View>
  );
}
