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

  isStep() {
    const step = false;

    return step;
  }

  compareStep(step, context) {
    let comparesToStep = false;

    const stepString = step.getString(),
          proofAssertionString = this.getString();  ///

    context.trace(`Comparing the '${stepString}' step to the '${proofAssertionString}' proof assertion...`);

    const statement = step.getStatement(),
          comparesToStatement = this.compareStatement(statement, context);

    if (comparesToStatement) {
      comparesToStep = true;
    }

    if (comparesToStep) {
      context.debug(`...compared the '${stepString}' step to the '${proofAssertionString}' proof assertion.`);
    }

    return comparesToStep;
  }

  compareStatement(statement, context) {
    let comparesToStatement = false;

    const statementString = statement.getString(),
          proofAssertionString = this.getString();  ///

    context.trace(`Comparing the '${statementString}' statement to the '${proofAssertionString}' proof assertion...`);

    const leftStatement = statement,  ///
          rightStatement = this.statement,  ///
          statementsEquate = equateStatements(leftStatement, rightStatement, context);

    if (statementsEquate) {
      comparesToStatement = true;
    }

    if (comparesToStatement) {
      context.debug(`...compared the '${statementString}' statement to the '${proofAssertionString}' proof assertion.`);
    }

    return comparesToStatement;
  }

  unifyStatement(statement, generalContext, specificContext, continuation) {
    if (this.statement === null) {
      const statementUnifies = false;

      return continuation(statementUnifies);
    }

    const context = specificContext, ///
          statementString = statement.getString(),
          proofAssertionString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${proofAssertionString}' proof assertion's statement...`);

    this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${proofAssertionString}' proof assertion's statement.`);
      }

      return continuation(statementUnifies);
    });
  }
}
