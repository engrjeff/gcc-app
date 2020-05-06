import React from "react";

const EmptyPageWithButton = ({ buttonLabel, onClick }) => {
  return (
    <div className="empty-page-with-button">
      <button className="btn btn-primary" onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default EmptyPageWithButton;
