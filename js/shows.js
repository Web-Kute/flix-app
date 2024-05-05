import { fetchAPIData } from './fetchapi.js';
export const global = {
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

if(global.currentPage === '/shows.html') {
  displayPopularShows();

}
// Display 20 most popular tv shows
export async function displayPopularShows() {
const popularShows = document.getElementById('popular-shows');
  const { results } = await fetchAPIData('tv/popular');
  results.map((show) => {
    return (popularShows.innerHTML += `
    <div class="card">
      <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              widht="265">`
          : `<img
                src="./images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
              widht="265">`
      }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${show.first_air_date}</small><br>
          <small class="text-muted">Number of vote: ${show.vote_count}</small>
        </p>
      </div>
    </div>`);
  });
}
