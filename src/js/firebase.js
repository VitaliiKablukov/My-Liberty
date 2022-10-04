import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

refs.signInButton.addEventListener('click', googleSignIn);
refs.signOutButton.addEventListener('click', signOut);

emailVeriying();

export async function checkingSigningForModalButtons() {
  const userVerified = JSON.parse(localStorage.getItem('user'));
  return userVerified;
}

function emailVeriying() {
  const userVerified = JSON.parse(localStorage.getItem('user'));
  if (userVerified) {
    refs.myLibraryNavLink.classList.remove('visually-hidden');
    refs.signOutButton.classList.remove('visually-hidden');
    refs.signInButton.classList.add('visually-hidden');
  }
}

function signOut() {
  Notify.info('You had signed out', {
    width: '400px',
    cssAnimationStyle: 'from-right',
    position: 'right-bottom',
  });

  setTimeout(() => {
    localStorage.removeItem('user');
    refs.myLibraryNavLink.classList.add('visually-hidden');
    refs.signOutButton.classList.add('visually-hidden');
    refs.signInButton.classList.remove('visually-hidden');

    window.location.pathname = 'My-Liberty/';
  }, 3000);
}

function googleSignIn() {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      refs.myLibraryNavLink.classList.remove('visually-hidden');
      refs.signOutButton.classList.remove('visually-hidden');
      refs.signInButton.classList.add('visually-hidden');
      console.log(user);
      Notify.success('You had successfully signed in', {
        width: '400px',
        cssAnimationStyle: 'from-right',
        position: 'right-bottom',
      });

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
