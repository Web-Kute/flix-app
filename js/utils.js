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

export const descVoteBtn = document.getElementById('desc-vote-btn');
export const shuffleVoteBtn = document.getElementById('shuffle-vote-btn');
export const ascVoteBtn = document.getElementById('asc-vote-btn');
export const reloadShowsPageBtn = document.getElementById('reload-shows-page');
export const backBtn = document.getElementById('back-btn');

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

export const navMoviesSort = document.getElementById('movies-sort');
export const navShowsSort = document.getElementById('shows-sort');

export function addReloadBtn(nav, type, name) {
  const button = document.createElement('button');
  button.id = `reload-${type}-btn`;
  button.className = 'btn';
  button.innerText = `Reload ${name}`;
  button.dataset.vote = 'Reload';
  nav.appendChild(button);
}
