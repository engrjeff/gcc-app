const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

const CellMember = require("../models/CellMember");

const populate = {
  path: "leader",
  select: "name",
};

const {
  getAllCellMembers,
  getCellMembers,
  createCellMember,
  updateCellMember,
  deleteCellMember,
  test,
} = require("../controllers/cellMemberController");

router
  .route("/")
  .get(advancedResults(CellMember, populate), getAllCellMembers)
  .post(auth, createCellMember);
router
  .route("/me")
  .get(auth, advancedResults(CellMember, populate), getCellMembers);
router.route("/:id").put(auth, updateCellMember).delete(auth, deleteCellMember);

// test
router.get("/test", test);

module.exports = router;
