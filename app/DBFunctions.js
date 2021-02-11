import database from '@react-native-firebase/database';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

import * as React from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ProgressBar,
  Colors,
} from 'react-native-paper';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
//import reward from './screens/mental/index';
import {View} from 'react-native';

export const addItem = (itemId, itemName) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (itemId != null) {
      key = itemId;
    } else {
      key = database().ref().push().key; //reason for this part of code: if the key is not empty, i.e. already exist, this means that the record is being editted.
    }

    let dataToSave = {
      itemId: key,
      itemName: itemName,
    };
    database()
      .ref('items/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addHabit = (
  habitId,
  habitDesc,
  startDate,
  numPD,
  category,
  consPts,
  points,
  date,
) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (habitId != null) {
      key = habitId;
    } else {
      key = database().ref().push().key; //reason for this part of code: if the key is not empty, i.e. already exist, this means that the record is being editted.
    }

    let dataToSave = {
      habitId: key,
      habitDesc: habitDesc,
      startDate: startDate,
      numPerD: numPD,
      category: category,
      consPts: consPts,
      points: points,
      date: date,
    };
    database()
      .ref('habits/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getHabit = () => {
  const [habits, setHabits] = React.useState([]);

  const navigation = useNavigation();

  const [boolean, setBool] = React.useState(false);
  const [counter, setCounter] = React.useState(1);

  React.useEffect(() => {
    const habitRef = database().ref('/habits');
    const onLoadingListener = habitRef.on('value', (snapshot) => {
      setHabits([]);
      snapshot.forEach(function (childSnapshot) {
        setHabits((habits) => [...habits, childSnapshot.val()]);
      });
    });

    return () => {
      habitRef.off('value', onLoadingListener);
    };
  }, []);

  return habits.map((element) => {
    return (
      <Card
        key={element.habitId}
        onPress={() => {
          navigation.navigate('Tasks', {
            params: {habit: element},
            screen: 'Details',
          });
        }}>
        <Title>{element.habitId}</Title>
        <Paragraph>Description start date time</Paragraph>

        <Card.Actions>
          <Button
            onPress={() => {
              setPoints(
                element.habitId,
                element.habitDesc,
                element.startDate,
                element.numPD,
                element.category,
                element.consPts + 10,
                element.points + 10,
                element.date,
              );
              //reward(element.consPts);
              setCounter(counter + 1);

              // number per day retrieved from db
              const testCounter = 2;
              const currentDate = new Date();

              //date retrieved from db
              const retrievedDate = new Date('2021-02-07');

              const diff =
                (currentDate - retrievedDate) / (1000 * 60 * 60 * 24);

              // checks if the current date is smaller the the retrieved date
              // checks if the user pressed the button more than he should be pressing it

              if (diff <= 1 || counter >= testCounter) {
                setBool(true);
                setCounter(0);
              }
              if (diff > 1 && counter < testCounter) {
                setBool(false);
              }
            }}
            disabled={boolean}>
            Done
          </Button>
          <Button
            onPress={() => {
              if (element.points < 0 || element.points == 0) {
                setPoints(
                  element.habitId,
                  element.habitDesc,
                  element.startDate,
                  element.numPD,
                  element.category,
                  0,
                  0,
                  element.date,
                );
              } else {
                setPoints(
                  element.habitId,
                  element.habitDesc,
                  element.startDate,
                  element.numPD,
                  element.category,
                  0,
                  element.points - 5,
                  element.date,
                );
              }
              setBool(false);
            }}>
            Fail
          </Button>
        </Card.Actions>
      </Card>
    );
  });

  // return () => {
  //     habitRef.off('value', onLoadingListener);
  // }
};

const setPoints = (
  key,
  habitDesc,
  startDate,
  numPD,
  category,
  consPts,
  points,
  date,
) => {
  database()
    .ref('/habits/' + key)
    .set({
      habitId: key,
      habitDesc: habitDesc,
      startDate: startDate,
      numPerD: numPD,
      category: category,
      consPts: consPts,
      points: points,
      date: date,
    });
};

export const listHabitIds = () => {
  const [habits, setHabits] = React.useState([]);

  React.useEffect(() => {
    const habitRef = database().ref('/habits');

    const onLoadingListener = habitRef.on('value', (snapshot) => {
      setHabits([]);
      snapshot.forEach(function (childSnapshot) {
        setHabits((habits) => [...habits, childSnapshot.val()]);
      });
    });

    return () => {
      habitRef.off('value', onLoadingListener);
    };
  }, []);

  return habits.map((element) => {
    return (
      <Picker.Item
        key={element.habitId}
        label={element.habitId}
        value={element.habitId}
      />
    );
  });
};

export const deleteHabit = (habitId, deleteConfirm) => {
  database()
    .ref('habits/' + habitId)
    .remove()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const addReminder = (
  habitId,
  reminderTitle,
  hours,
  minutes,
) => {
  return new Promise(function (resolve, reject) {
    let key = nanoid();
    console.log("key: ", key)
    

    let dataToSave = {
      habitId: habitId,
      reminderId: key,
      reminderTitle: reminderTitle,
      hours: hours,
      minutes: minutes,
    };
    database()
      .ref('reminders/' + key)
      .update(dataToSave)
      .then((snapshot) => {
          console.log("added successfully")
        resolve(snapshot);
      })
      .catch((err) => {
        console.log("Error when adding reminder", err)
        reject(err);
      });
  });
};

export const getReminder = () => {
  const [reminders, setReminders] = React.useState([]);

  React.useEffect(() => {
    const reminderRef = database().ref('/reminders');
    const onLoadingListener = reminderRef.on('value', (snapshot) => {
      setReminders([]);
      snapshot.forEach(function (childSnapshot) {
        setReminders((reminders) => [...reminders, childSnapshot.val()]);
      });
    });

    return () => {
      reminderRef.off('value', onLoadingListener);
    };
  }, []);

  return reminders.map((element) => {
    return (
      <Card key={element.reminderId}>
        <Title>{element.reminderTitle}</Title>
        <Paragraph>
          {element.habitId}

          {element.hours}
        </Paragraph>
        <Card.Actions>
          <Button >Remove</Button>
          <Button>Edit</Button>
        </Card.Actions>
      </Card>
    );
  });


};

export const deleteReminder = (reminderId, deleteConfirm) => {
  database()
    .ref('reminders/' + reminderId)
    .remove()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const deleteItem = (itemId, deleteConfirm) => {
  database()
    .ref('items/' + itemId)
    .remove()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const editItem = (itemId, editConfirm) => {
  setItemId(itemId);
  setItemName(itemName);
};
