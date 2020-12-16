import axios from "axios";
import { API_URL } from "../config";

export const getUserChats = async (userId: string) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${API_URL}/chats`,
      withCredentials: true,
      params: {
        userId: userId,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
