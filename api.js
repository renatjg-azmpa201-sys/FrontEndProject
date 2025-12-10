export function getShows(page = 0) {
  return fetch(`https://api.tvmaze.com/shows?page=${page}`).then(r => r.json());
}
export function getShowById(id) {
  return fetch(`https://api.tvmaze.com/shows/${id}`).then(r => r.json());
}
