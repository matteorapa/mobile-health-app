import auth from '@react-native-firebase/auth';

export const logIn = (email, password) => {
    return new Promise(function(resolve,reject){
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
            userID = data.user.uid;
            resolve(userID)
        })
    .catch(error => {
        if (error.code === 'auth/wrong-password') {
        console.log('Email or Password entered was wrong!');
        }
        console.error(error);
        reject(error);
    });
})
};

export const logOut = () => {
    firebase.auth().signOut().then(() => {
        console.log('Signed out!')
      }).catch((error) => {
        // An error happened.
      });
};