import React from "react";
import MultiSelect from "react-multi-select-component";

import { IUser } from "../../../interfaces/user";
import * as userApi from "../../../api/userApi";
import { Option } from "react-multi-select-component/dist/lib/interfaces";

interface UserMultiselectProps {
  selected: Option[];
  setSelected(selected: Option[]): void;
}

export default function UsersMultiselectField(props: UserMultiselectProps) {
  const [options, setOptions] = React.useState([]);

  const getEmails = async () => {
    const response = await userApi.getAllUsers();
    if (response.isAxiosError) {
      window.alert("There was an error while fetching the user list");
    } else {
      const emails = response.data.map((user: IUser) => {
        return { label: user.email, value: user.email };
      });
      setOptions(emails);
    }
  };

  React.useEffect(() => {
    getEmails();
  }, []);

  return (
    <MultiSelect
      options={options}
      value={props.selected}
      onChange={props.setSelected}
      labelledBy={"Select"}
    />
  );
}
