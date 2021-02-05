import { Text, TextInput, TextField, View , Button, TextInputComponent, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Group } from 'react-native';
import React, { Component, useState } from 'react';
import { Picker } from '@react-native-community/picker';
import {styles} from '../../styles/globals';

import AddMedDocForm from './AddMedDocForm';

import DropDownPicker from 'react-native-dropdown-picker'

import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import TimePicker from 'react-native-modal-datetime-picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import CalendarIcon from 'react-calendar-icon'
// import CalendarIcon from 'react-native-vector-icons'
// import { Icon } from 'react-native-vector-icons/MaterialIcons';

//import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
// import { Grid } from '@material-ui/core';

function submitForm (medName, medType, medDosage, medReason,
  medDaily, medDailyDosesNumber, medTime1, medStartDate, medEndDate,
  medInstructions, cb){
  //check auth of form

  //submit to firebase table
  console.log('submit', medName, medType, medDosage, medReason,
                medDaily, medDailyDosesNumber, medTime1, medStartDate, medEndDate,
                medInstructions);

  cb();
}

export default function AddMedicationScreen ({navigation}) {

    const [medicationName, onChangeMedicationName] = useState('');
    const [medicationType, onChangeMedicationType] = useState('');
    const [medicationDosage, onChangeMedicationDosage] = useState('');
    const [medicationReason, onChangeMedicationReason] = useState('');
    const [medicationDaily, onChangeMedicationDaily] = useState('');
    const [medicationDailyDosesNumber, onChangeMedicationDailyDosesNumber] = useState('');
    const [medicationStartDate, onChangeMedicationStartDate] = useState(new Date());
    const [medicationEndDate, onChangeMedicationEndDate] = useState(new Date());
    const [medicationTime1, onChangeMedicationTime1] = useState(new Date());
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
                  onChangeText={text => onChangeValue('medicName', text)}
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
                  onChangeText={(text) => onChangeValue('medicType', text)}
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
                    onChangeText={(text) => onChangeValue('medicDosage', text)}
                    value={values.medicDosage}
                    keyboardType={'numeric'}
                    autoFocus={true}
                  />
                  <Picker
                    style={{width:'30%'}}
                    selectedValue={values.medicDosageMetric}
                    onValueChange={(data) => onChangeValue('medicDosageMetric', data)}
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
                  onChangeText={(text) => onChangeValue('medicReason', text)}
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
                  onValueChange={(data) => onChangeValue('medicDaily', data)}
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
                  onChangeText={ function(text) {{onChangeValue('medicDailyDosesNumber', text)}; {onChangeMedicationDailyDosesNumber(text)}; {timersIncluded(text)}; {onChangeTimersNumber(text)} }}
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
                        onConfirm={ function(data){{onChangeMedicationTime1(data)}; {onChangeTimeVisible(false)}; {onChangeValue('medicTimerArray', data)} }}
                        onCancel={onChangeTimeVisible(false)}
                      />
                      <TextInput
                        style={styles.textInput}
                        placeholder={'Time - hh:mm'}
                        value={Moment(medicationTime1.toString()).format("HH:mm")}
                        //value={values.medicTimerArray[timerNumber]}
                        onChangeTimersNumber
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
                  onChangeText={(text) => onChangeValue('medicInstructions', text)}
                  value={values.medicInstructions}
                  autoFocus={true}
                />
              </View>
              )}
            </AddMedDocForm.Step>

          </AddMedDocForm>
    );
}