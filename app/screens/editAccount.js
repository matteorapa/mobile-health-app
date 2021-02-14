import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {styles} from '../styles/globals';
import {addUser} from './auth/signup';
import ThemeButton from '../components/ThemeButton';

export default function editAccount({navigation}) {
  const [name, onChangeName] = React.useState('');
  const [surname, onChangeSurname] = React.useState('');

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.heading}>Edit Name and Surname</Text>
          <Text style={styles.subheading}>
            Relogging required to view changes!
          </Text>
        
          <Text>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'First Name'}
            onChangeText={(text) => onChangeName(text)}
            value={name}
          />
          <Text>Surname</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Your Last Name'}
            onChangeText={(text) => onChangeSurname(text)}
            value={surname}
          />
        </View>

        <View style={styles.signup}>
          <ThemeButton
            type={'primary'}
            text={'Submit changes'}
            onPressEvent={() => {
              addUser(global.uid, global.role, name, surname);
              global.name = name;
              global.surname = surname;
              navigation.navigate('Account Screen');
            }}
          />
        </View>
      </View>
    </View>
  );
}
