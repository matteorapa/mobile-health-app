import { Text, TextInput, TextField, View , Button, TextInputComponent, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Group } from 'react-native';
import React, { Component, useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates'
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';

import AddMedDocForm from './AddMedDocForm';
import { addMedication } from '../../DBFunctions';

import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { onChange } from 'react-native-reanimated';

function submitForm (medName, medType, medDosage, medDosageMetric, medReason,
  medDaily, medDailyDosesNumber, medTimersArray, medStartDate, medEndDate, medInstructions){
  //check auth of form

  //submit to firebase table
  console.log('submit ', medName, medType, medDosage, medDosageMetric, medReason,
                medDaily, medDailyDosesNumber, medTimersArray, medStartDate, medEndDate, medInstructions);

  addMedication(medName, medType, medDosage, medDosageMetric, medReason,
                medDaily, medDailyDosesNumber, medTimersArray, medStartDate, medEndDate, medInstructions);
}

export default function AddMedicationScreen ({route, navigation}) {
  //{console.log("Route ", route.params)}
  const {loadedMedication} = route.params;

  const typeOfMedication = ['Liquid Solution', 'Pill/Tablet', 'Capsule', 'Tropical (cream/ointment)', 'Drops', 'Inhaler', 'Injection', 'Patches', 'Sachet', 'Other'];
  const metricsOfDosage = ['ml', 'mg', 'g', 'Pills/Tablets', 'Capsule', 'Drops', 'Patches', 'Sachet', 'N/A'];
  const dailyDosageOptions = ['Yes', 'No'];

  //const timerArrayEditShow = (loadedMedication != '') ? medicationDaily.medicationTimerArray : null;
  const [medicationName, onChangeMedicationName] = useState((loadedMedication == '') ? '' : loadedMedication.medicationName);
  const [medicationType, onChangeMedicationType] = useState((loadedMedication == '') ? typeOfMedication[0] : loadedMedication.medicationType);
  const [medicationDosage, onChangeMedicationDosage] = useState((loadedMedication == '') ? '' : loadedMedication.medicationDosage);
  const [medicationDosageMetric, onChangeMedicationDosageMetric] = useState((loadedMedication == '') ? metricsOfDosage[3] : loadedMedication.medicationDosageMetric);
  const [medicationReason, onChangeMedicationReason] = useState((loadedMedication == '') ? '' : loadedMedication.medicationReason);
  const [medicationDaily, onChangeMedicationDaily] = useState((loadedMedication == '') ? dailyDosageOptions[0] : loadedMedication.medicationDaily);
  const [medicationDailyDosesNumber, onChangeMedicationDailyDosesNumber] = useState((loadedMedication == '') ? '' : loadedMedication.medicationDailyDosesNumber);
  const [timersToInclude, onChangeTimersToInclude] = useState((loadedMedication == '') ? [1] : (range(1, loadedMedication.medicationDailyDosesNumber)) );
  const [timerArray, setTimerArray] = useState((loadedMedication == '') ? [] : loadedMedication.medicationTimerArray);
  //onst [timerArrayEdit, setTimerArrayEdit] = useState([]); //useState((loadedMedication == '') ? [] : null);
  //const [timerArray, setTimerArray] = useState([]);
  const [medicationStartDate, onChangeMedicationStartDate] = useState((loadedMedication == '') ? new Date() : new Date(loadedMedication.medicationStartDate));
  const [medicationEndDate, onChangeMedicationEndDate] = useState((loadedMedication == '') ? new Date() : new Date(loadedMedication.medicationEndDate));
  const [medicationInstructions, onChangeMedicationInstructions] = useState((loadedMedication == '') ? '' : loadedMedication.medicationInstructions);

  const [calendarStartVisible, onChangeCalendarStart] = useState(false);
  const [calendarEndVisible, onChangeCalendarEnd] = useState(false);

  const [timeVisible, onChangeTimeVisible] = useState(false);
  //var tempTimerNumber = 0;
  //const [tempTimerNumber, setTempTimerNumber] = useState(1);

  const insertTimer = (hours, minutes) => {
    // {console.log('insertTimer method', hours, ':', minutes)}
    // {(loadedMedication == '') ? setTimerArray([...timerArray, {hour: hours, minute: minutes}]) : setTimerArrayEdit([...timerArrayEdit, {hour: hours, minute: minutes}])};
    setTimerArray([...timerArray, {hour: hours, minute: minutes}])
  }

  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
  }

  function timersIncluded(dailyDosesNumber){
    onChangeTimersToInclude(range(1, dailyDosesNumber));
    setTimerArray([]);
  }

  const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])
  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      insertTimer(hours, minutes);
    },
    [setVisible, insertTimer]
  );

  const [visibleDate, setVisibleDate] = React.useState(false)
  const onDismissDate = React.useCallback(() => {
    setVisibleDate(false)
  }, [setVisibleDate])
  const onChangeDate = React.useCallback(({ startDate, endDate }) => {
    setVisibleDate(false)
    // console.log('onConfirmDate start, end', { startDate, endDate })
    onChangeMedicationStartDate(startDate)
    onChangeMedicationEndDate(endDate)
  }, [setVisibleDate, onChangeMedicationStartDate, onChangeMedicationEndDate])
  
  return (
        <AddMedDocForm 
          navigation = {navigation}
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
            medicInstructions: medicationInstructions
          }
        }>

          <AddMedDocForm.Step>
            {({ onChangeValue, values }) => (
            <View>
              <Text>Medication Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Medication Name'}
                onChangeText={ function(text) {{onChangeValue('medicName', text)}; {onChangeMedicationName(text)}} }
                value={values.medicName}
                autoFocus={(loadedMedication == '') ? true : false}
              />
            </View>
            )}
          </AddMedDocForm.Step>

          <AddMedDocForm.Step>
            {({ onChangeValue, values }) => (
            <View>
              <Text>Medication Type</Text>
              <Picker 
                style={{width: '80%'}}
                selectedValue={values.medicType}
                onValueChange={ function(data) {{onChangeValue('medicType', data)}; {onChangeMedicationType(data)}} }
                value={values.medicType}
              >
                {typeOfMedication.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index}/>)
                })}
              </Picker>
            </View>
            )}
          </AddMedDocForm.Step>
          
          <AddMedDocForm.Step>
            {({ onChangeValue, values }) => (
            <View>
              <Text>Medication Dosage</Text>
              <View style={styles.navButtonsForm}>
                <TextInput
                  style={styles.textInput, {width: '40%'}}
                  placeholder={'Medication Dosage'}
                  onChangeText={ function(text) {{onChangeValue('medicDosage', text)}; {onChangeMedicationDosage(text)}} }
                  value={values.medicDosage}
                  keyboardType={'numeric'}
                  autoFocus={(loadedMedication == '') ? true : false}
                />
                <Picker
                  style={{width:'40%'}}
                  selectedValue={values.medicDosageMetric}
                  onValueChange={ function(data) {{onChangeValue('medicDosageMetric', data)}; {onChangeMedicationDosageMetric(data)}} }
                  value={values.medicDosageMetric}>
                  {metricsOfDosage.map((item, index) => {
                    return (<Picker.Item label={item} value={index} key={index}/>)
                  })}
                </Picker>
              </View>
            </View>
            )}
          </AddMedDocForm.Step>

          <AddMedDocForm.Step>
            {({ onChangeValue, values }) => (
            <View>
              <Text>Medication Reason</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Medication Reason'}
                onChangeText={ function(text) {{onChangeValue('medicReason', text)}; {onChangeMedicationReason(text)}} }
                value={values.medicReason}
                autoFocus={(loadedMedication == '') ? true : false}
              />
            </View>
            )}
          </AddMedDocForm.Step>

          <AddMedDocForm.Step>
            {({ onChangeValue, values }) => (
            <View>
              <Text>Daily Medication?</Text>
              <Picker
                style={{width:'30%'}}
                selectedValue={values.medicDaily}
                onValueChange={ function(data) {{onChangeValue('medicDaily', data)}; {onChangeMedicationDaily(data)}} }
                value={values.medicDaily}>
                {dailyDosageOptions.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index}/>)
                })}
              </Picker>
            </View>
            )}
          </AddMedDocForm.Step>

          <AddMedDocForm.Step>
            {({ onChangeValue, onChangeTimersNumber, values }) => (
            <View>
              <Text>Number of Doses to Take Each Day</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Number of Doses Each Day'}
                onChangeText={ function(text) {{onChangeValue('medicDailyDosesNumber', text)}; {onChangeMedicationDailyDosesNumber(text)}; {timersIncluded(text)}} }
                value={values.medicDailyDosesNumber}
                keyboardType={'numeric'}
                autoFocus={(loadedMedication == '') ? true : false}
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
                    {({ onChangeValue, onChangeTimersNumber, values }) => (
                      <View key={timerNumber}>
                        <Text>Dose Number {timerNumber}</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder={'Time - hh:mm'}
                          value={Moment(timerArray[timerNumber-1]).format("HH:mm")}
                          keyboardType={'phone-pad'}
                        />

                        <TimePickerModal
                          visible={visible}
                          hours= '10' //{(loadedMedication == '') ? '10' : (timerArray[timerNumber-1].hours)} // default: current hours
                          minutes= '00' //{(loadedMedication == '') ? '00' : (timerArray[timerNumber-1].minute)} // default: current minutes
                          onDismiss= {onDismiss} //{(loadedMedication == '') ? onDismiss : onConfirm}
                          onConfirm={onConfirm}
                          label={"Select Timer Number " + timerNumber.toString()} // optional, default 'Select time'
                          cancelLabel="Cancel" // optional, default: 'Cancel'
                          confirmLabel="Ok" // optional, default: 'Ok'
                          animationType="fade" // optional, default is 'none'
                          locale={'en'} // optional, default is automically detected by your system
                        />
                        <Button onPress={()=> setVisible(true)} title="Set time of notification" />

                      </View>
                    )}
                  </AddMedDocForm.Step>
                );
              })}
            

          <AddMedDocForm.Step>
            {({ onChangeValue, values }) => (
            <View>
              <Text>Medication Duration Dates</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Start Date - End Date'}
                value={Moment(medicationStartDate.toString()).format("DD/MM/YYYY") + ' - ' + Moment(medicationEndDate.toString()).format("DD/MM/YYYY")}
              />

              <>
                <DatePickerModal
                  mode="range"
                  visible={visibleDate}
                  onDismiss={onDismissDate}
                  startDate={(loadedMedication == '') ? undefined : medicationStartDate}
                  endDate={(loadedMedication == '') ? undefined : medicationEndDate}
                  onConfirm={onChangeDate}
                  saveLabel="Save" // optional
                  label="Select period" // optional
                  startLabel="From" // optional
                  endLabel="To" // optional
                  animationType="slide" // optional, default is slide on ios/android and none on web
                  locale={'en'} // optional, default is automically detected by your system
                />
                <Button onPress={()=> setVisibleDate(true)} title="Pick range"/>
              </>
            </View>
            )}
          </AddMedDocForm.Step>

          <AddMedDocForm.Step>
            {({ onChangeValue, values }) => (
            <View>
            <Text>Medication Instructions</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Medication Instructions'}
                onChangeText={ function(text) {{onChangeValue('medicInstructions', text)}; {onChangeMedicationInstructions(text)}} }
                value={values.medicInstructions}
                autoFocus={(loadedMedication == '') ? true : false}
              />
            </View>
            )}
          </AddMedDocForm.Step>

          <View>
            <Text>Medication Name:            {medicationName}</Text>
            <Text>Medication Type:              {typeOfMedication[medicationType]}</Text>
            <Text>Medication Dosage:         {medicationDosage} {metricsOfDosage[medicationDosageMetric]}</Text>
            <Text>Medication Reason:         {medicationReason}</Text>
            <Text>Medication Daily:              {dailyDosageOptions[medicationDaily]}</Text>
            <Text>Medication Daily Doses:  {medicationDailyDosesNumber}</Text>
            {timerArray.map((element, index) =>
              {return(
                <Text key={index}>Medication Timer {index+1}:         {element.hour}:{element.minute}</Text>
              )}
            )}
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
            <Text>Medication Start Date:     {medicationStartDate.toDateString()}</Text>
            <Text>Medication End Date:       {medicationEndDate.toDateString()}</Text>
            <Text>Medication Instructions:  {medicationInstructions}</Text>
            {/* {console.log('addMed: ', timerArray)} */}

            <View style={styles.navButtonsForm}>
              <ThemeButton
                type={"secondary"}
                icon={'edit'}
                text={'Edit'}
                onPressEvent={() => {
                  navigation.goBack(
                    navigation.navigate('Medication', {
                    screen: 'AddMedication',
                    params: {loadedMedication: {medicationName, medicationType, medicationDosage, medicationDosageMetric, medicationReason, medicationDaily, medicationDailyDosesNumber, timerArray, medicationStartDate, medicationEndDate, medicationInstructions}}
                  })
                  );
                }}
              />
              <ThemeButton
                type={"secondary"}
                icon={'done'}
                text={'Submit'}
                onPressEvent={() => {
                  // {setTimerArray(timerArrayEdit)}
                  {submitForm(medicationName, medicationType, medicationDosage, medicationDosageMetric, medicationReason, medicationDaily, medicationDailyDosesNumber, timerArray, medicationStartDate.toDateString(), medicationEndDate.toDateString(), medicationInstructions)}
                  navigation.navigate('Medication', {
                    screen: 'Index'
                  });
                }}
              />
            </View>

            <ThemeButton
                type={"secondary"}
                text={"Cancel"}
                onPressEvent={() => {
                    navigation.goBack();
                }}
            />
          </View>

        </AddMedDocForm>
  );
}