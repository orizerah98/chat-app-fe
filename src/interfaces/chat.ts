export interface IMessage {
  message: string;
  sendTime: string;
  displayName: string;
}

export interface IChat {
  _id: string;
  name: string;
  messages: Array<IMessage>;
  iconUrl: string;
}
