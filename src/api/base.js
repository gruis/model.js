import urlJoin from 'url-join';
import axios from 'axios';

const http = axios.create();

const baseURL = (() => {
  if (process.env.VUE_APP_API_URL) {
    return process.env.VUE_APP_API_URL;
  }
  if (process.client) {
    return window.location.origin;
  }
  return '/';
})();

const url = (...parts) => {
  return urlJoin(baseURL, 'api', 'v0', ...parts);
};

http.interceptors.request.use((config) => {
  config.url = url(config.url);
  return config;
});

export { http, url, baseURL };
export default http;
