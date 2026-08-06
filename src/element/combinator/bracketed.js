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
    let statementUnifiesWithBracketedCombinator = false;

    const statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with the bracketed combinator...`);

    const statementUnifies = super.unifyStatement(statement, context, continuation);

    if (statementUnifies) {
      statementUnifiesWithBracketedCombinator = true;
    }

    if (statementUnifiesWithBracketedCombinator) {
      context.debug(`...unified the '${statementString}' statement with the bracketed combinator.`);
    }

    return statementUnifiesWithBracketedCombinator;
  }

  static name = "BracketedCombinator";
});
