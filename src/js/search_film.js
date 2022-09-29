import axios from 'axios';
import { API_KEY, SEARCH_URL } from './constats';
import { refs } from './refs';
import { renderGalleryItem } from './render-gallery';

const onFormSubmit = refs.searchForm.addEventListener('submit', onSearchClick);

let searchResult = '';

export async function onSearchClick(e) {
  e.preventDefault();
  searchResult = e.target.elements.text.value;
  const result = await getSearchFilm(searchResult);
  refs.gallery.innerHTML = '';
  renderGalleryItem(result.results);
}

async function getSearchFilm(searchResult, pageNumber = 1) {
  const response = await axios.get(SEARCH_URL, {
    params: {
      api_key: API_KEY, //unic Key for API.
      query: searchResult, //- Search Value
      page: pageNumber, //: - Number of Pages.
    },
  });

  return response.data;
}
