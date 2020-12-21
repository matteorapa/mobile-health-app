import {Text, View, Button} from 'react-native';
import React from 'react';

export default function SignUpScreen({navigation}) {
  return (
    <View>
      <Text>Doctor Sign up</Text>
      <Button
        title="Already have an account? Sign in instead"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
}
