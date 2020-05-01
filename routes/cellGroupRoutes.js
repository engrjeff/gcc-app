const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

const CellGroup = require("../models/CellGroup");

const {
  createCellGroup,
  updateCellGroup,
  deleteCellGroup,
  getCellGroup,
  getCellGroups,
  getAllCellGroups,

  addCellMember,
  deleteCellMember,
} = require("../controllers/cellGroupController");

const populateWithLeader = {
  path: "leader",
  select: "name",
};

router.route("/me").get(auth, advancedResults(CellGroup), getCellGroups);

router
  .route("/")
  .get(advancedResults(CellGroup, populateWithLeader), getAllCellGroups)
  .post(auth, createCellGroup);

router
  .route("/:id")
  .get(auth, getCellGroup)
  .put(auth, updateCellGroup)
  .delete(auth, deleteCellGroup);

// With relation to cell members
router
  .route("/:id/members/:memberId")
  .put(auth, addCellMember)
  .delete(auth, deleteCellMember);

module.exports = router;
