import auth from '@react-native-firebase/auth';

export const logIn = (email, password) => {

    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log('User logged in!');
    })
    .catch(error => {
        if (error.code === 'auth/wrong-password') {
        console.log('Email or Password entered was wrong!');
        }
        console.error(error);
    });
};

export const logOut = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
};