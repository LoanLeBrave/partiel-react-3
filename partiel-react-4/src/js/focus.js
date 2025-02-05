import API from "./api.js";

let apiMovie = new API();

const params = new URLSearchParams(location.search);
let id = params.get("id");
let type = params.get("type");
apiMovie.loadDataById(id, type);
