import { IMG_URL } from './constats';
import { refs } from './refs';

export function renderGallery(data, genres) {
  const markup = `<li class="gallery-item grid__item" id="${data.id}">
    <a class="movie-card__link grid__link" href="#">
        <img class="movie-card__image"
            src="${IMG_URL}${data.poster_path}" alt="${data.original_title}"
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

      return (
        acc +
        `<li class="gallery-item grid__item" id="${id}">
    <a class="movie-card__link grid__link" data-img="${poster_path}"  href="#">
        <img class="movie-card__image"
            src="${IMG_URL}${backdrop_path}" alt="${original_title}"
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
