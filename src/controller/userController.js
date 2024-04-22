const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

exports.sendMain = async (req, res) => {
  try {
    const { useremail, mobile, subject, message } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "abc@gmail.com", // Your email address
        pass: "password", // Your email password
      },
    });

    // Define email options
    let mailOptions = {
      from: "", // Sender email address
      to: "mohit.shrivastava229@gmail.com", // Recipient email address
      subject: subject, // Email subject
      text: message, // Email body text
    };
    await transporter.sendMail(mailOptions);

    // Respond with a success message
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
};
