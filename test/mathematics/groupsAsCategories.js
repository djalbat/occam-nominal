"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { TRACE_LEVEL } = levels;

const logLevel = TRACE_LEVEL,
      projectName = "groups-as-categories",
      projectsDirectoryPath = "../../Mathematics";

describe.only(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
