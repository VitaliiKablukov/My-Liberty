(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-footer-modal-open]'),
    closeModalBtn: document.querySelector('[data-footer-modal-close]'),
    modal: document.querySelector('[data-footer-modal]'),
    backdrop: document.querySelector('[data-footer-backdrop]'),
    body: document.querySelector('body'),
    footerBackdrop: document.querySelector('.footer-backdrop'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.backdrop.classList.toggle('is-hidden');
    refs.modal.classList.toggle('is-hidden');
    if (!refs.footerBackdrop.classList.contains('is-hidden')) {
      refs.body.classList.add('no-scroll');
    }
    if (refs.footerBackdrop.classList.contains('is-hidden')) {
      refs.body.classList.remove('no-scroll');
    }
  }
})();
