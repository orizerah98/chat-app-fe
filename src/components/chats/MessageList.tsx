import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  position: relative;
  display: block;
  flex: 2;
  overflow-y: overlay;
  padding: 0 15px;
`;

type StyledProp = {
  isMine: any;
};

const MessageItem = styled.div`
  display: inline-block;
  position: relative;
  max-width: 100%;
  border-radius: 7px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
  margin-bottom: 10px;
  clear: both;

  &::after {
    content: "";
    display: table;
    clear: both;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 3px;
    width: 12px;
    height: 19px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }

  ${(props: StyledProp) =>
    props.isMine
      ? css`
          float: right;
          background-color: #dcf8c6;

          &::before {
            right: -11px;
            background-image: url(/assets/message-mine.png);
          }
        `
      : css`
          float: left;
          background-color: #fff;

          &::before {
            left: -11px;
            background-image: url(/assets/message-other.png);
          }
        `}
`;

const Contents = styled.div`
  padding: 5px 7px;
  word-wrap: break-word;

  &::after {
    content: " \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0";
    display: inline;
  }
`;

const Timestamp = styled.div`
  position: absolute;
  bottom: 2px;
  right: 7px;
  color: gray;
  font-size: 12px;
`;

interface Message {
  id: string | null;
  message: string | null;
  sendTime: Date | null;
}
interface MessagesListProps {
  messages: Array<Message>;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message: any) => (
        <MessageItem isMine={message.isMine} key={message.id}>
          <Contents>{message.message}</Contents>
          <Timestamp>{message.sendTime.substring(11, 16)}</Timestamp>
        </MessageItem>
      ))}
    </Container>
  );
};

export default MessagesList;
