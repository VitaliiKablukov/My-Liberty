import axios from "axios";
import { IMG_URL } from "./constats"
import { refs } from "./refs"

export async function renderModal(event) {
    event.preventDefault()
    if(!event.target.closest(".gallery-item")){
        return
    }
    window.addEventListener("keydown", onEscClose)
    refs.backdropEl.classList.remove("is-hidden")
    let itemId = event.target.closest(".gallery-item").getAttribute("id");

    const fetchChoosenFilm = await axios.get(`https://api.themoviedb.org/3/movie/${itemId}?api_key=7e0fc0f40a1f522dce260b9a97593bef&language=en-US`)
    const filmForModal = fetchChoosenFilm.data
    const genresFilm = Object.values(filmForModal.genres)[0].name;

    const modalLayout = `<img class="film_modal_img" src="${IMG_URL}${filmForModal.backdrop_path}" alt="${filmForModal.original_title}" />
    <div class="modal__content">
      <h1 class="film_modal_title">${filmForModal.title}</h1>
      <ul class="film_info_list">
          <li class="film_info_item">
          <p class="film_item_category">Vote/Votes </p>
          <p class="film_item_category">Popularity </p>
          <p class="film_item_category">Original Title </p>
          <p class="film_item_category">Genre </p></li>
          <li class="film_info_item">
            <p class="film_item_parameters">${filmForModal.vote_average} / ${filmForModal.vote_count}</p>
            <p class="film_item_parameters">${filmForModal.popularity}</p>
            <p class="film_item_parameters">${filmForModal.original_title}</p>
            <p class="film_item_parameters">${genresFilm}</p>
          </li>
      </ul>
      <h2 class="modal_about_head">About</h2>
      <p class="modal_about_text">${filmForModal.overview}</p>
      <ul class="modal_btn_list">
          <li class="modal_btn_item"><button class="modal_btn" type="button">add to Watched</button></li>
          <li class="modal_btn_item"><button class="modal_btn" type="button">add to queue</button></li>
      </ul>
    </div>`
    
    refs.modalFilm.insertAdjacentHTML("beforeend", modalLayout)
}

refs.buttonModalClose.addEventListener("click", onModalButtonClose)
refs.backdropEl.addEventListener("click", onBackdropClose)

function onModalButtonClose() {
    refs.backdropEl.classList.add("is-hidden")
    refs.modalFilm.innerHTML = ""
}

function onEscClose(event) {
    if(event.code === "Escape") {
        window.removeEventListener("keydown", onEscClose)
        onModalButtonClose()
    }
}

function onBackdropClose(event) {
if(event.currentTarget === event.target) {
    onModalButtonClose()
}
}