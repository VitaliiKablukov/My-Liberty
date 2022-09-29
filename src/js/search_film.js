import axios from 'axios';
import { API_KEY, SEARCH_URL } from './constats';
import { refs } from './refs';

const onFormSubmit = refs.searchForm.addEventListener('submit', evt =>
  console.log(evt)
);

function onSearchClick(e) {
  e.preventDefault();
  console.log(e);
  //   refs.gallery.innerHTML = '';
  //   const data = getSearchFilm(searchResult);
  //   console.log(data);
}

async function getSearchFilm(searchResult, pageNumber = 1) {
  const response = await axios.get(SEARCH_URL, {
    params: {
      api_key: API_KEY, //unic Key for API.
      query: searchResult, //- Search Value
      //   page: pageNumber, //: - Number of Pages.
    },
  });
  console.log(response.data);
  return response.data;
}
