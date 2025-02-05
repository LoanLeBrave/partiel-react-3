export default class API {
  constructor() {
    this.KEY_API = "82a4b8a952e82748e2bb3eb4c3c1da59";
  }

  /**
   * It returns a string that is the URL of the API to get the trending movies of the day
   * @param container - container DOM HTML
   * @param type - Values : all, movie, tv or person
   * @param [filter=day] - Values : day, week
   * @returns A string
   */
  getDataByTrending(container, type, filter = "day") {
    let url = `https://api.themoviedb.org/3/trending/${type}/${filter}?api_key=${this.KEY_API}`;
    this.loadData(url, container, "movie");
  }

  /**
   * It returns a URL based on the category of tv you want to get
   * @param container - container DOM HTML
   * @param [category=popular] - Values : popular, top_rated, upcoming
   * @returns a string.
   */
  getDataByTvCategory(container, category = "top_rated") {
    let url = `https://api.themoviedb.org/3/tv/${category}?api_key=${this.KEY_API}&language=fr-FR&page=1`;
    this.loadData(url, container, "tv");
  }

  async loadData(url, container, type) {
    let fetchAPI = await fetch(url)
      .then((response) => response.json())
      .catch((error) => alert("Error: " + error));

    /* Slicing the first 5 results from the API. */
    let data = fetchAPI.results.slice(0, 4);

    /* Creating a div element with the class name of movie.
  It is then appending the divMovie element to the container. */
    data.forEach((movie) => {
      const divMovie = document.createElement("div");
      divMovie.className = "movie";
      let imgFromAPI = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
      let vote = movie.vote_count == 0 ? "N/A" : parseInt(parseFloat(movie.vote_average) * 10) + "%";

      divMovie.innerHTML = `
      <a href="focus.html?id=${movie.id}&type=${type}" >
        <img src="${imgFromAPI}">
        <div class="score">
          <p>${vote}</p>
        </div>
        <h5>${movie.original_title || movie.name}</h5>
        <p>${this.convertDate(movie.release_date || movie.first_air_date)}</p>
        </a>
    `;
      container.appendChild(divMovie);
    });
  }

  async loadDataById(id, type) {
    let movie = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${this.KEY_API}&language=fr-FR`)
      .then((response) => response.json())
      .catch((error) => alert("Error: " + error));

    document.querySelector(".focus-container").innerHTML = "";
    const divMovie = document.createElement("div");
    divMovie.className = "focus-container";
    let vote = movie.vote_count == 0 ? "N/A" : parseInt(parseFloat(movie.vote_average) * 10) + "%";

    divMovie.innerHTML = `       
      <div class="banner" style="background-image: url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}">
        <div class="content saveMe">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
          <div class="right">
            <div class="top">
              <div class="score">${vote}</div>
              <div class="title-date">
                <h1>${movie.original_title || movie.name} ([Année])</h1>
                <span>${this.convertDate(movie.release_date || movie.first_air_date)} - [Genre cinématographiques] - [Durée]</span>
              </div>
            </div>
            <div class="synopsis">
              <h2>Synopsis</h2>
              <p>
           ${movie.overview}
              </p>
            </div>
          </div>
        </div>
        </div>

        <div class="casting">
          <h2>Casting</h2>
          <div class="actors"></div>    
        </div>
        
    `;
    document.querySelector(".focus-container").appendChild(divMovie);
    let credits = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${this.KEY_API}`)
      .then((response) => response.json())
      .catch((error) => alert("Error: " + error));

    let casting = credits.cast.slice(0, 4);

    for (const actor of casting) {
      document.querySelector(".actors").innerHTML += `
      <div class="actor saveMe">
      <img src="https://image.tmdb.org/t/p/w138_and_h175_face${actor.profile_path}" alt="" />
      <h4>${actor.original_name}</h4>
      <span>${actor.character}</span>
    </div>`;
    }
  }

  convertDate(date) {
    const maDate = new Date(date);
    return maDate.toLocaleDateString("fr");
  }
}
