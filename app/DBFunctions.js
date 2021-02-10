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

export const addHabit = (habitId, habitDesc, date, numPD, category) => {
    return new Promise(function(resolve,reject){
        let key;
        if (habitId != null) {
            key = habitId;
        } else {
            key=database().ref().push().key //reason for this part of code: if the key is not empty, i.e. already exist, this means that the record is being editted.
        }

        let dataToSave = {
            habitId:key,
            habitDesc: habitDesc,
            date: date,
            numPerD: numPD,
            category: category,
        };
        database().ref('habits/' + key).update(dataToSave).then((snapshot)=>{
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
    
}

export const editItem = (itemId, editConfirm) => {

        setItemId(itemId);
        setItemName(itemName);
    
}