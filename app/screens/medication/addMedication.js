import { Text, TextInput, TextField, View , Button, TextInputComponent, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Group } from 'react-native';
import React, { Component, useState } from 'react';
import {styles} from '../../styles/globals';

import AddMedicationForm from './AddMedicationForm';

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

    const [timersToInclude, onChangeTimersToInclude] = useState([1]);

    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    }

    function timersIncluded(dailyDosesNumber){
      onChangeTimersToInclude(range(1, dailyDosesNumber));
    }

    return (
          <AddMedicationForm initialValues={{
            medicName: '',
            medicType: '',
            medicDosage: '',
            medicReason: '',
            medicDaily: '',
            medicDailyDosesNumber: '',
            medicTime1: '',
            medicTime2: '',
            medicStartDate: '',
            medicEndDate: '',
            medicInstructions: ''
          }}>

            <AddMedicationForm.Step>
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
            </AddMedicationForm.Step>

            <AddMedicationForm.Step>
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
            </AddMedicationForm.Step>
            
            <AddMedicationForm.Step>
              {({ onChangeValue, values }) => (
              <View>
                <Text>Medication Dosage</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Medication Dosage'}
                  onChangeText={(text) => onChangeValue('medicDosage', text)}
                  value={values.medicDosage}
                  keyboardType={'numeric'}
                  autoFocus={true}
          //add drop-down with metric
                />
              </View>
              )}
            </AddMedicationForm.Step>

            <AddMedicationForm.Step>
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
            </AddMedicationForm.Step>

            <AddMedicationForm.Step>
              {({ onChangeValue, values }) => (
              <View>
                <Text>Daily Medication?</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Daily Medication'}
                  onChangeText={(text) => onChangeValue('medicDaily', text)}
                  //yes, no, other drop-down
                  value={values.medicDaily}
                  autoFocus={true}
                />
              </View>
              )}
            </AddMedicationForm.Step>

            <AddMedicationForm.Step>
              {({ onChangeValue, values }) => (
              <View>
                <Text>Number of Doses to Take Each Day</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Number of Doses Each Day'}
                  onChangeText={ function(text) {{onChangeValue('medicDailyDosesNumber', text)}; {onChangeMedicationDailyDosesNumber(text)}; {timersIncluded(text)} }}
                  value={values.medicDailyDosesNumber}
                  keyboardType={'numeric'}
                  autoFocus={true}
                />
              </View>
              )}
            </AddMedicationForm.Step>
            
            {/* Repeat according to Number of Daily Medications */}
            {timersToInclude.map((timerNumber) => {
              // console.log(timersToInclude);
              return (
                <AddMedicationForm.Step>
                  {({ onChangeValue, values }) => (
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
                        onConfirm={ function(data){{onChangeMedicationTime1(data)}; {onChangeTimeVisible(false)}} }
                        onCancel={function(){onChangeTimeVisible(false)}}
                      />
                      <TextInput
                        style={styles.textInput}
                        placeholder={'Time - hh:mm'}
                        value={Moment(medicationTime1.toString()).format("HH:mm")}
                      />
                    </View>
                  )}
                </AddMedicationForm.Step>
              );
            })}

            <AddMedicationForm.Step>
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
            </AddMedicationForm.Step>

            <AddMedicationForm.Step>
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
            </AddMedicationForm.Step>

            <AddMedicationForm.Step>
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
            </AddMedicationForm.Step>

          </AddMedicationForm>
      
      
      
      
//       <SafeAreaView style={styles.container}>
//         <View style={styles.box}>
//           <Text style={styles.heading}>New Medication</Text>
//         <ScrollView style={styles.ScrollView}>

//           {/* <DropDownPicker
//               items={[
//                   {label: 'Yes', value: 'yes', hidden: true},
//                   {label: 'No', value: 'no'},
//               ]}
//               defaultValue={this.state.country}
//               containerStyle={{height: 40}}
//               style={{backgroundColor: '#fafafa'}}
//               itemStyle={{
//                   justifyContent: 'flex-start'
//               }}
//               dropDownStyle={{backgroundColor: '#fafafa'}}
//               onChangeItem={item => this.setState({
//                   country: item.value
//               })}
//           /> */}

//           <Text>Medication Name</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder={'Medication Name'}
//             onChangeText={(text) => onChangeMedicationName(text)}
//             //value={text}
//           />

//           <Text>Medication Type</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder={'Medication Type'}
//             onChangeText={(text) => onChangeMedicationType(text)}
//             //value={text}
//           />

//           <Text>Medication Dosage</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder={'Medication Dosage'}
//             onChangeText={(text) => onChangeMedicationDosage(text)}
//             //value={text}
//             keyboardType={'numeric'}
//           />

//           <Text>Medication Reason</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder={'Medication Reason'}
//             onChangeText={(text) => onChangeMedicationReason(text)}
//             //value={text}
//           />
          
//           <Text>Daily Medication?</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder={'Daily Medication'}
//             onChangeText={(text) => onChangeMedicationDaily(text)}
// //yes, no, other
//             //value={text}
//           />
          
//           <Text>Number of Doses to Take Each Day</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder={'Number of Doses Each Day'}
//             onChangeText={(text) => onChangeMedicationDailyDosesNumber(text)}
//             onConfirm={(text) => timersIncluded(text)}
//             //value={text}
//             keyboardType={'numeric'}
//           />

// {/* Repeat according to Number of Daily Medications */}
//             {timersToInclude.map((timerNumber) => {
//               return (
//                 // <Text>Something to Print {timerNumber}</Text>
//                 <View key={timerNumber}>
//                   <Text>Dose Number {timerNumber}</Text>
//                   <TouchableOpacity style={styles.button} onPress={function(){
//                     onChangeTimeVisible(true);
//                   } }>
//                     <Text>TimerIcon</Text>
//                   </TouchableOpacity>
//                   <DateTimePicker
//                     mode={'time'}
//                     is24Hour={true}
//                     isVisible={timeVisible}
//                     onConfirm={ function(data){{onChangeMedicationTime1(data)}; {onChangeTimeVisible(false)}} }
//                     onCancel={function(){onChangeTimeVisible(false)}}
//                   />
//                   <TextInput
//                     style={styles.textInput}
//                     placeholder={'Time - hh:mm'}
//                     value={Moment(medicationTime1.toString()).format("HH:mm")}
//                   />
//                 </View>
//               );
//             })}

//           {/* {timers(medicationDailyDosesNumber)} */}

//           <Text>Medication Starting Date</Text>
//           <TouchableOpacity style={styles.button} onPress={function(){
//             onChangeCalendarStart(true);
//           } }>
//             <Text>CalendarIcon</Text>
//           </TouchableOpacity>
//           <DateTimePicker
//             value={Date}
//             mode={'date'}
//             isVisible={calendarStartVisible}
//             onConfirm={ function(data){{onChangeMedicationStartDate(data)}; {onChangeCalendarStart(false)}} }
//             onCancel={function(){onChangeCalendarStart(false)}}
//           />
//           <TextInput
//             style={styles.textInput}
//             placeholder={'Start Date - dd/mm/yyyy'}
//             //value={medicationStartDate.toDateString()}
//             value={Moment(medicationStartDate.toString()).format("DD/MM/yyyy")}
//           />

//           <Text>Medication End Date</Text>
//           <TouchableOpacity style={styles.button} onPress={function(){
//             onChangeCalendarEnd(true);
//           } }>
//             <Text>CalendarIcon</Text>
//           </TouchableOpacity>
//           <DateTimePicker
//             value={Date}
//             mode={'date'}
//             isVisible={calendarEndVisible}
//             onConfirm={ function(data){{onChangeMedicationEndDate(data)}; {onChangeCalendarEnd(false)}} }
//             onCancel={function(){onChangeCalendarEnd(false)}}
//           />
//           <TextInput
//             style={styles.textInput}
//             placeholder={'End Date - dd/mm/yyyy'}
//             //value={medicationEndDate.toDateString()}
//             value={Moment(medicationEndDate.toString()).format("DD/MM/yyyy")}
//           />
          
//           <Text>Medication Instructions</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder={'Medication Instructions'}
//             onChangeText={(text) => onChangeMedicationInstructions(text)}
//             //value={text}
//           />

//           <Button
//             title="Add New Medication"
//             color="#000000"
//             accessibilityLabel="Add medication to list"
//             onPress={() => {
//               submitForm(medicationName, medicationType, medicationDosage, medicationReason,
//                           medicationDaily, medicationDailyDosesNumber, medicationTime1, medicationStartDate, medicationEndDate,
//                           medicationInstructions, () => {
//                 navigation.navigate('Medication', {
//                   screen: 'Index'
//                 });
//               });
//             }}
//           />
          

//         </ScrollView>
//         </View>
//       </SafeAreaView>

    );
  //}

}