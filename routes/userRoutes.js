const express = require("express");
const router = express.Router();
const advancedResults = require("../middlewares/advancedResults");
const User = require("../models/User");
const {
  getUsers,
  getCellMembersByUser,
  getCellMemberByUser,
  getCellGroupsByUser,
  getCellGroupByUser,
} = require("../controllers/userController");

router.get("/", advancedResults(User), getUsers);
router.get("/:userId/cellmembers", getCellMembersByUser);
router.get("/:userId/cellmembers/:memberId", getCellMemberByUser);
router.get("/:userId/cellgroups", getCellGroupsByUser);
router.get("/:userId/cellgroups/:groupId", getCellGroupByUser);

module.exports = router;
