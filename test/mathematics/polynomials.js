"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { TRACE_LEVEL } = levels;

const logLevel = TRACE_LEVEL,
      projectName = "polynomials",
      projectsDirectoryPath = "../../Mathematics";

describe.skip(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
