import {Text, View, Button, TextInput} from 'react-native';
import React from 'react';
import {styles} from '../../styles/globals';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ThemeButton from '../../components/ThemeButton';


export default function SignUpScreen({navigation}) {
  const [Name, onChangeName] = React.useState('');
  const [Surname, onChangeSurname] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [VerifyPassword, onChangeVerifyPassword] = React.useState('');

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.heading}>Doctor Sign Up</Text>
          <Text style={styles.heading}>Sign Up</Text>
          <Text>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'First Name'}
            onChangeText={(text) => onChangeName(text)}
            value={Name}
          />
          <Text>Surname</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Your Last Name'}
            onChangeText={(text) => onChangeSurname(text)}
            value={Surname}
          />
          <Text>Email Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Email address'}
            onChangeText={(text) => onChangeEmail(text)}
            value={email}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Password'}
            onChangeText={(text) => onChangePassword(text)}
            secureTextEntry={true}
            value={password}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Verify Password'}
            onChangeText={(text) => onChangeVerifyPassword(text)}
            secureTextEntry={true}
            value={VerifyPassword}
          />
          <ThemeButton
            text="SIGN UP"
            accessibilityLabel="Sign-up button with email and password as values"
            onPressEvent={() => {
              if (VerifyPassword !== password) {
                console.log('Passwords do not match');
              } else {
                auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then((data) => {
                    addDoctor(data.user.uid, 'Doctor', Name, Surname);
                  })
                  .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                      console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                      console.log('That email address is invalid!');
                    }

                    console.error(error);
                  });
                navigation.navigate('SignIn');
              }
            }}
          />
          <ThemeButton
              type="secondary"
              text="CREATE PATIENT ACCOUNT"
              onPressEvent={() => navigation.navigate('SignUp')}
            />
          
            
            <ThemeButton
              type="muted"
              text="or Sign In instead?"
              onPressEvent={() => {
                navigation.navigate('SignIn');
              }}
            />
          
        </View>
      </View>
    </View>
  );
}

export const addDoctor = (doctorId, role, Name, Surname) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (doctorId != null) {
      key = doctorId;
    } else {
      key = database().ref().push().key;
    }

    let dataToSave = {
      doctorId: key,
      role: role,
      name: Name,
      surname: Surname,
    };
    database()
      .ref('UserRoles/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
