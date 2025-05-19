const Job = require("../models/jobModel");

exports.getJobs = async (req, res, next) => {
  const currentPage = Math.max(1, Number(req.query.page) || 1);
  const rowsPerPage = Number(req.query.rowsPerPage) || 10;

  const totalItems = await Job.find().countDocuments();
  const jobs = await Job.find()
    .skip((currentPage - 1) * rowsPerPage)
    .limit(rowsPerPage);

  res.status(200).json({
    message: "Fetched jobs successfully.",
    data: jobs,
    totalItems: totalItems,
  });
};

exports.addJob = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const job = new Job({
      name,
      description,
    });

    await job.save();

    res.status(201).json({
      message: "Job created successfully!",
      data: job,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);

    if (!job) {
      const error = new Error("Could not find job.");
      error.statusCode = 404;
      throw error;
    }

    await Job.findByIdAndDelete(jobId);
    res.status(200).json({ message: "Deleted job.", data: job });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const { name, description } = req.body;

    const job = await Job.findById(jobId);
    job.name = name;
    job.description = description;

    await job.save();

    res.status(201).json({
      message: "Job updated successfully!",
      data: job,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
