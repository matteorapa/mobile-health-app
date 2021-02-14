import database from '@react-native-firebase/database';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {Text, Image, View, Alert} from 'react-native';
import {styles} from './styles/globals';
import love from './assets/images/love.png';
import music from './assets/images/music.png';

import React, {useState, useEffect} from 'react';
import {Card, Title, Paragraph, Chip, List, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import PaddedDivider from './components/PaddedDivider';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  graphData,
) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (habitId != null) {
      key = habitId + "," + uid;
    } else {
      key = database().ref().push().key; //reason for this part of code: if the key is not empty, i.e. already exist, this means that the record is being editted.
    }

    let dataToSave = {
      habitId: habitId,
      habitUserId: uid,
      habitUniqueId: key,
      habitDesc: habitDesc,
      startDate: startDate,
      numPerD: numPD,
      category: category,
      consPts: consPts,
      points: points,
      date: date,
      graphData: graphData,
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

  var boolean = false;
  var counter = 1;

  React.useEffect(() => {
    const habitRef = database().ref('/habits');
    const onLoadingListener = habitRef.on('value', (snapshot) => {
      setHabits([]);
      snapshot.forEach(function (childSnapshot) {
        if(uid == childSnapshot.val().habitUserId){
          setHabits((habits) => [...habits, childSnapshot.val()]);
        }
      });
    });

    return () => {
      habitRef.off('value', onLoadingListener);
    };
  }, []);
  if (habits.length > 0){
    return habits.map((element) => {
      const currentDate = new Date();

      //date retrieved from db
      const retrievedDate = new Date(element.startDate);

      const diff = (currentDate - retrievedDate) / (1000 * 60 * 60 * 24);

      if (diff <= 1) {
        boolean = true;
      }
      if (diff > 1) {
        boolean = false;
      }

      return (
        <Card
          style={styles.card}
          key={element.habitUniqueId}
          onPress={() => {
            navigation.navigate('Tasks', {
              screen: 'Details',
              params: {
                habit: element,
                name: element.habitId,
              },
            });
          }}>
          <Card.Content>
            <Title>{element.habitId}</Title>
            <Paragraph>{element.habitDesc}</Paragraph>
            <Text>Available on {retrievedDate.toLocaleDateString()}</Text>
          </Card.Content>

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
                  currentDate,
                  element.graphData,
                );

                counter = counter + 1;

                reward(element.consPts);
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
                    element.graphData,
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
                    element.graphData,
                  );
                }
              }}
              disabled={boolean}>
              Missed
            </Button>
          </Card.Actions>
        </Card>
      );
    });
  } else {
    return (
      <View style={styles.emptyStateContainer}>
        <PaddedDivider />
        <PaddedDivider />
        <PaddedDivider />
        <PaddedDivider />
        <Image source={music} style={styles.emptyState} />
        <Text>
          You do not yet have any habits. Add some habits to create meaningful
          reminders.
        </Text>
        <PaddedDivider />
        <PaddedDivider />
      </View>
    );

  } 
}

const setPoints = (
  habitId,
  habitDesc,
  startDate,
  numPD,
  category,
  consPts,
  points,
  date,
  graphData,
) => {
  database()
    .ref('/habits/' + habitId + "," + uid)
    .set({
      habitId: habitId,
      habitUserId: uid,
      habitUniqueId: habitId + "," + uid,
      habitDesc: habitDesc,
      startDate: startDate,
      numPerD: numPD,
      category: category,
      consPts: consPts,
      points: points,
      date: date,
      graphData: graphData,
    });
};

const reward = (consPoints) => {
  if (consPoints == 50) {
    Alert.alert('Reward', 'beginner achievement');
  }
  if (consPoints == 100) {
    Alert.alert('Reward', 'amateur achievement');
  }
  if (consPoints == 200) {
    Alert.alert('Reward', 'pro achievement');
  }
};

export const listHabitIds = () => {
  const [habits, setHabits] = React.useState([]);

  React.useEffect(() => {
    const habitRef = database().ref('/habits');

    const onLoadingListener = habitRef.on('value', (snapshot) => {
      setHabits([]);
      snapshot.forEach(function (childSnapshot) {
        if(uid == childSnapshot.val().habitUserId){
          setHabits((habits) => [...habits, childSnapshot.val()]);
        }
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
    .ref('habits/' + habitId + "," + uid)
    .remove()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const addReminder = (habitId, reminderTitle, hours, minutes) => {
  return new Promise(function (resolve, reject) {
    let reminderId = nanoid();
    let key = reminderId + "," + uid;

    let dataToSave = {
      habitId: habitId,
      reminderId: reminderId,
      reminderUserId: uid,
      reminderUniqueKey: key,
      reminderTitle: reminderTitle,
      hours: hours,
      minutes: minutes,
    };
    database()
      .ref('reminders/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        console.log('added successfully');
        resolve(snapshot);
      })
      .catch((err) => {
        console.log('Error when adding reminder', err);
        reject(err);
      });
  });
};

export const editReminder = (
  habitId,
  reminderId,
  reminderTitle,
  hours,
  minutes,
) => {
  return new Promise(function (resolve, reject) {
    let key = reminderId + "," + uid;
    console.log('key: ', key);

    let dataToSave = {
      habitId: habitId,
      reminderId: reminderId,
      reminderUserId: uid,
      reminderUniqueKey: key,
      reminderTitle: reminderTitle,
      hours: hours,
      minutes: minutes,
    };
    database()
      .ref('reminders/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        console.log('added successfully');
        resolve(snapshot);
      })
      .catch((err) => {
        console.log('Error when adding reminder', err);
        reject(err);
      });
  });
};

export const getReminder = () => {
  const [reminders, setReminders] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    const reminderRef = database().ref('/reminders');
    const onLoadingListener = reminderRef.on('value', (snapshot) => {
      setReminders([]);
      snapshot.forEach(function (childSnapshot) {
        if(uid == childSnapshot.val().reminderUserId){
          setReminders((reminders) => [...reminders, childSnapshot.val()]);
        }
      });
    });

    return () => {
      reminderRef.off('value', onLoadingListener);
    };
  }, []);

  //when there is no reminders
  if (reminders.length > 0){
    return reminders.map((element) => {
      return (
        <Card key={element.reminderId} style={styles.card}>
          <Card.Content>
            <Title>{element.reminderTitle}</Title>
            <Chip icon="information">{element.habitId}</Chip>
            <Text>
              {element.hours}:{element.minutes}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => {
                deleteReminder(element.reminderId);
              }}>
              Remove
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('Tasks', {
                  screen: 'EditReminder',
                  params: {
                    reminder: element,
                  },
                });
              }}>
              Edit
            </Button>
          </Card.Actions>
        </Card>
      );
    });
  } else {
    return (
      <View style={styles.emptyStateContainer}>
        <PaddedDivider />
        <PaddedDivider />
        <PaddedDivider />
        <PaddedDivider />
        <Image source={love} style={styles.emptyState} />
        <Text>
          You do not yet have any reminders. Create a reminder to remember to
          take care of yourself.
        </Text>
        <PaddedDivider />
        <PaddedDivider />
      </View>
    );

  }
}

export const deleteReminder = (reminderId, deleteConfirm) => {
  database()
    .ref('reminders/' + reminderId + "," + uid)
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
  setItemId(itemId);
  setItemName(itemName);
};

export const addDoctor = (
  doctorName,
  doctorSpeciality,
  doctorPhonePrefix,
  doctorPhone,
  doctorEmail,
) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (doctorPhone != null) {
      key = doctorPhone + ',' + uid;
    } else {
      key = database().ref().push().key; //reason for this part of code: if the key is not empty, i.e. already exist, this means that the record is being editted.
    }

    let dataToSave = {
      doctorStoreId: key,
      doctorUserId: uid,
      doctorName: doctorName,
      doctorSpeciality: doctorSpeciality,
      doctorPhonePrefix: doctorPhonePrefix,
      doctorPhone: doctorPhone,
      doctorEmail: doctorEmail,
    };
    database()
      .ref('doctors/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteDoctor = (doctorPhone, deleteConfirm) => {
  database()
    .ref('doctors/' + doctorPhone + ',' + uid)
    .remove()
    .then(() => {
      console.log('Deleting doctor', doctorPhone);
    })
    .catch((erro) => {
      console.log(err);
    });
};

export const editDoctor = (doctorPhone, editConfirm) => {
  setDoctorId(doctorPhone + ',' + uid);
  setDoctorName(doctorName);
  setDoctorSpeciality(doctorSpeciality);
  setDoctorPhonePrefix(doctorPhonePrefix);
  setDoctorPhone(doctorPhone);
  setDoctorEmail(doctorEmail);
};

export const ReadDoctor = ({navigation}) => {
  const [doctors, setDoctors] = useState([]);
  const specialitiesOfDoctors = [
    'Allergy and Immunology',
    'Anesthesiology',
    'Dermatology',
    'Diagnostic Radiology',
    'Emergency Medicine',
    'Family Medicine',
    'Internal Medicine',
    'Medical Genetics',
    'Neurology',
    'Nuclear Medicine',
    'Obstetrics and Gynecology',
    'Ophthalmology',
    'Pathology',
    'Pediatrics',
    'Physical Medicine and Rehabilitation',
    'Preventive Medicine',
    'Psychiatry',
    'Radiation Oncology',
    'Surgery',
    'Urology',
  ];

  React.useEffect(() => {
    const doctorsRef = database().ref('/doctors');

    const onLoadingListener = doctorsRef.on('value', (snapshot) => {
      setDoctors([]);
      snapshot.forEach(function (childSnapshot) {
        setDoctors((doctors) => [...doctors, childSnapshot.val()]);
      });
    });

    return () => {
      doctorsRef.off('value', onLoadingListener);
    };
  }, []);

  const listDoctors = doctors.map((element) => (
    (element.doctorUserId == uid) ? 
      <List.Item
        key={element.doctorStoreId}
        title={element.doctorName}
        description={specialitiesOfDoctors[element.doctorSpeciality]}
        // left={() => <Icon name="face" size={30} />}
        onPress={() => {
          navigation.navigate('Medication', {
            screen: 'ViewDoctor',
            params: {
              doctor: element,
              name: element.doctorName
            },
          });
        }}
      />
      : null
  ));

  return (
    <View>
      {/* <Text>{doctors.length}</Text> */}
      {listDoctors}
      {/* <Text>{listDoctors.length}</Text> */}
    </View>
  );
};

export const addMedication = (
  medicationName,
  medicationType,
  medicationDosage,
  medicationDosageMetric,
  medicationReason,
  medicationDaily,
  medicationDailyDosesNumber,
  medicationTimerArray,
  medicationStartDate,
  medicationEndDate,
  medicationInstructions,
) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (medicationName != null) {
      key = medicationName + ',' + uid;
    } else {
      key = database().ref().push().key; //reason for this part of code: if the key is not empty, i.e. already exist, this means that the record is being editted.
    }

    let dataToSave = {
      medicationStoreId: key,
      medicationUserId: uid,
      medicationName: medicationName,
      medicationType: medicationType,
      medicationDosage: medicationDosage,
      medicationDosageMetric: medicationDosageMetric,
      medicationReason: medicationReason,
      medicationDaily: medicationDaily,
      medicationDailyDosesNumber: medicationDailyDosesNumber,
      medicationTimerArray: medicationTimerArray,
      medicationStartDate: medicationStartDate,
      medicationEndDate: medicationEndDate,
      medicationInstructions: medicationInstructions,
    };

    database()
      .ref('medication/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });

    {
      if (medicationDaily == 0) {
        let dataToSaveNotifRemind = {
          medicationStoreId: key,
          medicationUserId: uid,
          medicationName: medicationName,
          medicationStartDate: medicationStartDate,
          medicationEndDate: medicationEndDate,
          medicationTimerArray: medicationTimerArray,
        };

        database()
          .ref('notificationReminders/' + key)
          .update(dataToSaveNotifRemind)
          .then((snapshot) => {
            resolve(snapshot);
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
  });
};

export const deleteMedication = (medicationName, navigation, deleteConfirm) => {
  database()
    .ref('medication/' + medicationName + ',' + uid)
    .remove()
    .then(() => {})
    .catch((erro) => {
      console.log(err);
    });
};

export const editMedication = (medicationName, editConfirm) => {
  setMedicationId(medicationName + ',' + uid);
  setMedicationName(medicationName);
  setMedicationType(medicationType);
  setMedicationDosage(medicationDosage);
  setMedicationDosageMetric(medicationDosageMetric);
  setMedicationReason(medicationReason);
  setMedicationDaily(medicationDaily);
  setMedicationDailyDosesNumber(medicationDailyDosesNumber);
  setMedicationTimer(medicationTimer);
  setMedicationStartDate(medicationStartDate);
  setMedicationEndDate(medicationEndDate);
  setMedicationInstructions(medicationInstructions);
};

export const ReadMedication = ({navigation}) => {
  const [medications, setMedications] = useState([]);
  const metricsOfDosage = [
    'ml',
    'mg',
    'g',
    'Pills/Tablets',
    'Capsule',
    'Drops',
    'Patches',
    'N/A',
  ];

  React.useEffect(() => {
    const medicationsRef = database().ref('/medication');

    const onLoadingListener = medicationsRef.on('value', (snapshot) => {
      setMedications([]);
      snapshot.forEach(function (childSnapshot) {
        setMedications((medications) => [...medications, childSnapshot.val()]);
      });
    });

    return () => {
      medicationsRef.off('value', onLoadingListener);
    };

    }, []);

  const listMedication = medications.map((element) => (
    (element.medicationUserId == uid) ? 
      <List.Item
      key={element.medicationStoreId}
        title={element.medicationName}
        description={
          element.medicationDosage +
          ' ' +
          metricsOfDosage[element.medicationDosageMetric]
        }
        // left={() => (
        //   <Image
        //     source={require('./screens/medication/drugs.png')}
        //     style={{width: 25, height: 25}}
        //   />
        // )}
        onPress={() => {
          navigation.navigate('Medication', {
            screen: 'ViewMedication',
            params: {
              medication: element,
              name: element.medicationName
            },
          });
        }}
      />
      : null
  ));


  return (
    <View>
      {/* <Text>{medications.length}</Text> */}
      {listMedication}
      {/* <Text>{listMedication.length}</Text> */}
    </View>
  );
};
