"use strict";

import { Element } from "occam-languages";

import { equateStatements } from "../process/equate";

export default class Fact extends Element {
  constructor(context, string, node, breakPoint, statement, reference, procedureCall) {
    super(context, string, node, breakPoint);

    this.statement = statement;
    this.reference = reference;
    this.procedureCall = procedureCall;
  }

  getStatement() {
    return this.statement;
  }

  getReference() {
    return this.reference;
  }

  getProcedureCall() {
    return this.procedureCall;
  }

  isFact() {
    const fact = true;

    return fact;
  }

  isStep() {
    const step = false;

    return step;
  }

  validateStatement(state, context, back, forward) {
    if (this.statement === null) {
      return forward(state, context);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's statement...`);

    return this.statement.validate(state, context, back, (statement, context) => {
      this.statement = statement;

      context.trace(`...validated the '${factString}' fact's statement.`);

      return forward(state, context);
    });
  }

  validateReference(state, context, back, forward) {
    if (this.reference === null) {
      return forward(state, context);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's reference...`);

    return this.reference.validate(state, context, back, (reference, context) => {
      this.reference = reference;

      context.trace(`...validated the '${factString}' fact's reference.`);

      return forward(state, context);
    });
  }

  validateProcedureCall(state, context, back, forward) {
    if (this.procedureCall === null) {
      return forward(state, context);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's procedure call...`);

    return this.procedureCall.validate(state, context, back, (procedureCall, context) => {
      this.procedureCall = procedureCall;

      context.trace(`...validated the '${factString}' fact's procedure call.`);

      return forward(state, context);
    });
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

  unifyStatement(statement, generalContext, specificContext, back, forward) {
    if (this.statement === null) {
      const statementUnifies = false;

      return continuation(statementUnifies);
    }

    const context = specificContext,  ///
          factString = this.getString(), ///
          statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with the '${factString}' fact's statement...`);

    return this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${factString}' fact's statement.`);
      }

      return continuation(statementUnifies);
    });
  }
}
