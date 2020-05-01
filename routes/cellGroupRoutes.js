const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  createCellGroup,
  updateCellGroup,
  deleteCellGroup,
  getCellGroup,
  getCellGroups,

  addCellMember,
  deleteCellMember,
} = require("../controllers/cellGroupController");

router.route("/me").get(auth, getCellGroups);

router.route("/").post(auth, createCellGroup);

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
