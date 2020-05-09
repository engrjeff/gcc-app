import React from "react";
import Joi from "@hapi/joi";

import Form from "../shared/Form";

class CreateGroupForm extends Form {
  state = {
    data: {
      title: "",
      type: "open",
      venue: "",
      day: "",
      time: "",
    },
    errors: {},
  };

  schema = Joi.object({
    title: Joi.string().required().label("Title"),
    type: Joi.string().required().label("Type"),
    venue: Joi.string().required().label("Venue"),
    day: Joi.string().required().label("Day"),
    time: Joi.string().required().label("Time"),
  });

  render() {
    return (
      <div>
        <h1>Crate Group Form</h1>
      </div>
    );
  }
}

export default CreateGroupForm;
