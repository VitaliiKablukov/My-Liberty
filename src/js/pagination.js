import { refs } from './refs';
import { createMarkupMyLibrary } from "./render-gallery";
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
  //  console.log('PaginateBtnClick id', page);
     if (refs.paginationList.classList.contains('pagination-popular')) {
         getPopularInLoadStartPage(page);
     } else if (refs.paginationList.classList.contains('pagination-search')) {
         getSearchWithPagination(page);
     } else if (refs.paginationList.classList.contains('pagination-watched')) {
        getWatchedWithPagination(refs.filmOfLocalStorageWatched.length, page);
     }else  if(refs.paginationList.classList.contains('pagination-queue')){
       getQueueWithPagination(refs.filmOfLocalStorageQueue.length, page);
    }
  };

export async function displayPagination(maxPages, page) {
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
        let threepoint = `<li class="pagination-list-item" ><button class="threepoint" disabled>...</button></li>`;
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
   
    if (page > max_page) {
      return;
    }

    displayPagination(max_page, page);
    
    renderHomePageGallery(page);
  }

export function getWatchedWithPagination(maxFilms, page) {
  
    let UlPagin=refs.paginationList;
    if (UlPagin.classList.contains('pagination-search')||UlPagin.classList.contains('pagination-popular')||UlPagin.classList.contains('pagination-queue')) {
            UlPagin.classList.remove('pagination-search');
            UlPagin.classList.remove('pagination-popular');
            UlPagin.classList.remove('pagination-queue');
            UlPagin.classList.add('pagination-watched');
    }
  
  let totalFilmsInPage = 9;
  let totalFilmsPages = Math.ceil(maxFilms / totalFilmsInPage);
  let arrData = refs.filmOfLocalStorageWatched;
  
   displayListFilms(arrData, totalFilmsInPage, page);  

  if (page > totalFilmsPages) return;

  if (maxFilms <= totalFilmsInPage) {
    refs.paginationList.innerHTML = '';
    // console.log('недостатня кількість фільмів для пагінації Watched');
    return;
  } 
    refs.paginationList.innerHTML = '';
  displayPaginationWatchedQueue(totalFilmsPages, page);
}
export function getQueueWithPagination(maxFilms, page) {
     
   let UlPagin=refs.paginationList;
    if (UlPagin.classList.contains('pagination-search')||UlPagin.classList.contains('pagination-popular')||UlPagin.classList.contains('pagination-watched')) {
            UlPagin.classList.remove('pagination-search');
            UlPagin.classList.remove('pagination-popular');
            UlPagin.classList.remove('pagination-watched');
            UlPagin.classList.add('pagination-queue');
    }
    
  let totalFilmsInPage = 9;
  let totalFilmsPages = Math.ceil(maxFilms / totalFilmsInPage);
  let arrData = refs.filmOfLocalStorageQueue;
  // arrData = [];//test
  displayListFilms(arrData, totalFilmsInPage, page);

  if (page > totalFilmsPages) return;
  if (maxFilms <= totalFilmsInPage) {
    refs.paginationList.innerHTML = ''; 
    // console.log('недостатня кількість фільмів для пагінації Queue');
    return;
  } 
  refs.paginationList.innerHTML = '';
  displayPaginationWatchedQueue(totalFilmsPages, page);
}
 
function displayPaginationWatchedQueue(maxFilmsPages, page) {
  let paginationToDisplay = "";
  if (maxFilmsPages === 0) return;
    let currentPage = Number(page);
    let totalPages = Number(maxFilmsPages);
    if (totalPages <= 1) {refs.paginationList.innerHTML = ''; return;  }
    if (totalPages > 1) {
        refs.paginationList.innerHTML = '';
        
        if (currentPage > 1) {
            const template = `<li class="pagination-list-item btn-pag-left" id="${currentPage - 1
                }"><</li>`;
            paginationToDisplay += template;
        } 
        if (totalPages <= 4) {
        for (let i = 1; i <= totalPages; i++) {
          paginationToDisplay += `<li class="pagination-list-item ${i === currentPage ? "pag-activ" : ""
                                  }" id="${i}">${i}</li>`;
        }
        } else {
        let initialI = Math.max(1, currentPage - 2);
        let endI = Math.min(initialI + 3, totalPages-1);
          for (let i = initialI; i <= endI; i++) {
            const template = `<li class="pagination-list-item ${
                                      i === currentPage ? "pag-activ" : ""
                                    }" id="${i}">${i}</li>`;
              paginationToDisplay += template;
          }
        }
      if (currentPage === totalPages) {
        paginationToDisplay += ``;
      }
      else {
        const template = `<li class="pagination-list-item btn-pag-right" id="${currentPage + 1}">></li>`;
        paginationToDisplay += template;
      }
        let BtnPagination = `${paginationToDisplay}`;
        refs.paginationList.insertAdjacentHTML('afterbegin', BtnPagination);
    }
  refs.paginationList.addEventListener('click', onPaginateBtnClick);
    return;
}
function displayListFilms(arrData, totalFilmsInPage, page) {
  refs.gallery.innerHTML = '';
  if (arrData.length === 0) {
    renderBlockEmpty();
    return;
  } 
  page--;
  
  const start = totalFilmsInPage * page;
  const end = start + totalFilmsInPage;
  const paginatedData = arrData.slice(start, end);
  createMarkupMyLibrary(paginatedData);
  // console.log('відпрацювала функція displayListFilms');
}

export function renderBlockEmpty() {
    
  if (!refs.miLibraryHeader.classList.contains('is-hidden')) return;
    refs.miLibraryHeader.innerText = 'Movies create the mood! Choose your mood!';
    refs.miLibraryHeader.classList.remove('is-hidden');
    refs.paginationList.innerHTML = '';
    refs.gallerySection.classList.add('ukraine');
}
export function removeBlockEmpty() {
  if (refs.gallerySection.classList.contains('ukraine')) {
    refs.gallerySection.classList.remove('ukraine');
    refs.miLibraryHeader.classList.add('is-hidden');
  }
  return;
}
