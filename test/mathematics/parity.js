"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const name = "parity",
      logLevel = ERROR_LEVEL,
      projectsDirectoryPath = "../..//Mathematics";

describe.skip(name, () => {
  createSuite(name, logLevel, projectsDirectoryPath);
});
