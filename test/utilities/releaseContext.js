"use strict";

const { releaseContextUtilities } = require("occam-languages"),
      { fileSystemUtilities: occamFileSystemUtilities } = require("occam-server"),
      { pathUtilities, fileSystemUtilities: necessaryFileSystemUtilities } = require("necessary");

const { loadProject } = occamFileSystemUtilities,
      { concatenatePaths } = pathUtilities,
      { readFile, isEntryFile, checkEntryExists } = necessaryFileSystemUtilities,
      { releaseContextFromJSON, releaseContextFromProject } = releaseContextUtilities;

async function releaseContextFromDependency(dependency, context) {
  let releaseContext = null;

  const { projectsDirectoryPath } = context,
        dependencyName = dependency.getName(),
        entryPath = concatenatePaths(projectsDirectoryPath, dependencyName),
        entryExists = checkEntryExists(entryPath);

  if (entryExists) {
    const entryFile = isEntryFile(entryPath);

    if (entryFile) {
      const filePath = entryPath, ///
            content = readFile(filePath),
            jsonString = content, ///
            json = JSON.parse(jsonString);

      releaseContext = releaseContextFromJSON(json, context);
    } else {
      const projectName = dependencyName, ///
            project = loadProject(projectName, projectsDirectoryPath);

      releaseContext = releaseContextFromProject(project, context);
    }
  }

  return releaseContext;
}

module.exports = {
  releaseContextFromDependency
};
