import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

const instance = axios.create({
  baseURL,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
