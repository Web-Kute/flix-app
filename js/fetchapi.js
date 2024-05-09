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

export let page = Math.floor(Math.random() * 400);
// Fetch data from TMDB API
export async function fetchAPIData(endpoint, page) {
  const API_KEY = global.api.key;
  const API_URL = global.api.url;
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=fr-FR&page=${page}`,
    options
  );
  const data = await response.json();
  hideSpinner();
  return data;
}
