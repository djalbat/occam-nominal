"use strict";

const { Dependency } =require("occam-model"),
      { arrayUtilities } =require("necessary"),
      { Log, verificationUtilities, ReleaseContext} =require("occam-languages"),
      { fileContextUtilities, releaseContextUtilities } =require("../lib/index"); ///

const { first } = arrayUtilities,
      { FileContextFromFilePath } = fileContextUtilities,
      { releaseContextFromDependency } = releaseContextUtilities,
      { createReleaseContexts, verifyReleaseContexts, initialiseReleaseContexts } = verificationUtilities;

describe("first-order-logic", () => {
  const log = Log.fromNothing(),
        name = "first-order-logic",
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
    await createReleaseContexts(dependency, context);

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
