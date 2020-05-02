import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Tab from "../shared/Tab";
import Searchbox from "../shared/Searchbox";
import Groups from "./Groups";
import GroupItemPage from "./GroupItemPage";
import Disciples from "./Disciples";

const Home = () => {
  const tabItems = [
    {
      id: 1,
      name: "Groups",
      path: "/home/cellgroups",
    },
    {
      id: 2,
      name: "Disciples",
      path: "/home/disciples",
    },
  ];

  return (
    <div className="app-page">
      <div className="app-page-header">
        <Tab tabItems={tabItems} />
        <Searchbox />
      </div>
      <div className="app-home-content">
        <Switch>
          <Route path="/home/cellgroups/:id" component={GroupItemPage} />
          <Route path="/home/cellgroups" component={Groups} />
          <Route path="/home/disciples" component={Disciples} />
          <Redirect from="/home" to="/home/cellgroups" />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
