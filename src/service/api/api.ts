import axios from "axios";

export const api = axios.create({
  baseURL: "https://teste-c1089.uc.r.appspot.com/",
  // baseURL: "http://localhost:8080",
});
