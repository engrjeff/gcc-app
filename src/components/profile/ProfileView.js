import React from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../layout/UserAvatar";
import {
  mapCellStatus,
  mapChurchStatus,
  parseDate,
} from "../../helpers/datamapper";

const ProfileView = ({ profile }) => {
  const {
    user,
    leader,
    address: Address,
    type: Type,
    cellStatus,
    churchStatus,
    gender: Gender,
    birthdate,
  } = profile;

  const mapProfileToView = () => {
    return {
      Leader: leader.name,
      Address,
      Type,
      Gender,
      Birthdate: parseDate(birthdate),
      "Cell Status": mapCellStatus(cellStatus),
      "Church Status": mapChurchStatus(churchStatus),
    };
  };
  return (
    <div className="app-form-page">
      <div className="profile-view">
        <div className="profile-view-header">
          <UserAvatar user={user.name} avatarClass="avatar_circle-big" />
          <h2 className="profile-view-name">{user.name}</h2>
          <p className="profile-view-role">
            {user.role === "primary" ? "Primary Leader" : "Cell Leader"}
          </p>
        </div>
        <ul className="profile-view-details">
          {Object.keys(mapProfileToView()).map((key) => (
            <li key={key}>
              <span className="span-key">{key} : </span>
              <span className={`span-detail`}>{mapProfileToView()[key]}</span>
            </li>
          ))}
        </ul>
        <Link className="btn btn-primary" to="/me/profile/create">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileView;
