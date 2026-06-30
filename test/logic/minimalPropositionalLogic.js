"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { TRACE_LEVEL } = levels;

const logLevel = TRACE_LEVEL,
      projectName = "minimal-propositional-logic",
      projectsDirectoryPath = "../../Logic";

describe.only(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
