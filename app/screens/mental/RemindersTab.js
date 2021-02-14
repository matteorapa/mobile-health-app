import {getReminder} from '../../DBFunctions';
import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {LAYOUT, TYPE} from '../../styles/theme';
import {FAB, Snackbar} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function ReminderRoute(props) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const onDismissSnackBar = () => setVisible(false);
  const route = useRoute();

  useEffect(() => {
    if (route.params !== undefined) {
      const {snackbar} = route.params;
      setSnackbarText(snackbar);
      setVisible(true);
    }
  },[route.params, setSnackbarText]);

  return (
    <View style={LAYOUT.main}>
      <ScrollView>
        <Text style={TYPE.h1}>Your Reminders</Text>

        {getReminder()}
        
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        color={'#FFF'}
        onPress={() =>
          navigation.navigate('Tasks', {
            screen: 'AddReminder',
          })
        }
        label="ADD REMINDER"
        accessibilityLabel="Add a new reminder to list."
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
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
