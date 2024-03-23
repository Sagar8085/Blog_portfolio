const express = require("express");
const adminController = require("../controller/adminController");

const router = express.Router();

router.post("/register", adminController.registration);
router.post("/login", adminController.login);

module.exports = router;
