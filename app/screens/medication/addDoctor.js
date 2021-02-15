import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {styles} from '../../styles/globals';
import AddMedDocForm from './AddMedDocForm';
import {Countries} from './Countries';
import {TextInputMask} from 'react-native-masked-text';
import {countryFlags} from './countryFlags';
import {addDoctor} from '../../DBFunctions';
import ThemeButton from '../../components/ThemeButton';
import { LAYOUT, COLORS } from '../../styles/theme';
import PaddedDivider from '../../components/PaddedDivider';
import {DataTable} from 'react-native-paper';

function submitForm(
  docName,
  docSpeciality,
  docPhonePrefix,
  docPhone,
  docEmail,
  cb,
) {
  //check auth of form

  //submit to firebase table
  // console.log(
  //   'submit',
  //   docName,
  //   docSpeciality,
  //   docPhonePrefix,
  //   docPhone,
  //   docEmail,
  // );

  addDoctor(docName, docSpeciality, docPhonePrefix, docPhone, docEmail);

  //cb();
}

export default function AddDoctorScreen({route, navigation}) {
  console.log('Route ', route.params);
  const {loadedDoctor} = route.params;
  const specialitiesOfDoctors = [
    'Allergy and Immunology',
    'Anesthesiology',
    'Dermatology',
    'Diagnostic Radiology',
    'Emergency Medicine',
    'Family Medicine',
    'Internal Medicine',
    'Medical Genetics',
    'Neurology',
    'Nuclear Medicine',
    'Obstetrics and Gynecology',
    'Ophthalmology',
    'Pathology',
    'Pediatrics',
    'Physical Medicine and Rehabilitation',
    'Preventive Medicine',
    'Psychiatry',
    'Radiation Oncology',
    'Surgery',
    'Urology',
  ];

  const [doctorName, onChangeDoctorName] = useState(
    loadedDoctor === '' ? '' : loadedDoctor.doctorName,
  );
  const [doctorSpeciality, onChangeDoctorSpeciality] = useState(
    loadedDoctor === ''
      ? specialitiesOfDoctors[0]
      : loadedDoctor.doctorSpeciality,
  );
  const [doctorPhonePrefix, onChangeDoctorPhonePrefix] = useState(
    loadedDoctor === '' ? '+356' : loadedDoctor.doctorPhonePrefix,
  );
  const [doctorPhone, onChangeDoctorPhone] = useState(
    loadedDoctor === '' ? '' : loadedDoctor.doctorPhone,
  );
  const [doctorEmail, onChangeDoctorEmail] = useState(
    loadedDoctor === '' ? '' : loadedDoctor.doctorEmail,
  );

  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [countryCode, setCountryCode] = useState(doctorPhonePrefix);
  const [countryPlaceholder, setCountryPlaceholder] = useState('9999 9999');
  const [countryFlagCode, setCountryFlagCode] = useState(require('./images/mt.png'));

  const onShowHideCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible);
    filterCountries();
  };

  const filterCountries = (value) => {
    if (value) {
      const countryData = dataCountries.filter(
        (obj) => obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1,
      );
      setDataCountries(countryData);
    } else {
      setDataCountries(Countries);
    }
  };

  const onCountryChange = (item) => {
    setCountryCode(item.dialCode);
    setCountryPlaceholder(item.mask);
    onShowHideCountryPicker();
    onChangeDoctorPhonePrefix(item.dialCode);
    setCountryFlagCode(countryFlags.flags[item.code.toLowerCase()]);
  };

  let renderCountryPicker = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={countryPickerVisible}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.countryPickerContainer}>
            <View style={styles.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder={'Filter'}
                // focusable={true}
                style={styles.filterInputStyle}
              />
            </View>
            <FlatList
              style={{flex: 1}}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                  <View style={styles.countryPickerStyle}>
                    <View style={styles.countryPickerItemContainer}>
                      <Image
                        source={countryFlags.flags[item.code.toLowerCase()]}
                        style={styles.flagImage}
                      />
                      <Text style={styles.countryPickerItemName}>
                        {item.en}
                      </Text>
                      <Text style={styles.countryPickerItemDialCode}>
                        {item.dialCode}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={onShowHideCountryPicker}
            style={styles.closeButtonStyle}>
            <Text style={styles.closeTextStyle}>{'CLOSE'}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <View style={LAYOUT.mainCenter}>
    <AddMedDocForm
      navigation={navigation}
      initialValues={{
        doctName: doctorName,
        doctSpeciality: doctorSpeciality,
        doctPhonePrefix: doctorPhonePrefix,
        doctPhone: doctorPhone,
        doctEmail: doctorEmail,
      }}>
      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 1 of 5</Text>
            <PaddedDivider />
            <Text>Doctor's Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Doctor`s Name'}
              onChangeText={function (text) {
                onChangeValue('doctName', text);
                onChangeDoctorName(text);
              }}
              value={values.doctName}
              autoFocus={loadedDoctor === '' ? true : false}
              autoCapitalize={'words'}
            />
          </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 2 of 5</Text>
            <PaddedDivider />
            <Text>Doctor's Speciality</Text>
            <Picker
              selectedValue={values.doctSpeciality}
              onValueChange={function (data) {
                onChangeValue('doctSpeciality', data);
                onChangeDoctorSpeciality(data);
              }}
              value={values.doctSpeciality}>
              {specialitiesOfDoctors.map((item, index) => {
                return <Picker.Item label={item} value={index} key={index} />;
              })}
            </Picker>
          </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 3 of 5</Text>
            <PaddedDivider />
            <Text>Doctor's Phone Number</Text>

            <View style={styles.phoneNumberInputs}>
              <TouchableOpacity
                onPress={onShowHideCountryPicker}
                autoFocus={true}>
                <View style={styles.testing}>
                  <Image source={countryFlagCode} style={styles.flagImage} />
                  <Text>{countryCode}</Text>
                </View>
              </TouchableOpacity>
              {renderCountryPicker()}

              <TextInputMask
                type={'custom'}
                style={{borderBottomColor: COLORS.primaryLight, borderBottomWidth: 1, width: 150}}
                placeholder={countryPlaceholder}
                options={{mask: countryPlaceholder}}
                onChangeText={function (text) {
                  onChangeValue('doctPhone', text);
                  onChangeValue('doctPhonePrefix', countryCode);
                  onChangeDoctorPhone(text);
                }}
                keyboardType={'phone-pad'}
                value={values.doctPhone}
                autoFocus={false}
              />
            </View>
          </View>
        )}
      </AddMedDocForm.Step>

      <AddMedDocForm.Step>
        {({onChangeValue, values}) => (
          <View>
            <Text style={{ color: COLORS.primaryLight }}>Step 4 of 5</Text>
            <PaddedDivider />
            <Text>Doctor`s Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Doctor's Email"}
              onChangeText={function (text) {
                onChangeValue('doctEmail', text);
                onChangeDoctorEmail(text);
              }}
              keyboardType={'email-address'}
              value={values.doctEmail}
              autoFocus={loadedDoctor === '' ? true : false}
              autoCapitalize={'none'}
            />
          </View>
        )}
      </AddMedDocForm.Step>

      <View>
      <Text style={{ color: COLORS.primaryLight }}>Step 5 of 5</Text>
            <PaddedDivider />
            <View style={styles.navBackNext}>
          <ThemeButton
            type={'secondary'}
            text={'Edit'}
            onPressEvent={() => {
              navigation.goBack(
                navigation.navigate('Medication', {
                  screen: 'AddDoctor',
                  params: {
                    loadedDoctor: {
                      doctorName,
                      doctorSpeciality,
                      doctorPhonePrefix,
                      doctorPhone,
                      doctorEmail,
                    },
                  },
                }),
              );
            }}
          />
          <ThemeButton
            text={'Submit doctor'}
            onPressEvent={() => {
              submitForm(
                doctorName,
                doctorSpeciality,
                doctorPhonePrefix,
                doctorPhone,
                doctorEmail,
              );

              navigation.navigate('Medication', {
                screen: 'Index',
                params: {
                  snackbar: "Added the doctor " + doctorName
                }
                
              });
            }}
          />
        </View>

        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>Doctor's name</DataTable.Cell>
            <DataTable.Cell numeric>{doctorName}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Doctor's speciality</DataTable.Cell>
            <DataTable.Cell numeric>{specialitiesOfDoctors[doctorSpeciality]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Doctor's phone number</DataTable.Cell>
            <DataTable.Cell numeric>({doctorPhonePrefix}) {doctorPhone}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Doctor's email</DataTable.Cell>
            <DataTable.Cell numeric>{doctorEmail}</DataTable.Cell>
          </DataTable.Row>
      </DataTable>


      </View>
    </AddMedDocForm>
    </View>
  );
}
