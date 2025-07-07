
import axios from "axios";

// Base URL to your backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Axios instance for your backend API
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto-attach token for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch images from Unsplash
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchUnsplashImages = async (
  query = "nature",
  page = 1,
  perPage = 10
) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page,
      per_page: perPage,
      client_id: UNSPLASH_ACCESS_KEY,
    },
  });

  return response.data.results;
};

// ✅ named export
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

