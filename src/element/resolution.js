"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { attempt, serialise } from "../utilities/context";

const { all } = continuationUtilities,
      { breakPointToBreakPointJSON } = breakPointUtilities;

export default class Resolution extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }

  validate(state, context, forward, back) {
    const resolutionString = this.getString(); ///

    context.trace(`Validating the '${resolutionString}' resolution...`);

    return attempt((context) => {
      const validateStatement = this.validateStatement.bind(this);

      return all([
        validateStatement
      ], state, context, (state, context, back) => {
        const resolution = this; ///

        this.commit(context);

        context.debug(`...validated the '${resolutionString}' resolution.`);

        return forward(resolution, context, back);
      }, back);
    }, context);
  }

  validateStatement(state, context, forward, back) {
    const resolutionString = this.getString();  ///

    context.trace(`Validating the '${resolutionString}' resolution's statement...`);

    return this.statement.validate(state, context, (statement, context, back) => {
      this.statement = statement;

      context.trace(`...validated the '${resolutionString}' resolution's statement.`);

      return forward(state, context, back);
    }, back);
  }

  unifyStatement(statement, generalContext, specificContext, forward, back) {
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
