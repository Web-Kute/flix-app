import { fetchAPIData } from './fetchapi.js';

const popularShows = document.getElementById('popular-shows');
// Display 20 most popular tv shows
export async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  results.map((show) => {
    popularShows.innerHTML += `
    <div class="card">
      <a href="tv-details.html?id=${show.id}">
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
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${show.first_air_date}</small><br>
          <small class="text-muted">Number of vote: ${show.vote_count}</small>
        </p>
      </div>
    </div>`;
  });
}
