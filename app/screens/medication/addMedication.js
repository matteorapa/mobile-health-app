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

export default function AddMedicationScreen ({navigation}) {

    const [medicationName, onChangeMedicationName] = useState('');
    const [medicationType, onChangeMedicationType] = useState('');
    const [medicationDosage, onChangeMedicationDosage] = useState('');
    const [medicationDosageMetric, onChangeMedicationDosageMetric] = useState('');
    const [medicationReason, onChangeMedicationReason] = useState('');
    const [medicationDaily, onChangeMedicationDaily] = useState('');
    const [medicationDailyDosesNumber, onChangeMedicationDailyDosesNumber] = useState('');
    const [medicationTime1, onChangeMedicationTime1] = useState(new Date());
    const [medicationStartDate, onChangeMedicationStartDate] = useState(new Date());
    const [medicationEndDate, onChangeMedicationEndDate] = useState(new Date());
    const [medicationInstructions, onChangeMedicationInstructions] = useState('');
    
    const [calendarStartVisible, onChangeCalendarStart] = useState(false);
    const [calendarEndVisible, onChangeCalendarEnd] = useState(false);

    const [timeVisible, onChangeTimeVisible] = useState(false);

    const [timersToInclude, onChangeTimersToInclude] = useState([]);

    const timerArray = [];

    const metricsOfDosage = ['ml', 'mg', 'g', 'Pills'];
    const dailyDosageOptions = ['Yes', 'No'];

    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    }

    function timersIncluded(dailyDosesNumber){
      onChangeTimersToInclude(range(1, dailyDosesNumber));
    }
    
    return (
          <AddMedDocForm initialValues={{
            medicName: '',
            medicType: '',
            medicDosage: '',
            medicDosageMetric: '',
            medicReason: '',
            medicDaily: '',
            medicDailyDosesNumber: '',
            medicTime1: '',
            medicTime2: '',
            medicTimerArray: [],
            medicStartDate: '',
            medicEndDate: '',
            medicInstructions: ''
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
                  autoFocus={true}
                />
              </View>
              )}
            </AddMedDocForm.Step>

            <AddMedDocForm.Step>
              {({ onChangeValue, values }) => (
              <View>
                <Text>Medication Type</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Medication Type'}
                  onChangeText={ function(text) {{onChangeValue('medicType', text)}; {onChangeMedicationType(text)}} }
                  value={values.medicType}
                  autoFocus={true}
                />
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
                    autoFocus={true}
                  />
                  <Picker
                    style={{width:'30%'}}
                    selectedValue={values.medicDosageMetric}
                    onValueChange={ function(data) {{onChangeValue('medicDosageMetric', data)}; {onChangeMedicationDosageMetric(data.value)}} }
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
                  autoFocus={true}
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
                  onValueChange={ function(data) {{onChangeValue('medicDaily', data)}; {onChangeMedicationDaily(data.value)}} }
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
                  autoFocus={true}
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
                        value={Moment(medicationTime1.toString()).format("HH:mm")}
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
                  value={Moment(medicationStartDate.toString()).format("DD/MM/yyyy")}
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
                  value={Moment(medicationEndDate.toString()).format("DD/MM/yyyy")}
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
                  autoFocus={true}
                />
              </View>
              )}
            </AddMedDocForm.Step>

            <View>
              <Text>Medication Name:         {medicationName}</Text>
              <Text>Medication Type:         {medicationType}</Text>
              <Text>Medication Dosage:       {medicationDosage} {medicationDosageMetric}</Text>
              <Text>Medication Reason:       {medicationReason}</Text>
              <Text>Medication Daily:        {medicationDaily}</Text>
              <Text>Medication Daily Doses:  {medicationDailyDosesNumber}</Text>
              <Text>Medication Time:         {medicationTime1.toTimeString()}</Text>
              <Text>Medication Start Date:   {medicationStartDate.toDateString()}</Text>
              <Text>Medication End Date:     {medicationEndDate.toDateString()}</Text>
              <Text>Medication Instructions: {medicationInstructions}</Text>
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