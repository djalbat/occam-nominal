"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { serialise } from "../utilities/context";

const { breakPointToBreakPointJSON } = breakPointUtilities;

export default class Resolution extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
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
    const context = specificContext, ///
          statementString = statement.getString(),
          resolutinoString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${resolutinoString}' resolutino's statement...`);

    return this.statement.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...unified the '${statementString}' statement with the '${resolutinoString}' resolutino's statement.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  toJSON() {
    let json;

    const context = this.getContext();

    serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      json = {
        context,
        string,
        breakPoint
      };
    }, context);

    return json;
  }
}
