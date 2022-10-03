import { refs } from './refs';
import Notiflix from 'notiflix';

let addFilm = {};
let filmId = Number;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
export let settingRenderModalBtn = {
  nameWatchedBtn: 'add to Watched',
  nameQueueBtn: 'add to queue',
};

let optionsStorage = {
  category: '',
};

export async function addFilmToLocalStorage(filmForModal, id) {
  refs.modalBtn = document.querySelector('.modal_btn_list');
  addEventListenerBtn(filmForModal, id);
}

function addEventListenerBtn(filmForModal, id) {
  addFilm.film = filmForModal;
  filmId = Number(id);
  console.log(filmId);
  refs.modalBtn.addEventListener('click', onModalBtn);
  return filmId;
}

function onModalBtn(e) {
  let el = e.target;
  let filmOfStorageWatched = JSON.parse(localStorage.getItem('Watched'));
  let filmOfStorageQueue = JSON.parse(localStorage.getItem('Queue'));
  console.log(filmOfStorageWatched);

  if (el.textContent === 'add to Watched') {
    optionsStorage.category = 'Watched';

    let selectedWachedFilm = filmOfStorageWatched;

    if (selectedWachedFilm !== null) {
      selectedWachedFilm.push(addFilm);
      addFilmToLibrary(optionsStorage, selectedWachedFilm);
    } else {
      selectedWachedFilm = [];
      selectedWachedFilm.push(addFilm);
      addFilmToLibrary(optionsStorage, selectedWachedFilm);
    }

    el.textContent = `remove for Watched`;
  }
  if (el.textContent === 'add to queue') {
    optionsStorage.category = 'Queue';

    let selectedQueueFilm = filmOfStorageQueue;

    if (selectedQueueFilm !== null) {
      selectedQueueFilm.push(addFilm);
      addFilmToLibrary(optionsStorage, selectedQueueFilm);
    } else {
      selectedQueueFilm = [];
      selectedQueueFilm.push(addFilm);
      addFilmToLibrary(optionsStorage, selectedQueueFilm);
    }

    el.textContent = `remove for queue`;
  }

  if (el.textContent === 'remove for Watched') {
    optionsStorage.category = 'Watched';
    const storage = refs.filmOfLocalStorageWatched;
    const findRemuveIndex = storage
      .map(film => film.film.id)
      .findIndex(id => id === filmId);
    const removeStorage = filmOfStorageWatched.splice(findRemuveIndex, 1);
    addFilmToLibrary(optionsStorage, filmOfStorageWatched);
    el.textContent = 'add to Watched';
  }

  if (el.textContent === 'remove for queue') {
    optionsStorage.category = 'Queue';
    const storage = refs.filmOfLocalStorageQueue;
    const findRemuveIndex = storage
      .map(film => film.film.id)
      .findIndex(id => id === filmId);
    const removeStorage = filmOfStorageQueue.splice(findRemuveIndex, 1);
    addFilmToLibrary(optionsStorage, filmOfStorageQueue);
    el.textContent = 'add to queue';
  }
}

function addFilmToLibrary({ category }, selectedFilm) {
  try {
    localStorage.setItem(`${category}`, JSON.stringify(selectedFilm));
    Notiflix.Notify.success(`Movie successfully added to ${category}`);
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
