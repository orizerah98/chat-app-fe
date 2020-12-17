import axios from "axios";
import { API_URL } from "../config";

export const getAllUsers = async () => {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${API_URL}/users`,
      withCredentials: true,
    });
    return response;
  } catch (err) {
    return err;
  }
};
