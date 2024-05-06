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

export function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

export function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
export function highlightActiveLink() {
  const urlPath = global.currentPage.split('/', -2);
  const links = document.querySelectorAll('.nav-link');
  console.log(urlPath[2]);
  links.forEach((link) => {
    if (
      link.getAttribute('href') === urlPath[2] ||
      urlPath[2].includes(link.dataset.link)
    ) {
      link.classList.add('active');
    }
  });
}
