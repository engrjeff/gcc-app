import React from "react";
import { connect } from "react-redux";
import { saveProfile } from "../../state/actions/profileActions";
import { parseDate } from "../../helpers/datamapper";

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

  componentDidMount() {
    if (this.props.profile) {
      const { data } = this.props.profile;
      if (data) {
        const {
          address,
          birthdate,
          cellStatus,
          churchStatus,
          gender,
          leader,
          type,
        } = data;
        this.setState({
          data: {
            address,
            birthdate: parseDate(birthdate),
            cellStatus,
            churchStatus,
            gender,
            type,
            leader: leader._id,
          },
        });
      }
    }
  }

  cellStatusOptions = [
    { id: 1, label: "1st Timer", value: "1T" },
    { id: 2, label: "2nd Timer", value: "2T" },
    { id: 3, label: "3rd Timer", value: "3T" },
    { id: 4, label: "4th Timer", value: "4T" },
    { id: 5, label: "Regular", value: "R" },
  ];

  churchStatusOptions = [
    { id: 1, label: "Not yet attended church", value: "NACS" },
    { id: 2, label: "Attended church", value: "ACS" },
    { id: 3, label: "Consistently attending church", value: "CICS" },
  ];

  typeOptions = [
    { id: 1, label: "Student", value: "student" },
    { id: 2, label: "Professional", value: "professional" },
    { id: 3, label: "Parent", value: "parent" },
  ];

  genderOptions = [
    { id: 1, label: "Male", value: "male" },
    { id: 2, label: "Female", value: "female" },
  ];

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

  doSubmit() {
    this.props.saveProfile(this.state.data, this.props.history);
  }

  render() {
    return (
      <div className="app-form-page">
        {this.props.loading && <Spinner />}
        <form onSubmit={this.handleSubmit}>
          <h2>Create Profile</h2>
          {this.renderInput("address", "Address")}
          {this.renderInput("birthdate", "Birthdate", "text", "MM/DD/YYYY")}
          {this.renderSelect("leader", "Cell Leader", this.getPrimaryLeaders())}
          <div className="row">
            <div className="col-6 pr-1">
              {this.renderSelect(
                "cellStatus",
                "Cell Status",
                this.cellStatusOptions
              )}
            </div>
            <div className="col-6 pl-1">
              {this.renderSelect(
                "churchStatus",
                "Church Status",
                this.churchStatusOptions
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-6 pr-1">
              {this.renderRadioGroup("type", "Type", this.typeOptions)}
            </div>
            <div className="col-6 pl-1">
              {this.renderRadioGroup("gender", "Gender", this.genderOptions)}
            </div>
          </div>
          {this.renderButton("Save Profile")}
        </form>
      </div>
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
