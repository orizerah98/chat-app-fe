import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { appState } from "../../redux/types";
import { SET_USER } from "../../redux/types";
import { CreateChatModal } from "./create-chat-form";

function SettingsMenu(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch({ type: SET_USER, user: undefined });
    history.push("/");
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setModalOpen(true)}>Create New Chat</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        <CreateChatModal
          isOpen={isModalOpen}
          setOpen={setModalOpen}
          handleCreatedChat={props.handleCreatedChat}
        />
      </Menu>
    </div>
  );
}

const mapStateToProps = (state: appState) => {
  return state;
};

export default connect(mapStateToProps)(SettingsMenu);
