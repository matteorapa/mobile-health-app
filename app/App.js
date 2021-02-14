import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from './auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from './styles/theme';
import RemindersScreen from './screens/index';
import MindScreen from './screens/mental/index';
import MedicationScreen from './screens/medication/index';
import AccountScreen from './screens/account';
import editAccount from './screens/editAccount';
import AddMedicationScreen from './screens/medication/addMedication';
import AddDoctorScreen from './screens/medication/addDoctor';
import SignInScreen from './screens/auth/signin';
import SignUpScreen from './screens/auth/signup';
import DoctorSignUpScreen from './screens/auth/doctor_signup';
import AddHabitScreen from './screens/mental/addHabit';
import EditHabitScreen from './screens/mental/editHabit';
import AddReminderScreen from './screens/mental/addReminder';
import EditReminderScreen from './screens/mental/editReminder';
import DetailsScreen from './screens/mental/habitDetails';
import {initiateChannels} from './notifications';
import {addItem} from './DBFunctions';
import {DefaultTheme, Provider} from 'react-native-paper';
import ViewMedication from './screens/medication/viewMedication';
import ViewDoctor from './screens/medication/viewDoctor';

function MedicationStack() {
  const MedicationStack = createStackNavigator();
  const options = {
    headerShown: false,
  };

  const optionsAddMedication = {
    headerShown: true,
    title: 'Add your medication',
  };

  const optionsAddDoctor = {
    headerShown: true,
    title: 'Add your doctor',
  };


  return (
    <MedicationStack.Navigator>
      <MedicationStack.Screen
        name="Index"
        component={MedicationScreen}
        options={options}
      />
      <MedicationStack.Screen
        name="AddMedication"
        component={AddMedicationScreen}
        options={optionsAddMedication}
      />
      <MedicationStack.Screen
        name="AddDoctor"
        component={AddDoctorScreen}
        options={optionsAddDoctor}
      />
      
      <MedicationStack.Screen
        name="ViewMedication"
        component={ViewMedication}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
      <MedicationStack.Screen
        name="ViewDoctor"
        component={ViewDoctor}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
    </MedicationStack.Navigator>
  );
}

function MentalStack() {
  const MentalStack = createStackNavigator();

  const options = {
    headerShown: false,
  };

  const optionsEmbedded = {
    headerShown: true,
    title: 'Add your habit',
  };

  const optionsEditHabit = {
    headerShown: true,
    title: 'Edit your habit',
  };

  const optionsAddReminder = {
    headerShown: true,
    title: 'Add your reminder',
  };

  const optionsEditReminder = {
    headerShown: true,
    title: 'Edit your reminder',
  };

  return (
    <MentalStack.Navigator>
      <MentalStack.Screen
        name="Index"
        component={MindScreen}
        options={options}
      />

      <MentalStack.Screen
        name="AddHabit"
        component={AddHabitScreen}
        options={optionsEmbedded}
      />

      <MentalStack.Screen
        name="EditHabit"
        component={EditHabitScreen}
        options={optionsEditHabit}
      />

      <MentalStack.Screen
        name="AddReminder"
        component={AddReminderScreen}
        options={optionsAddReminder}
      />

      <MentalStack.Screen
        name="Details"
        component={DetailsScreen}
        options={({route}) => ({
          title: route.params.name,
        })}
      />

      <MentalStack.Screen
        name="EditReminder"
        component={EditReminderScreen}
        options={optionsEditReminder}
      />
    </MentalStack.Navigator>
  );
}

function AccountStack() {
  const AccountStack = createStackNavigator();
  const options = {
    headerShown: false,
  };
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="Account Screen"
        component={AccountScreen}
        options={options}
      />
      <AccountStack.Screen
        name="editAccount"
        component={editAccount}
        options={options}
      />
    </AccountStack.Navigator>
  );
}

function AppTabStack() {
  const AppTabStack = createBottomTabNavigator();
  return (
    <AppTabStack.Navigator initialRouteName="Reminders">
      {/* Tab for calendar with upcoming reminders */}
      <AppTabStack.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{
          tabBarLabel: 'Reminders',
          tabBarIcon: ({color, size}) => (
            <Icon name="today" color={color} size={size} />
          ),
        }}
      />

      {/* Tab for mental health reminder */}
      <AppTabStack.Screen
        name="Tasks"
        component={MentalStack}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, size}) => (
            <Icon name="leaderboard" color={color} size={size} />
          ),
        }}
      />

      {/* Tab for list of medications, and doctors */}
      <AppTabStack.Screen
        name="Medication"
        component={MedicationStack}
        options={{
          tabBarLabel: 'Medication',
          tabBarIcon: ({color, size}) => (
            <Icon name="healing" color={color} size={size} />
          ),
        }}
      />

      {/* Tab for user account and preferences */}
      <AppTabStack.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="face" color={color} size={size} />
          ),
        }}
      />
    </AppTabStack.Navigator>
  );
}

function AuthStack() {
  const AuthStack = createStackNavigator();
  const options = {
    headerShown: false,
  };

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={options}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={options}
      />
      <AuthStack.Screen
        name="DoctorSignUp"
        component={DoctorSignUpScreen}
        options={options}
      />
    </AuthStack.Navigator>
  );
}

export default function App() {
  const [accessToken, setAccessToken] = React.useState(false);
  const [refreshToken, setRefreshToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setAccessToken(true);
        setRefreshToken('gert');
      },
      signUp: () => {
        setIsLoading(false);
        setAccessToken('gert');
        setRefreshToken('gert');
      },
      signOut: () => {
        setIsLoading(false);
        setAccessToken(false);
        setRefreshToken(null);
      },
    };
  }, []);

  const MyTheme = {
    dark: false,
    colors: {
      primary: COLORS.primary,
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  initiateChannels();

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.primary,
      accent: COLORS.secondaryDark,
    },
  };

  return (
    <Provider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={MyTheme}>
          {accessToken ? <AppTabStack /> : <AuthStack />}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
