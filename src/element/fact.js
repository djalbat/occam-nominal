"use strict";

import { Element } from "occam-languages";

import { equateStatements } from "../process/equate";

export default class Fact extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }

  getFactNode() {
    const node = this.getNode(),
          factNode = node;  ///

    return factNode;
  }

  isFact() {
    const fact = true;

    return fact;
  }

  isStep() {
    const step = false;

    return step;
  }

  compareStep(step, context) {
    let comparesToStep = false;

    const stepString = step.getString(),
          factString = this.getString();  ///

    context.trace(`Comparing the '${stepString}' step to the '${factString}' fact...`);

    const statement = step.getStatement(),
          comparesToStatement = this.compareStatement(statement, context);

    if (comparesToStatement) {
      comparesToStep = true;
    }

    if (comparesToStep) {
      context.debug(`...compared the '${stepString}' step to the '${factString}' fact.`);
    }

    return comparesToStep;
  }

  compareStatement(statement, context) {
    let comparesToStatement = false;

    const statementString = statement.getString(),
          factString = this.getString();  ///

    context.trace(`Comparing the '${statementString}' statement to the '${factString}' fact...`);

    const leftStatement = statement,  ///
          rightStatement = this.statement,  ///
          statementsEquate = equateStatements(leftStatement, rightStatement, context);

    if (statementsEquate) {
      comparesToStatement = true;
    }

    if (comparesToStatement) {
      context.debug(`...compared the '${statementString}' statement to the '${factString}' fact.`);
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
          factString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${factString}' fact's statement...`);

    return this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${factString}' fact's statement.`);
      }

      return continuation(statementUnifies);
    });
  }
}
