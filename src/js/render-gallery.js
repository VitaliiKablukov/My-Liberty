import { IMG_URL } from './constats';
import { refs } from './refs';

export function renderGallery(
  { id, backdrop_path, original_title, release_date },
  genres
) {
  const markup = `<li class="gallery-item grid__item" id="${id}">
    <a class="movie-card__link grid__link" href="${IMG_URL + backdrop_path}">
        <img class="movie-card__image"
            src="${IMG_URL}${backdrop_path}" alt="${original_title}"
            loading="lazy" />
        <div class="movie-card__info">
            <h2 class="movie-card__title">${original_title}</h2>
            <p class="movie-card__info-item info-item__genres" id="${id}">
                ${genres}
                <span class="info-item info-item__date">| ${release_date.substring(
                  0,
                  4
                )}</span>
            </p>
        </div>
        </a>
    </li>`;

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
