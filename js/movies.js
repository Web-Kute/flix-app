import { fetchAPIData } from './fetchapi.js';
import {
  global,
  highlightActiveLink,
  shuffle,
  urlHash,
  sortVoteBtn,
  voteBtnSmaller,
  voteBtnShuffle,
  voteBtnBigger,
} from './utils.js';

if (urlHash === 'index.html') {
  highlightActiveLink();
  sortVoteBtn();

  voteBtnBigger.addEventListener('click', async function () {
    const { results } = await fetchAPIData('movie/popular');
    const movies = results.sort((a, b) => a.vote_count - b.vote_count);
    popularMovies.innerHTML = '';
    displayPopularMovies(movies);
  });
  voteBtnSmaller.addEventListener('click', async function () {
    const { results } = await fetchAPIData('movie/popular');
    const movies = results.sort((a, b) => b.vote_count - a.vote_count);
    popularMovies.innerHTML = '';
    displayPopularMovies(movies);
  });
  voteBtnShuffle.addEventListener('click', async function () {
    const { results } = await fetchAPIData('movie/popular');
    const movies = shuffle(results);
    popularMovies.innerHTML = '';
    displayPopularMovies(movies);
  });
  //
}

const popularMovies = document.getElementById('popular-movies');
// Display 20 most popular movies
export async function displayPopularMovies(movies = []) {
  // const { results } = await fetchAPIData('movie/popular');

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
