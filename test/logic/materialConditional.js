"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const logLevel = ERROR_LEVEL,
      projectName = "material-conditional",
      projectsDirectoryPath = "../../Logic";

describe.only(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
