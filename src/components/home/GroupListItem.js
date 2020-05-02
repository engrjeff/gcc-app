import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const GroupListItem = ({ item }) => {
  return (
    <Fragment>
      <div className="col-4">
        <div className="group-item">
          <p
            className={`group-item-type badge badge-${
              item.type === "open" ? "primary" : "danger"
            }`}
          >
            {item.type}
          </p>
          <div className="group-item-text">
            <h4 className="group-item-title">
              <Link to={`/home/cellgroups/${item._id}`}>{item.title}</Link>
            </h4>
            <p className="group-item-leader">{item.leader.name}</p>
          </div>
          <div className="group-item-sched">
            <span className="group-item-time">
              <span className="fas fa-clock"></span>
              {item.time}
            </span>
            <span className="badge badge-info group-item-day">{item.day}</span>
          </div>
          <div className="group-title-venue">
            <span className="fas fa-map"></span>
            {item.venue}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GroupListItem;
