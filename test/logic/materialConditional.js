"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const name = "material-conditional",
      logLevel = ERROR_LEVEL,
      projectsDirectoryPath = "/Users/djalbat/Logic";

describe(name, () => {
  createSuite(name, logLevel, projectsDirectoryPath);
});
