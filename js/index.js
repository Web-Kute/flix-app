import { fetchAPIData } from './fetchapi.js';
import { displayPopularMovies } from './movies.js';
import { displayPopularShows } from './shows.js';
import { displayMovieDetails } from './movie-details.js';
import { displayShowDetails } from './show-details.js';
import { search } from './search.js';
import { global, highlightActiveLink, urlHash, shuffle } from './utils.js';

// Init App
export async function init() {
  switch (urlHash) {
    case '/':
    case 'index.html':
      const { results } = await fetchAPIData('movie/popular');
      let movies = shuffle(results);
      displayPopularMovies(movies);
      break;
    case 'shows.html':
      // const { results } = await fetchAPIData('tv/popular');
      // const shows = shuffle(results);
      // displayPopularShows(shows);
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
