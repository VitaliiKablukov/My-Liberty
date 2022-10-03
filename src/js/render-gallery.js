import { IMG_URL } from './constats';
import { refs } from './refs';

export function renderGallery(data, genres) {
  const markup = `<li class="gallery-item grid__item" id="${data.id}">
    <a class="movie-card__link grid__link" href="#">
        <img class="movie-card__image"
            src="${IMG_URL}${
    data.poster_path
  } " onerror='this.onerror=null; this.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MIFyyHI37_Zt-rcG3udAQkvkvg60miBzJA&usqp=CAU"' alt="${
    data.original_title
  }"
            loading="lazy" />
        <div class="movie-card__info">
            <h2 class="movie-card__title">${data.original_title}</h2>
            <p class="movie-card__info-item info-item__genres" id="${data.id}">
                ${genres}
                <span class="info-item info-item__date">| ${data.release_date.substring(
                  0,
                  4
                )}</span>
            </p>
        </div>
        </a>
    </li>`;

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export function renderGalleryItem(data) {
  const savedGenres = JSON.parse(localStorage.getItem('genres'));
  const markup = data.reduce(
    (
      acc,
      {
        id,
        backdrop_path,
        original_title,
        genre_ids,
        release_date,
        poster_path,
      }
    ) => {
      const genreStr = genre_ids
        .map(id => {
          return savedGenres.find(genre => {
            if (genre.id === id) {
              return genre.name;
            }
          }).name;
        })
        .join(', ');
      release_date = release_date ? release_date : '    ';
      return (
        acc +
        `<li class="gallery-item grid__item" id="${id}">
    <a class="movie-card__link grid__link" data-img="${backdrop_path}"  href="#">
        <img class="movie-card__image"
            src="${IMG_URL}${poster_path}" onerror='this.onerror=null; this.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MIFyyHI37_Zt-rcG3udAQkvkvg60miBzJA&usqp=CAU"' alt="${original_title}"
            loading="lazy" />
        <div class="movie-card__info">
            <h2 class="movie-card__title">${original_title}</h2>
            <p class="movie-card__info-item info-item__genres" id="${data.id}">
                ${genreStr}
                <span class="info-item info-item__date">| ${release_date.substring(
                  0,
                  4
                )}</span>
            </p>
        </div>
        </a>
    </li>`
      );
    },
    ''
  );

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function isImg(img_poster_path) {}

export function createMarkupMyLibrary(data) {
  const myLibraryMarkup = data.reduce((acc, film) => {
    const {
      id,
      backdrop_path,
      original_title,
      genres,
      release_date,
      poster_path,
      vote_average,
    } = film.film;

    const genreStr = genres
      .map(genre => {
        return genre.name;
      })
      .join(', ');
    return (
      acc +
      `<li class="gallery-item grid__item" id="${id}">
    <a class="movie-card__link grid__link" data-img="${backdrop_path}"  href="#">
        <img class="movie-card__image"
            src="${IMG_URL}${poster_path}" onerror='this.onerror=null; this.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MIFyyHI37_Zt-rcG3udAQkvkvg60miBzJA&usqp=CAU"' alt="${original_title}"
            loading="lazy" />
        <div class="movie-card__info">
            <h2 class="movie-card__title">${original_title}</h2>
            <div>
                 <p class="movie-card__info-item info-item__genres" id="${
                   data.id
                 }">
                ${genreStr} 
                <span class="info-item info-item__date">| ${release_date.substring(
                  0,
                  4
                )}</span>
                <span class="film_item_parameter">${vote_average.toFixed(
                  1
                )}</span>

            </p>
        </div>
        </a>
    </li>`
    );
  }, '');

  refs.gallery.insertAdjacentHTML('beforeend', myLibraryMarkup);
}
