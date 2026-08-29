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

  isBubproof() {
    const subproof = false;

    return subproof;
  }

  validateStatement(state, context, forward, back) {
    if (this.statement === null) {
      return forward(state, context, back);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's statement...`);

    return this.statement.validate(state, context, (statement, context, back) => {
      this.statement = statement;

      context.trace(`...validated the '${factString}' fact's statement.`);

      return forward(state, context, back);
    }, back);
  }

  validateProcedureCall(state, context, forward, back) {
    if (this.procedureCall === null) {
      return forward(state, context, back);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's procedure call...`);

    return this.procedureCall.validate(state, context, (procedureCall, context, back) => {
      this.procedureCall = procedureCall;

      context.trace(`...validated the '${factString}' fact's procedure call.`);

      return forward(state, context, back);
    }, back);
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

  unifyStatement(statement, generalContext, specificContext, forward, back) {
    if (this.statement === null) {
      return back();
    }

    const context = specificContext,  ///
          factString = this.getString(), ///
          statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with the '${factString}' fact's statement...`);

    return this.statement.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...unified the '${statementString}' statement with the '${factString}' fact's statement.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  applyStatementIndependently(context, forward, back) {
    if (this.statement === null) {
      return forward(context, back);
    }

    const factString = this.getString(); ///

    context.trace(`Appplying the '${factString}' fact's statement independently...`);

    const factContext = this.getContext(), ///
          generalContext = factContext,  ///
          specificContext = context;  ///

    return this.statement.applyIndependently(generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...applied the '${factString}' fact's statement independently.`);

      return forward(context, back);
    }, back);
  }

  applyProcedureCallIndependently(context, forward, back) {
    if (this.procedureCall === null) {
      return forward(context, back);
    }

    const factString = this.getString(); ///

    context.trace(`Applying the '${factString}' fact's procedure call independently...`);

    const factContext = this.getContext(), ///
          generalContext = factContext,  ///
          specificContext = context;  ///

    return this.procedureCall.applyIndependently(generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...applied the '${factString}' fact's procedure call independently.`);

      return forward(context, back);
    }, back);
  }
}
