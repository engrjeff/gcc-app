import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./state/store";
import setAuthToken from "./state/utils/setAuthToken";
import { loadUser } from "./state/actions/authActions";

import Navbar from "./components/layout/Navbar";
import Home from "./components/home/Home";
import Main from "./components/main/Main";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import NotFound from "./components/shared/NotFound";

const token = localStorage.getItem("auth-token");
if (token) {
  setAuthToken(token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
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
              <Route path="/home" component={Home} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" to="/home" exact />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
