"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { enclose } from "../utilities/context";

const { breakable } = breakPointUtilities,
      { all, every } = continuationUtilities;

export default define(class Subproof extends Element {
  constructor(context, string, node, breakPoint, suppositions, subDerivation) {
    super(context, string, node, breakPoint);

    this.suppositions = suppositions;
    this.subDerivation = subDerivation;
  }

  getSuppositions() {
    return this.suppositions;
  }

  getSubDerivation() {
    return this.subDerivation;
  }

  getSubproofNode() {
    const node = this.getNode(),
          subproofNode = node;  ///

    return subproofNode;
  }

  getLastStep() { return this.subDerivation.getLastStep(); }

  getStatements() {
    const lastStep = this.getLastStep(),
          suppositionStatements = this.suppositions.map((supposition) => {
            const suppositionStatement = supposition.getStatement();

            return suppositionStatement;
          }),
          lastStepStatement = lastStep.getStatement(),
          statements = [
            ...suppositionStatements,
            lastStepStatement
          ];

    return statements;
  }

  isFact() {
    const fact = false;

    return fact;
  }

  compareStep(step, context) {
    let comparesToStep;

    const stepString = step.getString(),
          subproofString = this.getString();  ///

    context.trace(`Comparing the '${stepString}' step to the '${subproofString}' subproof...`);

    comparesToStep = false;

    if (comparesToStep) {
      context.trace(`...compared the '${stepString}' step to the '${subproofString}' subproof.`);
    }

    return comparesToStep;
  }

  compareStatement(statement, context) {
    let comparesToStatement;

    const subproofString = this.getString(),  ///
          statementString = statement.getString();

    context.trace(`Comparing the '${statementString}' statement to the '${subproofString}' subproof...`);

    comparesToStatement = false;

    if (comparesToStatement) {
      context.trace(`...compared the '${statementString}' statement to the '${subproofString}' subproof.`);
    }

    return comparesToStatement;
  }

  verify = breakable(function(context, continuation) {
    const subproofString = this.getString();

    context.trace(`Verifying the '${subproofString}' subprpoof...`);

    return enclose((context) => {
      const verifySuppositions = this.verifySuppositions.bind(this),
            verifySubDerivation = this.verifySubDerivation.bind(this);

      return all([
        verifySuppositions,
        verifySubDerivation
      ], context, (verifies) => {
        if (verifies) {
          context.debug(`...verified the '${subproofString}' subproof.`);
        }

        return continuation(verifies);
      });
    }, context);
  });

  verifySupposition(supposition, context, continuation) {
    const subproofString = this.getString(),
          suppositionString = supposition.getString();

    context.trace(`Verifying the '${subproofString}' subprpoof's '${suppositionString}' supposition...`);

    return supposition.verify(context, (suppositionVerifies) => {
      if (suppositionVerifies) {
        const factOrSubproof = supposition;  ////

        context.assignAssignments();

        context.addFactOrSubproof(factOrSubproof);
      }

      if (suppositionVerifies) {
        context.debug(`...verified the '${subproofString}' subprpoof's '${suppositionString}' supposition.`);
      }

      return continuation(suppositionVerifies, context);
    });
  }

  verifySuppositions(context, continuation) {
    const suppositionsLength = this.suppositions.length;

    if (suppositionsLength === 0) {
      const suppositionsVerify = true;  ///

      return continuation(suppositionsVerify, context);
    }

    const subproofString = this.getString();  ///

    context.trace(`Verifying the '${subproofString}' subproof's suppositions...`);

    const verifySupposition = this.verifySupposition.bind(this);

    return every(this.suppositions, verifySupposition, context, (suppositionsVerify) => {
      if (suppositionsVerify) {
        context.debug(`...verified the '${subproofString}' subproof's suppositions.`);
      }

      return continuation(suppositionsVerify, context);
    });
  }

  verifySubDerivation(context, continuation) {
    const subproofString = this.getString();  ///

    context.trace(`Verifying the '${subproofString}' subroof's proof...`);

    return this.subDerivation.verify(context, (subDerivationVerifies) => {
      if (subDerivationVerifies) {
        context.debug(`...verified the '${subproofString}' subroof's sub-derivation.`);
      }

      return continuation(subDerivationVerifies, context);
    });
  }

  static name = "Subproof";
});
