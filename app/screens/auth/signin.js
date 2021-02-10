import {Text, View, Button, TextInput, Image} from 'react-native';
import React from 'react';
import {AuthContext} from '../../auth';
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import {logIn} from './AuthFunctionality';
import {AsyncStorage} from '@react-native-community/async-storage';

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
        console.log(global.uid);
        signIn();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(userId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.tinyLogo} source={require('./mascot.png')} />
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

        <ThemeButton
          accessibilityLabel="Sign-in button for email and password relogin"
          text={'Sign in'}
          onPressEvent={() => {
            PromiseReader(email, password);
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
