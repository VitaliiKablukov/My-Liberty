import { renderHomePageGallery } from './js/render-home-page-gallery';
import { refs } from './js/refs';
import { onSearchClick, getTrendingFilms } from './js/search_film';
import { renderPaginationBtn, onPaginateBtnClick } from './js/pagination';
import { saveGenresToStorage } from './js/save-genres-to-localStorage';
import { renderModal } from './js/render-modal';
saveGenresToStorage();
// renderHomePageGallery();
if (refs.headerOnMainPage) {
  const onFormSubmit = refs.searchForm.addEventListener(
    'submit',
    onSearchClick
  );
  refs.searchButton.removeAttribute('disabled');
}

refs.pagination.addEventListener('click', onPaginateBtnClick);
refs.gallery.addEventListener('click', renderModal);
document.addEventListener('DOMContentLoaded', () => {
  getPopularInLoadStartPage(1);
});

async function getPopularInLoadStartPage(page) {
  if (page === 1) {
    refs.gallery.innerHTML = '';
  }

  const trendsFilms = await getTrendingFilms(page).then(data => data);
  const max_page = trendsFilms.total_pages;
  console.log('max_page', max_page);
  if (page > max_page) {
    return;
  }
  renderPaginationBtn(max_page, page);
  renderHomePageGallery(page);
}
