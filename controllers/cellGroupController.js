const asyncHandler = require("../middlewares/async");
const HttpError = require("../models/HttpError");
const CellGroup = require("../models/CellGroup");
const CellMember = require("../models/CellMember");

// @route     POST /api/v1/cellgroup/
// @desc      Create a new cell group
// @access    Private
const createCellGroup = asyncHandler(async (req, res, next) => {
  req.body.leader = req.user.id;
  const cellgroup = await CellGroup.create(req.body);
  res.status(201).json({
    status: "success",
    data: cellgroup,
  });
});

// @route     GET /api/v1/cellgroup/
// @desc      Gets all cell groups of current user
// @access    Private
const getCellGroups = asyncHandler(async (req, res, next) => {
  const cellgroups = await CellGroup.find({ leader: req.user.id })
    .populate({
      path: "members",
    })
    .populate({
      path: "leader",
      select: "name",
    });

  res.status(200).json({
    status: "success",
    count: cellgroups.length,
    data: cellgroups,
  });
});

// @route     GET /api/v1/cellgroup/:id
// @desc      Gets specific cell group current user by id
// @access    Private
const getCellGroup = asyncHandler(async (req, res, next) => {
  const cellgroup = await CellGroup.findById(req.params.id)
    .populate({
      path: "members",
    })
    .populate({
      path: "leader",
      select: "name",
    });
  if (!cellgroup) return next(new HttpError(404, "Resource not found."));
  res.status(200).json({
    status: "success",
    data: cellgroup,
  });
});

// @route     PUT /api/v1/cellgroup/:id
// @desc      Update a cell group by id
// @access    Private
const updateCellGroup = asyncHandler(async (req, res, next) => {
  let cellgroup = await CellGroup.findById(req.params.id);

  if (!cellgroup) return next(new HttpError(404, "Resource not found."));

  cellgroup = await CellGroup.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: cellgroup,
  });
});

// @route     DELETE /api/v1/cellgroup/:id
// @desc      Delete a cell group by id
// @access    Private
const deleteCellGroup = asyncHandler(async (req, res, next) => {
  const cellgroup = await CellGroup.findById(req.params.id);

  if (!cellgroup) return next(new HttpError(404, "Resource not found."));

  await cellgroup.remove();

  res.status(200).json({
    status: "success",
    data: {},
  });
});

// @route     PUT /api/v1/cellgroup/:id/members/:memberId
// @desc      Add member to specific cell group
// @access    Private
const addCellMember = asyncHandler(async (req, res, next) => {
  const cellgroup = await CellGroup.findById(req.params.id);

  if (!cellgroup) return next(new HttpError(404, "Resource not found."));

  const member = await CellMember.findOne({
    leader: req.user.id,
    _id: req.params.memberId,
  });

  if (!member) return next(new HttpError(404, "Cell member does not exist."));

  const isIncluded = cellgroup.members.indexOf(req.params.memberId) !== -1;

  if (isIncluded) {
    return next(
      new HttpError(
        404,
        "The specified member is already included in this cell group."
      )
    );
  }

  cellgroup.members.push(member);
  await cellgroup.save();

  res.status(200).json({
    status: "success",
    data: cellgroup,
  });
});

// @route     PUT /api/v1/cellgroup/:id/members/:memberId
// @desc      Delete a member of specific cell group
// @access    Private
const deleteCellMember = asyncHandler(async (req, res, next) => {
  const cellgroup = await CellGroup.findById(req.params.id);

  if (!cellgroup) return next(new HttpError(404, "Resource not found."));

  const member = await CellMember.findOne({
    leader: req.user.id,
    _id: req.params.memberId,
  });

  if (!member) return next(new HttpError(404, "Cell member does not exist."));

  const index = cellgroup.members.indexOf(req.params.memberId);

  if (index === -1) {
    return next(
      new HttpError(
        404,
        "The specified member does not exist in this cell group."
      )
    );
  }
  //delete here
  cellgroup.members.splice(index, 1);
  await cellgroup.save();

  res.status(200).json({
    status: "success",
    data: cellgroup,
  });
});

module.exports = {
  getCellGroups,
  getCellGroup,
  createCellGroup,
  updateCellGroup,
  deleteCellGroup,
  addCellMember,
  deleteCellMember,
};
