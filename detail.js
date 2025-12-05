import { getShowById } from './api.js';

const details = document.getElementById('details');
const id = new URLSearchParams(location.search).get('id');

getShowById(id).then(show => {
  details.innerHTML = `
    <div class="card bg-dark p-3 text-white">
      <h2 class="text-warning">${show.name} <i class="fa-solid fa-tv"></i></h2>
      <img class="my-3" src="${show.image?.original || ''}">
      <p>${show.summary || ''}</p>
      <p><strong>Genres:</strong> ${show.genres.map(g => `<span class="badge bg-warning text-dark me-1">${g}</span>`).join('')}</p>
      <p><strong>Rating:</strong> <i class="fa-solid fa-star"></i> ${show.rating.average || 'N/A'}</p>
    </div>
  `;
});
