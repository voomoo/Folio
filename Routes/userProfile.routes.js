const express = require("express");
const router = express.Router();

const {createUser, getUserProfile} = require("../Controllers/userProfile.controller")

router.route("/create-user").post(createUser);
router.route("/").get(getUserProfile);

module.exports = router;