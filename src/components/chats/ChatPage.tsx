import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { connect } from "react-redux";

import useStyles from "./styles";
import { appState } from "../../redux/types";
import * as chatApi from "../../api/chatApi";
import MenuItem from "./MenuItem";
import Message from "./Message";

function ChatPage(state: appState) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({
    name: "Loading",
    messages: [],
  });

  useEffect(() => {
    const loadChats = async () => {
      const response = await chatApi.getUserChats(state.userId as string);
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
  }, [state.userId]);

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
          <Typography variant="h6" noWrap>
            Argon Chat
          </Typography>
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
        <List>
          {chats.map((chat: any, index) => (
            <MenuItem
              name={chat.name}
              iconUrl={chat.iconUrl}
              key={index}
              setChat={() => setCurrentChat(chat)}
            />
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {currentChat.messages.map((message: any, index) => (
          <Message
            displayName={message.displayName}
            content={message.message}
            key={index}
          />
        ))}
      </main>
    </div>
  );
}

const mapStateToProps = (state: appState) => {
  return state;
};

export default connect(mapStateToProps)(ChatPage);
