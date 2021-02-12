import database from '@react-native-firebase/database';
import {FAB, List} from 'react-native-paper';
import {Text, Image, View, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const addItem = (itemId, itemName) => {
    return new Promise(function(resolve,reject){
        let key;
        if (itemId != null) {
            key = itemId;
        } else {
            key=database().ref().push().key //reason for this part of code: if the key is not empty, i.e. already exist, this means that the record is being editted.
        }

        let dataToSave = {
            itemId:key,
            itemName: itemName,
        };
        database().ref('items/' + key).update(dataToSave).then((snapshot)=>{
            resolve(snapshot)
        }).catch(err => {
            reject(err);
        });

    });
};

export const deleteItem = (itemId, deleteConfirm) => {

        database().ref('items/' + itemId).remove().then(() => {
        }).catch((erro) =>{
            console.log(err)
        });
    
};

export const editItem = (itemId, editConfirm) => {

        setItemId(itemId);
        setItemName(itemName);
    
};


export const addDoctor = (doctorName, doctorSpeciality, doctorPhonePrefix, doctorPhone, doctorEmail) => {
    return new Promise(function(resolve,reject){
        let key;
        if (doctorPhone != null) {
            key = doctorPhone;
        } else {
            key=database().ref().push().key //reason for this part of code: if the key is not empty, i.e. already exist, this means that the record is being editted.
        }

        let dataToSave = {
            doctorPhone:key,
            doctorName: doctorName,
            doctorSpeciality: doctorSpeciality,
            doctorPhonePrefix: doctorPhonePrefix,
            doctorPhone: doctorPhone,
            doctorEmail: doctorEmail,
        };
        database().ref('doctors/' + key).update(dataToSave).then((snapshot)=>{
            resolve(snapshot)
        }).catch(err => {
            reject(err);
        });

    });
};

export const deleteDoctor = (doctorPhone, deleteConfirm) => {

        database().ref('doctors/' + doctorPhone).remove().then(() => {
            console.log('Deleting doctor', doctorPhone)
        }).catch((erro) =>{
            console.log(err)
        });
    
};

export const editDoctor = (doctorPhone, editConfirm) => {

        setDoctorId(doctorPhone);
        setDoctorName(doctorName);
        setDoctorSpeciality(doctorSpeciality);
        setDoctorPhonePrefix(doctorPhonePrefix);
        setDoctorPhone(doctorPhone);
        setDoctorEmail(doctorEmail);
    
};

export const ReadDoctor = ({navigation}) => {
    const [doctors, setDoctors] = useState([]);
    const specialitiesOfDoctors = ['Allergy and Immunology', 'Anesthesiology', 'Dermatology', 'Diagnostic Radiology', 'Emergency Medicine', 'Family Medicine',
                                  'Internal Medicine', 'Medical Genetics', 'Neurology', 'Nuclear Medicine', 'Obstetrics and Gynecology', 'Ophthalmology', 'Pathology',
                                  'Pediatrics', 'Physical Medicine and Rehabilitation', 'Preventive Medicine', 'Psychiatry', 'Radiation Oncology', 'Surgery', 'Urology'];

    React.useEffect(() => {
        const doctorsRef = database().ref('/doctors');

        const onLoadingListener = doctorsRef.on('value', snapshot => {
            setDoctors([]);
            snapshot.forEach(function(childSnapshot){
                setDoctors(doctors => [...doctors, childSnapshot.val()]);
            });
        });

        return () => {
            doctorsRef.off('value', onLoadingListener);
        }
    
    }, []);

    const listDoctors = doctors.map((element) => 
        <View key={element.doctorPhone}>
            <List.Item
                title={element.doctorName}
                description={specialitiesOfDoctors[element.doctorSpeciality]}
                left={() => <Icon name="face" size={30} />}
                onPress={() => {
                    navigation.navigate('Medication', {
                        screen: 'ViewDoctor',
                        params: {doctor: element}
                    })
                }}
            />
        </View>
    );

    return (
        <List.Section>
            <List.Subheader>Your Doctors</List.Subheader>
                {/* <Text>{doctors.length}</Text> */}
                {listDoctors}
                {/* <Text>{listDoctors.length}</Text> */}
        </List.Section>
    );
    
};


export const addMedication = (medicationName, medicationType, medicationDosage, medicationDosageMetric, medicationReason, medicationDaily, medicationDailyDosesNumber, medicationTimerArray, medicationStartDate, medicationEndDate, medicationInstructions) => {
    return new Promise(function(resolve,reject){
        let key;
        if (medicationName != null) {
            key = medicationName;
        } else {
            key=database().ref().push().key //reason for this part of code: if the key is not empty, i.e. already exist, this means that the record is being editted.
        }

        let dataToSave = {
            medicationName:key,
            medicationName: medicationName,
            medicationType: medicationType,
            medicationDosage: medicationDosage,
            medicationDosageMetric: medicationDosageMetric,
            medicationReason: medicationReason,
            medicationDaily: medicationDaily,
            medicationDailyDosesNumber: medicationDailyDosesNumber,
            medicationTimerArray: medicationTimerArray,
            medicationStartDate: medicationStartDate,
            medicationEndDate: medicationEndDate,
            medicationInstructions: medicationInstructions,
        };
        
        database().ref('medication/' + key).update(dataToSave).then((snapshot)=>{
            resolve(snapshot)
        }).catch(err => {
            reject(err);
        });

        { if(medicationDaily == 0) {
            let dataToSaveNotifRemind = {
                medicationName:key,
                medicationName: medicationName,
                medicationStartDate: medicationStartDate,
                medicationEndDate: medicationEndDate,
                medicationTimerArray: medicationTimerArray,
            };
            
            database().ref('notificationReminders/' + key).update(dataToSaveNotifRemind).then((snapshot)=>{
                resolve(snapshot)
            }).catch(err => {
                reject(err);
            });
        }}
    });
};

export const deleteMedication = (medicationName, navigation, deleteConfirm) => {

        database().ref('medication/' + medicationName).remove().then(() => {
        }).catch((erro) =>{
            console.log(err)
        });
    
};

export const editMedication = (medicationName, editConfirm) => {

        setMedicationId(medicationName);
        setMedicationName(medicationName);
        setMedicationType(medicationType);
        setMedicationDosage(medicationDosage);
        setMedicationDosageMetric(medicationDosageMetric);
        setMedicationReason(medicationReason);
        setMedicationDaily(medicationDaily);
        setMedicationDailyDosesNumber(medicationDailyDosesNumber);
        setMedicationTimer(medicationTimer);
        setMedicationStartDate(medicationStartDate);
        setMedicationEndDate(medicationEndDate);
        setMedicationInstructions(medicationInstructions);
    
};

export const ReadMedication = ({navigation}) => {
    const [medications, setMedications] = useState([]);
    const metricsOfDosage = ['ml', 'mg', 'g', 'Pills'];

    React.useEffect(() => {
        const medicationsRef = database().ref('/medication');

        const onLoadingListener = medicationsRef.on('value', snapshot => {
            setMedications([]);
            snapshot.forEach(function(childSnapshot){
                setMedications(medications => [...medications, childSnapshot.val()]);
            });
        });

        return () => {
            medicationsRef.off('value', onLoadingListener);
        }
        
    }, [])

    const listMedication = medications.map((element) =>
        <View key={element.medicationName}>
            <List.Item
                title={element.medicationName}
                description={element.medicationDosage + " " + metricsOfDosage[element.medicationDosageMetric]}
                left={() => <Image source={require('./screens/medication/drugs.png')} style={{width: 25, height: 25}} />}
                onPress={() => {
                    navigation.navigate('Medication', {
                        screen: 'ViewMedication',
                        params: {medication: element}
                    })
                }}
            />
        </View>
    );

    return (
        <List.Section>
            <List.Subheader>Your Medications</List.Subheader>
                {/* <Text>{medications.length}</Text> */}
                {listMedication}
                {/* <Text>{listMedication.length}</Text> */}
        </List.Section>
    );



};
