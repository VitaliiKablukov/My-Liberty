import { refs } from './refs';
import Notiflix from 'notiflix';

let addFilm = {};
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
  let filmOfStorage = JSON.parse(localStorage.getItem(`${category}`));
  try {
    filmOfStorage.push(addFilm);
    localStorage.setItem(`${category}`, JSON.stringify(filmOfStorage));
    Notiflix.Notify.success(`Movie successfully added to ${category}`);
    el.textContent = `remove for ${category}`;
  } catch (error) {
    Notiflix.Notify.failure(`Sorry, failed to add movie to ${category}`);
    return;
  }
}

export async function checkRepeatFilm(
  filmOfLocalStorageWatched,
  filmOfLocalStorageQueue,
  filmForModal
) {
  if (filmOfLocalStorageWatched) {
    const checkResultWatched = filmOfLocalStorageWatched.find(
      film => film.film.id === Number(filmForModal)
    );

    if (filmOfLocalStorageQueue) {
      const checkResultQueue = filmOfLocalStorageQueue.find(
        film => film.film.id === Number(filmForModal)
      );

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
    }
  }
}
