const asyncHandler = require("../middlewares/async");
const HttpError = require("../models/HttpError");
const Profile = require("../models/Profile");

// @route     GET /api/v1/profile/:id
// @desc      Get profile by id
// @access    Private
const getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id).populate(
    "user",
    "name"
  );

  res.status(200).json({
    status: "success",
    data: profile,
  });
});

// @route     GET /api/v1/profile/me
// @desc      Get current user's profile
// @access    Private
const getCurrentProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "user",
    "name"
  );

  res.status(200).json({
    status: "success",
    data: profile,
  });
});

// @route     POST /api/v1/profile/
// @desc      Create or update a profile
// @access    Private
const createProfile = asyncHandler(async (req, res, next) => {
  const profileObj = { ...req.body, user: req.user.id };
  let profile = await Profile.findOne({ user: req.user.id });
  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
  } else {
    profile = await Profile.create(profileObj);
  }
  res.status(200).json({
    status: "success",
    data: profile,
  });
});

// @route     DELETE /api/v1/profile/
// @desc      Delete a profile
// @access    Private
const deleteProfile = asyncHandler(async (req, res, next) => {
  await Profile.findOneAndRemove({ user: req.user.id });
  res.status(200).json({
    status: "success",
    data: {},
  });
});

module.exports = {
  getProfile,
  getCurrentProfile,
  createProfile,
  deleteProfile,
};
