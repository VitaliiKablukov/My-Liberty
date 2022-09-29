import { renderHomePageGallery } from './js/render-home-page-gallery';
import { refs } from './js/refs';
import { onSearchClick } from './js/search_film';

renderHomePageGallery();
const onFormSubmit = refs.searchForm.addEventListener('submit', onSearchClick);
