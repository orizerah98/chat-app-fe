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

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${url}/login`, {
      email: email,
      password: password,
    });
    return response;
  } catch (err) {
    return err;
  }
};
