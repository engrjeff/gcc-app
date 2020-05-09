import React, { Fragment } from "react";
import { connect } from "react-redux";
import { saveProfile } from "../../state/actions/profileActions";
import { parseDate } from "../../helpers/datamapper";
import {
  cellStatusOptions,
  churchStatusOptions,
  genderOptions,
  typeOptions,
} from "../../helpers/helpers";

import Joi from "@hapi/joi";
import Form from "../shared/Form";
import Spinner from "../shared/Spinner";

class ProfileForm extends Form {
  state = {
    data: {
      address: "",
      birthdate: "",
      leader: "",
      cellStatus: "1T",
      churchStatus: "NACS",
      type: "student",
      gender: "male",
    },
    errors: {},
  };

  schema = Joi.object({
    address: Joi.string().required().label("Address"),
    birthdate: Joi.string()
      .pattern(
        new RegExp("^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$")
      )
      .required()
      .label("Birthdate"),
    leader: Joi.string().label("Leader"),
    cellStatus: Joi.string().label("Cell Status"),
    churchStatus: Joi.string().label("Church Status"),
    gender: Joi.string().label("Gender"),
    type: Joi.string().label("Type"),
  });

  mapProfileToState() {
    const { data } = this.props.profile;
    if (!data) return null;
    const {
      address,
      birthdate,
      cellStatus,
      churchStatus,
      gender,
      leader,
      type,
    } = data;
    return {
      address,
      birthdate: parseDate(birthdate),
      cellStatus,
      churchStatus,
      gender,
      leader: leader._id,
      type,
    };
  }

  componentDidMount() {
    if (this.hasProfile) {
      const data = this.mapProfileToState();
      if (!data) return;
      this.setState({ data });
    }
  }

  getPrimaryLeaders = () => {
    const { primaryLeaders, user } = this.props;
    if (primaryLeaders) {
      return primaryLeaders
        .filter((p) => p._id !== user._id)
        .map((item) => {
          return { id: item._id, label: item.name, value: item._id };
        });
    }
  };

  hasProfile = () => {
    const { profile } = this.props;
    if (!profile) return false;
    if (!profile.data) return false;
    return true;
  };

  doSubmit() {
    this.props.saveProfile(
      this.state.data,
      this.props.history,
      this.hasProfile
    );
  }

  render() {
    return (
      <Fragment>
        {this.props.loading && <Spinner />}

        <div className="app-form-page">
          <form onSubmit={this.handleSubmit}>
            <h2>Create Profile</h2>
            {this.renderInput("address", "Address")}
            {this.renderInput("birthdate", "Birthdate", "text", "MM/DD/YYYY")}
            {this.renderSelect(
              "leader",
              "Cell Leader",
              this.getPrimaryLeaders()
            )}
            <div className="row">
              <div className="col-6 pr-1">
                {this.renderSelect(
                  "cellStatus",
                  "Cell Status",
                  cellStatusOptions
                )}
              </div>
              <div className="col-6 pl-1">
                {this.renderSelect(
                  "churchStatus",
                  "Church Status",
                  churchStatusOptions
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-6 pr-1">
                {this.renderRadioGroup("type", "Type", typeOptions)}
              </div>
              <div className="col-6 pl-1">
                {this.renderRadioGroup("gender", "Gender", genderOptions)}
              </div>
            </div>
            {this.renderButton("Save Profile")}
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    primaryLeaders: state.user.users.data,
    loading: state.profile.loading,
    profile: state.profile.profile,
    user: state.auth.user.data,
  };
};

const mapDispatchToProps = {
  saveProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
