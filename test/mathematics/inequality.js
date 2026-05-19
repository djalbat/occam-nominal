"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const name = "inequality",
      logLevel = ERROR_LEVEL,
      projectsDirectoryPath = "../../Mathematics";

describe(name, () => {
  createSuite(name, logLevel, projectsDirectoryPath);
});
