import { refs } from './refs';
import Notiflix from 'notiflix';

let addFilm = {};
let filmId = Number;
let selectedFilm = [];
export let settingRenderModalBtn = {
  nameWatchedBtn: 'add to Watched',
  nameQueueBtn: 'add to queue',
};

let optionsStorage = {
  category: '',
};

const optionNotiflix = {
  width: '400px',
  cssAnimationStyle: 'from-right',
  position: 'right-bottom',
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

  if (el.textContent === 'add to Watched') {
    optionsStorage.category = 'Watched';

    addFilmToSelectedFilm(optionsStorage, filmOfStorageWatched);
    el.textContent = `remove for Watched`;
    settingRenderModalBtn.nameWatchedBtn = 'remove for Watched';
  } else if (el.textContent === 'remove for Watched') {
    optionsStorage.category = 'Watched';

    removeFilmFromLibrary(optionsStorage, filmOfStorageWatched);
    el.textContent = 'add to Watched';
    settingRenderModalBtn.nameWatchedBtn = 'add to Watched';
  }

  if (el.textContent === 'add to queue') {
    optionsStorage.category = 'Queue';

    addFilmToSelectedFilm(optionsStorage, filmOfStorageQueue);

    el.textContent = `remove for queue`;
    settingRenderModalBtn.nameQueueBtn = 'remove for queue';
  } else if (el.textContent === 'remove for queue') {
    optionsStorage.category = 'Queue';

    removeFilmFromLibrary(optionsStorage, filmOfStorageQueue);
    el.textContent = 'add to queue';
    settingRenderModalBtn.nameQueueBtn = 'add to queue';
  }
}

function addFilmToSelectedFilm({ category }, selectedFilm) {
  if (selectedFilm !== null) {
    selectedFilm.push(addFilm);
    addFilmToLibrary(category, selectedFilm);
  } else {
    selectedFilm = [];
    selectedFilm.push(addFilm);
    addFilmToLibrary(category, selectedFilm);
  }
}

function addFilmToLibrary(category, selectedFilm) {
  try {
    localStorage.setItem(`${category}`, JSON.stringify(selectedFilm));
    messageNotiflixSuccesAdd(category);
  } catch (error) {
    messageNotiflixFailureAdd(category);
  }
}

function removeFilmFromLibrary({ category }, remainFilm) {
  console.log(category);
  try {
    const findRemuveIndex = remainFilm
      .map(film => film.film.id)
      .findIndex(id => id === filmId);
    remainFilm.splice(findRemuveIndex, 1);
    localStorage.setItem(`${category}`, JSON.stringify(remainFilm));
    messageNotiflixSuccesRemove(category);
  } catch (error) {
    messageNotiflixFailureRemove(category);
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

function messageNotiflixSuccesAdd(category) {
  Notiflix.Notify.success(
    `Movie successfully added to ${category}`,
    optionNotiflix
  );
}

function messageNotiflixFailureAdd(category) {
  Notiflix.Notify.failure(
    `Sorry, failed to add movie to ${category}`,
    optionNotiflix
  );
}

function messageNotiflixSuccesRemove(category) {
  Notiflix.Notify.success(
    `Movie successfully remove from ${category}`,
    optionNotiflix
  );
}

function messageNotiflixFailureRemove(category) {
  Notiflix.Notify.failure(
    `Sorry, failed to remove movie from ${category}`,
    optionNotiflix
  );
}
