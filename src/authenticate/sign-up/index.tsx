import React, { FormEventHandler, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Copyright from "../shared/copyright";
import { useStyles } from "../shared/styles";
import * as authApi from "../../api/authApi";
import { SET_USER } from "../../redux/types";
import { AuthenticationProps } from "../shared/types";
import { Header } from "../shared/header";
import { Routes } from "../../consts/routes";

export default function SignUp(props: AuthenticationProps) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const handleChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler = async (e) => {
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
        <Header title="Sign Up" />
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete="displayName"
                onChange={handleChange}
                value={formData.displayName}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => props.setIsSignIn(true)} href="#">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
