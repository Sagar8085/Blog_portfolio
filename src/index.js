const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://mohitshrivastava229:12345@portfolio.4mcawfk.mongodb.net/`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
app.use("/admin", adminRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello india");
});

app.listen(port, () => {
  console.log(`Example app listening at thiss http://localhost:${port}`);
});
