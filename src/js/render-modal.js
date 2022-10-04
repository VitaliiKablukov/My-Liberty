import axios from 'axios';
import { IMG_URL, API_KEY, SEARCH_URL } from './constats';
import { refs } from './refs';
import { addEventListenerBtn } from './add-library';
import { checkingSigningForModalButtons } from './firebase';

export async function renderModal(event) {
  event.preventDefault();
  stopScrollWhenModalOpen();
  if (!event.target.closest('.gallery-item')) {
    return;
  }
  window.addEventListener('keydown', onEscClose);
  refs.backdropEl.classList.remove('is-hidden');
  let itemId = event.target.closest('.gallery-item').getAttribute('id');

  const fetchChoosenFilm = await axios.get(
    `https://api.themoviedb.org/3/movie/${itemId}?api_key=7e0fc0f40a1f522dce260b9a97593bef&language=en-US`
  );
  const filmForModal = fetchChoosenFilm.data;
  const genresFilm = Object.values(filmForModal.genres)[0]
    ? Object.values(filmForModal.genres)[0].name
    : '';
  const modalLayout = `<div class="img-box"><img class="film_modal_img" src="${IMG_URL}${filmForModal.poster_path
    }" alt="${filmForModal.original_title}" /></div>
    <div class="modal__content">
      <h1 class="film_modal_title">${filmForModal.title}</h1>
      <ul class="film_info_list">
          <li class="film_info_item">
          <p class="film_item_category">Vote/Votes </p>
          <p class="film_item_category">Popularity </p>
          <p class="film_item_category">Original Title </p>
          <p class="film_item_category">Genre </p></li>
          <li class="film_info_item">
            <p class="film_item_parameters"><span>${filmForModal.vote_average.toFixed(
      1
    )}</span> / ${filmForModal.vote_count}</p>
            <p class="film_item_parameters">${filmForModal.popularity}</p>
            <p class="film_item_parameters">${filmForModal.original_title}</p>
            <p class="film_item_parameters">${genresFilm}</p>
          </li>
      </ul>
      <h2 class="modal_about_head">About</h2>
      <p class="modal_about_text">${filmForModal.overview}</p>
      <ul class="modal_btn_list">
          <li class="modal_btn_item"><button class="modal_btn btn__watch" type="button" data-id="${itemId}" disabled>Add to watched</button></li>
          <li class="modal_btn_item"><button class="modal_btn btn__queue" type="button" data-id="${itemId}" disabled>Add to queue</button></li>
      </ul>
    </div>`;

  refs.renderModalBox.insertAdjacentHTML('beforeend', modalLayout);

  addEventListenerBtn(filmForModal, itemId);

  await checkingSigningForModalButtons().then(result => {
    const modalButtonWatched = document.querySelector('.btn__watch');
    const modalButtonQueue = document.querySelector('.btn__queue');

    if (result) {
      modalButtonWatched.removeAttribute('disabled');
      modalButtonQueue.removeAttribute('disabled');
    }
  });
}

refs.buttonModalClose.addEventListener('click', onModalButtonClose);
refs.backdropEl.addEventListener('click', onBackdropClose);

function stopScrollWhenModalOpen() {
  refs.bodyEl.style.overflowY = 'hidden';
  refs.btnScrollToTop.style.display = "none";

}

function onModalButtonClose() {
  refs.backdropEl.classList.add('is-hidden');
  refs.renderModalBox.innerHTML = '';
  refs.bodyEl.style.overflowY = 'visible';
  refs.btnScrollToTop.style.display = "block";

}

function onEscClose(event) {
  if (event.code === 'Escape') {
    window.removeEventListener('keydown', onEscClose);
    onModalButtonClose();
  }
}

function onBackdropClose(event) {
  if (event.currentTarget === event.target) {
    onModalButtonClose();
  }
}
