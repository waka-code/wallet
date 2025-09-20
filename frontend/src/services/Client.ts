import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`Frontend -> API Gateway: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Gateway -> Frontend: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);