// import { shuffle } from './js/shuffle.js';
// import { fetchAPIData } from './js/fetchapi.js';
import { displayPopularMovies } from './movies.js';
import { displayPopularShows } from './shows.js';
import { displayMovieDetails } from './movie-details.js';
import { displayShowDetails } from './show-details.js';
import { search } from './search.js';

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

// Init App
export async function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }
  HighlightActiveLink();
}
init();

export function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
export function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}
// Highlight active link
function HighlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}
export function hightLightMenu(type) {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.dataset.link === type ? link.classList.add('active') : null;
  });
}
