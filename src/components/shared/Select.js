import React from "react";

const Select = ({ name, label, options, onChange, value, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control-input"
        name={name}
        onChange={onChange}
        value={value}
      >
        <option key="*" value="" disabled>
          *
        </option>
        {options &&
          options.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
