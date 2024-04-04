const express = require("express");
const checkAuth = require("../middleware/checkAdminAuth");
const projectController = require("../controller/projectController");

const router = express.Router();

router.post("/", projectController.addProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
