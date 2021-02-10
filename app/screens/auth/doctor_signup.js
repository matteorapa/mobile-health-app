import {Text, View, Button, TextInput} from 'react-native';
import React from 'react';
import {styles} from '../../styles/globals';
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth';


export default function SignUpScreen({navigation}) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [VerifyPassword, onChangeVerifyPassword] = React.useState('');

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.heading}>Doctor Sign Up</Text>
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
                      addDoctor(data.user.uid,'Doctor')
                  })
                  .catch(error => {
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

            <Text
              style={styles.link}
              onPress={() => navigation.navigate('SignUp')}>
              Sign up as a Patient?
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

export const addDoctor = (doctorId, role) => {
  return new Promise(function(resolve,reject){
      let key;
      if (doctorId != null) {
         key = doctorId;
      } else {
        key = database().ref().push().key
      }

      let dataToSave = {
          doctorId: key,
          role: role,
      };
      database().ref('UserRoles/' + key).update(dataToSave).then((snapshot)=>{
          resolve(snapshot)
      }).catch(err => {
          reject(err);
      });

  });
};