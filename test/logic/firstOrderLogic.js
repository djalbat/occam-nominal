"use strict";

const { levels } = require("necessary");

const { createSuite } = require("../utilities/test");

// const { nominalValuesFromNominalFileContext } = require("../utilities/nominal");

const { ERROR_LEVEL } = levels;

const name = "first-order-logic",
      logLevel = ERROR_LEVEL,
      projectsDirectoryPath = "../../Logic";

describe.skip(name, () => {
  const getReleaseContext = createSuite(name, logLevel, projectsDirectoryPath);

  describe("isVariableFree", () => {
    let furtleFileContext,
        nominalFileContext;

    before(() => {
      const releaseContext = getReleaseContext(),
            furtleFilePath = `first-order-logic/Functions/Free and bound variables.ftl`,
            nominalFilePath = `first-order-logic/lemmas.nml`;

      furtleFileContext = findFileContext(furtleFilePath, releaseContext);

      nominalFileContext = findFileContext(nominalFilePath, releaseContext);
    });

    let procedure,
        nominalValues;

    before(() => {
      const procedureName = "isVariableFree";

      nominalValues = nominalValuesFromNominalFileContext(nominalFileContext);

      procedure = furtleFileContext.findProcedureByProcedureName(procedureName);
    });

    it("returns false", async () => {
      const term = await procedure.callNominally(nominalValues),
            primitiveValue = term.getPrimitiveValue(),
            boolean = primitiveValue; ///

      assert.isFalse(boolean);
    });
  });
});

function findFileContext(filePath, releaseContext) {
  const fileContexts = releaseContext.getFileContexts(),
        fileContext = fileContexts.find((fileContext) => {
          const filePathMatches = fileContext.matchFilePath(filePath);

          if (filePathMatches) {
            return true;
          }
        }) || null;

  return fileContext;
}