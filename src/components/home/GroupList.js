import React, { Fragment } from "react";
import GroupListItem from "./GroupListItem";

const GroupList = ({ groupData }) => {
  return (
    <Fragment>
      {/* <h3 className="group-list-title">
        <span className="fas fa-users"></span> Cell Groups
      </h3> */}
      <div className="row">
        {groupData &&
          groupData.map((item) => <GroupListItem item={item} key={item._id} />)}
      </div>
    </Fragment>
  );
};

export default GroupList;
