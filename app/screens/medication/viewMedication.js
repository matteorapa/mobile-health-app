import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import {deleteMedication} from '../../DBFunctions';
import {DataTable, Paragraph, Dialog, Button} from 'react-native-paper';
import {LAYOUT} from '../../styles/theme';
import PaddedDivider from '../../components/PaddedDivider';

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
    'Sachet',
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
    'Sachet',
    'N/A',
  ];
  const dailyDosageOptions = ['Yes', 'No'];

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  return (
    <ScrollView style={LAYOUT.main}>
      <View style={styles.navButtonsForm}>
        
        <ThemeButton
          type={'secondary'}
          icon={'delete'}
          text={'Delete'}
          onPressEvent={() => {
            setVisible(true);
          }}
        />
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
      </View>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>Medication's name</DataTable.Cell>
          <DataTable.Cell numeric>{medication.medicationName}</DataTable.Cell>
        </DataTable.Row>
        

        <DataTable.Row>
          <DataTable.Cell>Type</DataTable.Cell>
          <DataTable.Cell numeric>{typeOfMedication[medication.medicationType]}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Dosage amount</DataTable.Cell>
          <DataTable.Cell numeric>{medication.medicationDosage}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Purpose of Medication</DataTable.Cell>
          <DataTable.Cell numeric>{medication.medicationReason}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Taken Daily</DataTable.Cell>
          <DataTable.Cell numeric>{dailyDosageOptions[medication.medicationDaily]}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Number of daily doses</DataTable.Cell>
          <DataTable.Cell numeric>{medication.medicationDailyDosesNumber}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Start date</DataTable.Cell>
          <DataTable.Cell numeric>{medication.medicationStartDate}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>End date</DataTable.Cell>
          <DataTable.Cell numeric>{medication.medicationEndDate}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Header>
          <DataTable.Title>
            Dosage
          </DataTable.Title>
          <DataTable.Title numeric>
            Time
          </DataTable.Title>
        </DataTable.Header>
      
      {medication.medicationTimerArray.map((element, index) => {
        return (
          <DataTable.Row key={index}>
            <DataTable.Cell>Dose {index + 1}</DataTable.Cell>
            <DataTable.Cell numeric>{element.hour}:{element.minute}</DataTable.Cell>
          </DataTable.Row>
        )
      })}
      
      </DataTable>
      <PaddedDivider />
      <Text>Instructions: {medication.medicationInstructions}</Text>
      <PaddedDivider />
      <PaddedDivider />

      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>
            Do you want to permanently delete the medication {medication.medicationName}?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button
            onPress={() => {
              deleteMedication(medication.medicationName);
              navigation.navigate('Medication', {
                screen: 'Index',
                params: {
                  snackbar: "Deleted the medication " + medication.medicationName
                }
               
              });
            }}>
            DELETE
          </Button>
        </Dialog.Actions>
      </Dialog>

      
    </ScrollView>
  );
}
