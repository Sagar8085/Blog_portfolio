const Admin = require("../model/admin");
const brypt = require("bcrypt");

exports.registration = async (req, res) => {
  try {
    const { username, firstname, lastname, email, password } = req.body;
    console.log(">>>>>>", req.body);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Registration failed", error: error });
  }
};

exports.login = async (req, res) => {
  console.log(">>>>><<<<>", req);
  try {
    const { email, password } = req.body;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error,
    });
  }
};