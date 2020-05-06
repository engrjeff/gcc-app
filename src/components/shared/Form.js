import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";
import Input from "./Input";
import Select from "./Select";
import RadioGroup from "./RadioGroup";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  // VALIDATION
  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateField = ({ name, value }) => {
    const fieldJoiConfig = this.schema.$_terms.keys.find(
      (item) => item.key === name
    ).schema;
    const schema = Joi.object({ [name]: fieldJoiConfig });
    const { error } = schema.validate({ [name]: value });
    let errorMessage = "";
    if (error)
      errorMessage =
        name === "birthdate"
          ? "Please provide a valid birthdate"
          : error.details[0].message;
    return error ? errorMessage : null;
  };
  // HANDLERS
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.validateField(input);
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  // Rendering Helpers
  renderInput(name, label, type = "text", placeholder) {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        options={options}
        onChange={this.handleChange}
      />
    );
  }

  renderRadioGroup(name, label, options) {
    const { data } = this.state;
    return (
      <RadioGroup
        name={name}
        label={label}
        options={options}
        onChange={this.handleChange}
        value={data[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <div className="form-group">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={this.validate()}
        >
          {label}
        </button>
      </div>
    );
  }

  showAlert(error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  renderBottomLink(text1, text2, path) {
    return (
      <p className="form-bottom-text">
        {text1}{" "}
        <span>
          <Link to={`/${path}`}>{text2}</Link>
        </span>
      </p>
    );
  }
}

export default Form;
