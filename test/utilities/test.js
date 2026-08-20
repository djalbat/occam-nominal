"use strict";

const { arrayUtilities } =require("necessary"),
      { Log, ReleaseContext, verificationUtilities } =require("occam-languages");

const { FileContextFromFilePath } = require("../utilities/fileContext"),
      { releaseContextFromDependency } = require("../utilities/releaseContext");

const { first } = arrayUtilities,
      { createReleaseContexts, verifyReleaseContexts, initialiseReleaseContexts } = verificationUtilities;

function createSuite(logLevel, projectName, projectsDirectoryPath) {
  let releaseContext = null;

  const log = Log.fromLogLevel(logLevel),
        callback = (breakPoint, context, back, forward) => {
          forward(breakPoint);
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

    createReleaseContexts(dependencyName, context, fail, succeed);

    function fail(exception) {
      throw exception;
    }

    function succeed(releaseContextsCreated) {
      assert.isTrue(releaseContextsCreated);

      done();
    }
  });

  it("initialise", () => {
    initialiseReleaseContexts(context);
  });

  it("verifies", (done) => {
    verifyReleaseContexts(context, fail, succeed);

    function fail(exception) {
      throw exception;
    }

    function succeed() {
      assert.isTrue(true);

      releaseContexts.reverse();

      const firstReleaseContext = first(releaseContexts);

      releaseContext = firstReleaseContext; ///

      done();
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
