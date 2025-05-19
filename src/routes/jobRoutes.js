const express = require("express");
const router = express.Router();
const {
  getJobs,
  addJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobController");

router.get("/", getJobs);

router.post("/", addJob);

router.delete("/:jobId", deleteJob);

router.put("/:jobId", updateJob);

module.exports = router;
