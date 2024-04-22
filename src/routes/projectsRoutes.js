const express = require("express");
const checkAuth = require("../middleware/checkAdminAuth");
const projectController = require("../controller/projectController");

const router = express.Router();

router.post("/", checkAuth, projectController.addProject);
router.get("/", checkAuth, projectController.getProjects);
router.get("/:id", projectController.getProject);
router.put("/:id", checkAuth, projectController.updateProject);
router.delete("/:id", checkAuth, projectController.deleteProject);

module.exports = router;
