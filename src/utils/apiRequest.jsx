import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiRequest = async (url, options = {}) => {
  try {
    const response = await api({
      url,
      method: options.method || 'GET',
      data: options.data || null,
      params: options.params || null,
      ...options,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Something went wrong';
    alert(`Error: ${message}`);
    throw new Error(message);
  }
};
