const express = require("express");
const checkAuth = require("../middleware/checkAdminAuth");
const blogController = require("../controller/blogController");

const router = express.Router();

router.post("/", blogController.addBlog);
// router.get("/", blogController.getBlogs);
// router.get("/:id", blogController.getBlog);
// router.put("/:id", blogController.updateBlog);
// router.delete("/:id", blogController.deleteBlog);

module.exports = router;
