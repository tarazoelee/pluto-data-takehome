import axios from "axios";

//Connecting to backend using axios
const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default api;
