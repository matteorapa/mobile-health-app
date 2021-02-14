import React from 'react';
import {Text, View, Platform, Linking} from 'react-native';
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import {deleteDoctor} from '../../DBFunctions';
import { LAYOUT } from '../../styles/theme';
import {DataTable, Paragraph, Dialog, Button} from 'react-native-paper';

export default function ViewDoctor({route, navigation}) {
  // {console.log("Route ", route.params)}
  // {console.log("Nav ", navigation)}

  const {doctor} = route.params;
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

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  return (
    <View style={LAYOUT.main}>
      <DataTable>
          <DataTable.Row>
            <DataTable.Cell>Doctor's name</DataTable.Cell>
            <DataTable.Cell numeric>{doctor.doctorName}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Doctor's speciality</DataTable.Cell>
            <DataTable.Cell numeric>{specialitiesOfDoctors[doctor.doctorSpeciality]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Doctor's phone number</DataTable.Cell>
            <DataTable.Cell numeric>({doctor.doctorPhonePrefix}) {doctor.doctorPhone}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Doctor's email</DataTable.Cell>
            <DataTable.Cell numeric>{doctor.doctorEmail}</DataTable.Cell>
          </DataTable.Row>
      </DataTable>

        <ThemeButton
          icon={'phone'}
          text={'CALL'}
          onPressEvent={() => {
            let phone  = doctor.doctorPhone.replace(/\s/g, '');
            let phoneNumber = phone;
            if (Platform.OS !== 'android') {
              phoneNumber = `telprompt:${phone}`;
            }
            else  {
              phoneNumber = `tel:${phone}`;
            }
            Linking.canOpenURL(phoneNumber)
            .then(supported => {
              if (!supported) {
                Alert.alert('Phone number is not available');
              } else {
                return Linking.openURL(phoneNumber);
              }
            })
            .catch(err => console.log(err));
          }}
        />
        {/* <ThemeButton
          type={'secondary'}
          icon={'edit'}
          text={'Edit'}
          onPressEvent={() => {
            navigation.navigate('Medication', {
              screen: 'EditDoctor',
              params: {loadedDoctor: doctor},
            });
          }}
        /> */}
        <ThemeButton
          type={'muted'}
          text={'DELETE'}
          onPressEvent={() => {
            setVisible(true)
          }}
        />

      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>
            Do you want to permanently delete the doctor {doctor.doctorName}?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button
            onPress={() => {
              
              deleteDoctor(doctor.doctorPhone);
              navigation.navigate('Medication', {
                screen: 'Index',
              });
            }}>
            DELETE
          </Button>
        </Dialog.Actions>
      </Dialog>
      

    </View>
  );
}
