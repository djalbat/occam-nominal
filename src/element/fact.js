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

  validateStatement(state, context, continuation) {
    let statementValidates = true;  ///

    if (this.statement === null) {
      return continuation(statementValidates, state, context);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's statement...`);

    return this.statement.validate(state, context, (statement, context) => {
      if (statement === null) {
        statementValidates = false;
      }

      if (statementValidates) {
        this.statement = statement;

        context.trace(`...validated the '${factString}' fact's statement.`);
      }

      return continuation(statementValidates, state, context);
    });
  }

  validateReference(state, context, continuation) {
    let referenceValidates = true;  ///

    if (this.reference === null) {
      return continuation(referenceValidates, state, context);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's reference...`);

    return this.reference.validate(state, context, (reference, context) => {
      if (reference === null) {
        referenceValidates = false;
      }

      if (referenceValidates) {
        this.reference = reference;

        context.trace(`...validated the '${factString}' fact's reference.`);
      }

      return continuation(referenceValidates, state, context);
    });
  }

  validateProcedureCall(state, context, continuation) {
    let procedureCallValidates = true;  ///

    if (this.procedureCall === null) {
      return continuation(procedureCallValidates, state, context);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's procedure call...`);

    return this.procedureCall.validate(state, context, (procedureCall, context) => {
      if (procedureCall === null) {
        procedureCallValidates = false;
      }

      if (procedureCallValidates) {
        this.procedureCall = procedureCall;

        context.trace(`...validated the '${factString}' fact's procedure call.`);
      }

      return continuation(procedureCallValidates, state, context);
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

  unifyStatement(statement, generalContext, specificContext, continuation) {
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
