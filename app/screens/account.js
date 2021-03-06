import {Text, View, Button, Image, Modal} from 'react-native';
import React from 'react';
import {Switch, Avatar, Divider} from 'react-native-paper';
import {AuthContext} from '../auth';
import ThemeButton from '../components/ThemeButton';
import PaddedDivider from '../components/PaddedDivider';
import {LAYOUT, TYPE} from '../styles/theme';
import acc from '../assets/images/profile.jpg';
import RNRestart from 'react-native-restart';
import {styles} from '../styles/globals';

export default function AccountScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
  const [isSwitchOn2, setIsSwitchOn2] = React.useState(false);
  const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);
  let accountImg = false;
  return (
    <View style={LAYOUT.main}>
      <View style={LAYOUT.container}>
        <Avatar.Image size={82} source={acc} />
        <View style={LAYOUT.inner}>
          <Text style={TYPE.h4}>
            {global.name} {global.surname}
          </Text>
          <Text style={TYPE.subtitle2}>{global.role}</Text>
        </View>
      </View>

      <ThemeButton
        type={'muted'}
        text={'Edit'}
        icon={'edit'}
        onPressEvent={() => {
          navigation.navigate('editAccount');
        }}
      />

      <PaddedDivider />

      <Text style={TYPE.subtitle2}>Reminder Settings</Text>
      <Text style={TYPE.caption}>
        Manage your reminder settings for the specific notifications you wish to
        recieve.
      </Text>
      <PaddedDivider />
      
      <View style={LAYOUT.flexed}>
        <Text style={TYPE.body1}>Water Reminders</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      <View style={LAYOUT.flexed}>
        <Text style={TYPE.body1}>Running/Walking Reminders</Text>
        <Switch value={isSwitchOn1} onValueChange={onToggleSwitch1} />
      </View>
      <View style={LAYOUT.flexed}>
        <Text style={TYPE.body1}>Sleep Reminders</Text>
        <Switch value={isSwitchOn2} onValueChange={onToggleSwitch2} />
      </View>

      <PaddedDivider />

      <View style={styles.signup}>
        <ThemeButton
          type={'secondary'}
          text={'Sign out'}
          onPressEvent={() => {
            RNRestart.Restart();
          }}
        />
      </View>
    </View>
  );
}
