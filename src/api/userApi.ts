import axios from "axios";

// const url = process.env.API_URL;
const url = "http://localhost:8080";

export const register = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const response = await axios.post(`${url}/register`, {
      email: email,
      password: password,
      displayName: displayName,
    });
    return response;
  } catch (err) {
    return err;
  }
};
