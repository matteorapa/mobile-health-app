import {
  Text,
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {Snackbar, Button, FAB} from 'react-native-paper';
import ReminderRoute from './RemindersTab';
import {TabView, TabBar} from 'react-native-tab-view';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';
import {getHabit} from '../../DBFunctions';

const HabitRoute = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
  const onDismissSnackBar = () => setVisible(false);
  const route = useRoute();

  React.useEffect(() => {
    if (route.params !== undefined) {
      const {snackbar} = route.params;
      setSnackbarText(snackbar);
      setVisible(true);
    }
  },[route.params, setSnackbarText]);

  return (
    <View style={LAYOUT.main}>
      <Text style={TYPE.h1}>Your Habits</Text>

      <ScrollView>{getHabit()}</ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        color={'#FFF'}
        onPress={() =>
          navigation.navigate('Tasks', {
            screen: 'AddHabit',
          })
        }
        label="ADD HABIT"
        accessibilityLabel="Add a new habit to list."
        animated={true}
      />
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} action={{
          label: 'DISMISS',
          onPress: () => {
            onDismissSnackBar()
          },
        }}>
        {snackbarText}
      </Snackbar>
    </View>
  );
};

export default function MindScreen() {
  const [points, setPoints] = useState(0);
  const [consPts, setCPts] = useState(0);
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'habits', title: 'Habits', icon: 'plus'},
    {key: 'reminders', title: 'Reminders'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'habits':
        return (
          <HabitRoute
            points={points}
            setPoints={setPoints}
            consPts={consPts}
            setCPts={setCPts}
          />
        );
      case 'reminders':
        return (
          <ReminderRoute
            points={points}
            setPoints={setPoints}
            consPts={consPts}
            setCPts={setCPts}
          />
        );
      default:
        return (
          <HabitRoute
            points={points}
            setPoints={setPoints}
            consPts={consPts}
            setCPts={setCPts}
          />
        );
    }
  };

  //add step counter

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabbar}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  screen: {
    height: '100%',
  },
  tabbar: {
    backgroundColor: COLORS.primary,
  },
  indicator: {
    backgroundColor: COLORS.secondary,
  },
});
