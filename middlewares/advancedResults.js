const advancedResults = (model, populate) => async (req, res, next) => {
  const reqQuery = { ...req.query };

  const excludedFields = ["sortBy", "page", "limit"];

  excludedFields.forEach((field) => delete reqQuery[field]);

  // for authorized users
  if (req.user) {
    reqQuery.leader = req.user.id;
  }
  // FILTERING (cellStatus, churchStatus, gender, birthdate ?)
  let query = model.find(reqQuery);

  if (populate) {
    query = model.find(reqQuery).populate(populate);
  }
  // SORTING
  if (req.query.sortBy) {
    const sortBy = req.query.sortBy.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // PAGINATION
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const results = await query;

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

  res.advancedResults = {
    status: "success",
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
