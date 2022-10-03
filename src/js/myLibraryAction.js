import Notiflix from "notiflix"
import { refs } from "./refs"
import { createMarkupMyLibrary } from "./render-gallery"

import { getWatchedWithPagination, getQueueWithPagination } from "./pagination"

export function noFilm() {
    Notiflix.Notify.info('No films in this colection Queue', {
        position: 'right-bottom'
    })

}

export function btnLogicsMyLibrary(e) {
    if (e.target.nodeName !== "BUTTON") {
        return
    }
    if (e.target.dataset.id === "watched") {
        refs.gallery.innerHTML = ""

        changeBtnClass(e.target)

        if (refs.filmOfLocalStoragWatched) {
            // createMarkupMyLibrary(refs.filmOfLocalStoragWatched)
            getWatchedWithPagination(refs.filmOfLocalStoragWatched.length, page=1); 
        } else {
            Notiflix.Notify.info('No films in this colection Watched', {
                position: 'right-bottom'
            })
        }

    }
    if (e.target.dataset.id === "queue") {
        refs.gallery.innerHTML = ""
        changeBtnClass(e.target)

        if (refs.filmOfLocalStoragQueue) {
            // createMarkupMyLibrary(refs.filmOfLocalStoragQueue)
            getQueueWithPagination(refs.filmOfLocalStoragQueue.length, page=1); 

        } else {

            Notiflix.Notify.info('No films in this colection Queue', {
                position: 'right-bottom'
            })


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

