import {Text, View, Button, Image} from 'react-native';
import React from 'react';
import {Switch, Avatar, Divider} from 'react-native-paper';
import {AuthContext} from '../auth';
import ThemeButton from '../components/ThemeButton';
import PaddedDivider from '../components/PaddedDivider';
import {COLORS, LAYOUT, TYPE} from '../styles/theme';
import acc from './profile.jpg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logOut } from './auth/AuthFunctionality'

export default function AccountScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  let accountImg = false;

  return (
    <View style={LAYOUT.main}>
      <View style={LAYOUT.container}>
        <Avatar.Image size={82} source={acc} />
        <View style={LAYOUT.inner}>
          <Text style={TYPE.h4}>Jane Doe</Text>
          <Text style={TYPE.subtitle2}>Patient</Text>
        </View>
      </View>

      <ThemeButton
        type={'muted'}
        text={'Edit'}
        icon={'edit'}
        onPress={() => {
          signOut();
        }}
      />

      <ThemeButton
        type={'secondary'}
        text={'Sign out'}
        onPress={() => {
          logOut();
          navigation.navigate('SignIn')
        }}
      />

      <PaddedDivider />

      <Text style={TYPE.subtitle2}>Reminder Settings</Text>
      <Text style={TYPE.caption}>Manage your reminder settings for the specific notifications you wish to recieve.</Text>
      <View style={LAYOUT.flexed}>
        <Text style={TYPE.body1}>Water Reminder</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      <View style={LAYOUT.flexed}>
        <Text style={TYPE.body1}>Running/Walking Reminders</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      <View style={LAYOUT.flexed}>
        <Text style={TYPE.body1}>Water Reminder</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>

      <PaddedDivider />

      <Text style={TYPE.subtitle2}>Guardian Settings</Text>
      <Text style={TYPE.caption}>Connect your reminder with a guardian to oversee your activity and missed reminders.</Text>
      
    </View>
  );
}
