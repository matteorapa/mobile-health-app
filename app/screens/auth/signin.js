import {Text, View, Button, TextInput, Image, Alert} from 'react-native';
import React, {Component} from 'react';
import {AuthContext} from '../../auth';
import {styles} from '../../styles/globals';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ThemeButton from '../../components/ThemeButton';
import {logIn} from './AuthFunctionality';
import database from '@react-native-firebase/database'

export default function SignInScreen({navigation}) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [userId, setUserId] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  const PromiseReader = (email, password) => {
    var testChecker = logIn(email, password);
    testChecker
      .then((result) => {
        setUserId(result);
        global.uid = result;
        signIn();
        database().ref('/UserRoles/' + global.uid).once('value').then((snapshot) => {
          var name = (snapshot.val().name);
          global.name = name
          var surname = (snapshot.val().surname);
          global.surname = surname
          var role = (snapshot.val().role);
          global.role = role
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Login Failed','Email or Password is invalid!', [{text: 'Try Again', onPress: () => console.log('alert closed')}]);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Image
        style={styles.tinyLogo}
        source={require('./mascot.png')}
      />
        <Text style={styles.heading}>Sign In</Text>
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

        <Button
          title="Sign in"
          
          accessibilityLabel="Sign-in button for email and password relogin"
          text={'Sign in'}
          onPressEvent={() => {
            if( email == '' || password == '' ){
              Alert.alert('Sign In Failed','Do not leave empty fields', [{text: 'Try Again', onPress: () => navigation.navigate('SignIn')}]);
            } else {
            PromiseReader(email, password);
            }
          }}
        />
        <ThemeButton
          type={'secondary'}
          text={'CREATE A PATIENT ACCOUNT'}
          onPressEvent={() => {
            navigation.navigate('SignUp');
          }}
        />
        <ThemeButton
          type={'muted'}
          text={'Create Doctor Account'}
          onPressEvent={() => {
            navigation.navigate('DoctorSignUp');
          }}
        />
      </View>
    </View>
  );
}
