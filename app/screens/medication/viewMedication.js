import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import {deleteMedication} from '../../DBFunctions';

export default function ViewMedication({route, navigation}) {
  const {medication} = route.params;
  const typeOfMedication = [
    'Liquid Solution',
    'Pill/Tablet',
    'Capsule',
    'Tropical (cream/ointment)',
    'Drops',
    'Inhaler',
    'Injection',
    'Patches',
    'Other',
  ];
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
  const dailyDosageOptions = ['Yes', 'No'];

  return (
    <View>
      <Text>Medication Name: {medication.medicationName}</Text>
      <Text>
        Medication Type: {typeOfMedication[medication.medicationType]}
      </Text>
      <Text>
        Medication Dosage: {medication.medicationDosage}{' '}
        {metricsOfDosage[medication.medicationDosageMetric]}
      </Text>
      <Text>Medication Reason: {medication.medicationReason}</Text>
      <Text>
        Medication Daily: {dailyDosageOptions[medication.medicationDaily]}
      </Text>
      <Text>
        Medication Daily Doses: {medication.medicationDailyDosesNumber}
      </Text>
      {medication.medicationTimerArray.map((element, index) => {
        return (
          <Text key={index}>
            Medication Timer {index + 1}: {element.hour}:{element.minute}
          </Text>
        );
      })}
      <Text>Medication Start Date: {medication.medicationStartDate}</Text>
      <Text>Medication End Date: {medication.medicationEndDate}</Text>
      <Text>Medication Instructions: {medication.medicationInstructions}</Text>

      <View style={styles.navButtonsForm}>
        <ThemeButton
          type={'secondary'}
          icon={'edit'}
          text={'Edit'}
          onPressEvent={() => {
            navigation.navigate('Medication', {
              screen: 'AddMedication',
              params: {loadedMedication: medication},
            });
          }}
        />
        <ThemeButton
          type={'secondary'}
          icon={'delete'}
          text={'Delete'}
          onPressEvent={() => {
            deleteMedication(medication.medicationName);
            navigation.navigate('Medication', {
              screen: 'Index',
            });
          }}
        />
      </View>

      <ThemeButton
        type={'secondary'}
        text={'Back'}
        onPressEvent={() => {
          navigation.navigate('Medication', {
            screen: 'Index',
          });
        }}
      />
    </View>
  );
}
