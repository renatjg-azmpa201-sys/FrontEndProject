import { getShows } from './api.js';

let page = 0;
let allData = [];
let filtered = [];

const list = document.getElementById('list');
const search = document.getElementById('search');
const loadMore = document.getElementById('loadMore');

function render(items) {
  list.innerHTML = items.map(show => `
    <div class="col-6 col-md-3">
      <div class="card h-100 bg-dark text-white">
        <img src="${show.image?.medium || ''}" loading="lazy" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p><i class="fa-solid fa-star"></i> ${show.rating.average || 'N/A'}</p>
          <a href="detail.html?id=${show.id}" class="btn btn-warning btn-sm"><i class="fa-solid fa-circle-info"></i> Details</a>
        </div>
      </div>
    </div>
  `).join('');
}

function load() {
  getShows(page).then(data => {
    allData = [...allData, ...data];
    filtered = allData;
    render(filtered);
    page++;
  });
}

loadMore.addEventListener('click', load);

search.addEventListener('input', () => {
  const q = search.value.toLowerCase();
  filtered = allData.filter(s => s.name.toLowerCase().includes(q));
  render(filtered);
});

load();
