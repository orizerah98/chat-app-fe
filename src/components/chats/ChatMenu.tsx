import React from "react";
import List from "@material-ui/core/List";

import ChatMenuItem from "./ChatMenuItem";
import { IChat } from "../../interfaces/chat";

interface ChatMenuProps {
  chats: Array<IChat>;
  setCurrentChat(chat: IChat): void;
}

export default function ChatMenu(props: ChatMenuProps) {
  return (
    <List>
      {props.chats.map((chat: any, index: number) => (
        <ChatMenuItem
          name={chat.name}
          iconUrl={chat.iconUrl}
          key={index}
          setChat={() => props.setCurrentChat(chat)}
        />
      ))}
    </List>
  );
}
