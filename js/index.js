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

async function reloadMoviesPage() {
  const page = Math.floor(Math.random() * 400) + 1;
  const { results } = await fetchAPIData('movie/popular', page);
  let movies = results;
  displayPopularMovies(movies, page);
}

async function reloadShowsPage() {
  const page = Math.floor(Math.random() * 200) + 1;
  const { results } = await fetchAPIData('tv/popular', page);
  let shows = results;
  displayPopularShows(shows, page);
}

// Init App
export async function init() {
  switch (urlHash) {
    case '':
    case 'index.html':
      let page = Math.floor(Math.random() * 400) + 1;
      awaitFetch('movie/popular', 'movies', displayPopularMovies, page);
      navMoviesSort.addEventListener('click', (e) => {
        if (e.target.id === 'reload-movies-btn') {
          reloadMoviesPage();
        }
      });
      break;
    case 'shows.html':
      page = Math.floor(Math.random() * 200) + 1;
      awaitFetch('tv/popular', 'shows', displayPopularShows, page);
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
