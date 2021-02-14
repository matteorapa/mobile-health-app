import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {LAYOUT} from '../../styles/theme';
import {ReadDoctor, ReadMedication} from '../../DBFunctions';
import {FAB, List} from 'react-native-paper';

export default function MedicationScreen({navigation}) {

  const [state, setState] = React.useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [expandedDoctor, setExpandedDoctor] = React.useState(true);
  const handlePressDoctor = () => setExpandedDoctor(!expandedDoctor);
  const {open} = state;

  return (
    <View style={LAYOUT.main}>
      <ScrollView>
        <List.Accordion
          title="Your Medications"
          expanded={expanded}
          onPress={handlePress}
          left={(props) => <List.Icon {...props} icon="pill" />}>
          <ReadMedication navigation={navigation} />
        </List.Accordion>

        <List.Accordion
          title="Your Doctors"
          left={(props) => <List.Icon {...props} icon="clipboard-account" />}
          expanded={expandedDoctor}
          onPress={handlePressDoctor}>
          <ReadDoctor navigation={navigation} />
        </List.Accordion>
      </ScrollView>

      <FAB.Group
        open={open}
        icon={'plus'}
        actions={[
          {
            icon: 'clipboard-account',
            label: 'Add Doctor',
            accessibilityLabel: 'Add doctor to list',
            onPress: () => {
              navigation.navigate('Medication', {
                screen: 'AddDoctor',
                params: {loadedDoctor: ''},
              });
            },
          },
          {
            icon: 'pill',
            label: 'Add Medication',
            accessibilityLabel: 'Add medication to list',
            onPress: () => {
              navigation.navigate('Medication', {
                screen: 'AddMedication',
                params: {loadedMedication: ''},
              });
            },
            small: false,
          },
        ]}
        onStateChange={onStateChange}
      />
    </View>
  );
}
