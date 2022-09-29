import bootstrap from 'bootstrap'

//loader
const cardsLoader = document.querySelector('.cards-loader');

function hideCardsLoader() {
    cardsLoader.classList.add('d-none')
}

function showCardsLoader() {
    cardsLoader.classList.remove('d-none')
    cardsLoader.classList.add('d-flex')
}

