import database from '@react-native-firebase/database'

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

// export const readDoctor = () => {
//     database().ref().once('value').then(snapshot => {
//             console.log('User data: ', snapshot.val());
//         });
// };

export const addMedication = (medicationName, medicationType, medicationDosage, medicationDosageMetric, medicationReason, medicationDaily, medicationDailyDosesNumber, medicationTimer, medicationStartDate, medicationEndDate, medicationInstructions) => {
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
            medicationTimer: medicationTimer,
            medicationStartDate: medicationStartDate,
            medicationEndDate: medicationEndDate,
            medicationInstructions: medicationInstructions,
        };
        database().ref('medication/' + key).update(dataToSave).then((snapshot)=>{
            resolve(snapshot)
        }).catch(err => {
            reject(err);
        });

    });
};

export const deleteMedication = (medicationName, deleteConfirm) => {

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