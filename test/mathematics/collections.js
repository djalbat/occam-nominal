"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { TRACE_LEVEL } = levels;

const name = "collections",
      logLevel = TRACE_LEVEL,
      projectsDirectoryPath = "../../Mathematics";

describe.only(name, () => {
  createSuite(name, logLevel, projectsDirectoryPath);
});
