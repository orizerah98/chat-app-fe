import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { useStyles } from "../styles";

interface HeaderProps {
  title: string;
}

export function Header(props: HeaderProps) {
  const classes = useStyles();
  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {props.title}
      </Typography>
    </>
  );
}
