import axios from "axios";

// const url = process.env.API_URL;
const url = "http://192.168.105.24:8080";

export const getUserChats = async (userId: string) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${url}/chats`,
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
