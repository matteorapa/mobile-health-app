import {Text, View, Button, TextInput} from 'react-native';
import React from 'react';
import {AuthContext} from '../../auth';
import {styles} from '../../styles/globals';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SignUpScreen({navigation}) {

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [dob, onChangeDob] = React.useState('');
  const [sex, onChangeSex] = React.useState('Male');

  const {signUp} = React.useContext(AuthContext);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.heading}>Sign Up</Text>
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
          <Text> Verify Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Verify Password'}
            onChangeText={(text) => onChangePassword(text)}
            secureTextEntry={true}
            value={password}
          />
          <Text>Date of Birth</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'01/08/1978'}
            onChangeText={(text) => onChangePassword(text)}
            secureTextEntry={true}
            value={password}
          />

          <Button
            title="Sign Up"
            accessibilityLabel="Sign-in button for email and password relogin"
            onPress={() => {
              signUp();
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
