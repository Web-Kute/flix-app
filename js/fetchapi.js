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
  const API_KEY = 'f52b3a868de5d7fcd5533c09cd6598b9';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=fr-FR&page=${randomPages !== null ? randomPages : 1}`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}
