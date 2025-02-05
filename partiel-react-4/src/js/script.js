import API from "./api.js";

let apiMovie = new API();
apiMovie.getDataByTrending(document.querySelector("#tendances"), "all", "day");
apiMovie.getDataByTvCategory(document.querySelector("#populaires"), "top_rated");

/*
 * FILTRES TENDANCES
 */
// Click sur le filtre "Cette semaine"
document.querySelector("#week").addEventListener("click", (e) => {
  document.querySelector("#tendances").innerHTML = "";
  document.querySelectorAll("#title-tendances > button").forEach((button) => button.classList.remove("active"));
  e.target.classList.add("active");
  apiMovie.getDataByTrending(document.querySelector("#tendances"), "all", "week");
});

// Click sur le filtre "Aujourd'hui"
document.querySelector("#day").addEventListener("click", (e) => {
  document.querySelector("#tendances").innerHTML = "";
  document.querySelectorAll("#title-tendances > button").forEach((button) => button.classList.remove("active"));
  e.target.classList.add("active");
  apiMovie.getDataByTrending(document.querySelector("#tendances"), "all", "day");
});

/*
 * FILTRES POPULAIRES
 */
// Click sur le filtre "Populaires"
document.querySelector("#popular").addEventListener("click", (e) => {
  document.querySelector("#populaires").innerHTML = "";
  document.querySelectorAll("#title-category > button").forEach((button) => button.classList.remove("active"));
  e.target.classList.add("active");
  apiMovie.getDataByTvCategory(document.querySelector("#populaires"), "popular");
});

// Click sur le filtre "Top rated"
document.querySelector("#top_rated").addEventListener("click", (e) => {
  document.querySelector("#populaires").innerHTML = "";
  document.querySelectorAll("#title-category > button").forEach((button) => button.classList.remove("active"));
  e.target.classList.add("active");
  apiMovie.getDataByTvCategory(document.querySelector("#populaires"), "top_rated");
});
