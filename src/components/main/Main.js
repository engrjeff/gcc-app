import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Sidebar from "../layout/Sidebar";
import Dashboard from "../dashboard/Dashboard";
import Profile from "../profile/Profile";
import ProfileForm from "../profile/ProfileForm";
import Groups from "../groups/Groups";
import Reports from "../reports/Reports";

const Main = (props) => {
  if (!props.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="app-main-container">
      <Sidebar {...props} />
      <div className="app-main-content">
        <Switch>
          <Route path="/me/dashboard" component={Dashboard} />
          <Route path="/me/profile/create" component={ProfileForm} />
          <Route path="/me/profile" component={Profile} />
          <Route path="/me/groups" component={Groups} />
          <Route path="/me/reports" component={Reports} />
          <Redirect from="/me" to="/me/dashboard" />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(Main);
