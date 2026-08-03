"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { reconcile, serialise } from "../utilities/context";

const { breakPointToBreakPointJSON } = breakPointUtilities;

export default class Resolution extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }

  isNonsensical() {
    const nonsensical = (this.statement === null);

    return nonsensical;
  }

  validate(context, continuation) {
    let validates = false;

    const resolutionString = this.getString();  ///

    context.trace(`Validating the '${resolutionString}' resolution...`);

    const statementValidates = this.validateStatement(context, (context) => {
      const resolution = this; ///

      return continuation(resolution, context);
    });

    if (statementValidates) {
      validates = true;
    }

    if (validates) {
      context.debug(`...validated the '${resolutionString}' resolution.`);
    }

    return validates;
  }

  validateStatement(context, continuation) {
    let statementValidates;

    const resolutionString = this.getString();  ///

    context.trace(`Validating the '${resolutionString}' resolution's statement...`);

    statementValidates = this.statement.validate(context, (statement, context) => {
      return continuation(context);
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
