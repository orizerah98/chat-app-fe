import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { connect } from "react-redux";

import { chatPageStyles } from "./styles";
import { appState } from "../redux/types";
import * as chatApi from "../api/chatApi";
import MessageList from "./chat-display/messages";
import MessageInput from "./chat-display/message-input";
import initSocket from "../websocketClient/socketClient";
import ChatMenu from "./chat-menu";
import { IChat } from "../interfaces/chat";
import SettingsMenu from "./settings-menu";

function ChatPage(state: appState) {
  const classes = chatPageStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState<IChat[]>([]);
  const [currentChat, setCurrentChat] = useState<IChat | null>();
  const [newMessage, setNewMessage] = useState<any>();
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    if (newMessage) {
      const chat: any = chats.find((c: any) => c._id === newMessage.chatId);
      if (!chat) return;
      chat.messages.push({
        displayName: newMessage.displayName,
        message: newMessage.message,
        sendTime: newMessage.sendTime,
      });
      setNewMessage(undefined);
      if (!currentChat || chat._id === currentChat._id) {
        setCurrentChat(chat);
      }
    }
  }, [newMessage, chats, currentChat]);

  const handleSentMessage = (message: string) => {
    if (!state.user) return window.alert("User is not authenticated");
    const messageData = {
      chatId: currentChat?._id,
      message: message,
      displayName: state.user.displayName,
      sendTime: new Date().toISOString(),
    };
    socket.emit("sendMessage", messageData);
    const newChat = { ...currentChat } as IChat;
    newChat.messages.push(messageData);
    setCurrentChat(newChat);
  };

  const handleCreatedChat = (chat: IChat) => {
    setCurrentChat(chat);
    setChats([...chats, chat]);
  };

  useEffect(() => {
    setSocket(initSocket(setNewMessage));
    const loadChats = async () => {
      const response = await chatApi.getUserChats(state.user?._id as string);
      if (response.isAxiosError) {
        window.alert("Failed to fetch chats");
        setChats([]);
      } else {
        const newChats = response.data;
        setChats(newChats);
        if (newChats.length > 0) {
          setCurrentChat(newChats[0]);
        }
      }
    };
    loadChats();
  }, [state.user]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {currentChat ? currentChat.name : "Argon Chat"}
          </Typography>
          <SettingsMenu handleCreatedChat={handleCreatedChat} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ChatMenu chats={chats} setCurrentChat={setCurrentChat} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <MessageList messages={currentChat ? currentChat.messages : []} />
        <MessageInput onSendMessage={handleSentMessage} />
      </main>
    </div>
  );
}

const mapStateToProps = (state: appState) => {
  return state;
};

export default connect(mapStateToProps)(ChatPage);
