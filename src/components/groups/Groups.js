import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentUserCellGroups } from "../../state/actions/cellGroupActions";

import GroupView from "./GroupView";
import GroupMembersView from "./GroupMembersView";
import AddMemberForm from "./AddMemberForm";
import Tab from "../shared/Tab";

const Groups = ({ getCurrentUserCellGroups, loading, cellgroup, history }) => {
  const tabItems = [
    {
      id: 1,
      name: "Disciples",
      path: "/me/groups/disciples",
    },
    {
      id: 2,
      name: "Groups",
      path: "/me/groups/view",
    },
  ];

  useEffect(() => {
    getCurrentUserCellGroups();
  }, [getCurrentUserCellGroups]);

  return (
    <div className="app-groups-page">
      <div className="app-groups-header">
        <Tab tabItems={tabItems} />
      </div>
      <div className="app-group-content">
        <Switch>
          <Route path="/me/groups/disciples/create" component={AddMemberForm} />
          <Route path="/me/groups/disciples" component={GroupMembersView} />
          <Route path="/me/groups/view" component={GroupView} />
          <Redirect to="/me/groups/disciples" />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cellgroup: state.cellgroup.userCellgroups,
    loading: state.cellgroup.loading,
  };
};
const mapDispatchToProps = {
  getCurrentUserCellGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
