import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

export default function MenuItem(props: any) {
  return (
    <ListItem button key={props.name}>
      <ListItemIcon>
        <Avatar src={props.iconUrl} />
      </ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  );
}
