"use strict";

import { createApp } from 'vue';
import axios from "axios";

const app = createApp({});

// Configuração do axios
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Adicione um interceptor de resposta
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// Plugin Vue para o axios
app.config.globalProperties.axios = _axios;
app.config.globalProperties.$axios = _axios;

// Exporte o aplicativo Vue 3.x
export default app;
