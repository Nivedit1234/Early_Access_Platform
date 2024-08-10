// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/users', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
