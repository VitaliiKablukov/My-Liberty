import { renderHomePageGallery } from './js/render-home-page-gallery';
import { refs } from './js/refs';
import { onSearchClick, getTrendingFilms } from './js/search_film';
import {
  renderPaginationBtn,
  getPopularInLoadStartPage,
  onPaginateBtnClick,
} from './js/pagination';
import { saveGenresToStorage } from './js/save-genres-to-localStorage';
import { renderModal } from './js/render-modal';
import { showCardsLoader, hideCardsLoader } from './js/loader';
import { createMarkupMyLibrary } from './js/render-gallery';
import { btnLogicsMyLibrary, noFilm } from './js/myLibraryAction';

saveGenresToStorage();
// renderHomePageGallery();

if (refs.headerOnMainPage) {
  const onFormSubmit = refs.searchForm.addEventListener(
    'submit',
    onSearchClick
  );
  refs.searchButton.removeAttribute('disabled');

  document.addEventListener('DOMContentLoaded', () => {
    showCardsLoader();
    setTimeout(() => {
      getPopularInLoadStartPage(1);
      hideCardsLoader();
    }, 1000);
  });
  refs.paginationList.addEventListener('click', onPaginateBtnClick);
}
if (refs.headerOnMyLibraryPage) {
  if (refs.filmOfLocalStorageWatched) {
    createMarkupMyLibrary(refs.filmOfLocalStorageWatched);
  } else {
    noFilm();
  }

  refs.myLibraryBtnList.addEventListener('click', btnLogicsMyLibrary);
}

refs.gallery.addEventListener('click', renderModal);
