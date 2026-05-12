"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const name = "operations",
      logLevel = ERROR_LEVEL,
      projectsDirectoryPath = "../..//Algorithms";

describe.skip(name, () => {
  createSuite(name, logLevel, projectsDirectoryPath);
});
