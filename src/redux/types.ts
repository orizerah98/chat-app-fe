export const SET_USER = "SET_USER";

interface IUser {
  _id: string;
  displayName: string;
  email: string;
}

interface SetUserIdAction {
  type: typeof SET_USER;
  user: IUser;
}

export interface appState {
  user: IUser | undefined;
}

export type ActionTypes = SetUserIdAction;
