import { refs } from './refs';

import { renderHomePageGallery } from './render-home-page-gallery';
import { getTrendingFilms } from './search_film';


  export function renderPaginationBtn(e, page) {
    
    refs.pagination.innerHTML = '';
    const per_page_max = e;
    
    console.log('renderPaginationBtn page - ', page);
    let current_page=page;
    
    
    
    function appendBtn(i, threepoint) {
        const activeBtn = current_page === i;
        
        const liPagin = document.createElement('li');
        liPagin.id = `${i}`;
        liPagin.classList.add('pagination-list-item');

        if (threepoint === true) {
            liPagin.innerHTML = '...';
            liPagin.disabled = true;
            refs.pagination.append(liPagin);
            return false;
        }

        if (activeBtn) liPagin.classList.add('pag-activ');
        

         liPagin.disabled = activeBtn;
        liPagin.innerHTML = i;
        liPagin.addEventListener('click', () => {
            current_page = i;
            refs.pagination.innerHTML = '';
            logicPaginationBtn();
        });
        refs.pagination.append(liPagin);
       
    }
  
    logicPaginationBtn();
   
      function logicPaginationBtn() {
        
        if (per_page_max === 1) { 
        return;
        }
        appendBtn(1);
        if (per_page_max === 2) {
            appendBtn(2);
            return;
        }
        if (per_page_max > 2 && per_page_max <= 3) {
            appendBtn(2);
            appendBtn(3);
            return;
        }
        if (per_page_max > 3 && per_page_max < 7) {
            for (let i = 2; i <= per_page_max; i += 1) {
                appendBtn(i);
            }
            return;
        }
        if (per_page_max < 8) {
            for (let i = 2; i <= per_page_max; i++) {
                appendBtn(i);
        }
            return;
        }
            
        if (current_page < 6) {
        appendBtn(2);
        appendBtn(3);
        appendBtn(4);
        appendBtn(5);
        appendBtn(6);
        appendBtn(7);
        appendBtn(current_page, true);
        } else if (current_page <= per_page_max - 5) {
        appendBtn(current_page, true);
        appendBtn(current_page - 2);
        appendBtn(current_page - 1);
        appendBtn(current_page);
        appendBtn(current_page + 1);
        appendBtn(current_page + 2);
        appendBtn(current_page, true);
        } else {
        appendBtn(current_page, true);
        appendBtn(per_page_max - 6);
        appendBtn(per_page_max - 5);
        appendBtn(per_page_max - 4);
        appendBtn(per_page_max - 3);
        appendBtn(per_page_max - 2);
        appendBtn(per_page_max - 1);
        }
        appendBtn(per_page_max);
    }
}


export async function onPaginateBtnClick(e) {
    // console.log('onPaginateBtnClick(e): ',e.target.nodeName);
    if (e.target.nodeName !== 'LI') {
        return;
    }
    refs.gallery.innerHTML = '';
    let pageNum = e.target.innerText;
               
    
       const trendsFilms =await getTrendingFilms(pageNum).then(data => data);
    const max_page = trendsFilms.total_pages;
    
    renderHomePageGallery(pageNum);
    renderPaginationBtn(max_page, pageNum);
    if (document.querySelectorAll('.pagination-list-item').id = pageNum) {
        
         document.getElementById(`${pageNum}`).classList.add('pag-activ');
            console.log('.pag-activ', document.querySelector('.pag-activ'));
            }
          
}