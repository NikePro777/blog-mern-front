import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444",
  // указываем базовый путь, чтобы если надо было перейти в "https://localhost:4444/post" нам можно было написать просто /post, аксиос все остальное докрутит
});

export default instance;
