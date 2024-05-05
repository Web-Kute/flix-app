import { fetchAPIData } from './fetchapi.js';
const global = {
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

if (global.currentPage === '/index.html' || global.currentPage === '/flix-app/') {
  displayPopularMovies();
}
// Display 20 most popular movies
export async function displayPopularMovies() {
  const popularMovies = document.getElementById('popular-movies');
  const { results } = await fetchAPIData('movie/popular');
  results.map((movie) => {
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
