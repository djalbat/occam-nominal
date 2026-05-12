"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const name = "classical-propositional-logic",
      logLevel = ERROR_LEVEL,
      projectsDirectoryPath = "../..//Logic";

describe(name, () => {
  createSuite(name, logLevel, projectsDirectoryPath);
});
