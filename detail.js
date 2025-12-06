import { getShowById } from './api.js';

const wrapper = document.getElementById('details');
const id = new URLSearchParams(location.search).get('id');

if (!id) {
  wrapper.innerHTML = `<p class="text-danger">No ID provided!</p>`;
}

getShowById(id).then(show => {
  wrapper.style.backgroundImage = `url(${show.image?.original || ""})`;

  wrapper.innerHTML = `
    <div class="detail-card shadow-lg">

      <div class="poster">
        <img src="${show.image?.original || ''}" alt="${show.name}">
      </div>

      <div class="info">
        <h1 class="title">${show.name}</h1>

        <div class="tags mb-3">
          ${show.genres.map(g => `<span class="badge bg-warning text-dark me-2">${g}</span>`).join('')}
        </div>

        <p class="summary">${show.summary || ''}</p>

        <p><strong>Rating:</strong> ⭐ ${show.rating.average || 'N/A'}</p>
        <p><strong>Status:</strong> ${show.status}</p>
        <p><strong>Premiered:</strong> ${show.premiered}</p>

        ${show.officialSite ? `
          <a href="${show.officialSite}" target="_blank" class="btn btn-warning mt-3">
            Visit Official Site
          </a>
        ` : ""}
      </div>

    </div>
  `;
});
