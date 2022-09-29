import { refs } from './refs';
const modalBtn = document.querySelector('.modal_btn_list');

function onModalBtn(e) {
  let el = e.target;
  if (!el.classList.contains('modal_btn')) {
    return;
  }
  console.log(el);
}

function renderLibrary(params) {}

modalBtn.addEventListener('click', onModalBtn);
