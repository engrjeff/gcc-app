import React from "react";
import { NavLink } from "react-router-dom";

const Tab = ({ tabItems }) => {
  return (
    <div className="tab">
      {tabItems &&
        tabItems.map((item) => (
          <div key={item.id} className="tab-item">
            <NavLink to={item.path} className="tab-link">
              {item.name}
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default Tab;
