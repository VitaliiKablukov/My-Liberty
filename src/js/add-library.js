import { refs } from './refs';
import Notiflix from 'notiflix';

let addFilm = {};
let selectedFilm = [];
export let settingRenderModalBtn = {
  nameWatchedBtn: 'add to Watched',
  nameQueueBtn: 'add to queue',
};
let optionsStorage = {
  category: '',
};

export async function addFilmToLocalStorage(filmForModal) {
  addModalBtn();
  addFilm.film = filmForModal;
  addEventListenerBtn();

  return addFilm;
}

export function addModalBtn() {
  return (refs.modalBtn = document.querySelector('.modal_btn_list'));
}

function addEventListenerBtn() {
  return refs.modalBtn.addEventListener('click', onModalBtn);
}

function onModalBtn(e) {
  let el = e.target;

  if (el.textContent === 'add to Watched') {
    optionsStorage.category = 'Watched';

    addFilmToLibrary(optionsStorage, el);

    console.log(el);
  }
  if (el.textContent === 'add to queue') {
    optionsStorage.category = 'Queue';

    addFilmToLibrary(optionsStorage, el);
  }
}

function addFilmToLibrary({ category }, el) {
  // let filmOfStorage = JSON.parse(localStorage.getItem(`${category}`));
  // if (filmOfStorage !== null) {
  //   return selectedFilm.push(filmOfStorage);
  // }
  try {
    selectedFilm.push(addFilm);
    localStorage.setItem(`${category}`, JSON.stringify(selectedFilm));
    Notiflix.Notify.success(`Movie successfully added to ${category}`);
    el.textContent = `remove for Watched`;
  } catch (error) {
    Notiflix.Notify.failure(`Sorry, failed to add movie to ${category}`);
    return;
  }
}

export async function checkRepeatFilm(
  settingRenderModalBtn,
  filmOfLocalStorageWatched,
  filmOfLocalStorageQueue,
  filmForModal
) {
  if (filmOfLocalStorageWatched !== null) {
    const checkResultWatched = filmOfLocalStorageWatched.find(
      film => film.film.id === Number(filmForModal)
    );

    if (checkResultWatched !== undefined) {
      settingRenderModalBtn.nameWatchedBtn = 'remove for Watched';
    }

    if (checkResultWatched === undefined) {
      settingRenderModalBtn.nameWatchedBtn = 'add to Watched';
    }

    console.log(checkResultWatched);
  }

  if (filmOfLocalStorageQueue !== null) {
    const checkResultQueue = filmOfLocalStorageQueue.find(
      film => film.film.id === Number(filmForModal)
    );

    if (checkResultQueue !== undefined) {
      settingRenderModalBtn.nameQueueBtn = 'remove for queue';
    }

    if (checkResultQueue === undefined) {
      settingRenderModalBtn.nameQueueBtn = 'add to queue';
    }
    console.log(checkResultQueue);
  }
}

// function removeFilmFromLibrary({ category }, addFilm) {
//   console.log(addFilm.film.id);
//   try {
//     localStorage.removeItem(`${category}`);
//     Notiflix.Notify.success(`Movie successfully remove from ${category}`);
//     el.textContent = `add to ${category}`;
//   } catch (error) {
//     Notiflix.Notify.failure(`Sorry, failed to remove movie from ${category}`);
//     return;
//   }
// }

// localStorage.removeItem('Watched');
// localStorage.removeItem('Queue');
