import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBixMF4wKtOz2tF8CGpWal2j3Qi0bLw8gE",
    authDomain: "crwn-db-ae3ae.firebaseapp.com",
    projectId: "crwn-db-ae3ae",
    storageBucket: "crwn-db-ae3ae.appspot.com",
    messagingSenderId: "787169555979",
    appId: "1:787169555979:web:83f6a3022bc107fe50390e",
    measurementId: "G-V94054BT6N"
  };

  export const createUserProfileDocument=async(userAuth, additionalData)=>{   //this code is used to create firestore document with current signed in user
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot=await userRef.get()
        if(!snapShot.exists){
            const {displayName, email} = userAuth;
            const createdAt = new Date();

            try{
                await userRef.set({
                    displayName, 
                    email,
                    createdAt,
                    ...additionalData
                })
            }catch(error){
                console.log(error)
            }
        }
        return userRef;
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt:'select_account'})
  export const signInWithGoogle = ()=>auth.signInWithPopup(provider)

  export default firebase;