"use strict";

import { Element } from "occam-languages";

import { equateStatements } from "../process/equate";

export default class ProofAssertion extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }

  getProofAssertionNode() {
    const node = this.getNode(),
          proofAssertionNode = node;  ///

    return proofAssertionNode;
  }

  isProofAssertion() {
    const proofAssertion = true;

    return proofAssertion;
  }

  compareStep(step, context) {
    let comparesToStep = false;

    const stepString = step.getString(),
          proofAssertionString = this.getString();  ///

    context.trace(`Comparing the '${stepString}' step to the '${proofAssertionString}' proof assertion...`);

    const statement = step.getStatement(),
          leftStatement = statement,  ///
          rightStatement = this.statement,  ///
          statementsEquate = equateStatements(leftStatement, rightStatement, context);

    if (statementsEquate) {
      comparesToStep = true;
    }

    if (comparesToStep) {
      context.debug(`...compared the '${stepString}' step to the '${proofAssertionString}' proof assertion.`);
    }

    return comparesToStep;
  }

  unifyStatement(statement, generalContext, specificContext) {
    let statementUnifies = false;

    if (this.statement !== null) {
      const context = specificContext, ///
            statementString = statement.getString(),
            proofAssertionString = this.getString();  ///

      context.trace(`Unifying the '${statementString}' statement with the '${proofAssertionString}' proof assertion's statement...`);

      statementUnifies = this.statement.unifyStatement(statement, generalContext, specificContext);

      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${proofAssertionString}' proof assertion's statement.`);
      }
    }

    return statementUnifies;
  }
}
