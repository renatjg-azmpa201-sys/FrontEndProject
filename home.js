import { getShows } from './api.js';

let page = 0;        
let apiPage = 0;      
let allData = [];     
let uiData = [];      

const list = document.getElementById('list');
const search = document.getElementById('search');
const loadMore = document.getElementById('loadMore');

function render(items, reset = false) {
  if (reset) list.innerHTML = "";

  list.innerHTML += items.map(show => `
    <div class="col-6 col-md-3">
      <div class="card h-100 bg-secondary text-white">
        <img src="${show.image?.medium || ''}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <a href="detail.html?id=${show.id}" class="btn btn-light btn-sm">Details</a>
        </div>
      </div>
    </div>
  `).join('');
}

async function load() {
  if (page === 0) {
    allData = await getShows(apiPage);
    apiPage++;
  }

  const start = page * 25;
  const end = start + 25;
  const chunk = allData.slice(start, end);

  uiData = [...uiData, ...chunk];

  render(chunk);

  page++;

  if (page * 25 >= allData.length) {
    page = 0; 
  }
}


search.addEventListener('input', () => {
  const q = search.value.toLowerCase();

  if (q.trim() === "") {

    list.innerHTML = "";
    render(uiData, true);
    return;
  }

  const filtered = uiData.filter(s =>
    s.name.toLowerCase().includes(q)
  );

  list.innerHTML = "";
  render(filtered, true);
});

loadMore.addEventListener('click', load);

load();
