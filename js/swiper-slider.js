import { fetchAPIData } from './fetchapi.js';

export async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  const slider = document.querySelector('.swiper-wrapper');

  results.forEach((movie) => {
    slider.innerHTML += `<div class="swiper-slide">
        <a href="movie-details.html?id=${movie.id}">
          <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.name}">          
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)}
        </h4>
      </div> `;
    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBewteen: 10,
    centeredSlides: true,
    freeMode: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      599: {
        slidesPerView: 2,
      },
      799: {
        slidesPerView: 3,
      },
      1199: {
        slidesPerView: 4,
      },
    },
  });
}

displaySlider()