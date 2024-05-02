import { fetchAPIData } from './fetchapi.js';
import { shuffle } from './shuffle.js';

// Display 20 most popular movies
export async function displayPopularMovies() {
  const popularMovies = document.getElementById('popular-movies');
  const { results } = await fetchAPIData('movie/popular');
console.log(results);
  results.map((movie) => {
    popularMovies.innerHTML += `
    <div class="card">
      <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
          : `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`
      }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small><br>
          <small class="text-muted">Number of vote: ${movie.vote_count}</small>
        </p>
      </div>
    </div>`;
  });
}
