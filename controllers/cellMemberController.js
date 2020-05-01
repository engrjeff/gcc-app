const asyncHandler = require("../middlewares/async");
const HttpError = require("../models/HttpError");
const CellMember = require("../models/CellMember");

// test
const test = asyncHandler(async (req, res, next) => {
  // with birthdays on specified month / current month
  // const result = await CellMember.aggregate([
  //   {
  //     $match: {
  //       $expr: {
  //         $eq: [
  //           { $month: "$birthdate" },
  //           req.query.month * 1 || { $month: new Date() },
  //         ],
  //       },
  //     },
  //   },
  // ]);

  const result = await CellMember.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: [
                { $dayOfMonth: "$birthdate" },
                { $subtract: [{ $dayOfMonth: new Date() }, 1] },
              ],
            },
            { $eq: [{ $month: "$birthdate" }, { $month: new Date() }] },
          ],
        },
      },
    },
  ]);

  res.json(result);
});

// @route     GET /api/v1/cellmember/
// @desc      Get all cell members
// @access    Public
const getAllCellMembers = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };
  console.log(req.query);
  const excludedFields = ["sortBy", "page", "limit"];

  excludedFields.forEach((field) => delete reqQuery[field]);

  // FILTERING (cellStatus, churchStatus, gender, birthdate ?)
  let query = CellMember.find(reqQuery).populate("leader", "name");

  // SORTING
  if (req.query.sortBy) {
    const sortBy = req.query.sortBy.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("name");
  }

  // PAGINATION
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await CellMember.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const cellMembers = await query;

  // PAGINATION RESULT
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    status: "success",
    count: cellMembers.length,
    pagination,
    data: cellMembers,
  });
});

// @route     GET /api/v1/cellmember/me
// @desc      Get the cell members of current user
// @access    Private
const getCellMembers = asyncHandler(async (req, res, next) => {
  const cellMembers = await CellMember.find({ leader: req.user.id }).populate(
    "leader",
    "name"
  );
  res.status(200).json({
    status: "success",
    count: cellMembers.length,
    data: cellMembers,
  });
});

// @route     POST /api/v1/cellmember/
// @desc      Create a new cell member for the current user
// @access    Private
const createCellMember = asyncHandler(async (req, res, next) => {
  const cellMemberObj = { ...req.body, leader: req.user.id };
  const cellMember = await CellMember.create(cellMemberObj);

  res.status(201).json({
    status: "success",
    data: cellMember,
  });
});

// @route     PUT /api/v1/cellmember/:id
// @desc      Update a cell member of the current user by cell member ID
// @access    Private
const updateCellMember = asyncHandler(async (req, res, next) => {
  let cellMember = await CellMember.findById(req.params.id);
  if (!cellMember) return next(new HttpError(404, "Resource not found."));
  cellMember = await CellMember.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  res.json({
    status: "success",
    data: cellMember,
  });
});

// @route     DELETE /api/v1/cellmember/:id
// @desc      Delete a cell member of the current user by cell member ID
// @access    Private
const deleteCellMember = asyncHandler(async (req, res, next) => {
  let cellMember = await CellMember.findById(req.params.id);
  if (!cellMember) return next(new HttpError(404, "Resource not found."));
  await CellMember.findByIdAndRemove(req.params.id);
  res.json({
    status: "success",
    data: {},
  });
});

module.exports = {
  getAllCellMembers,
  getCellMembers,
  createCellMember,
  updateCellMember,
  deleteCellMember,
  test,
};
