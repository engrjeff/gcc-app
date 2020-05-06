import React from "react";
import { Redirect } from "react-router-dom";
import Form from "../shared/Form";
import Spinner from "../shared/Spinner";
import Joi from "@hapi/joi";
import { connect } from "react-redux";
import { login } from "../../state/actions/authActions";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  doSubmit() {
    this.props.login(this.state.data);
  }
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/me" />;
    }
    return (
      <div className="app-form-container has-background">
        {this.props.loading && <Spinner />}
        <form onSubmit={this.handleSubmit} className="app-form">
          <h2>Log In</h2>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.props.error && this.showAlert(this.props.error)}
          {this.renderButton("Log In")}
          {this.renderBottomLink(
            "Does not have an account yet? ",
            "Register",
            "register"
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
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
