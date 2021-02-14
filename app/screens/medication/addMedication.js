import {Text, TextInput, View, Button, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {TimePickerModal, DatePickerModal} from 'react-native-paper-dates';
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import AddMedDocForm from './AddMedDocForm';
import {addMedication} from '../../DBFunctions';
import Moment from 'moment';
import { COLORS, LAYOUT } from '../../styles/theme';
import PaddedDivider from '../../components/PaddedDivider';
import {DataTable} from 'react-native-paper';

function submitForm(
  medName,
  medType,
  medDosage,
  medDosageMetric,
  medReason,
  medDaily,
  medDailyDosesNumber,
  medTimersArray,
  medStartDate,
  medEndDate,
  medInstructions,
) {
  //check auth of form

  //submit to firebase table
  console.log(
    'submit ',
    medName,
    medType,
    medDosage,
    medDosageMetric,
    medReason,
    medDaily,
    medDailyDosesNumber,
    medTimersArray,
    medStartDate,
    medEndDate,
    medInstructions,
  );

  addMedication(
    medName,
    medType,
    medDosage,
    medDosageMetric,
    medReason,
    medDaily,
    medDailyDosesNumber,
    medTimersArray,
    medStartDate,
    medEndDate,
    medInstructions,
  );
}

export default function AddMedicationScreen({route, navigation}) {
  //{console.log("Route ", route.params)}
  const {loadedMedication} = route.params;

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

  //const timerArrayEditShow = (loadedMedication != '') ? medicationDaily.medicationTimerArray : null;
  const [medicationName, onChangeMedicationName] = useState(
    loadedMedication === '' ? '' : loadedMedication.medicationName,
  );
  const [medicationType, onChangeMedicationType] = useState(
    loadedMedication === ''
      ? typeOfMedication[0]
      : loadedMedication.medicationType,
  );
  const [medicationDosage, onChangeMedicationDosage] = useState(
    loadedMedication === '' ? '' : loadedMedication.medicationDosage,
  );
  const [medicationDosageMetric, onChangeMedicationDosageMetric] = useState(
    loadedMedication === ''
      ? metricsOfDosage[3]
      : loadedMedication.medicationDosageMetric,
  );
  const [medicationReason, onChangeMedicationReason] = useState(
    loadedMedication === '' ? '' : loadedMedication.medicationReason,
  );
  const [medicationDaily, onChangeMedicationDaily] = useState(
    loadedMedication === ''
      ? dailyDosageOptions[0]
      : loadedMedication.medicationDaily,
  );
  const [
    medicationDailyDosesNumber,
    onChangeMedicationDailyDosesNumber,
  ] = useState(
    loadedMedication === '' ? '' : loadedMedication.medicationDailyDosesNumber,
  );
  const [timersToInclude, onChangeTimersToInclude] = useState(
    loadedMedication === ''
      ? [1]
      : range(1, loadedMedication.medicationDailyDosesNumber),
  );
  const [timerArray, setTimerArray] = useState(
    loadedMedication === '' ? [] : loadedMedication.medicationTimerArray,
  );
  //onst [timerArrayEdit, setTimerArrayEdit] = useState([]); //useState((loadedMedication == '') ? [] : null);
  //const [timerArray, setTimerArray] = useState([]);
  const [medicationStartDate, onChangeMedicationStartDate] = useState(
    loadedMedication === ''
      ? new Date()
      : new Date(loadedMedication.medicationStartDate),
  );
  const [medicationEndDate, onChangeMedicationEndDate] = useState(
    loadedMedication === ''
      ? new Date()
      : new Date(loadedMedication.medicationEndDate),
  );
  const [medicationInstructions, onChangeMedicationInstructions] = useState(
    loadedMedication === '' ? '' : loadedMedication.medicationInstructions,
  );

  const [calendarStartVisible, onChangeCalendarStart] = useState(false);
  const [calendarEndVisible, onChangeCalendarEnd] = useState(false);

  const [timeVisible, onChangeTimeVisible] = useState(false);
  //var tempTimerNumber = 0;
  //const [tempTimerNumber, setTempTimerNumber] = useState(1);

  const insertTimer = (hours, minutes) => {
    // {console.log('insertTimer method', hours, ':', minutes)}
    // {(loadedMedication == '') ? setTimerArray([...timerArray, {hour: hours, minute: minutes}]) : setTimerArrayEdit([...timerArrayEdit, {hour: hours, minute: minutes}])};
    setTimerArray([...timerArray, {hour: hours, minute: minutes}]);
  };

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  function timersIncluded(dailyDosesNumber) {
    onChangeTimersToInclude(range(1, dailyDosesNumber));
    setTimerArray([]);
  }

  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const onConfirm = React.useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      insertTimer(hours, minutes);
    },
    [setVisible, insertTimer],
  );

  const [visibleDate, setVisibleDate] = React.useState(false);
  const onDismissDate = React.useCallback(() => {
    setVisibleDate(false);
  }, [setVisibleDate]);

  const onChangeDate = React.useCallback(
    ({startDate, endDate}) => {
      setVisibleDate(false);
      // console.log('onConfirmDate start, end', { startDate, endDate })
      onChangeMedicationStartDate(startDate);
      onChangeMedicationEndDate(endDate);
    },
    [setVisibleDate, onChangeMedicationStartDate, onChangeMedicationEndDate],
  );

  return (
    <View style={LAYOUT.mainCenter}>
    <AddMedDocForm
      navigation={navigation}
      initialValues={{
        medicName: medicationName,
        medicType: medicationType,
        medicDosage: medicationDosage,
        medicDosageMetric: medicationDosageMetric,
        medicReason: medicationReason,
        medicDaily: medicationDaily,
        medicDailyDosesNumber: medicationDailyDosesNumber,
        medicTimerArray: timerArray,
        medicStartDate: medicationStartDate,
        medicEndDate: medicationEndDate,
        medicInstructions: medicationInstructions,
      }}>
      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 1 of 10</Text>
            <PaddedDivider />
            <Text>Medication Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your medication's name"
              onChangeText={function (text) {
                onChangeValue('medicName', text);
                onChangeMedicationName(text);
              }}
              value={values.medicName}
              autoFocus={loadedMedication == '' ? true : false}
            />
          </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 2 of 10</Text>
            <PaddedDivider />
            <Text>Medication Type</Text>
            <Picker
              selectedValue={values.medicType}
              onValueChange={function (data) {
                onChangeValue('medicType', data);
                onChangeMedicationType(data);
              }}
              value={values.medicType}>
              {typeOfMedication.map((item, index) => {
                return <Picker.Item label={item} value={index} key={index} />;
              })}
            </Picker>
          </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 3 of 10</Text>
            <PaddedDivider />
            
            <Text>Medication Dosage</Text>
            <View style={styles.navBackNext}>
              <TextInput
                
                style={styles.textInput}
                placeholder={'Amount of dose'}
                onChangeText={function (text) {
                  onChangeValue('medicDosage', text);
                  onChangeMedicationDosage(text);
                }}
                value={values.medicDosage}
                keyboardType={'numeric'}
                autoFocus={loadedMedication == '' ? true : false}
              />
              <Picker
                style={{width: '60%'}}
                selectedValue={values.medicDosageMetric}
                onValueChange={function (data) {
                  onChangeValue('medicDosageMetric', data);
                  onChangeMedicationDosageMetric(data);
                }}
                value={values.medicDosageMetric}>
                {metricsOfDosage.map((item, index) => {
                  return <Picker.Item label={item} value={index} key={index} />;
                })}
              </Picker>
            </View>
          </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 4 of 10</Text>
            <PaddedDivider />
            <Text>Purpose of medication</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'e.g. Headache, Back pain, Blood pressure'}
              onChangeText={function (text) {
                onChangeValue('medicReason', text);
                onChangeMedicationReason(text);
              }}
              value={values.medicReason}
              autoFocus={loadedMedication == '' ? true : false}
            />
          </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 5 of 10</Text>
            <PaddedDivider />
            <Text>Daily Medication?</Text>
            <Picker
              selectedValue={values.medicDaily}
              onValueChange={function (data) {
                onChangeValue('medicDaily', data);
                onChangeMedicationDaily(data);
              }}
              value={values.medicDaily}>
              {dailyDosageOptions.map((item, index) => {
                return <Picker.Item label={item} value={index} key={index} />;
              })}
            </Picker>
          </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({onChangeValue, onChangeTimersNumber, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 6 of 10</Text>
            <PaddedDivider />
            <Text>Number of daily doses</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Give a number, e.g. 3'}
              onChangeText={function (text) {
                onChangeValue('medicDailyDosesNumber', text);
                onChangeMedicationDailyDosesNumber(text);
                timersIncluded(text);
              }}
              value={values.medicDailyDosesNumber}
              keyboardType={'numeric'}
              autoFocus={loadedMedication == '' ? true : false}
            />
          </View>
        )}
      </AddMedDocForm.Step>

      {timersToInclude.map((timerNumber, index) => {
        // {tempTimerNumber = index}
        // {console.log('temp: ', tempTimerNumber, ' index: ', index)}
        // console.log(timersToInclude);
        return (
          <AddMedDocForm.Step>
            {({onChangeValue, onChangeTimersNumber, values}) => (
              <View key={timerNumber}>
                <Text style={{ color: COLORS.primaryLight }}>Step 7 of 10</Text>
            <PaddedDivider />
                <Text>Pick time for dose #{timerNumber}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Time - hh:mm'}
                  value={Moment(timerArray[timerNumber - 1]).format('HH:mm')}
                  keyboardType={'phone-pad'}
                />

                <TimePickerModal
                  visible={visible}
                  hours="10" //{(loadedMedication == '') ? '10' : (timerArray[timerNumber-1].hours)} // default: current hours
                  minutes="00" //{(loadedMedication == '') ? '00' : (timerArray[timerNumber-1].minute)} // default: current minutes
                  onDismiss={onDismiss} //{(loadedMedication == '') ? onDismiss : onConfirm}
                  onConfirm={onConfirm}
                  label={'NOTIFICATION TIME FOR DOSE #' + timerNumber.toString()} // optional, default 'Select time'
                  cancelLabel="Cancel" // optional, default: 'Cancel'
                  confirmLabel="Ok" // optional, default: 'Ok'
                  animationType="fade" // optional, default is 'none'
                  locale={'en'} // optional, default is automically detected by your system
                />
                <ThemeButton
                  accessibilityLabel="Press to selet time for dose."
                  text="PICK TIME"
                  onPressEvent={() => setVisible(true)}
                />
                
              </View>
            )}
          </AddMedDocForm.Step>
        );
      })}

      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 8 of 10</Text>
            <PaddedDivider />
            <Text>Date range of medication</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Start Date - End Date'}
              value={
                Moment(medicationStartDate.toString()).format('DD/MM/YYYY') +
                ' - ' +
                Moment(medicationEndDate.toString()).format('DD/MM/YYYY')
              }
            />
              <DatePickerModal
                mode="range"
                visible={visibleDate}
                onDismiss={onDismissDate}
                startDate={
                  loadedMedication == '' ? undefined : medicationStartDate
                }
                endDate={loadedMedication == '' ? undefined : medicationEndDate}
                onConfirm={onChangeDate}
                saveLabel="Save" // optional
                label="Select date range" // optional
                startLabel="From" // optional
                endLabel="To" // optional
                animationType="slide" // optional, default is slide on ios/android and none on web
                locale={'en'} // optional, default is automically detected by your system
              />
             
              <ThemeButton
                  accessibilityLabel="Press to selet time for dose."
                  text="PICK RANGE"
                  onPressEvent={() => setVisibleDate(true)}
                />
            
          </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 9 of 10</Text>
            <PaddedDivider />
            <Text>Medication Instructions</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Instructions for the proper use of the medicine'}
              onChangeText={function (text) {
                onChangeValue('medicInstructions', text);
                onChangeMedicationInstructions(text);
              }}
              value={values.medicInstructions}
              autoFocus={loadedMedication == '' ? true : false}
            />
          </View>
        )}
      </AddMedDocForm.Step>

      <ScrollView>
      <Text style={{ color: COLORS.primaryLight }}>Step 10 of 10</Text>
      <PaddedDivider />
      <View style={styles.navBackNext}>
          <ThemeButton
            type={'secondary'}
            text={'Edit'}
            onPressEvent={() => {
              navigation.goBack(
                navigation.navigate('Medication', {
                  screen: 'AddMedication',
                  params: {
                    loadedMedication: {
                      medicationName,
                      medicationType,
                      medicationDosage,
                      medicationDosageMetric,
                      medicationReason,
                      medicationDaily,
                      medicationDailyDosesNumber,
                      timerArray,
                      medicationStartDate,
                      medicationEndDate,
                      medicationInstructions,
                    },
                  },
                }),
              );
            }}
          />
          <ThemeButton
            text={'SUBMIT MEDICATION'}
            onPressEvent={() => {
              // {setTimerArray(timerArrayEdit)}
              {
                submitForm(
                  medicationName,
                  medicationType,
                  medicationDosage,
                  medicationDosageMetric,
                  medicationReason,
                  medicationDaily,
                  medicationDailyDosesNumber,
                  timerArray,
                  medicationStartDate.toDateString(),
                  medicationEndDate.toDateString(),
                  medicationInstructions,
                );
              }
              navigation.navigate('Medication', {
                screen: 'Index',
              });
            }}
          />
          </View>

      <DataTable>
      <DataTable.Row>
          <DataTable.Cell>Medication's name</DataTable.Cell>
          <DataTable.Cell numeric>{medicationName}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Type</DataTable.Cell>
          <DataTable.Cell numeric>{typeOfMedication[medicationType]}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Dosage amount</DataTable.Cell>
          <DataTable.Cell numeric>{metricsOfDosage[medicationDosageMetric]}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Purpose of medication</DataTable.Cell>
          <DataTable.Cell numeric>{medicationReason}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Taken daily</DataTable.Cell>
          <DataTable.Cell numeric>{dailyDosageOptions[medicationDaily]}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Number of daily doses</DataTable.Cell>
          <DataTable.Cell numeric> {medicationDailyDosesNumber}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Header>
          <DataTable.Title>
            Daily Dosage
          </DataTable.Title>
          <DataTable.Title numeric>
            Time
          </DataTable.Title>
        </DataTable.Header>

      

        {timerArray.map((element, index) => {
          return (
            <DataTable.Row key={index}>
          <DataTable.Cell>Dose {index + 1}</DataTable.Cell>
          <DataTable.Cell numeric>{element.hour}:{element.minute}</DataTable.Cell>
        </DataTable.Row>
            
          );
        })}
        {/* {(loadedMedication == '' ?
              timerArray.map((element, index) =>
                {return(
                  <Text key={index}>Medication Timer {index+1}:         {element.hour}:{element.minute}</Text>
                )}
              )
              :
              timerArrayEdit.map((element, index) =>
                {return(
                  <Text key={index}>Medication Timer {index+1}:         {element.hour}:{element.minute}</Text>
                )}
              )
            )} */}

          <DataTable.Row>
          <DataTable.Cell>Start date</DataTable.Cell>
          <DataTable.Cell numeric> {medicationStartDate.toLocaleDateString()}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>End date</DataTable.Cell>
          <DataTable.Cell numeric> {medicationEndDate.toLocaleDateString()}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Instructions</DataTable.Cell>
          <DataTable.Cell numeric> {medicationInstructions}</DataTable.Cell>
        </DataTable.Row>
        </DataTable>
        
        {/* {console.log('addMed: ', timerArray)} */}

       

      </ScrollView>
    </AddMedDocForm>
    </View>
  )
}
