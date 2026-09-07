"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { TRACE_LEVEL } = levels;

const logLevel = TRACE_LEVEL,
      projectName = "first-order-logic",
      projectsDirectoryPath = "../../Logic";

describe.only(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
