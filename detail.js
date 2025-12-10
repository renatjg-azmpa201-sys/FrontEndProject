import { getShowById } from './api.js';

const params = new URLSearchParams(location.search);
const id = params.get('id');

const detailImg = document.getElementById('detailImg');
const dTitle = document.getElementById('dTitle');
const dGenres = document.getElementById('dGenres');
const dSummary = document.getElementById('dSummary');
const dRating = document.getElementById('dRating');
const dStatus = document.getElementById('dStatus');
const dPremier = document.getElementById('dPremier');
const dSite = document.getElementById('dSite');
const backdrop = document.getElementById('backdrop');

if (!id) {
  dTitle.textContent = 'No ID provided';
} else {
  getShowById(id).then(show => {
    detailImg.src = show.image?.original || '';
    dTitle.textContent = show.name || '';
    dGenres.textContent = (show.genres || []).join(' • ');
    dSummary.innerHTML = show.summary || '';
    dRating.textContent = `Rating: ${show.rating.average || 'N/A'}`;
    dStatus.textContent = `Status: ${show.status || '-'}`;
    dPremier.textContent = `Premiered: ${show.premiered || '-'}`;
    if (show.officialSite) {
      dSite.href = show.officialSite;
      dSite.style.display = 'inline-block';
    } else {
      dSite.style.display = 'none';
    }
    if (show.image?.original) {
      backdrop.style.backgroundImage = `url(${show.image.original})`;
      backdrop.classList.add('has-img');
    }
  });
}
