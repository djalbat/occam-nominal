"use strict";

const { arrayUtilities } =require("necessary"),
      { Log, ReleaseContext, verificationUtilities } =require("occam-languages");

const { FileContextFromFilePath } = require("../utilities/fileContext"),
      { releaseContextFromDependency } = require("../utilities/releaseContext");

const { first } = arrayUtilities,
      { createReleaseContexts, verifyReleaseContexts, initialiseReleaseContexts } = verificationUtilities;

function createSuite(name, logLevel, projectsDirectoryPath) {
  let releaseContext = null;

  const releaseContexts = [];

  let context;

  before(() => {
    const log = Log.fromLogLevel(logLevel),
          callback = async (context, breakPoint) => {
            ///
          };

    context = {
      log,
      callback,
      releaseContexts,
      projectsDirectoryPath,
      FileContextFromFilePath,
      releaseContextFromDependency
    }
  });

  it("create", async () => {
    const dependencyName = name,  ///
          releaseContextsCreated = await createReleaseContexts(dependencyName, context);

    assert.isTrue(releaseContextsCreated);
  });

  it("initialise", () => {
    initialiseReleaseContexts(context);
  });

  it("verify", async () => {
    const releaseContextsVerify = await verifyReleaseContexts(context);

    assert.isTrue(releaseContextsVerify);

    releaseContexts.reverse();

    const firstReleaseContext = first(releaseContexts);

    releaseContext = firstReleaseContext; ///
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
    const releaseContxt = ReleaseContext.fromLogNameJSONEntriesCallbackAndCustomGrammar(log, name, json, entries, callback, customGrammar);

    releaseContxt.initialise(releaseContexts, FileContextFromFilePath);
  });

  return () => {
    return releaseContext;
  };
}

module.exports = {
  createSuite
};
