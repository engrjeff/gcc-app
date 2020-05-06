import React from "react";
import { Link } from "react-router-dom";

const UserAvatar = ({ user, avatarClass }) => {
  const [f, s] = user.split(" ");
  const initials = f.substring(0, 1) + s.substring(0, 1);
  return (
    <div className={`avatar_circle ${avatarClass ? avatarClass : ""}`}>
      <Link to="/me">{initials}</Link>
    </div>
  );
};
export default UserAvatar;
