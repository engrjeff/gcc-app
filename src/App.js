import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./state/store";

import Navbar from "./components/layout/Navbar";
import Home from "./components/home/Home";
import Main from "./components/main/Main";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import NotFound from "./components/shared/NotFound";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Navbar />
          <div className="app-content">
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/me" component={Main} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" component={Home} />
              <Redirect from="/" to="/home" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
