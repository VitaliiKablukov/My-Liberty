import { refs } from './refs';
import Notiflix from 'notiflix';

let addFilm = {};
let filmId = Number;

const optionNotiflix = {
  width: '400px',
  cssAnimationStyle: 'from-right',
  position: 'right-bottom',
};

export async function addEventListenerBtn(filmForModal, id) {
  addFilm.film = filmForModal;
  filmId = Number(id);
  textModalBtn(filmId);
}

async function textModalBtn(id) {
  const watchBtn = document.querySelector('.btn__watch');
  const queueBtn = document.querySelector('.btn__queue');

  console.dir(watchBtn);
  if (inList(id, 'Watched') !== undefined) {
    function changeText() {
      watchBtn.disabled = false;
      watchBtn.textContent = 'Remove for watched';
      watchBtn.classList.add('active');
    }
    setTimeout(changeText, 250);
  } else {
    watchBtn.textContent = 'Add to watched';
    watchBtn.classList.remove('active');
    watchBtn.disabled = false;
  }

  if (inList(id, 'Queue') !== undefined) {
    function changeText() {
      queueBtn.disabled = false;
      queueBtn.textContent = 'Remove for queue';
      queueBtn.classList.add('active');
    }
    setTimeout(changeText, 250);
  } else {
    queueBtn.textContent = 'Add to queue';
    queueBtn.classList.remove('active');
    queueBtn.disabled = false;
  }

  watchBtn.addEventListener('click', onWatchBtn);
  queueBtn.addEventListener('click', onQueuelBtn);
}

function onWatchBtn(e) {
  let el = e.target;

  if (el.classList.contains('active')) {
    refs.filmOfLocalStorageWatched = JSON.parse(
      localStorage.getItem(`Watched`)
    );
    removeFilmFromLibrary(`Watched`, refs.filmOfLocalStorageWatched);
    textModalBtn(filmId);
  } else {
    refs.filmOfLocalStorageWatched = JSON.parse(
      localStorage.getItem(`Watched`)
    );
    refs.filmOfLocalStorageQueue = JSON.parse(localStorage.getItem(`Queue`));

    addFilmToSelectedFilm(`Watched`, refs.filmOfLocalStorageWatched);

    if (refs.filmOfLocalStorageQueue !== null) {
      const checkResult = refs.filmOfLocalStorageQueue.find(
        film => film.film.id === Number(filmId)
      );
      if (checkResult !== undefined) {
        removeFilmFromLibrary(`Queue`, refs.filmOfLocalStorageQueue);
      }
    }
    textModalBtn(filmId);
  }
}

function onQueuelBtn(e) {
  let el = e.target;

  if (el.classList.contains('active')) {
    refs.filmOfLocalStorageQueue = JSON.parse(localStorage.getItem(`Queue`));
    removeFilmFromLibrary(`Queue`, refs.filmOfLocalStorageQueue);
    textModalBtn(filmId);
  } else {
    refs.filmOfLocalStorageWatched = JSON.parse(
      localStorage.getItem(`Watched`)
    );
    refs.filmOfLocalStorageQueue = JSON.parse(localStorage.getItem(`Queue`));

    addFilmToSelectedFilm(`Queue`, refs.filmOfLocalStorageQueue);
    if (refs.filmOfLocalStorageWatched !== null) {
      const checkResult = refs.filmOfLocalStorageWatched.find(
        film => film.film.id === Number(filmId)
      );
      if (checkResult !== undefined) {
        removeFilmFromLibrary(`Watched`, refs.filmOfLocalStorageWatched);
      }
    }

    textModalBtn(filmId);
  }
}

function addFilmToSelectedFilm(category, selectedFilm) {
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

function removeFilmFromLibrary(category, remainFilm) {
  console.log(category);
  try {
    const findRemuveIndex = remainFilm
      .map(film => film.film.id)
      .findIndex(id => id === filmId);
    remainFilm.splice(findRemuveIndex, 1);
    if (findRemuveIndex !== undefined) {
      localStorage.setItem(`${category}`, JSON.stringify(remainFilm));
      messageNotiflixSuccesRemove(category);
    }
  } catch (error) {
    messageNotiflixFailureRemove(category);
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

function inList(id, category) {
  let LocalStorage = JSON.parse(localStorage.getItem(`${category}`));
  if (LocalStorage !== null) {
    const checkResult = LocalStorage.find(film => film.film.id === Number(id));
    return checkResult;
  }
}
