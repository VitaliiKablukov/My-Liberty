import Notiflix from "notiflix"
import { refs } from "./refs"
import { createMarkupMyLibrary } from "./render-gallery"


export function notFind() {
    Notiflix.Notify.info('No aded film')
}
export function btnLogicsMyLibrary(e) {
    if (e.target.nodeName !== "BUTTON") {
        return
    }
    if (e.target.dataset.id === "watched") {
        refs.gallery.innerHTML = ""

        changeBtnClass(e.target)

        if (refs.filmOfLocalStoragWatched) {
            createMarkupMyLibrary(refs.filmOfLocalStoragWatched)

        } else {
            Notiflix.Notify.info('No films in this colection Watched')
        }

    }
    if (e.target.dataset.id === "queue") {
        refs.gallery.innerHTML = ""
        changeBtnClass(e.target)

        if (refs.filmOfLocalStoragQueue) {
            createMarkupMyLibrary(refs.filmOfLocalStoragQueue)

        } else {
            Notiflix.Notify.info('No films in this colection Queue')


        }
    }


    function changeBtnClass(currentObject) {
        const previousActiveBtn = document.querySelector('.btn--colored')
        previousActiveBtn.classList.remove('btn--colored')
        previousActiveBtn.classList.add('btn--transparent')
        previousActiveBtn.removeAttribute('disabled', '')
        currentObject.classList.remove('btn--transparent')
        currentObject.classList.add('btn--colored')
        e.target.setAttribute('disabled', '')
    }
}

