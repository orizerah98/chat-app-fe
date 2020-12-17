import io from "socket.io-client";
import { API_URL } from "../config";

export default function initSocket(handleNewMessage: Function) {
  const socket = io(API_URL);
  socket.on("sendMessage", (message: string) => {
    const messageData = JSON.parse(message);
    handleNewMessage(messageData);
  });
  return socket;
}
