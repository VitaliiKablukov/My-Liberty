import { renderHomePageGallery } from './js/render-home-page-gallery';
import { refs } from './js/refs';
import { onSearchClick } from './js/search_film';
import { saveGenresToStorage } from './js/save-genres-to-localStorage';

saveGenresToStorage();
renderHomePageGallery();

document.addEventListener('DOMContentLoaded', () => {
  refs.searchButton.removeAttribute('disabled');
  const onFormSubmit = refs.searchForm.addEventListener(
    'submit',
    onSearchClick
  );
  console.log(document);
});
