"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

const { INFO_LEVEL } = levels;

const logLevel = INFO_LEVEL,
      projectName = "groups-as-categories",
      projectsDirectoryPath = "../../Mathematics";

describe.only(projectName, () => {
  createSuite(logLevel, projectName, projectsDirectoryPath);
});
