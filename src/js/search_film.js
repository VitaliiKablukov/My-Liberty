import axios from 'axios';
import { API_KEY, SEARCH_URL,TREND_URL } from './constats';
import { refs } from './refs';
import { renderGalleryItem } from './render-gallery';

// const onFormSubmit = refs.searchForm.addEventListener('submit', onSearchClick);

let searchResult = '';

export async function onSearchClick(e, page=1 ) {
  e.preventDefault();
  searchResult = e.target.elements.text.value.trim().toLowerCase();

  const result = await getSearchFilm(searchResult, page);

  if (!result.results.length) {
    refs.searchErrorNotification.classList.remove('visually-hidden');
    return;
  }
  if (!refs.searchErrorNotification.classList.contains('visually-hidden')) {
    refs.searchErrorNotification.classList.add('visually-hidden');
  }
  refs.gallery.innerHTML = '';
  console.log('result.results',result.results);
  renderGalleryItem(result.results);
  paginationSearch(searchResult, page);
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
// pagination start
export async function getTrendingFilms(pageNumber = 1) {
   const response = await axios.get(TREND_URL, {
    params: {
      api_key: API_KEY, //unic Key for API.
      page: pageNumber, //: - Number of Pages.
    },
  });
  if (!response.ok) {
      console.log('error',response.status);
    }
  return response.data;
}

export function getSearchWithPagination(page) {
   // вимальовуємо фільми за пошуком 
  onSearchClick(e, page);
  //вимальовуємо пагінацію
  // paginationSearch(searchResult, page);
}

function paginationSearch(searchResult, page) {
  let UlPagin=refs.paginationList;
  if (UlPagin.classList.contains('pagination-popular')||UlPagin.classList.contains('pagination-watched')||UlPagin.classList.contains('pagination-queue')) {
    UlPagin.classList.remove('pagination-popular');
    UlPagin.classList.remove('pagination-watched');
    UlPagin.classList.remove('pagination-queue');
    UlPagin.classList.add('pagination-search');
  }
  refs.paginationSearch.innerHTML = '';
    const searchFilms =await getSearchFilm(searchData, page).then(data => data);
    const max_page = searchFilms.total_pages;
    console.log('max_page Search', max_page);
    if (page > max_page) {
      return;
    }
   displayPagination(max_page=100, page);
}

// pagination end