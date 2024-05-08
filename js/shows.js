import { fetchAPIData } from './fetchapi.js';
import { shuffle } from './shuffle.js';
import {
  highlightActiveLink,
  urlHash,
  highlightSortBtn,
  descVoteBtn,
  ascVoteBtn,
  shuffleVoteBtn,
  addReloadBtn,
  navShowsSort,
} from './utils.js';

if (urlHash === 'shows.html') {
  highlightActiveLink();
  highlightSortBtn();
}
const popularShows = document.getElementById('popular-shows');
// Display 20 most popular tv shows
export async function displayPopularShows(shows = [], page) {
  const { results } = await fetchAPIData('tv/popular', page);
  popularShows.innerHTML = '';

  const reloadShowsBtn = document.getElementById('reload-shows-btn');
  reloadShowsBtn === null ? addReloadBtn(navShowsSort, 'shows', 'Shows') : null;

  function displayShows() {
    shows.map((show) => {
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

  displayShows();

  ascVoteBtn.addEventListener('click', () => {
    shows = results.sort((a, b) => a.vote_count - b.vote_count);
    popularShows.innerHTML = '';
    displayShows();
  });

  descVoteBtn.addEventListener('click', () => {
    shows = results.sort((a, b) => b.vote_count - a.vote_count);
    popularShows.innerHTML = '';
    displayShows();
  });

  shuffleVoteBtn.addEventListener('click', () => {
    shows = shuffle(results);
    popularShows.innerHTML = '';
    displayShows();
  });

  navShowsSort.addEventListener('click', async (e) => {
    if (e.target.id === 'reload-movies-btn') {
      page = Math.floor(Math.random() * 400);
      const { results } = await fetchAPIData('tv/popular', page);
      shows = results;
      popularShows.innerHTML = '';
      displayShows();
    }
  });
}
