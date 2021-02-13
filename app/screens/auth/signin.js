import {Text, View, Button, TextInput, Image} from 'react-native';
import React from 'react';
import {AuthContext} from '../../auth';
import {styles} from '../../styles/globals';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function SignInScreen({navigation}) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

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
          onPress={() => {
            signIn();
          }}
        />

        <View style={styles.signup}>
          <Button
            color="#000000"
            title="Sign Up"
            accessibilityLabel="Sign-up button"
            onPress={() => navigation.navigate('SignUp')}
          />

          <Text
            style={styles.link}
            onPress={() => navigation.navigate('DoctorSignUp')}>
            Using for a patient?
          </Text>
        </View>
      </View>
    </View>
  );
}
