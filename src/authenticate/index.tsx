import React, { FormEventHandler, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useStyles } from "./styles";
import Copyright from "./copyright";
import * as authApi from "../api/authApi";
import { SET_USER } from "../redux/types";
import { Header } from "./header";
import { Routes } from "../consts/routes";

export function Authenticate() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const handleFormChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signIn: FormEventHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const response: any = await authApi.login(email, password);
    if (!(response.status && response.status === 200)) {
      window.alert(response.message);
    } else {
      dispatch({ type: SET_USER, user: response.data });
      history.push(Routes.CHATS);
    }
  };

  const signUp: FormEventHandler = async (e) => {
    e.preventDefault();
    const { email, password, displayName } = formData;
    const response: any = await authApi.register(email, password, displayName);
    if (!(response.status && response.status === 200)) {
      window.alert(response.response.data.message);
    } else {
      dispatch({ type: SET_USER, user: response.data });
      history.push(Routes.CHATS);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Header title={isSignIn ? "Sign In" : "Sign Up"} />
        <form
          className={classes.form}
          noValidate
          onSubmit={isSignIn ? signIn : signUp}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleFormChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleFormChange}
          />
          {isSignIn ? null : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="displayName"
              label="Display Name"
              name="displayName"
              autoComplete="displayName"
              onChange={handleFormChange}
              value={formData.displayName}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => setIsSignIn(!isSignIn)} href="#">
                {isSignIn
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
