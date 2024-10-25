import axios from "axios";

const api = axios.create({
  baseURL: "https://prestigekoiauction.freeddns.org:8443",
});

export default api;
