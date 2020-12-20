import axios from "axios";
import { API_URL } from "../config";

export const register = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
      displayName,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (err) {
    return err;
  }
};
