import { global, showSpinner, hideSpinner } from '../index.js';

export async function searchAPIData() {
  const API_KEY = global.api.key;
  const API_URL = global.api.url;
  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=fr-FR&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await response.json();

  hideSpinner();
  return data;
}

export async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();
    const resultsContainer = document.getElementById('search-results');
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found', 'alert-warning');
      return;
    }
    displaySearchResults(results);
  } else {
    showAlert('Please enter a search term', 'alert-error');
  }

  // Show alert
  function showAlert(message, className) {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(() => alertEl.remove(), 3000);
  }
}

function displaySearchResults(results) {
  const resultsContainer = document.getElementById('search-results');
  const searchResults = document.getElementById('search-results-heading');
  const pagination = document.getElementById('pagination');
  const radioType = document.querySelector(`input[name="type"]`);
  const radioMovie = document.querySelector('input[value="movie"]');
  const radioTv = document.querySelector('input[value="tv"]');
  const selectTypeTv =
    global.search.type === 'tv'
      ? radioTv.setAttribute('checked', '')
      : radioTv.removeAttribute('checked');

  const selectTypeMovie =
    global.search.type === 'movie'
      ? radioMovie.setAttribute('checked', '')
      : radioMovie.removeAttribute('checked');

  radioType.addEventListener('change', () => selectTypeTv != selectTypeMovie);

  function hightLight() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.dataset.link === global.search.type
        ? link.classList.add('active')
        : null;
    });
  }
  hightLight();
  // Clear previous results
  resultsContainer.innerHTML = '';
  searchResults.innerHTML = '';
  pagination.innerHTML = '';

  results.map((result) => {
    resultsContainer.innerHTML += `<div class="card">
      <a href="${global.search.type}-details.html?id=${result.id}">
      ${
        result.poster_path
          ? `<img
                src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                class="card-img-top"
                alt="${global.search.type === 'movie' ? result.title : result.name}"
              />`
          : `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${global.search.type === 'movie' ? result.title : result.name}"
              />`
      }
      </a>
        <div class="card-body">
          <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
          </p>
        </div>
      </div>`;
    searchResults.innerHTML = `${results.length} results of ${global.search.totalResults} ${global.search.type === 'movie' ? 'movies' : 'shows'} found`;
  });
  displayPagination();
}

function displayPagination() {
  const div = document.createElement('div');
  div.className = 'pagination';
  div.innerHTML = `<button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
  pagination.appendChild(div);

  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  // Disable prev button on first page
  if (global.search.page === 1) {
    prevBtn.disabled = true;
  }

  // Disable next button on last page
  if (global.search.page === global.search.totalPages) {
    nextBtn.disabled = true;
  }

  nextBtn.addEventListener('click', async () => {
    global.search.page += 1;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  prevBtn.addEventListener('click', async () => {
    if (global.search.page > 1) {
      global.search.page -= 1;
    }
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
}
