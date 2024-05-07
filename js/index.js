import { fetchAPIData } from './fetchapi.js';
import { displayPopularMovies } from './movies.js';
import { displayPopularShows } from './shows.js';
import { displayMovieDetails } from './movie-details.js';
import { displayShowDetails } from './show-details.js';
import { search } from './search.js';
import {
  highlightActiveLink,
  urlHash,
  shuffle,
  navMoviesSort,
  navShowsSort,
} from './utils.js';

async function awaitFetch(endpoint, type, displayCallBack) {
  const { results } = await fetchAPIData(endpoint);
  type = shuffle(results);
  displayCallBack(type);
}

async function reloadMoviesPage() {
  const { results } = await fetchAPIData('movie/popular');
  let movies = results;
  displayPopularMovies(movies);
}

async function reloadShowsPage() {
  const { results } = await fetchAPIData('tv/popular');
  let shows = results;
  displayPopularShows(shows);
}

// Init App
export async function init() {
  switch (urlHash) {
    case '':
    case 'index.html':
      awaitFetch('movie/popular', 'movies', displayPopularMovies);
      navMoviesSort.addEventListener('click', (e) => {
        if (e.target.id === 'reload-movies-btn') {
          reloadMoviesPage();
        }
      });
      break;
    case 'shows.html':
      awaitFetch('tv/popular', 'shows', displayPopularShows);
      navShowsSort.addEventListener('click', (e) => {
        if (e.target.id === 'reload-shows-btn') {
          reloadShowsPage();
        }
      });
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
