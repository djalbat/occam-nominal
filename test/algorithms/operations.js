"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../helpers/test");

const { ERROR_LEVEL } = levels;

const logLevel = ERROR_LEVEL,
      projectName = "operations",
      projectsDirectoryPath = "../../Algorithms";

describe(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
