import { fetchAPIData, page } from './fetchapi.js';
import { shuffle } from './shuffle.js';
import { init } from './index.js';
import {
  highlightActiveLink,
  urlHash,
  highlightSortBtn,
  descVoteBtn,
  ascVoteBtn,
  shuffleVoteBtn,
  addReloadBtn,
  navMoviesSort,
} from './utils.js';

if (urlHash === '' || urlHash === 'index.html') {
  highlightActiveLink();
  highlightSortBtn();
}

const popularMovies = document.getElementById('popular-movies');
// Display 20 most popular movies
export async function displayPopularMovies(movies = [], page) {
  const { results } = await fetchAPIData('movie/popular', page);
  popularMovies.innerHTML = '';
  const reloadMoviesBtn = document.getElementById('reload-movies-btn');
  reloadMoviesBtn === null
    ? addReloadBtn(navMoviesSort, 'movies', 'Movies')
    : null;

  function displayMovies() {
    movies.map((movie) => {
      return (popularMovies.innerHTML += `
    <div class="card">
      <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              widht="265">`
          : `<img
                src="./images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              widht="265">`
      }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small><br>
          <small class="text-muted">Number of vote: ${movie.vote_count}</small>
        </p>
      </div>
    </div>`);
    });
  }

  displayMovies();

  navMoviesSort.addEventListener('click', async (e) => {
    popularMovies.innerHTML = '';
    if (e.target.tagName === 'BUTTON') {
      switch (e.target.dataset.vote) {
        case 'Decreasing':
          movies = results.sort((a, b) => b.vote_count - a.vote_count);
          break;
        case 'Ascending':
          movies = results.sort((a, b) => a.vote_count - b.vote_count);
          break;
        case 'Shuffle':
          movies = shuffle(results);
          break;
        case 'Reload':
          init();
          shuffleVoteBtn.classList.add('active');
          ascVoteBtn.classList.remove('active');
          descVoteBtn.classList.remove('active');
        default:
          break;
      }
    }
    displayMovies();
  });
}
