import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/json",
  },
});

export default apiClient;
