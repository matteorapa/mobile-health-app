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
  {console.log("Route ", route.params)}
  const {loadedMedication} = route.params;

  const typeOfMedication = ['Liquid Solution', 'Pill/Tablet', 'Capsule', 'Tropical (cream/ointment)', 'Drops', 'Inhaler', 'Injection', 'Patches', 'Other'];
  const metricsOfDosage = ['ml', 'mg', 'g', 'Pills/Tablets', 'Capsule', 'Drops', 'Patches', 'N/A'];
  const dailyDosageOptions = ['Yes', 'No'];

  const [medicationName, onChangeMedicationName] = useState((loadedMedication == '') ? '' : loadedMedication.medicationName);
  const [medicationType, onChangeMedicationType] = useState((loadedMedication == '') ? typeOfMedication[0] : loadedMedication.medicationType);
  const [medicationDosage, onChangeMedicationDosage] = useState((loadedMedication == '') ? '' : loadedMedication.medicationDosage);
  const [medicationDosageMetric, onChangeMedicationDosageMetric] = useState((loadedMedication == '') ? metricsOfDosage[3] : loadedMedication.medicationDosageMetric);
  const [medicationReason, onChangeMedicationReason] = useState((loadedMedication == '') ? '' : loadedMedication.medicationReason);
  const [medicationDaily, onChangeMedicationDaily] = useState((loadedMedication == '') ? dailyDosageOptions[0] : loadedMedication.medicationDaily);
  const [medicationDailyDosesNumber, onChangeMedicationDailyDosesNumber] = useState((loadedMedication == '') ? '' : loadedMedication.medicationDailyDosesNumber);
  const [timerArray, setTimerArray] = useState((loadedMedication == '') ? [] : loadedMedication.medicationTimerArray);
  const [medicationStartDate, onChangeMedicationStartDate] = useState((loadedMedication == '') ? new Date() : new Date(loadedMedication.medicationStartDate));
  const [medicationEndDate, onChangeMedicationEndDate] = useState((loadedMedication == '') ? new Date() : new Date(loadedMedication.medicationEndDate));
  const [medicationInstructions, onChangeMedicationInstructions] = useState((loadedMedication == '') ? '' : loadedMedication.medicationInstructions);

  const [calendarStartVisible, onChangeCalendarStart] = useState(false);
  const [calendarEndVisible, onChangeCalendarEnd] = useState(false);

  const [timeVisible, onChangeTimeVisible] = useState(false);

  const [timersToInclude, onChangeTimersToInclude] = useState([]);
  
  const insertTimer = (hours, minutes) => {
    setTimerArray([...timerArray, {hour: hours, minute: minutes}]);
    console.log('saving', hours, minutes, 'in array', timerArray);
  }

  // const insertTimer = (timerToInsert) => {
  //   setTimerArray([...timerArray, timerToInsert]);
  // }

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
      console.log('onConfirm Hours, minutes', { hours, minutes });
      insertTimer(hours, minutes)
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
                  style={{width:'30%'}}
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
          
          
              {timersToInclude.map((timerNumber) => {
                // console.log(timersToInclude);
                return (
                  <AddMedDocForm.Step>
                    {({ onChangeValue, onChangeTimersNumber, values }) => (
                      <View key={timerNumber}>
                        <Text>Dose Number {timerNumber}</Text>

                        <TimePickerModal
                          visible={visible}
                          hours={12} // default: current hours
                          minutes={14} // default: current minutes
                          onDismiss={onDismiss}
                          onConfirm={onConfirm}
                          // onConfirm={(hours, minutes) => {setVisible(false); {insertTimer(hours, minutes)}}}
                          label="Select time" // optional, default 'Select time'
                          cancelLabel="Cancel" // optional, default: 'Cancel'
                          confirmLabel="Ok" // optional, default: 'Ok'
                          animationType="fade" // optional, default is 'none'
                          locale={'en'} // optional, default is automically detected by your system
                        />
                        <Button onPress={()=> setVisible(true)} title="Set time of notification" />


                        {/* <TouchableOpacity style={styles.button} onPress={function(){
                          onChangeTimeVisible(true);
                        } }>
                          <Text>TimerIcon</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                          mode={'time'}
                          is24Hour={true}
                          isVisible={timeVisible}
                          onConfirm={ function(data){ {onChangeTimeVisible(false)}; {onChangeValue('medicTimerArray', data)}; {insertTimer(data.toString())};} }
                          onCancel={ function(){onChangeTimeVisible(false)} }
                        />
                        <TextInput
                          style={styles.textInput}
                          placeholder={'Time - hh:mm'}
                          value={Moment(values.medicTimerArray[timerNumber]).utcOffset(0, true).format("HH:mm")}
                          keyboardType={'phone-pad'}
                        /> */}
                      </View>
                    )}
                  </AddMedDocForm.Step>
                );
              })}
            

          <AddMedDocForm.Step>
            {({ onChangeValue, values }) => (
            <View>
              <Text>Medication Date</Text>
              <>
                <DatePickerModal
                  mode="range"
                  visible={visibleDate}
                  onDismiss={onDismissDate}
                  startDate={undefined}
                  endDate={undefined}
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



              {/* <TouchableOpacity style={styles.button} onPress={function(){
                onChangeCalendarStart(true);
              } }>
              <Text>CalendarIcon</Text>
              </TouchableOpacity>
              <DateTimePicker
                value={Date}
                mode={'date'}
                isVisible={calendarStartVisible}
                onConfirm={ function(data){{onChangeMedicationStartDate(data)}; {onChangeCalendarStart(false)}} }
                onCancel={function(){onChangeCalendarStart(false)}}
              />
              <TextInput
                style={styles.textInput}
                placeholder={'Start Date - dd/mm/yyyy'}
                //value={medicationStartDate.toDateString()}
                value={Moment(medicationStartDate.toString()).format("DD/MM/YYYY")}
              /> */}
            </View>
            )}
          </AddMedDocForm.Step>


          {/* <AddMedDocForm.Step>
            {({ onChangeValue, values }) => (
            <View>
              <Text>Medication End Date</Text>
              <TouchableOpacity style={styles.button} onPress={function(){
                onChangeCalendarEnd(true);
              } }>
              <Text>CalendarIcon</Text>
              </TouchableOpacity>
              <DateTimePicker
                value={Date}
                mode={'date'}
                isVisible={calendarEndVisible}
                onConfirm={ function(data){{onChangeMedicationEndDate(data)}; {onChangeCalendarEnd(false)}} }
                onCancel={function(){onChangeCalendarEnd(false)}}
              />
              <TextInput
                style={styles.textInput}
                placeholder={'End Date - dd/mm/yyyy'}
                //value={medicationEndDate.toDateString()}
                value={Moment(medicationEndDate.toString()).format("DD/MM/YYYY")}
              />
            </View>
            )}
          </AddMedDocForm.Step> */}

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
            <Text>Medication Start Date:     {medicationStartDate.toDateString()}</Text>
            <Text>Medication End Date:       {medicationEndDate.toDateString()}</Text>
            <Text>Medication Instructions:  {medicationInstructions}</Text>
            {console.log('addMed: ', timerArray)}

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
                  {submitForm(medicationName, medicationType, medicationDosage, medicationDosageMetric, medicationReason, medicationDaily, medicationDailyDosesNumber, timerArray, medicationStartDate.toDateString(), medicationEndDate.toDateString(), medicationInstructions)}
                  navigation.navigate('Medication', {
                    screen: 'Index'
                  });
                }}
              />
            </View>

            <ThemeButton
                type={"secondary"}
                text={"Back"}
                onPressEvent={() => {
                    navigation.goBack();
                }}
            />
          </View>

        </AddMedDocForm>
  );
}