import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";

import { getAllCellGroups } from "../../state/actions/cellGroupActions";

import Spinner from "../shared/Spinner";
import GroupList from "./GroupList";

const Groups = ({ loading, cellgroups, getAllCellGroups }) => {
  useEffect(() => {
    getAllCellGroups();
  }, [getAllCellGroups]);

  return (
    <Fragment>
      {loading && <Spinner />}
      <GroupList groupData={cellgroups.data} />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.cellgroup.loading,
    cellgroups: state.cellgroup.cellgroups,
  };
};
const mapDispatchToProps = {
  getAllCellGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
