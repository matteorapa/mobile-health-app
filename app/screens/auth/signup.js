import {Text, View, Button, TextInput, Alert} from 'react-native';
import React from 'react';
import {AuthContext} from '../../auth';
import {styles} from '../../styles/globals';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createUser } from './AuthFunctionality'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth';


export default function SignUpScreen({navigation}) {

  const [name, onChangeName] = React.useState('');
  const [Surname, onChangeSurname] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [VerifyPassword, onChangeVerifyPassword] = React.useState('');

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.heading}>Sign Up</Text>
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
          <Button
            title="Sign Up"
            accessibilityLabel="Sign-up button with email and password as values"
            onPress={() => {
              if (VerifyPassword != password){
                console.log('Passwords do not match');
              } else {
                auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(data => {
                      addUser(data.user.uid,'Patient', name, Surname)
                      navigation.navigate('SignIn');
                  })
                  .catch(error => {
                      if (error.code === 'auth/email-already-in-use') {
                      Alert.alert('Sign up Failed','Email already in use', [{text: 'Try Again', onPress: () => console.log('alert closed')}]);
                      navigation.navigate('SignIn');
                      }

                      if (error.code === 'auth/invalid-email') {
                      Alert.alert('Sign up Failed','Invalid Email format', [{text: 'Try Again', onPress: () => console.log('alert closed')}]);
                      console.log('That email address is invalid!');
                      }

                      console.error(error);
                  });
              }
            }}
          />
          <Text
              style={styles.link}
              onPress={() => navigation.navigate('DoctorSignUp')}>
              Sign up as a doctor?
            </Text>

          <View style={styles.signup}>
            
          <Button
            title="Sign In Instead?"
            color="#000000"
            accessibilityLabel="Sign-in button for email and password relogin"
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          />

            

           
          </View>
        </View>
      </View>
    </View>
  );
}

export const addUser = (userId, role, Name, Surname) => {
  return new Promise(function(resolve,reject){
      let key;
      if (userId != null) {
         key = userId;
      } else {
        key = database().ref().push().key
      }

      let dataToSave = {
          userId: key,
          role: role,
          name: Name,
          surname: Surname
      };
      database().ref('UserRoles/' + key).update(dataToSave).then((snapshot)=>{
          resolve(snapshot)
      }).catch(err => {
          reject(err);
      });

  });
};