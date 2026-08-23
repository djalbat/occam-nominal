"use strict";

const { arrayUtilities } = require("necessary"),
      { Log, ReleaseContext, verificationUtilities } =require("occam-languages");

const { FileContextFromFilePath } = require("../utilities/fileContext"),
      { releaseContextFromDependency } = require("../utilities/releaseContext");

const { first } = arrayUtilities,
      { createReleaseContexts, verifyReleaseContexts, initialiseReleaseContexts } = verificationUtilities;

function createSuite(logLevel, projectName, projectsDirectoryPath) {
  let releaseContext = null;

  const log = Log.fromLogLevel(logLevel),
        callback = (breakPoint, context, forward, back) => {
          forward(breakPoint, back);
        },
        releaseContexts = [];

  let context;

  before(() => {
    context = {
      log,
      callback,
      releaseContexts,
      projectsDirectoryPath,
      FileContextFromFilePath,
      releaseContextFromDependency
    }
  });

  it("create", (done) => {
    const dependencyName = projectName;  ///

    createReleaseContexts(dependencyName, context, succeed, fail);

    function succeed(releaseContextsCreated) {
      assert.isTrue(releaseContextsCreated);

      done();
    }

    function fail(exception) {
      throw exception;
    }
  });

  it("initialise", () => {
    initialiseReleaseContexts(context);
  });

  it("verifies", (done) => {
    return verifyReleaseContexts(context, forward, back);

    function forward() {
      assert.isTrue(true);

      const firstReleaseContext = first(releaseContexts);

      releaseContext = firstReleaseContext; ///

      done();
    }

    function back(exception) {
      throw exception;
    }
  });

  let json,
      entries,
      customGrammar;

  it("serialise", () => {
    json = releaseContext.toJSON();

    entries = releaseContext.getEntries();

    customGrammar = releaseContext.getCustomGrammar();
  });

  it("unserialise", () => {
    const name = projectName, ///
          releaseContext = ReleaseContext.fromLogNameJSONEntriesCallbackAndCustomGrammar(log, name, json, entries, callback, customGrammar);

    releaseContext.initialise(releaseContexts, FileContextFromFilePath);
  });
}

module.exports = {
  createSuite
};
