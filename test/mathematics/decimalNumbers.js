"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { TRACE_LEVEL } = levels;

const logLevel = TRACE_LEVEL,
      projectName = "decimal-numbers",
      projectsDirectoryPath = "../../Mathematics";

describe(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
