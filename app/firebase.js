import firebase from '@react-native-firebase/app';


const credentials = {
  clientId: '569751018067-9coa1aj6lehue711mstgnfo689d0jni4.apps.googleusercontent.com',
  appId: '1:569751018067:android:ffabc1450547b6b26dc4a6',
  apiKey: 'AIzaSyDjsEikDKMSuBZmSGKBkd3YmpjgV9NumFI',
  databaseURL: 'https://health-app-caec8-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'health-app-caec8.appspot.com',
  messagingSenderId: '569751018067',
  projectId: 'health-app-caec8',
};



await firebase.initializeApp(credentials);

export default firebase.firestore();