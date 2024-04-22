const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); // Import dotenv package

// Load environment variables from the .env file
dotenv.config();

const checkAuth = (req, res, next) => {
  // Extract the token from the "Authorization" header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No Bearer token provided",
    });
  }
  // Extract the token from the header
  console.log("authHeader>>", authHeader.split(" "));
  const token = authHeader.split(" ")[1];

  // Verify the token using your secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    // Attach the decoded token (which contains the user ID) to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = checkAuth;
