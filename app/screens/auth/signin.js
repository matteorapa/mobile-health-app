import {Text, View, Button, TextInput, Image} from 'react-native';
import React from 'react';
import {AuthContext} from '../../auth';
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';



export default function SignInScreen({navigation}) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

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
            signIn();
          }}
        />
        <ThemeButton
          type={'secondary'}
          text={'CREATE AN ACCOUNT'}
          onPressEvent={() => {
            navigation.navigate('SignUp')
          }}
        />
        <ThemeButton
          type={'muted'}
          text={'Using for a patient?'}
          onPressEvent={() => {
            navigation.navigate('DoctorSignUp')
          }}
        />

      </View>
    </View>
  );
}
