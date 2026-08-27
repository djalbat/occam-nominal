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

  verify = breakable(function(context, forward, back) {
    const subproofString = this.getString();

    context.trace(`Verifying the '${subproofString}' subprpoof...`);

    return enclose((context) => {
      const verifySuppositions = this.verifySuppositions.bind(this),
            verifySubDerivation = this.verifySubDerivation.bind(this);

      return all([
        verifySuppositions,
        verifySubDerivation
      ], context, (context , back) => {
        context.debug(`...verified the '${subproofString}' subproof.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to verify the '${subproofString}' subprpoof.`);

        return back();
      });
    }, context);
  });

  verifySupposition(supposition, context, forward, back) {
    const subproofString = this.getString(),
          suppositionString = supposition.getString();

    context.trace(`Verifying the '${subproofString}' subprpoof's '${suppositionString}' supposition...`);

    return supposition.verify(context, (context, back) => {
      context.debug(`...verified the '${subproofString}' subprpoof's '${suppositionString}' supposition.`);

      return forward(context, back);
    }, back);
  }

  verifySuppositions(context, forward, back) {
    const suppositionsLength = this.suppositions.length;

    if (suppositionsLength === 0) {
      const suppositionsVerify = true;  ///

      return continuation(suppositionsVerify, context);
    }

    const subproofString = this.getString();  ///

    context.trace(`Verifying the '${subproofString}' subproof's suppositions...`);

    return every(this.suppositions, (supposition, contezt, forward, back) => {
      return this.verifySupposition(supposition, contezt, ( _ , back) => {
        const factOrSubproof = supposition; ///

        context.addFactOrSubproof(factOrSubproof);

        context.assignAssignments();

        return forward(context, back);
      }, back);
    }, context, (context, back) => {
      context.debug(`...verified the '${subproofString}' subproof's suppositions.`);

      return forward(context, back);
    }, back);
  }

  verifySubDerivation(context, forward, back) {
    const subproofString = this.getString();  ///

    context.trace(`Verifying the '${subproofString}' subroof's sub-derivation...`);

    return this.subDerivation.verify(context, (context, back) => {
      context.debug(`...verified the '${subproofString}' subroof's sub-derivation.`);

      return forward(context, back);
    }, back);
  }

  static name = "Subproof";
});
