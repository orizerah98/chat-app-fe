import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface InputProps {
  handleMessage(message: string): void;
}

export default function InputForm(props: InputProps) {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      props.handleMessage(message);
      setMessage("");
    } catch (err) {
      window.alert("Failed to send message, " + err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="messageInput"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">Send Message</Button>
    </form>
  );
}
