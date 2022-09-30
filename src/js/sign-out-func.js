import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs.signOutButton.addEventListener('click', signOut);

function signOut() {
  const userVerified = JSON.parse(localStorage.getItem('user'));
  if (userVerified) {
    Notify.info('You had signed out', {
      width: '400px',
      cssAnimationStyle: 'from-right',
      position: 'right-bottom',
    });
    setTimeout(() => {
      localStorage.removeItem('user');
      window.location.pathname = 'My-Liberty/';
    }, 3000);
  }
}
