const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getAllCellMembers,
  getCellMembers,
  createCellMember,
  updateCellMember,
  deleteCellMember,
  test,
} = require("../controllers/cellMemberController");

router.route("/").get(getAllCellMembers).post(auth, createCellMember);
router.route("/me").get(auth, getCellMembers);
router.route("/:id").put(auth, updateCellMember).delete(auth, deleteCellMember);

// test
router.get("/test", test);

module.exports = router;
