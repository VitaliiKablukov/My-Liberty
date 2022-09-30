import { refs } from './refs';

refs.signOutButton.addEventListener('click', signOut);

function signOut() {
  const userVerified = JSON.parse(localStorage.getItem('user'));
  if (userVerified) {
    localStorage.removeItem('user');
    window.location.pathname = '../index.html';
    refs.myLibraryNavLink.classList.add('visually-hidden');
    refs.signOutButton.classList.add('visually-hidden');
    refs.signInButton.classList.remove('visually-hidden');
  }
}
