import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/dashboard/${userId}`, {
      withCredentials: true
    });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Error fetching user data:", error.response.data);
      return error.response.data;
    }
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("userId");
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};

export const logout = async () => {
  try {
    await axios.get(`${BASE_URL}/api/users/logout`, {
      withCredentials: true
    });
    localStorage.removeItem("userId");
    localStorage.removeItem("cachedProjects");
  } catch (error) {
    localStorage.removeItem("userId");
    localStorage.removeItem("cachedProjects");
  }

};