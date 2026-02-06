import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// ================= LOGIN =================
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });

  return response.data;
};

// ================= REGISTER =================
export const registerAPI = async ({ email, password, username }) => {
  const response = await axios.post(`${BASE_URL}/users/register`, {
    email,
    password,
    username,
  });

  return response.data;
};

// ================= CHANGE PASSWORD =================
export const changePasswordAPI = async (newPassword) => {
  const token = getUserFromStorage();

  const response = await axios.put(
    `${BASE_URL}/users/change-password`,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ================= GET PROFILE =================
export const getProfileAPI = async () => {
  const token = getUserFromStorage();

  const response = await axios.get(`${BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


// ================= UPDATE PROFILE =================
export const updateProfileAPI = async ({ email, username }) => {
  const token = getUserFromStorage();

  const response = await axios.put(
    `${BASE_URL}/users/update-profile`,
    {
      email,
      username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
