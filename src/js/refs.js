export let refs = {
  gallery: document.querySelector('.gallery-list'),
  searchForm: document.querySelector('.search-box'),
  pagination: document.querySelector('.pagination-popular'),
  paginationList: document.querySelector('.pagination-list'),
  paginationSearch: document.querySelector('.pagination-search'),
  // paginationWatched: document.querySelector('.pagination-watched'), //не видаляти - це заготовка для пагінаціі на сторінці watched
  // paginationQueue: document.querySelector('.pagination-queue'),//не видаляти  - це заготовка для пагінаціі на сторінці queue
  searchButton: document.querySelector('.search-button'),
  searchErrorNotification: document.querySelector('.search-box-notification'),
  signInButton: document.querySelector('.js-nav__btn--signIn'),
  signOutButton: document.querySelector('.js-nav__btn--signOut'),
  myLibraryNavLink: document.querySelector('.js-library-link'),
  buttonModalClose: document.querySelector('[data-modalfilm-close]'),
  backdropEl: document.querySelector('.backdrop-film'),
  modalFilm: document.querySelector('.modal-film'),
  renderModalBox: document.querySelector('.modal-render-box'),
  filmOfLocalStoragWatched: JSON.parse(localStorage.getItem('Watched')),
  filmOfLocalStoragQueue: JSON.parse(localStorage.getItem('Queue')),
  headerOnMainPage: document.querySelector('.header'),
  bodyEl: document.querySelector('body'),
};
