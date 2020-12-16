import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://192.168.105.24:8080";

export default function initSocket(handleNewMessage: Function) {
  const socket = io(SOCKET_SERVER_URL);
  socket.on("sendMessage", (message: string) => {
    const messageData = JSON.parse(message);
    handleNewMessage(messageData);
  });
  return socket;
}
