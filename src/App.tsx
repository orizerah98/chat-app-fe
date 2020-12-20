import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ChatPage from "./chats";
import { Authenticate } from "./authenticate";
import { Routes } from "./consts/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.SIGN_IN}>
          <Authenticate />
        </Route>
        <Route path={Routes.CHATS}>
          <ChatPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
