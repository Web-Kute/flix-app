import { fetchAPIData } from './fetchapi.js';
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

  navShowsSort.addEventListener('click', async (e) => {
    popularShows.innerHTML = '';
    if (e.target.tagName === 'BUTTON') {
      switch (e.target.dataset.vote) {
        case 'Decreasing':
          shows = results.sort((a, b) => b.vote_count - a.vote_count);
          break;
        case 'Ascending':
          shows = results.sort((a, b) => a.vote_count - b.vote_count);
          break;
        case 'Shuffle':
          shows = shuffle(results);
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
    displayShows();
  });
}
