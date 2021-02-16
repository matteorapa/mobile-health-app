import {Text, View, Image, Button} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {FAB, Snackbar} from 'react-native-paper';
import fitness from '../assets/images/fitness.png';
import doctor from '../assets/images/doctor.png'
import achieve from '../assets/images/achieve.png';
import reminder from '../assets/images/reminders.png'

import { COLORS, LAYOUT } from '../styles/theme';
import { styles } from '../styles/globals';

export default function OnboardingScreen(props) {
  return (
    <View style={LAYOUT.mainOnboarding}> 
      <Onboarding
        pages={[
          {
            backgroundColor: COLORS.primaryLight,
            image: <Image source={fitness} style={styles.LargeLogo} accessibilityLabel="Image of a people performing different physical exercises."/>,
            title: 'Reminders for you daily routine',
            subtitle: 'We will remind you about habits you want to start, to never miss a run.',
          },
          {
            backgroundColor: COLORS.secondaryDark,
            image: <Image source={doctor} style={styles.LargeLogo} accessibilityLabel="Image of a person at the doctor's office."/>,
            title: 'Keep track of your medicine',
            subtitle: 'Manage your medicine, and add/remove during your next doctor visit.',
          },
          {
            backgroundColor: COLORS.primaryLight,
            image: <Image source={reminder} style={styles.LargeLogo} accessibilityLabel="Image of a bathroom cabinet filled with medicine."/>,
            title: 'Reminders for your medication',
            subtitle: 'Get notifications to remind you about the medication you need to take.',
          },
          {
            backgroundColor: COLORS.primaryDark,
            image: <Image source={achieve} style={styles.LargeLogo} accessibilityLabel="Image showing an achievement trophy."/>,
            title: 'Earn achievements for keeping the routine',
            subtitle: 'When you complete a habit, your earn points which unlock achievements.',
          },
        ]}
        onDone={() => {
            props.update(false)
        }} 
        onSkip={() => {
                props.update(false)
        }
        }
      />
    </View>
  );
}
