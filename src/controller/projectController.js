const { query } = require("express");
const Project = require("../model/project");

exports.addProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(404).json({
        message: "somthing is missing",
      });
    } else {
      const project = new Project({ title, description });
      await project.save();
      return res.status(201).json({
        success: true,
        message: "data submited",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "submitionfailed", error: error });
  }
};

// get all projects

exports.getProjects = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const allProjects = await Project.find();
    return res.status(201).json({
      success: true,
      message: "data submited",
      total: totalProjects,
      project: allProjects,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "submitionfailed", error: error });
  }
};

// get project by Id

exports.getProject = async (req, res) => {
  try {
    const projectid = req.params.id;
    console.log("projectid>>>", projectid);
    const Projectdata = await Project.findById(projectid);
    console.log(Projectdata);
    return res.status(201).json({
      success: true,
      project: Projectdata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Project",
      error: error,
    });
  }
};

// edit project by Id

exports.updateProject = async (req, res) => {
  try {
    const projectid = req.params.id;
    const updateData = req.body;
    const Projectupdate = await Project.findByIdAndUpdate(
      projectid,
      updateData,
      {
        new: true,
      }
    );
    if (!Projectupdate) {
      res.status(404).json({ error: "project not found" });
    } else {
      return res.status(201).json({
        success: true,
        project: Projectupdate,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Project",
      error: error,
    });
  }
};
// delete project
exports.deleteProject = async (req, res) => {
  try {
    const projectid = req.params.id;
    console.log(projectid);
    const projectDelete = await Project.findOneAndDelete({ _id: projectid });
    if (!projectDelete) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    return res.status(204).json({
      success: true,
      message: "Project Deleted..!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Project",
      error: error,
    });
  }
};
