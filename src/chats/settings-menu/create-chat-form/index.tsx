import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { UsersMultiselectField } from "./user-multiselect";
import { Option } from "react-multi-select-component/dist/lib/interfaces";
import { IChat } from "../../../interfaces/chat";
import * as chatApi from "../../../api/chatApi";

interface FromDialogProps {
  isOpen: boolean;
  setOpen(isOpen: boolean): void;
  handleCreatedChat(chat: IChat): void;
}

interface ChatData {
  name: string;
  iconUrl: string;
}

export function CreateChatModal(props: FromDialogProps) {
  const handleClose = () => {
    props.setOpen(false);
  };

  const [selectedEmails, setSelectedEmails] = React.useState<Option[]>([]);
  const [chatData, setChatData] = React.useState<ChatData>({
    name: "",
    iconUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatData({ ...chatData, [e.target.name]: e.target.value });
  };

  const createChat = async () => {
    const { iconUrl, name } = chatData;
    if (
      selectedEmails.length === 0 ||
      chatData.iconUrl.length === 0 ||
      chatData.name.length === 0
    ) {
      window.alert("Please fill all of the fields before submitting");
    } else {
      const emails = selectedEmails.map((e) => e.value);
      const chat = await chatApi.addChat(emails, name, iconUrl);
      if (!chat) {
        window.alert("Failed to create chat");
      } else {
        handleClose();
        props.handleCreatedChat(chat);
      }
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create a new chat</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Chat Name"
          type="text"
          onChange={handleChange}
          value={chatData.name}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="iconUrl"
          name="iconUrl"
          label="Image Address"
          type="text"
          fullWidth
          value={chatData.iconUrl}
          onChange={handleChange}
        />
        <UsersMultiselectField
          selected={selectedEmails}
          setSelected={setSelectedEmails}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={createChat} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
