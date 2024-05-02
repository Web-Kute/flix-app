import { global } from "../index.js";

const spinner = document.querySelector('.spinner');

function showSpinner() {
  spinner.classList.add('show');
}

function hideSpinner() {
  spinner.classList.remove('show');
}

const randomPages = Math.floor(Math.random() * 200);

// Fetch data from TMDB API
export async function fetchAPIData(endpoint) {
  const API_KEY = global.api.key;
  const API_URL = global.api.url;
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=fr-FR&page=${randomPages !== null ? randomPages : 1}`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}
