export function getShows(page = 0) {
  return fetch(`https://api.tvmaze.com/shows?page=${page}`)
    .then(res => res.json());
}

export function getShowById(id) {
  return fetch(`https://api.tvmaze.com/shows/${id}`)
    .then(res => res.json());
}
