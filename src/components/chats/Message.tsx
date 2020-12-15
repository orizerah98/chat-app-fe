import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default function Message(props: any) {
  return (
    <Card style={{ margin: 10, width: "auto" }}>
      <Typography style={{ color: "grey", fontSize: 13 }} noWrap>
        {props.displayName}
      </Typography>
      <Divider />
      <Typography>{props.content}</Typography>
    </Card>
  );
}
