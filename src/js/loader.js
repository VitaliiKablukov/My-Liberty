import bootstrap from 'bootstrap'
export { hideCardsLoader, showCardsLoader }
//loader
const cardsLoader = document.querySelector('.cards-loader');

function hideCardsLoader() {
    cardsLoader.classList.add('d-none')
    cardsLoader.classList.remove('d-flex')
}

function showCardsLoader() {
    cardsLoader.classList.remove('d-none')
    cardsLoader.classList.add('d-flex')
}

