import axios from "axios";
import { API_URL } from "../config";
import { IChat } from "../interfaces/chat";

export const getUserChats = async (userId: string) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${API_URL}/chats`,
      withCredentials: true,
      params: {
        userId,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const addChat = async (
  userEmails: string[],
  name: string,
  iconUrl: string
): Promise<IChat | void> => {
  try {
    const response = await axios.post(
      `${API_URL}/chats`,
      { userEmails, name, iconUrl },
      {
        withCredentials: true,
      }
    );
    return response.data as IChat;
  } catch (err) {
    window.alert("Failed to add chat, " + err);
  }
};
