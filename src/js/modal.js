
(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-footer-modal-open]'),
    closeModalBtn: document.querySelector('[data-footer-modal-close]'),
    modal: document.querySelector('[data-footer-modal]'),
    backdrop: document.querySelector('[data-footer-backdrop]'),
    body: document.querySelector('body'),
    footerBackdrop: document.querySelector('.footer-backdrop'),
    btnScrollToTop: document.querySelector('.scrollToTopBtn')

  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.backdrop.classList.toggle('is-hidden');
    refs.modal.classList.toggle('is-hidden');
    if (!refs.footerBackdrop.classList.contains('is-hidden')) {
      refs.body.style.overflowY = 'hidden';
      refs.btnScrollToTop.style.display = "none";
      refs.footerBackdrop.addEventListener('click', closeModal)
      window.addEventListener('keydown', closeModalEsc)

    }
    if (refs.footerBackdrop.classList.contains('is-hidden')) {
      // refs.backdrop.removeEventListener('click', closeModal)
      refs.body.style.overflowY = 'visible';
      refs.btnScrollToTop.style.display = "block";
      refs.footerBackdrop.removeEventListener('click', closeModal)
      window.removeEventListener('keydown', closeModalEsc)

    }
  }

  function closeModal() {
    refs.footerBackdrop.classList.add('is-hidden');
    refs.modal.classList.add('is-hidden');
    refs.footerBackdrop.removeEventListener('click', closeModal)
    refs.body.style.overflowY = 'visible';
    refs.btnScrollToTop.style.display = "block";
    window.removeEventListener('keydown', closeModalEsc)
  }
  function closeModalEsc(e) {
    if (e.code === 'Escape') {
      closeModal()

    }
  }
})();




