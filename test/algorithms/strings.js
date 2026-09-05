"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const logLevel = ERROR_LEVEL,
      projectName = "strings",
      projectsDirectoryPath = "../../Algorithms";

describe.skip(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
