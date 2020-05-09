import React from "react";

const Badge = ({ content }) => {
  return <div className={`badge badge-${content}`}>{content}</div>;
};

export default Badge;
