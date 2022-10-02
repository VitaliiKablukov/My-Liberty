import { renderHomePageGallery } from './js/render-home-page-gallery';
import { refs } from './js/refs';
import { onSearchClick, getTrendingFilms } from './js/search_film';
import { renderPaginationBtn, getPopularInLoadStartPage, onPaginateBtnClick } from './js/pagination';
import { saveGenresToStorage } from './js/save-genres-to-localStorage';
import { renderModal } from './js/render-modal';
import { showCardsLoader, hideCardsLoader } from './js/loader'
import { createMarkupMyLibrary } from './js/render-gallery'

saveGenresToStorage();
// renderHomePageGallery();

if (refs.headerOnMainPage) {
  const onFormSubmit = refs.searchForm.addEventListener(
    'submit',
    onSearchClick
  );
  refs.searchButton.removeAttribute('disabled');

  document.addEventListener('DOMContentLoaded', () => {
    showCardsLoader()
    setTimeout(() => {
      getPopularInLoadStartPage(1);
      hideCardsLoader()
    }, 1000);
  });
  refs.paginationList.addEventListener('click', onPaginateBtnClick);


} if (refs.headerOnMyLibraryPage) {
  createMarkupMyLibrary(refs.filmOfLocalStoragWatched)
  refs.myLibraryBtnList.addEventListener('click', (e) => {
    if (e.target.dataset.id === "watched") {
      refs.gallery.innerHTML = ""
      createMarkupMyLibrary(refs.filmOfLocalStoragWatched)
    } if (e.target.dataset.id === "queue") {
      refs.gallery.innerHTML = ""
      createMarkupMyLibrary(refs.filmOfLocalStoragQueue)
    }
  })

}



refs.gallery.addEventListener('click', renderModal);
