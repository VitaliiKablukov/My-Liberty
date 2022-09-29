import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyARmX1k_p6UbG-Vtl1mbdlJrWGlqYHBxn8',
  authDomain: 'my-liberty-90e0d.firebaseapp.com',
  projectId: 'my-liberty-90e0d',
  storageBucket: 'my-liberty-90e0d.appspot.com',
  messagingSenderId: '712438572074',
  appId: '1:712438572074:web:2639e398d98a2bcd91cf53',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

emailVeriying();

function emailVeriying() {
  const userVerified = JSON.parse(sessionStorage.getItem('user'));
  if (userVerified) {
    return;
  }

  googleSignIn();
}

function googleSignIn() {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      sessionStorage.setItem('user', JSON.stringify(user));
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
