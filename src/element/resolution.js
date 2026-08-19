"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { attempt, reconcile, serialise } from "../utilities/context";

const { breakPointToBreakPointJSON } = breakPointUtilities;

export default class Resolution extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }

  validate(state, context, continuation) {
    let validates;

    const specificContext = context,  ///
          resolutionString = this.getString(); ///

    context.trace(`Validating the '${resolutionString}' resolution...`);

    const resolution = this;  ///

    attempt((context) => {
      const validateStatement = this.validateStatement.bind(this);

      validates = all([
        validateStatement
      ], state, context, (state, context) => {
        let validates;

        this.commit(context);

        context = specificContext;  ///

        validates = continuation(resolution, context);

        return validates;
      });
    }, context);

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${resolutionString}' resolution.`);
    }

    return validates;
  }

  validateStatement(state, context, continuation) {
    let statementValidates;

    const resolutionString = this.getString();  ///

    context.trace(`Validating the '${resolutionString}' resolution's statement...`);

    statementValidates = this.statement.validate(state, context, (statement, context) => {
      let validates;

      this.statement = statement;

      validates = continuation(state, context);

      return validates;
    });

    if (statementValidates) {
      context.trace(`...validated the '${resolutionString}' resolution's statement.`);
    }

    return statementValidates;
  }

  unifyStep(step, context, continuation) {
    const stepString = step.getString(),
          resolutionString = this.getString();  ///

    context.trace(`Unifying the '${stepString}' step with the '${resolutionString}' resolution...`);

    const stepContext = step.getContext(),
          resolutionContext = this.getContext(),  ///
          generalContext = resolutionContext, ///
          specificContext = stepContext;  ///

    return reconcile((specificContext) => {
      const statement = step.getStatement();

      return this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let stepUnifies = false;

        if (statementUnifies) {
          specificContext.commit(context);

          stepUnifies = true;
        }

        if (stepUnifies) {
          context.debug(`...unified the '${stepString}' step with the '${resolutionString}' resolution.`);
        }

        return continuation(stepUnifies);
      });
    }, specificContext);
  }

  unifyStatement(statement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          resolutionString = this.getString(), ///
          statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with the '${resolutionString}' resolution's statement...`);

    return this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${resolutionString}' resolution's statement.`);
      }

      return continuation(statementUnifies);
    });
  }
  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const json = {
        context,
        string,
        breakPoint
      };

      return json;
    }, context);
  }
}
