const HttpError = require("../models/HttpError");

const error = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(error);

  // mongoose errors
  if (error.name === "CastError") {
    const message = "Resource not found.";
    error = new HttpError(404, message);
  }
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message);
    error = new HttpError(400, message);
  }
  if (error.code === 11000) {
    const message = "A field that has a duplicate is entered.";
    error = new HttpError(400, message);
  }
  res.status(error.statusCode || 500).json({
    status: "fail",
    error: error.message || "Server error",
  });
};

module.exports = error;
