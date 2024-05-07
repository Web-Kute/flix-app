import { fetchAPIData } from './fetchapi.js';
import { displayPopularMovies } from './movies.js';
import { displayPopularShows } from './shows.js';
import { displayMovieDetails } from './movie-details.js';
import { displayShowDetails } from './show-details.js';
import { search } from './search.js';
import { global, highlightActiveLink, urlHash, shuffle } from './utils.js';

async function awaitFetch(endpoint, type, displayCallBack) {
  const { results } = await fetchAPIData(endpoint);
  type = shuffle(results);
  displayCallBack(type);
}

// Init App
export async function init() {
  switch (urlHash) {
    case '':
    case 'index.html':
      awaitFetch('movie/popular', 'movies', displayPopularMovies);
      break;
    case 'shows.html':
      awaitFetch('tv/popular', 'shows', displayPopularShows);
      break;
    case 'movie-details.html':
      // displayMovieDetails();
      break;
    case 'tv-details.html':
      // displayShowDetails();
      break;
    case 'search.html':
      // search();
      break;
  }
  highlightActiveLink();
}
init();
