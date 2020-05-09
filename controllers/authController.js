const asyncHandler = require("../middlewares/async");
const HttpError = require("../models/HttpError");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @route     POST /api/v1/auth/register
// @desc      Register a new user
// @access    Public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  // Gen token here
  const token = user.generateToken();

  res.status(200).json({
    status: "success",
    data: token,
  });
});

// @route     POST /api/v1/auth/login
// @desc      User login
// @access    Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HttpError(400, "Email and password are required."));
  }

  // email lookup
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HttpError(401, "Invalid credentials."));
  }

  // check password
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new HttpError(401, "Invalid credentials."));
  }

  // Gen token here
  const token = user.generateToken();

  res.status(200).json({
    status: "success",
    data: token,
  });
});

const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

module.exports = {
  register,
  login,
  getMe,
};
