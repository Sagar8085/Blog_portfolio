const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/register", userController.registration);
router.post("/login", userController.login);

// send message to conatct us 
router.post("/contactus", userController.sendMain);


module.exports = router;
