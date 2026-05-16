"use strict";

const { arrayUtilities } =require("necessary"),
      { Log, ReleaseContext, verificationUtilities } =require("occam-languages");

const { FileContextFromFilePath } = require("../utilities/fileContext"),
      { releaseContextFromDependency } = require("../utilities/releaseContext");

const { first } = arrayUtilities,
      { createReleaseContexts, verifyReleaseContexts, initialiseReleaseContexts } = verificationUtilities;

function createSuite(name, logLevel, projectsDirectoryPath) {
  let releaseContext;

  const log = Log.fromLogLevel(logLevel),
        callback = async (context, breakPoint) => {
          ///
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

  before(async () => {
    const dependencyName = name;  ///

    await createReleaseContexts(dependencyName, context);

    initialiseReleaseContexts(context);
  });

  it("verifies", async () => {
    const releaseContextsVerify = await verifyReleaseContexts(context);

    assert.isTrue(releaseContextsVerify);

    releaseContexts.reverse();

    const firstReleaseContext = first(releaseContexts);

    releaseContext = firstReleaseContext; ///
  });

  let json,
      entries,
      customGrammar;

  it("serialises", () => {
    json = releaseContext.toJSON();

    entries = releaseContext.getEntries();

    customGrammar = releaseContext.getCustomGrammar();
  });

  it("unserialises", () => {
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
