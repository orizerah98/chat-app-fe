import React from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

export function Authenticate() {
  const [isSignIn, setIsSignIn] = React.useState(true);
  return isSignIn ? (
    <SignIn setIsSignIn={setIsSignIn} />
  ) : (
    <SignUp setIsSignIn={setIsSignIn} />
  );
}
