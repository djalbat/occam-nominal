"use strict";

const { levels } = require("necessary"),
      { Dependency } =require("occam-model"),
      { arrayUtilities } =require("necessary"),
      { Log, ReleaseContext, verificationUtilities } =require("occam-languages");

const { FileContextFromFilePath } = require("./utilities/fileContext"),
      { releaseContextFromDependency } = require("./utilities/releaseContext");

const { first } = arrayUtilities,
      { TRACE_LEVEL } = levels,
      { createReleaseContexts, verifyReleaseContexts, initialiseReleaseContexts } = verificationUtilities;

describe("minimal-propositional-logic", () => {
  const logLevel = TRACE_LEVEL,
        log = Log.fromLogLevel(logLevel),
        name = "minimal-propositional-logic",
        callback = async (context, breakPoint) => {
          ///
        },
        releaseContexts = [];

  let context,
      dependency;

  before(() => {
    const projectsDirectoryPath = "/Users/djalbat/logic";

    context = {
      log,
      callback,
      releaseContexts,
      projectsDirectoryPath,
      FileContextFromFilePath,
      releaseContextFromDependency
    }

    dependency = Dependency.fromName(name);
  });

  before(async () => {
    const dependencyName = name;  ///

    await createReleaseContexts(dependencyName, context);

    initialiseReleaseContexts(context);
  });

  it("verifies", async () => {
    const releaseContextsVerify = await verifyReleaseContexts(context);

    assert.isTrue(releaseContextsVerify);
  });

  let json,
      entries,
      customGrammar;

  it("serialises", () => {
    const firstReleaseContext = first(releaseContexts),
          releaseContext = firstReleaseContext; ///

    json = releaseContext.toJSON();

    entries = releaseContext.getEntries();

    customGrammar = releaseContext.getCustomGrammar();
  });

  it("unserialises", () => {
    releaseContexts.reverse();

    const releaseContxt = ReleaseContext.fromLogNameJSONEntriesCallbackAndCustomGrammar(log, name, json, entries, callback, customGrammar);

    releaseContxt.initialise(releaseContexts, FileContextFromFilePath);
  });
});
