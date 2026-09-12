"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { TRACE_LEVEL } = levels;

const logLevel = TRACE_LEVEL,
      projectName = "operations",
      projectsDirectoryPath = "../../Algorithms";

describe.skip(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
