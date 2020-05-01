const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const {
  getProfile,
  getCurrentProfile,
  createProfile,
  deleteProfile,
} = require("../controllers/profileController");

router.get("/me", auth, getCurrentProfile);
router.get("/:id", auth, getProfile);
router.route("/").post(auth, createProfile).delete(auth, deleteProfile);

module.exports = router;
