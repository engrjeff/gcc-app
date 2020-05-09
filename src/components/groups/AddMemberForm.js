import React, { Fragment } from "react";
import Joi from "@hapi/joi";
// import { parseDate } from "../../helpers/datamapper";
import {
  cellStatusOptions,
  churchStatusOptions,
  genderOptions,
} from "../../helpers/helpers";

import { connect } from "react-redux";
import { createCellMember } from "../../state/actions/cellMemberActions";

import Form from "../shared/Form";
import Spinner from "../shared/Spinner";

class AddMemberForm extends Form {
  state = {
    data: {
      name: "",
      address: "",
      birthdate: "",
      gender: "male",
      cellStatus: "1T",
      churchStatus: "NACS",
    },
    errors: {},
  };

  schema = Joi.object({
    name: Joi.string().required().label("Name"),
    address: Joi.string().required().label("address"),
    birthdate: Joi.string()
      .pattern(
        new RegExp("^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$")
      )
      .required()
      .label("birthdate"),
    cellStatus: Joi.string().required().label("cellStatus"),
    churchStatus: Joi.string().required().label("Time"),
    gender: Joi.string().required().label("Gender"),
  });

  doSubmit() {
    this.props.createCellMember(this.state.data, this.props.history);
  }
  render() {
    return (
      <Fragment>
        {this.props.loading && <Spinner />}
        <form onSubmit={this.handleSubmit} className="mt-1">
          <h2>Add Disciple</h2>
          {this.renderInput("name", "Name")}
          {this.renderInput("address", "Address")}
          {this.renderInput("birthdate", "Birthdate", "text", "MM/DD/YYYY")}
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
            <div className="col-6">
              {this.renderRadioGroup("gender", "Gender", genderOptions)}
            </div>
          </div>
          {this.renderButton("Save")}
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.member.loading,
  };
};
const mapDispatchToProps = {
  createCellMember,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberForm);
