"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const logLevel = ERROR_LEVEL,
      projectName = "equality",
      projectsDirectoryPath = "../../Mathematics";

describe(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
