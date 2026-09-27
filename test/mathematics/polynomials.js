"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../helpers/test");

const { TRACE_LEVEL } = levels;

const logLevel = TRACE_LEVEL,
      projectName = "polynomials",
      projectsDirectoryPath = "../../Mathematics";

describe.only(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
