import { useUserStore } from "@/store/userStore";
import axios from "axios";

const API_BASE_URL = "http://localhost:8181/api"; // Replace with your API base URL

// Create an Axios instance with your API base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the Firebase user token
async function getFirebaseAuthToken(): Promise<string | null> {
  let token: string | null = null;
  const { user } = useUserStore();
  if (user) {
    try {
      token = await user.getIdToken();
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
  } else {
    // User is not authenticated; set token to null
    token = null;
  }

  return token;
}

// Axios request interceptor to add the Firebase token to requests
api.interceptors.request.use(async (config) => {
  const authToken = await getFirebaseAuthToken();
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }

  return config;
});

export default api;
