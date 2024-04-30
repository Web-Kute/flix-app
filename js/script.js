const global = {
  currentPage: window.location.pathname,
};

/**
 * @param {array} array
 * @description shuffles arrays to randomize movie order
 * @description Fisher-Yates
 */
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const popularMovies = document.getElementById('popular-movies');
const popularShows = document.getElementById('popular-shows');
const spinner = document.querySelector('.spinner');

// Display 20 most popular movies
async function displayPopularMovies(popMovies) {
  const popularVoteBtnSmaller = document.getElementById(
    'popular-vote-btn-smaller'
  );
  const popularVoteBtnBigger = document.getElementById(
    'popular-vote-btn-bigger'
  );
  const popularVoteBtnShuffle = document.getElementById(
    'popular-vote-btn-shuffle'
  );
  popMovies.forEach((movie) => {
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

  popularVoteBtnBigger.addEventListener('click', async function () {
    const { results } = await fetchAPIData('movie/popular');
    popMovies = results.sort((a, b) => a.vote_count - b.vote_count);
    popularMovies.innerHTML = '';
    displayPopularMovies(popMovies);
  });

  popularVoteBtnSmaller.addEventListener('click', async function () {
    const { results } = await fetchAPIData('movie/popular');
    popMovies = results.sort((a, b) => b.vote_count - a.vote_count);
    popularMovies.innerHTML = '';
    displayPopularMovies(popMovies);
  });

  popularVoteBtnShuffle.addEventListener('click', async function () {
    const { results } = await fetchAPIData('movie/popular');
    popMovies = shuffle(results);
    popularMovies.innerHTML = '';
    displayPopularMovies(popMovies);
  });
}

// Display 20 most popular tv shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach((show) => {
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

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = 'f52b3a868de5d7fcd5533c09cd6598b9';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=fr-FR&page=2`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  spinner.classList.add('show');
}

function hideSpinner() {
  spinner.classList.remove('show');
}

// Highlight active link
function HighlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Init App
async function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      const { results } = await fetchAPIData('movie/popular');
      popMovies = shuffle(results);
      displayPopularMovies(popMovies);
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  HighlightActiveLink();
}
init();
