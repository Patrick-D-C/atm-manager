import axios from 'axios';

//Alterar endereço ou porta conforme necessidade
const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3030'
    : 'http://localhost:3030';

// API REST
const api = axios.create({
  baseURL: uri,
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('@atm-token');
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
