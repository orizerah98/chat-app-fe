import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { IChat } from "../../interfaces/chat";

interface ChatMenuProps {
  chats: Array<IChat>;
  setCurrentChat(chat: IChat): void;
}

export default function ChatMenu(props: ChatMenuProps) {
  return (
    <List>
      {props.chats.map((chat: any, index: number) => (
        <ListItem button key={index} onClick={() => props.setCurrentChat(chat)}>
          <ListItemIcon>
            <Avatar src={chat.iconUrl} />
          </ListItemIcon>
          <ListItemText primary={chat.name} />
        </ListItem>
      ))}
    </List>
  );
}
