// import axios from 'axios';

// const API = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default API;

  
// // src/services/studentService.js


import axios from 'axios';

const isDev = import.meta.env.DEV;
const environmentBaseURL = import.meta.env.VITE_API_URL?.trim();
const defaultProdBaseURL = 'https://graph-course-recommendation-system-1.onrender.com';
const apiBaseURL = isDev
  ? '/api'
  : (environmentBaseURL || defaultProdBaseURL).replace(/\/+$/, '') + '/api';

const API = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;