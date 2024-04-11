// const express = require("express");
// const app = express();

// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const adminRoutes = require("./routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");
// const blogRoutes = require("./routes/blogRoutes");
// const projectsRoutes = require("./routes/projectsRoutes");
// require("dotenv").config();
// app.use(cors());
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // Connect to MongoDB
// mongoose
//   .connect(`${process.env.mongodb}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//   });
// app.use("/admin", adminRoutes);
// app.use("/", userRoutes);
// app.use("/project", projectsRoutes);
// app.use("/blog", blogRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello india");
// });

// app.listen(process.env.port, () => {
//   console.log(
//     `Example app listening at thiss http://localhost:${process.env.port}`
//   );
// });

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const { connect } = require("../src/config/db"); // Import the connect function from db.js
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // Configure body-parser for JSON
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
); // Configure body-parser for URL-encoded data

// Connect to MongoDB using the connect function from db.js
connect();

app.use("/admin", adminRoutes);
app.use("/", userRoutes);
app.use("/project", projectsRoutes);
app.use("/blog", blogRoutes);

app.get("/", (req, res) => {
  res.send("Hello india");
});

app.listen(process.env.port, () => {
  console.log(`Example app listening at http://localhost:${process.env.port}`);
});
