import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../state/actions/userActions";

const Dashboard = ({ getAllUsers }) => {
  useEffect(() => {
    getAllUsers({ role: "primary" });
  }, [getAllUsers]);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

const mapDispatchToProps = {
  getAllUsers,
};
export default connect(null, mapDispatchToProps)(Dashboard);
