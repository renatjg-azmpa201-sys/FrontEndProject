fetch("https://api.tvmaze.com/shows")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("show-list");

    data.forEach(show => {
      const img = show.image?.medium || "https://via.placeholder.com/210x295";

      list.innerHTML += `
        <div class="col-md-3">
          <div class="card bg-secondary text-white h-100">
            <img src="${img}" class="card-img-top" alt="${show.name}">
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">
                Rating: ${show.rating.average ?? "N/A"} <br>
                Premiered: ${show.premiered ?? "?"}
              </p>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(err => console.log("Error:", err));
