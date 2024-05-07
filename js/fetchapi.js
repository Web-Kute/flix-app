import { showSpinner, hideSpinner } from './utils.js';
import { global } from './utils.js';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTJiM2E4NjhkZTVkN2ZjZDU1MzNjMDljZDY1OThiOSIsInN1YiI6IjY2MmNmMmIzMDNiZjg0MDEyOGVhNTYzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vIOpu9xpshk0JpElGNMvuN1dcndRLWsfkGL6vBcY5AQ',
  },
};

// Fetch data from TMDB API
export async function fetchAPIData(endpoint) {
  let randomPages = Math.floor(Math.random() * 200);
  const API_KEY = global.api.key;
  const API_URL = global.api.url;
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=fr-FR&page=${randomPages !== null ? randomPages : 1}`,
    options
  );
  const data = await response.json();
  hideSpinner();
  return data;
}
