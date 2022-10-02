import { refs } from './refs';

import { renderHomePageGallery } from './render-home-page-gallery';
import { getTrendingFilms, getSearchWithPagination } from './search_film';

/* Ця функція є зворотним викликом прослуховувача подій клацання посилання на сторінку
   *  він запускається, коли ви натискаєте іншу сторінку.
   */
 export async function onPaginateBtnClick (event) {
     // дозволяє отримати ідентифікатор елемента, на якому ми клацнули
    // корисно для отримання номера сторінки
     if (event.target.nodeName !== 'LI') return;

     refs.gallery.innerHTML = '';
     let page = event.target.getAttribute('id');
     console.log('PaginateBtnClick id', page);
     if (refs.paginationList.classList.contains('pagination-popular')) {
         getPopularInLoadStartPage(page);
     } else if (refs.paginationList.classList.contains('pagination-search')) {
         getSearchWithPagination(page);
     } else if (refs.paginationList.classList.contains('pagination-watched')) {
        getWatchedWithPagination(page);
     }else  if(refs.paginationList.classList.contains('pagination-queue')){
        getQueueWithPagination(page);
    }
  };

   export async function displayPagination (maxPages, page) {
    let paginationToDisplay = "";
    let currentPage = Number(page);
    let totalPages = Number(maxPages);
    if (totalPages <= 1) {refs.paginationList.innerHTML = ''; return;  }
    if (totalPages > 1) {
        refs.paginationList.innerHTML = '';
        let startP = `<li class="pagination-list-item ${1 === currentPage? "pag-activ": ""
                                  }" id="${1}">${1}</li>`;
        let endP = `<li class="pagination-list-item ${totalPages === currentPage? "pag-activ": ""
                                  }" id="${totalPages}">${totalPages}</li>`;
        let threepoint = `<li class="pagination-list-item" disabled="true">...</li>`;
        if (currentPage > 1&currentPage<=4) {
            const template = `<li class="pagination-list-item btn-pag-left" id="${currentPage - 1
                }"><</li>`;
            paginationToDisplay += template;
        } else if(currentPage >4){
          const template = `<li class="pagination-list-item btn-pag-left" id="${currentPage - 1
                }"><</li>${startP}${threepoint}`;
            paginationToDisplay += template;
       }
        if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) {
          paginationToDisplay += `<li class="pagination-list-item ${i === currentPage ? "pag-activ" : ""
                                  }" id="${i}">${i}</li>`;
        }
        } else {
        let initialI = Math.max(1, currentPage - 3);
        let endI = Math.min(initialI + 5, totalPages-1);
          for (let i = initialI; i <= endI; i++) {
            const template = `<li class="pagination-list-item ${
                                      i === currentPage ? "pag-activ" : ""
                                    }" id="${i}">${i}</li>`;
              paginationToDisplay += template;
          }
        }
      if (currentPage === totalPages) {
        paginationToDisplay += `${endP}`;
      }
      else if (currentPage >= (totalPages - 3)){
        const template = `${endP}<li class="pagination-list-item btn-pag-right" id="${currentPage + 1}">></li>`;
        paginationToDisplay += template;
      }
      else {
            const template = `${threepoint}${endP}<li class="pagination-list-item btn-pag-right" id="${currentPage + 1}">></li>`;
            paginationToDisplay += template;
        }
        let BtnPagination = `${paginationToDisplay}`;
        refs.paginationList.insertAdjacentHTML('afterbegin', BtnPagination);
    }
    return;
  };

  export async function getPopularInLoadStartPage(page) {

    if (page === 1) {
        refs.gallery.innerHTML = '';
    }
    let UlPagin=refs.paginationList;
    if (UlPagin.classList.contains('pagination-search')||UlPagin.classList.contains('pagination-watched')||UlPagin.classList.contains('pagination-queue')) {
            UlPagin.classList.remove('pagination-search');
            UlPagin.classList.remove('pagination-watched');
            UlPagin.classList.remove('pagination-queue');
            UlPagin.classList.add('pagination-popular');
    }
    const trendsFilms =await getTrendingFilms(page).then(data => data);
    const max_page = trendsFilms.total_pages;
    // console.log('max_page', max_page);
    if (page > max_page) {
      return;
    }

    displayPagination(max_page, page);
    // refs.pagination.addEventListener('click', onPaginateBtnClick);
    renderHomePageGallery(page);
  }

function getWatchedWithPagination(page) {
    refs.gallery.innerHTML = '';
     let UlPagin=refs.paginationList;
    if (UlPagin.classList.contains('pagination-search')||UlPagin.classList.contains('pagination-popular')||UlPagin.classList.contains('pagination-queue')) {
            UlPagin.classList.remove('pagination-search');
            UlPagin.classList.remove('pagination-popular');
            UlPagin.classList.remove('pagination-queue');
            UlPagin.classList.add('pagination-watched');
    }
    refs.paginationList.innerHTML = '';
    console.log(' пагінацію додамо після написанні функціоналу Watched',page );
    alert(' пагінацію додамо після написанні функціоналу  Watched');

}
 function getQueueWithPagination(page) {
    refs.gallery.innerHTML = '';
     let UlPagin=refs.paginationList;
    if (UlPagin.classList.contains('pagination-search')||UlPagin.classList.contains('pagination-popular')||UlPagin.classList.contains('pagination-watched')) {
            UlPagin.classList.remove('pagination-search');
            UlPagin.classList.remove('pagination-popular');
            UlPagin.classList.remove('pagination-watched');
            UlPagin.classList.add('pagination-queue');
    }
     refs.paginationList.innerHTML = '';
     console.log(' пагінацію додамо після написанні функціоналу Queue', page);
    alert(' пагінацію додамо після написанні функціоналу Queue');
 }