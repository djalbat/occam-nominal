"use strict";

import Combinator from "../combinator";

import { define } from "../../elements";

export default define(class BracketedCombinator extends Combinator {
  getBracketedCombinatorNode() {
    const node = this.getNode(),
          bracketedCombinatorNode = node; ///

    return bracketedCombinatorNode;
  }

  unifyStatement(statement, context, back, forarsd) {
    const statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with the bracketed combinator...`);

    return super.unifyStatement(statement, context, back, (context) => {
      context.debug(`...unified the '${statementString}' statement with the bracketed combinator.`);

      return forarsd(context);
    });
  }

  static name = "BracketedCombinator";
});
