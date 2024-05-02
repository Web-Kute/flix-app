import { global } from '../index.js';

export async function searchAPIData() {
  const API_KEY = global.api.key;
  const API_URL = global.api.url;
  // showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=fr-FR&query=${global.search.term}`
  );
  const data = await response.json();
  // hideSpinner();
  return data;
}

export async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const results = await searchAPIData();
    console.log(results);
  } else {
    showAlert('Please enter a search term', 'alert-warning');
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
