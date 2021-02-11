import { Text, TextInput, TextField, View , Button, TextInputComponent, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Group } from 'react-native';
import React, { Component, useState } from 'react';
import { Picker } from '@react-native-community/picker';
import {styles} from '../../styles/globals';

import AddMedDocForm from './AddMedDocForm';
import { addMedication } from '../../DBFunctions';

import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

// import TimePicker from 'react-native-modal-datetime-picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import CalendarIcon from 'react-calendar-icon'
// import CalendarIcon from 'react-native-vector-icons'
// import { Icon } from 'react-native-vector-icons/MaterialIcons';

//import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
// import { Grid } from '@material-ui/core';

function submitForm (medName, medType, medDosage, medDosageMetric, medReason,
  medDaily, medDailyDosesNumber, medTime1, medStartDate, medEndDate,
  medInstructions, cb){
  //check auth of form

  //submit to firebase table
  console.log('submit', medName, medType, medDosage, medDosageMetric, medReason,
                medDaily, medDailyDosesNumber, medTime1, medStartDate, medEndDate,
                medInstructions);

  addMedication(medName, medType, medDosage, medDosageMetric, medReason,
                medDaily, medDailyDosesNumber, medTime1, medStartDate, medEndDate,
                medInstructions);

  //cb();
}

export default function AddMedicationScreen ({route, navigation}) {
  {console.log("Route ", route.params)}
    const {loadedMedication} = route.params;

    const typeOfMedication = ['Liquid Solution', 'Pill/Tablet', 'Capsule', 'Tropical (cream/ointment)', 'Drops', 'Inhaler', 'Injection', 'Patches', 'Other'];
    const metricsOfDosage = ['ml', 'mg', 'g', 'Pills'];
    const dailyDosageOptions = ['Yes', 'No'];

    const [medicationName, onChangeMedicationName] = useState((loadedMedication == '') ? '' : loadedMedication.medicationName);
    const [medicationType, onChangeMedicationType] = useState((loadedMedication == '') ? typeOfMedication[0] : loadedMedication.medicationType);
    const [medicationDosage, onChangeMedicationDosage] = useState((loadedMedication == '') ? '' : loadedMedication.medicationDosage);
    const [medicationDosageMetric, onChangeMedicationDosageMetric] = useState((loadedMedication == '') ? metricsOfDosage[3] : loadedMedication.medicationDosageMetric);
    const [medicationReason, onChangeMedicationReason] = useState((loadedMedication == '') ? '' : loadedMedication.medicationReason);
    const [medicationDaily, onChangeMedicationDaily] = useState((loadedMedication == '') ? dailyDosageOptions[0] : loadedMedication.medicationDaily);
    const [medicationDailyDosesNumber, onChangeMedicationDailyDosesNumber] = useState((loadedMedication == '') ? '' : loadedMedication.medicationDailyDosesNumber);
    const [medicationTime1, onChangeMedicationTime1] = useState((loadedMedication == '') ? new Date() : new Date(loadedMedication.medicationTime1));
    const [medicationStartDate, onChangeMedicationStartDate] = useState((loadedMedication == '') ? new Date() : new Date(loadedMedication.medicationStartDate));
    const [medicationEndDate, onChangeMedicationEndDate] = useState((loadedMedication == '') ? new Date() : new Date(loadedMedication.medicationEndDate));
    const [medicationInstructions, onChangeMedicationInstructions] = useState((loadedMedication == '') ? '' : loadedMedication.medicationInstructions);

    // if(loadedMedication != '') {
    //   console.log("Not Empty");
    //   onChangeMedicationName(loadedMedication.medicationName);
    //   onChangeMedicationType(loadedMedication.medicationType);
    //   onChangeMedicationDosage(loadedMedication.medicationDosage);
    //   onChangeMedicationDosageMetric(loadedMedication.medicationDosageMetric);
    //   onChangeMedicationReason(loadedMedication.medicationReason);
    //   onChangeMedicationDaily(loadedMedication.medicationDaily);
    //   onChangeMedicationDailyDosesNumber(loadedMedication.medicationDailyDosesNumber);
    //   onChangeMedicationTime1(new Date(loadedMedication.medicationTime1));
    //   onChangeMedicationStartDate(new Date(loadedMedication.medicationStartDate));
    //   onChangeMedicationEndDate(new Date(loadedMedication.medicationEndDate));
    //   onChangeMedicationInstructions(loadedMedication.medicationInstructions);
    // }

    const [calendarStartVisible, onChangeCalendarStart] = useState(false);
    const [calendarEndVisible, onChangeCalendarEnd] = useState(false);

    const [timeVisible, onChangeTimeVisible] = useState(false);

    const [timersToInclude, onChangeTimersToInclude] = useState([]);

    const timerArray = [];

    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    }

    function timersIncluded(dailyDosesNumber){
      onChangeTimersToInclude(range(1, dailyDosesNumber));
    }
    
    return (
          <AddMedDocForm initialValues={{
            medicName: medicationName,
            medicType: medicationType,
            medicDosage: medicationDosage,
            medicDosageMetric: medicationDosageMetric,
            medicReason: medicationReason,
            medicDaily: medicationDaily,
            medicDailyDosesNumber: medicationDailyDosesNumber,
            medicTime1: medicationTime1,
            medicTimerArray: [],
            medicStartDate: medicationStartDate,
            medicEndDate: medicationEndDate,
            medicInstructions: medicationInstructions
          }}>

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
                  onValueChange={ function(data) {{onChangeValue('medicType', data)}; {onChangeMedicationType(typeOfMedication[data])}} }
                  value={values.medicType}
                >
                  {typeOfMedication.map((item, index) => {
                    return (<Picker.Item label={item} value={index} key={index}/>)
                  })}
                </Picker>



                {/* <TextInput
                  style={styles.textInput}
                  placeholder={'Medication Type'}
                  onChangeText={ function(text) {{onChangeValue('medicType', text)}; {onChangeMedicationType(text)}} }
                  value={values.medicType}
                  autoFocus={true}
                /> */}
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
                    onValueChange={ function(data) {{onChangeValue('medicDosageMetric', data)}; {onChangeMedicationDosageMetric(metricsOfDosage[data])}} }
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
                  onValueChange={ function(data) {{onChangeValue('medicDaily', data)}; {onChangeMedicationDaily(dailyDosageOptions[data])}} }
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
            
            {/* Repeat according to Number of Daily Medications */}
            {timersToInclude.map((timerNumber) => {
              // console.log(timersToInclude);
              return (
                <AddMedDocForm.Step>
                  {({ onChangeValue, onChangeTimersNumber, values }) => (
                    <View key={timerNumber}>
                      <Text>Dose Number {timerNumber}</Text>
                      <TouchableOpacity style={styles.button} onPress={function(){
                        onChangeTimeVisible(true);
                      } }>
                        <Text>TimerIcon</Text>
                      </TouchableOpacity>
                      <DateTimePicker
                        mode={'time'}
                        is24Hour={true}
                        isVisible={timeVisible}
                        onConfirm={ function(data){{onChangeMedicationTime1(data)}; {onChangeTimeVisible(false)}; {onChangeValue('medicTimerArray', data)}} }
                        onCancel={ function(){onChangeTimeVisible(false)} }
                      />
                      <TextInput
                        style={styles.textInput}
                        placeholder={'Time - hh:mm'}
                        value={Moment(medicationTime1.toString()).utcOffset(0, true).format("HH:mm")}
                        keyboardType={'phone-pad'}
                        //value={values.medicTimerArray[timerNumber]}
                        // onChangeTimersNumber
                      />
                    </View>
                  )}
                </AddMedDocForm.Step>
              );
            })}

            <AddMedDocForm.Step>
              {({ onChangeValue, values }) => (
              <View>
                <Text>Medication Starting Date</Text>
                <TouchableOpacity style={styles.button} onPress={function(){
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
                />
              </View>
              )}
            </AddMedDocForm.Step>

            <AddMedDocForm.Step>
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
              <Text>Medication Type:              {medicationType}</Text>
              <Text>Medication Dosage:         {medicationDosage} {medicationDosageMetric}</Text>
              <Text>Medication Reason:         {medicationReason}</Text>
              <Text>Medication Daily:              {medicationDaily}</Text>
              <Text>Medication Daily Doses:  {medicationDailyDosesNumber}</Text>
              <Text>Medication Time:              {medicationTime1.toTimeString()}</Text>
              <Text>Medication Start Date:     {medicationStartDate.toDateString()}</Text>
              <Text>Medication End Date:       {medicationEndDate.toDateString()}</Text>
              <Text>Medication Instructions:  {medicationInstructions}</Text>
              <Button
                title={'Submit'}
                onPress={() => {
                  {submitForm(medicationName, medicationType, medicationDosage, medicationDosageMetric, medicationReason, medicationDaily, medicationDailyDosesNumber, medicationTime1.toTimeString(), medicationStartDate.toDateString(), medicationEndDate.toDateString(), medicationInstructions)}
                  navigation.navigate('Medication', {
                    screen: 'Index'
                  });
                }}
              />
            </View>

          </AddMedDocForm>
    );
}