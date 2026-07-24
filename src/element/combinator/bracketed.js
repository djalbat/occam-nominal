"use strict";

import Combinator from "../combinator";

import { define } from "../../elements";

export default define(class BracketedCombinator extends Combinator {
  getBracketedCombinatorNode() {
    const node = this.getNode(),
          bracketedCombinatorNode = node; ///

    return bracketedCombinatorNode;
  }

  unifyStatement(statement, context, continuation) {
    const statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with the bracketed combinator...`);

    return super.unifyStatement(statement, context, (statementUnifies, context) => {
      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the bracketed combinator.`);
      }

      return continuation(statementUnifies, context);
    });
  }

  static name = "BracketedCombinator";
});
