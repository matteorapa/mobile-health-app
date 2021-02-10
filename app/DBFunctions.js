import database from '@react-native-firebase/database'
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, ProgressBar, Colors } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


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

export const addHabit = (habitId, habitDesc, startDate, numPD, category, consPts, points, date) => {
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
            startDate: startDate,
            numPerD: numPD,
            category: category,
            consPts: consPts,
            points: points,
            date: date,
        };
        database().ref('habits/' + key).update(dataToSave).then((snapshot)=>{
            resolve(snapshot)
        }).catch(err => {
            reject(err);
        });

    });
};

export const getHabit = (props) => {
    const [habits, setHabits] = React.useState([]);
    const habitRef = database().ref('/habits');
    const navigation = useNavigation();

    const [boolean, setBool] = React.useState(false);
    const [counter, setCounter] = React.useState(1);
    const onLoadingListener = habitRef.on('value', snapshot =>{
        setHabits([]);
        snapshot.forEach(function(childSnapshot){
            setHabits(habits => [...habits, childSnapshot.val()]);
        });
    });

    const show = () => habits.map((element) => {
        habitRef.off('value', onLoadingListener);
        return(
            <Card key={element.habitId}>
            <Title>{element.habitId}</Title>
            <Paragraph>
              Description
              start date
              time
            </Paragraph>
            <Card.Actions>
              <Button onPress={() => {
                props.setPoints(props.points + 10);
                props.setCPts(props.consPts + 10);
                reward(props.consPts);
                setCounter(counter + 1);
  
                // number per day retrieved from db
                const testCounter = 2;
                const currentDate = new Date();
                
                //date retrieved from db
                const retrievedDate   = new Date("2021-02-07");
  
                const diff = (currentDate - retrievedDate) / (1000 * 60 * 60 * 24);
  
                // checks if the current date is smaller the the retrieved date 
                // checks if the user pressed the button more than he should be pressing it
                if(diff <= 1 || counter >= testCounter){
                    setBool(true);
                    setCounter(0);
                }
                if(diff > 1 && counter < testCounter){
                  setBool(false);
                }
                }}
                disabled={boolean}
                >Done</Button>
              <Button onPress={() => {
                if (props.points != 0){
                  props.setPoints(props.points - 5);
                }
                props.setCPts(0);
                setBool(false);
              }}>Fail</Button>
              <Button onPress={() => {
                
                console.log(getHabit());
            navigation.navigate('Tasks', {
              screen: 'EditHabit'
            });
          }}>Edit</Button>
            </Card.Actions>
          </Card>
        );
      });

      return show();
    
    // return () => {
    //     habitRef.off('value', onLoadingListener);
    // }

}

export const listHabits = (habits) =>{
    

}

export const deleteItem = (itemId, deleteConfirm) => {

        database().ref('items/' + itemId).remove().then(() => {
        }).catch((err) =>{
            console.log(err)
        });
    
}

export const editItem = (itemId, editConfirm) => {

        setItemId(itemId);
        setItemName(itemName);
    
}