const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
  try {
    const { username, firstname, lastname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      await user.save();
      res.status(201).json({
        success: true,
        message: "Registration successful",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Registration failed", error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Wrong password.",
      });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};
