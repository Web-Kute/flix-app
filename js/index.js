import { displayPopularMovies } from './movies.js';
import { displayPopularShows } from './shows.js';
import { displayMovieDetails } from './movie-details.js';
import { displayShowDetails } from './show-details.js';
import { search } from './search.js';
import { global, highlightActiveLink } from './utils.js';

// Init App
export async function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      // displayPopularMovies();
      break;
    case '/shows.html':
      // displayPopularShows();
      break;
    case '/movie-details.html':
      // displayMovieDetails();
      break;
    case '/tv-details.html':
      // displayShowDetails();
      break;
    case '/search.html':
      // search();
      break;
  }
  highlightActiveLink();
}
init();

