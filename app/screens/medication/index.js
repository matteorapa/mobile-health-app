import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import ThemeButton from '../../components/ThemeButton';
import {LAYOUT} from '../../styles/theme';
import {ReadDoctor, ReadMedication} from '../../DBFunctions';
import {FAB, List} from 'react-native-paper';

export default function MedicationScreen({navigation}) {

  const [myDoctors, setMyDoctors] = useState([]);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  const [expandedDoctor, setExpandedDoctor] = React.useState(true);
  const handlePressDoctor = () => setExpandedDoctor(!expandedDoctor);

  return (
    <View style={LAYOUT.main}>
      
      
    <ScrollView>
      <List.Accordion
        title="Your Medications"
        expanded={expanded}
        onPress={handlePress}
        left={props => <List.Icon {...props} icon="pill" />}>
        <ReadMedication navigation={navigation} />
      </List.Accordion>

      <List.Accordion
        title="Your Doctors"
        left={props => <List.Icon {...props} icon="clipboard-account" />}
        expanded={expandedDoctor}
        onPress={handlePressDoctor}>
        <ReadDoctor navigation={navigation} />
      </List.Accordion>

    </ScrollView>

      {/* <ScrollView style={{height: '60%'}}>
        
      </ScrollView>

      <ScrollView style={{height: '40%'}}>
        <ReadDoctor navigation={navigation} />
      </ScrollView> */}


      <FAB.Group
          open={open}
          icon={open ? 'plus' : 'plus'}
          actions={[
           
            {
              icon: 'clipboard-account',
              label: 'Add Doctor',
              accessibilityLabel: "Add doctor to list",
              onPress: () => {
                navigation.navigate('Medication', {
                  screen: 'AddDoctor',
                  params: {loadedDoctor: ''},
                  })
              }
            },
            {
              icon: 'pill',
              label: 'Add Medication',
              accessibilityLabel: "Add medication to list",
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
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
    </View>
  );
}
