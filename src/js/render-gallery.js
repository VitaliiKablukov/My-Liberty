import { IMG_URL } from "./render-home-page-gallery"
import { refs } from "./refs";

export function renderGallery(data, genres) {
    const markup = `<li class="gallery-item grid__item" id="${data.id}">
    <a class="movie-card__link grid__link" href="#">
        <img class="movie-card__image"
            src="${IMG_URL}${data.backdrop_path}" alt="title"
            loading="lazy" />
        <div class="movie-card__info">
            <h2 class="movie-card__title">${data.original_title}</h2>
            <p class="movie-card__info-item info-item__genres" id="${data.id}">
                ${genres}
                <span class="info-item info-item__date">| 2022</span>
            </p>

        </div>
    </a>
</li>`

    refs.gallery.insertAdjacentHTML('beforeend', markup)
}