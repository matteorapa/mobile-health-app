import {Text, View, Button} from 'react-native';
import React from 'react';
import { AuthContext } from '../auth'

export default function AccountScreen({navigation}) {

  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
      <Text>Account Screen</Text>
      <Button title="Sign out" onPress={()=>{
        signOut()
      }
       
      } />
    </View>
  );
}
