import { refs } from "./refs"

export function btnLogicsMyLibrary(e) {
    if (e.target.dataset.id === "watched") {

        // // e.target.classList.remove('btn--transparent')
        // // e.target.classList.add('btn--colored')
        // previousTargetQue.classList.remove('btn--colored')
        // previousTargetQue.classList.add('btn--transparent')

        refs.gallery.innerHTML = ""
        createMarkupMyLibrary(refs.filmOfLocalStoragWatched)


    } if (e.target.dataset.id === "queue") {

        // e.target.classList.remove('btn--transparent')

        // e.target.classList.add('btn--colored')
        // // previousTargetWatch.classList.add('btn--transparent')
        // // previousTargetWatch.classList.remove('btn--colored')

        refs.gallery.innerHTML = ""
        createMarkupMyLibrary(refs.filmOfLocalStoragQueue)

    }
}