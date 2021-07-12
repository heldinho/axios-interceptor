const axios = require("axios");

const fetch = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    get: { "Content-Type": "application/json" },
    post: { "Content-Type": "application/json" },
  },
});

fetch.interceptors.request.use(
  function (config) {
    if (config.headers.token) {
      console.log(config.headers.token);
    } else {
      console.log(config.headers);
      return Promise.reject({ message: "Erro no request" });
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

fetch({
  method: "GET",
  url: `/todos/1`,
  headers: {
    "Set-Cookie": ["type=ninja", "language=javascript"],
  },
})
  .then(function (data) {
    console.log(JSON.stringify(data, undefined, 2));
  })
  .catch(function (error) {
    console.log(JSON.stringify(error, undefined, 2));
  });
