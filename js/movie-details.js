import { hightLightMenu } from './index.js';
import { fetchAPIData } from './fetchapi.js';

export async function displayMovieDetails(id) {
  const movieId = window.location.search.split('id=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);
  const { cast } = await fetchAPIData(`movie/${movieId}/credits`);

  // overlay details
  displayBackgroundImage('movie', movie.backdrop_path);

  const movieDetails = document.getElementById('movie-details');
  const showDetails = document.getElementById('show-details');

  function displayBackgroundImage(type, imagePath) {
    const overlay = document.createElement('div');
    overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${imagePath})`;
    overlay.style.backgroundSize = 'cover';
    overlay.style.position = 'absolute';
    overlay.style.backgroundPosition = 'center';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.zIndex = -1;
    overlay.style.opacity = 0.1;
    if (type === 'movie') {
      document.body.appendChild(overlay);
    } else if (type === 'show') {
      document.getElementById('show-details').appendChild(overlay);
    }
  }

  movieDetails.innerHTML = `<div class="details-top">
    <div>
      ${
        movie.poster_path
          ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              widht="400" height="600">`
          : `<img
                src="./images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              widht="400" height="600">`
      }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
         ${'⭐'.repeat(movie.vote_average)}
        ${movie.vote_average.toFixed(1)}
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<span>${genre.name}</span>`).join(', ')}
      </ul>
      <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $${numberWithCommas(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
    <h4>Production Companies</h4>
    <ul class="list-group">
      ${movie.production_companies.map((company) => `<li>${company.name}</li>`).join('')}
    </ul>
    <h4>Cast</h4>
      ${cast
        .map((casting) => {
          return `<span>${casting.name}</span>`;
        })
        .join(', ')}
  </div>`;
  hightLightMenu('movie');
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
