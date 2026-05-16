"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { ERROR_LEVEL } = levels;

const name = "groups",
      logLevel = ERROR_LEVEL,
      projectsDirectoryPath = "../..//Mathematics";

describe.only(name, () => {
  createSuite(name, logLevel, projectsDirectoryPath);
});
