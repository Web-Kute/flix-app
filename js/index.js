import { fetchAPIData, page } from './fetchapi.js';
import { displayPopularMovies } from './movies.js';
import { displayPopularShows } from './shows.js';
import { displayMovieDetails } from './movie-details.js';
import { displayShowDetails } from './show-details.js';
import { search } from './search.js';
import {
  highlightActiveLink,
  urlHash,
  navMoviesSort,
  navShowsSort,
} from './utils.js';

async function awaitFetch(endpoint, type, displayCallBack, page) {
  const { results } = await fetchAPIData(endpoint, page);
  type = results;
  displayCallBack(type, page);
}

// Init App
export async function init() {
  const page = Math.floor(Math.random() * 400) + 1;
  switch (urlHash) {
    case '':
    case 'index.html':
      awaitFetch('movie/popular', 'movies', displayPopularMovies, page);
      break;
    case 'shows.html':
      awaitFetch('tv/popular', 'shows', displayPopularShows, page);
      break;
    case 'movie-details.html':
      break;
    case 'tv-details.html':
      break;
    case 'search.html':
      break;
  }
  highlightActiveLink();
}
init();
