const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");
app.use(cors());
app.use(express.json());
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello Worlaskjdkajsdlkjd!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
