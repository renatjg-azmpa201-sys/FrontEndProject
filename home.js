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
