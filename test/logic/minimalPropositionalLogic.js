"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const name = "minimal-propositional-logic",
      logLevel = ERROR_LEVEL,
      projectsDirectoryPath = "/Users/djalbat/Logic";

describe(name, () => {
  createSuite(name, logLevel, projectsDirectoryPath);
});
