import React from "react";

const RadioGroup = ({ name, label, options, value, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="form-radio-group">
        {options &&
          options.map((item) => (
            <div className="form-radio-row" key={item.id}>
              <input
                type="radio"
                name={name}
                value={item.value}
                id={item.value}
                onChange={onChange}
                className="form-control-input"
                checked={item.value === value}
              />
              <label htmlFor={item.value}>{item.label}</label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RadioGroup;
