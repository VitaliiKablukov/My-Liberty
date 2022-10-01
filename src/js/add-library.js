import { refs } from './refs';
import Notiflix from 'notiflix';

let addFilm = {};
let selectedFilm = [];
export let settingRenderModalBtn = {};
let optionsStorage = {
  category: '',
};
let checkResultWatched;
let checkResultQueue;

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

    addFilmToLibrary(optionsStorage);

    el.textContent = `remove for Watched`;
  }
  if (el.textContent === 'add to queue') {
    optionsStorage.category = 'Queue';

    addFilmToLibrary(optionsStorage);
    el.textContent = 'remove for Queue';
  }

  if (el.textContent === 'remove for Watched') {
    optionsStorage.category = 'Watched';

    removeFilmFromLibrary(optionsStorage, addFilm);
    el.textContent = 'add to Watched';
  }

  if (el.textContent === 'remove for Queue') {
    optionsStorage.category = 'Queue';

    removeFilmFromLibrary(optionsStorage, addFilm);
    el.textContent = 'add to queue';
  }

  function removeFilmFromLibrary({ category }, addFilm) {
    console.log(addFilm.film.id);
    try {
      // localStorage.removeItem(`${category}`);
      Notiflix.Notify.success(`Movie successfully remove from ${category}`);
      el.textContent = `add to ${category}`;
    } catch (error) {
      Notiflix.Notify.failure(`Sorry, failed to remove movie from ${category}`);
      return;
    }
  }

  function addFilmToLibrary({ category }) {
    let filmOfStorage = JSON.parse(localStorage.getItem(`${category}`));
    if (filmOfStorage !== null) {
      selectedFilm = filmOfStorage;
    }
    try {
      selectedFilm.push(addFilm);
      localStorage.setItem(`${category}`, JSON.stringify(selectedFilm));
      Notiflix.Notify.success(`Movie successfully added to ${category}`);
      el.textContent = `remove for ${category}`;
    } catch (error) {
      Notiflix.Notify.failure(`Sorry, failed to add movie to ${category}`);
      return;
    }
  }
}

export function checkRepeatFilm(
  filmOfLocalStorageWatched,
  filmOfLocalStorageQueue,
  filmForModal
) {
  if (filmOfLocalStorageWatched !== null) {
    const checkResultWatched = filmOfLocalStorageWatched.find(
      film => film.film.id === Number(filmForModal)
    );
    return checkResultWatched;
  }

  if (filmOfLocalStorageQueue !== null) {
    const checkResultQueue = filmOfLocalStorageQueue.find(
      film => film.film.id === Number(filmForModal)
    );
    return checkResultQueue;
  }

  if (checkResultWatched !== undefined && checkResultQueue !== undefined) {
    settingRenderModalBtn = {
      nameWatchedBtn: 'remove for Watched',
      nameQueueBtn: 'remove for queue',
    };
  }

  if (checkResultWatched !== undefined && checkResultQueue === undefined) {
    settingRenderModalBtn = {
      nameWatchedBtn: 'remove for Watched',
      nameQueueBtn: 'add to queue',
    };
  }

  if (checkResultWatched === undefined && checkResultQueue !== undefined) {
    settingRenderModalBtn = {
      nameWatchedBtn: 'add to Watched',
      nameQueueBtn: 'remove for queue',
    };
  }

  if (checkResultWatched === undefined && checkResultQueue === undefined) {
    settingRenderModalBtn = {
      nameWatchedBtn: 'add to Watched',
      nameQueueBtn: 'add to queue',
    };
  }

  console.log(checkResultWatched);

  console.log(settingRenderModalBtn.nameWatchedBtn);
}
