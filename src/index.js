import { renderHomePageGallery } from './js/render-home-page-gallery';
import { refs } from './js/refs';
import { onSearchClick, getTrendingFilms } from './js/search_film';
import {renderPaginationBtn, getPopularInLoadStartPage, onPaginateBtnClick} from './js/pagination';
import { saveGenresToStorage } from './js/save-genres-to-localStorage';
import { renderModal } from "./js/render-modal"
saveGenresToStorage()

if (refs.headerOnMainPage) {
  const onFormSubmit = refs.searchForm.addEventListener(
    'submit',
    onSearchClick
  );
  refs.searchButton.removeAttribute('disabled');
}

refs.paginationList.addEventListener('click', onPaginateBtnClick);

refs.gallery.addEventListener('click', renderModal);
document.addEventListener('DOMContentLoaded', () => {
  getPopularInLoadStartPage(1);
});
