import React from "react";

const DeleteButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-danger btn-sm">
      <span className="fas fa-trash-alt"></span> Delete
    </button>
  );
};

export default DeleteButton;
