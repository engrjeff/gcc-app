import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Home from "./components/home/Home";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Groups from "./components/groups/Groups";
import Reports from "./components/reports/Reports";

const App = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <div className="app-content">
          <Sidebar />
          <div className="app-main-content">
            <Switch>
              <Route path="/register" exact component={RegisterForm} />
              <Route path="/login" exact component={LoginForm} />
              <Route path="/" exact component={Home} />

              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/groups" exact component={Groups} />
              <Route path="/reports" exact component={Reports} />
            </Switch>
          </div>
        </div>
      </main>
    </Router>
  );
};

export default App;
