import React from "react";

const Input = ({ name, label, placeholder, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        placeholder={placeholder || `Enter your ${name}`}
        className="form-control-input"
        name={name}
        {...rest}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
