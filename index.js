import { shuffle } from './js/shuffle.js';
import { fetchAPIData } from './js/fetchapi.js';
import { displayPopularMovies } from './js/movies.js';
import { displayPopularShows } from './js/shows.js';
import { displayMovieDetails } from './js/movie-details.js';
import { displayShowDetails } from './js/show-details.js';
import { displaySlider } from "./js/swiper-slider.js";

const global = {
  currentPage: window.location.pathname,
};

// Init App
async function init() {
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
      console.log('Search');
      break;
  }
  HighlightActiveLink();
}
init();

// Highlight active link
function HighlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}
