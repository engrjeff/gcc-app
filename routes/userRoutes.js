const express = require("express");
const router = express.Router();
const {
  getUsers,
  getCellMembersByUser,
  getCellMemberByUser,
  getCellGroupsByUser,
  getCellGroupByUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:userId/cellmembers", getCellMembersByUser);
router.get("/:userId/cellmembers/:memberId", getCellMemberByUser);
router.get("/:userId/cellgroups", getCellGroupsByUser);
router.get("/:userId/cellgroups/:groupId", getCellGroupByUser);

module.exports = router;
