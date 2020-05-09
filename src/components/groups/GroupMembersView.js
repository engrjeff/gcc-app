import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentUserCellMembers,
  deleteCellMember,
} from "../../state/actions/cellMemberActions";
import { parseDate } from "../../helpers/datamapper";

import Table from "../shared/Table/Table";
import Badge from "../shared/Badge";
import Searchbox from "../shared/Searchbox";
import Spinner from "../shared/Spinner";
import DeleteButton from "../shared/DeleteButton";

const GroupMembersView = (props) => {
  const {
    getCurrentUserCellMembers,
    deleteCellMember,
    memberObject,
    history,
  } = props;

  const columns = [
    { path: "name", label: "Name" },
    {
      path: "birthdate",
      label: "Birthdate",
      content: (member) => parseDate(member.birthdate),
    },
    {
      key: "cellStatus",
      label: "Cell Status",
      content: (member) => <Badge content={member.cellStatus} />,
    },
    {
      key: "churchStatus",
      label: "Church Status",
      content: (member) => <Badge content={member.churchStatus} />,
    },
    {
      key: "delete",
      content: (member) => (
        <DeleteButton onClick={() => handleDelete(member)} />
      ),
    },
  ];

  const { loading, members } = memberObject;

  useEffect(() => {
    console.log("run");
    getCurrentUserCellMembers();
  }, [getCurrentUserCellMembers]);

  const handleDelete = (member) => {
    // SHOW SOME ALERT FIRST (to be added soon)
    deleteCellMember(member._id, history);
  };

  return (
    <Fragment>
      {loading && <Spinner />}
      <div className="row">
        <Link
          to="/me/groups/disciples/create"
          className="btn btn-primary btn-sm mt-1 mb-1"
        >
          <span className="fas fa-user-plus"></span> Add
        </Link>
        <Searchbox />
      </div>
      <div className="table-container">
        <Table columns={columns} data={members.data} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    memberObject: state.member,
  };
};
const mapDispatchToProps = {
  getCurrentUserCellMembers,
  deleteCellMember,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembersView);
