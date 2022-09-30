import { renderHomePageGallery } from './js/render-home-page-gallery';
import { refs } from './js/refs';
import { onSearchClick, getTrendingFilms } from './js/search_film';
import {renderPaginationBtn, onPaginateBtnClick} from './js/pagination';
import { saveGenresToStorage } from './js/save-genres-to-localStorage';
import { renderModal } from "./js/render-modal"
saveGenresToStorage()
// renderHomePageGallery();
const onFormSubmit = refs.searchForm.addEventListener('submit', onSearchClick);
refs.pagination.addEventListener('click', onPaginateBtnClick);

document.addEventListener('DOMContentLoaded', () => {
  getPopularInLoadStartPage(1);
  refs.searchButton.removeAttribute('disabled');
});



async function getPopularInLoadStartPage(page) {
    
    if (page === 1) {
        refs.gallery.innerHTML = '';
    }

    const trendsFilms =await getTrendingFilms(page).then(data => data);
    const max_page = trendsFilms.total_pages;
    console.log('max_page', max_page);
    if (page > max_page) {
      return;
    }
    renderPaginationBtn(max_page,page);
    renderHomePageGallery(page);

}



