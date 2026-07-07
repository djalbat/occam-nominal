"use strict";

import { continuationUtilities } from "occam-languages";

import Combinator from "../combinator";

import { define } from "../../elements";

const { breakable } = continuationUtilities;

export default define(class BracketedCombinator extends Combinator {
  getBracketedCombinatorNode() {
    const node = this.getNode(),
          bracketedCombinatorNode = node; ///

    return bracketedCombinatorNode;
  }

  async unifyStatement(statement, context) {
    let statementUnifies;

    const statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with the bracketed combinator...`);

    statementUnifies = await super.unifyStatement(statement, context);

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the bracketed combinator.`);
    }

    return statementUnifies;
  }

  static name = "BracketedCombinator";
});
