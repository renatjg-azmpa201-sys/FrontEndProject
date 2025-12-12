import { getShows } from './api.js';

let page = 0;
let apiPage = 0;
let allData = [];
let uiData = [];

const list = document.getElementById('list');
const search = document.getElementById('search');
const loadMore = document.getElementById('loadMore');
const randomBtn = document.getElementById('randomBtn');
const heroCard = document.getElementById('heroCard');
const heroTitle = document.getElementById('heroTitle');
const heroGenres = document.getElementById('heroGenres');
const heroImg = document.getElementById('heroImg');
const heroAction = document.getElementById('heroAction');

function cardHTML(show) {
  return `
    <article class="card" data-id="${show.id}">
      <div class="poster-wrap">
        <img src="${show.image?.medium || ''}" alt="${show.name}" loading="lazy" />
        <div class="poster-overlay">
          <div class="meta">
            <strong>${show.name}</strong>
            <span class="rating">⭐ ${show.rating.average || 'N/A'}</span>
          </div>
          <a class="glass-link" href="detail.html?id=${show.id}">More</a>
        </div>
      </div>
    </article>
  `;
}

function render(items, reset=false) {
  if (reset) list.innerHTML = '';
  list.insertAdjacentHTML('beforeend', items.map(cardHTML).join(''));
}

async function load() {
  if (page === 0) {
    allData = await getShows(apiPage);
    apiPage++;
  }
  const start = page * 20;
  const chunk = allData.slice(start, start + 20);
  uiData = [...uiData, ...chunk];
  render(chunk);
  page++;
  if (page * 20 >= allData.length) page = 0;
  if (!heroImg.src && uiData.length) setHero(uiData[0]);
}

function setHero(show) {
  heroTitle.textContent = show.name;
  heroGenres.textContent = show.genres.join(' • ');
  heroImg.src = show.image?.original || '';
  heroAction.href = `detail.html?id=${show.id}`;
  heroCard.classList.add('visible');
}

function pickRandom() {
  if (!uiData.length) return;
  const idx = Math.floor(Math.random() * uiData.length);
  const show = uiData[idx];
  setHero(show);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

search.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase();
  if (!q) {
    list.innerHTML = '';
    render(uiData, true);
    return;
  }
  const filtered = uiData.filter(s => s.name.toLowerCase().includes(q));
  list.innerHTML = '';
  render(filtered, true);
});

randomBtn.addEventListener('click', pickRandom);
loadMore.addEventListener('click', load);
load();


document.addEventListener("DOMContentLoaded", async () => {
  const track = document.querySelector(".carousel-track");

  async function loadShows() {
    try {
      const res = await fetch("https://api.tvmaze.com/shows");
      const data = await res.json();

      const top10 = data
        .filter(show => show.rating?.average) 
        .sort((a, b) => b.rating.average - a.rating.average)
        .slice(0, 10);

      top10.forEach(show => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");

        slide.innerHTML = `
          <img src="${show.image?.original || show.image?.medium}" alt="${show.name}">
          <div class="carousel-info">
            <h3>${show.name}</h3>
            <p>Rating: ${show.rating.average}</p>
          </div>
        `;

        track.appendChild(slide);
      });

      startCarousel();
    } catch (err) {
      console.error("TVMaze error:", err);
    }
  }

  loadShows();

  function startCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const btnLeft = document.querySelector(".carousel-arrow.left");
    const btnRight = document.querySelector(".carousel-arrow.right");

    let currentIndex = 0;

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    if (btnRight) {
      btnRight.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
      });
    }

    if (btnLeft) {
      btnLeft.addEventListener("click", () => {
        currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        goToSlide(currentIndex);
      });
    }

    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }, 4500);
  }
});
