const asyncHandler = require("../middlewares/async");
const HttpError = require("../models/HttpError");
const User = require("../models/User");
const CellMember = require("../models/CellMember");
const CellGroup = require("../models/CellGroup");

// @route     GET /api/v1/user
// @desc      Gets all the users
// @access    Public
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    count: users.length,
    data: users,
  });
});

// @route     GET /api/v1/user/:userId/cellmembers
// @desc      Gets the cell members by user id (leader)
// @access    Public
const getCellMembersByUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new HttpError(404, "Resource not found."));

  const cellMembers = await CellMember.find({
    leader: req.params.userId,
  }).populate("leader", "name");

  res.status(200).json({
    status: "success",
    count: cellMembers.length,
    data: cellMembers,
  });
});

// @route     GET /api/v1/user/:userId/cellmembers/:memberId
// @desc      Gets cell member of specific user by id
// @access    Public
const getCellMemberByUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new HttpError(404, "Resource not found."));

  const cellMember = await CellMember.findOne({
    leader: req.params.userId,
    _id: req.params.memberId,
  }).populate("leader", "name");

  if (!cellMember)
    return next(
      new HttpError(
        404,
        "The requested cell member for this user does not exist."
      )
    );

  res.status(200).json({
    status: "success",
    data: cellMember,
  });
});

// @route     GET /api/v1/user/:userId/cellgroups
// @desc      Gets the cell groups by user id (leader)
// @access    Public
const getCellGroupsByUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new HttpError(404, "Resource not found."));

  const cellGroups = await CellGroup.find({
    leader: req.params.userId,
  }).populate("leader", "name");

  res.status(200).json({
    status: "success",
    count: cellGroups.length,
    data: cellGroups,
  });
});

// @route     GET /api/v1/user/:userId/cellgroups/:groupId
// @desc      Gets cell group of specific user by id
// @access    Public
const getCellGroupByUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new HttpError(404, "Resource not found."));

  const cellGroup = await CellGroup.findOne({
    leader: req.params.userId,
    _id: req.params.groupId,
  }).populate("leader", "name");

  if (!cellGroup)
    return next(
      new HttpError(
        404,
        "The requested cell group for this user does not exist."
      )
    );

  res.status(200).json({
    status: "success",
    data: cellGroup,
  });
});

module.exports = {
  getUsers,
  getCellMembersByUser,
  getCellMemberByUser,
  getCellGroupsByUser,
  getCellGroupByUser,
};
