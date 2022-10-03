import Notiflix from "notiflix"
import { refs } from "./refs"
import { createMarkupMyLibrary } from "./render-gallery"

import { getWatchedWithPagination, getQueueWithPagination, renderBlockEmpty} from "./pagination"

export function noFilm() {
    Notiflix.Notify.info('No films in this colection Queue', {
        position: 'right-bottom'
    })
    renderBlockEmpty();
}

export function btnLogicsMyLibrary(e) {
    if (e.target.nodeName !== "BUTTON") {
        return
    }
    if (e.target.dataset.id === "watched") {
        refs.gallery.innerHTML = ""

        changeBtnClass(e.target)

        if (refs.filmOfLocalStorageWatched) {
            
            getWatchedWithPagination(refs.filmOfLocalStorageWatched.length, page=1); 
        } else {
            Notiflix.Notify.info('No films in this colection Watched', {
                position: 'right-bottom'
            });
            renderBlockEmpty();
        }

    }
    if (e.target.dataset.id === "queue") {
        refs.gallery.innerHTML = ""
        changeBtnClass(e.target)

        if (refs.filmOfLocalStorageQueue) {
            
            getQueueWithPagination(refs.filmOfLocalStorageQueue.length, page=1); 

        } else {

            Notiflix.Notify.info('No films in this colection Queue', {
                position: 'right-bottom'
            });
            renderBlockEmpty();

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

