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

  validateStatement(state, context, continuation) {
    let statementValidates;

    if (this.statement !== null) {
      const factString = this.getString();  ///

      context.trace(`Validating the '${factString}' fact's statement...`);

      statementValidates = this.statement.validate(state, context, (statement, context) => {
        let validates;

        this.statement = statement;

        validates = continuation(state, context);

        return validates;
      });

      if (statementValidates) {
        context.trace(`...validated the '${factString}' fact's statement.`);
      }
    } else {
      statementValidates = continuation(state, context);
    }

    return statementValidates;
  }

  validateReference(state, context, continuation) {
    let referenceValidates;

    if (this.reference !== null) {
      const resolutionString = this.getString(),  ///
            referenceString = this.reference.getString();

      context.trace(`Validating the '${resolutionString}' resolution's '${referenceString}' reference...`);

      referenceValidates = this.reference.validate(state, context, (reference, context) => {
        let validates;

        this.reference = reference;

        validates = continuation(state, context);

        return validates;
      });

      if (referenceValidates) {
        context.debug(`...validated the '${resolutionString}' resolution's '${referenceString}' reference.`);
      }
    } else {
      referenceValidates = continuation(state, context);
    }

    return referenceValidates;
  }

  validateProcedureCall(state, context, continuation) {
    let procedureCallValidates;

    if (this.procedureCall !== null) {
      const resolutionString = this.getString();  ///

      context.trace(`Validating the '${resolutionString}' resolution's procedure call...`);

      procedureCallValidates = this.procedureCall.validate(state, context, (procedureCall, context) => {
        let validates;

        this.procedureCall = procedureCall;

        validates = continuation(state, context);

        return validates;
      });

      if (procedureCallValidates) {
        context.trace(`...validated the '${resolutionString}' resolution's procedure call.`);
      }
    } else {
      procedureCallValidates = continuation(state, context);
    }

    return procedureCallValidates;
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
