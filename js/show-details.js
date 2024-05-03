import { hightLightMenu } from '../index.js';
import { fetchAPIData } from './fetchapi.js';

export async function displayShowDetails(id) {
  const showId = window.location.search.split('id=')[1];

  const show = await fetchAPIData(`tv/${showId}`);
  const { cast } = await fetchAPIData(`tv/${showId}/credits`);

  // overlay details
  displayBackgroundImage('show', show.backdrop_path);

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
      document.body.appendChild(overlay);
    }
  }

  showDetails.innerHTML = `<div class="details-top">
  <div>
    ${
      show.poster_path
        ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
        : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>

      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)}
      </p>
      <p class="text-muted">First Air Date: ${show.first_air_date}</p>
      <p>
        ${show.overview !== '' ? show.overview : 'No overview provided.'}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
    </div>
    <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
      <li>
        <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
      </li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <ul class="list-group">${show.production_companies.map((company) => `<li>${company.name}</li>`).join('')}</ul>
    <h4>Cast</h4>
          ${cast
            .map((casting) => {
              return `<span>${casting.name}</span>`;
            })
            .join(', ')}
  </div>`;
  hightLightMenu('tv');
}
