import React from "react";
import Form from "../shared/Form";
import Spinner from "../shared/Spinner";
import Joi from "@hapi/joi";
import { connect } from "react-redux";
import { register } from "../../state/actions/authActions";
import { Redirect } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  });

  doSubmit() {
    this.props.register(this.state.data);
  }
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/me" />;
    }
    return (
      <div className="app-form-container has-background">
        {this.props.loading && <Spinner />}
        <form onSubmit={this.handleSubmit} className="app-form">
          <h2>Register</h2>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.props.error && this.showAlert(this.props.error)}
          {this.renderButton("Submit")}
          {this.renderBottomLink(
            "Already have an account? ",
            "Log In",
            "login"
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.errors,
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
