"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { TRACE_LEVEL } = levels;

const name = "parity",
      logLevel = TRACE_LEVEL,
      projectsDirectoryPath = "../../Mathematics";

describe(name, () => {
  createSuite(name, logLevel, projectsDirectoryPath);
});
