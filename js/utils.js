export const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    key: 'f52b3a868de5d7fcd5533c09cd6598b9',
    url: 'https://api.themoviedb.org/3/',
  },
};

export const voteBtnSmaller = document.getElementById('vote-btn-smaller');
export const voteBtnShuffle = document.getElementById('vote-btn-shuffle');
export const voteBtnBigger = document.getElementById('vote-btn-bigger');

export const reloadShowsPageBtn = document.getElementById('reload-shows-page');

const urlPath = global.currentPage.split('/', -2);
export const urlHash = urlPath[urlPath.length - 1];

export function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

export function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
export function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (
      link.getAttribute('href') === urlHash ||
      urlHash.includes(link.dataset.link)
    ) {
      link.classList.add('active');
    }
  });
}

export function highlightSortBtn() {
  const btnVote = document.querySelectorAll('.btn-vote');
  btnVote.forEach((button) => {
    button.addEventListener('click', (e) => {
      btnVote.forEach((button) => button.classList.remove('active'));
      e.target.classList.add('active');
    });
  });
}

/**
 * @param {array} array
 * @description shuffles arrays to randomize movie order
 * @description Fisher-Yates
 */
export function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export const navMoviesSort = document.getElementById('movies-sort');
export const navShowsSort = document.getElementById('shows-sort');

export function addReloadBtn(nav, type, name) {
    const button = document.createElement('button');
    button.id = `reload-${type}-btn`;
    button.className = 'btn';
    button.innerText = `Reload ${name}`;
    nav.appendChild(button);
}
