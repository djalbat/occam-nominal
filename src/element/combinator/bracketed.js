"use strict";

import Combinator from "../combinator";

import { define } from "../../elements";

export default define(class BracketedCombinator extends Combinator {
  getBracketedCombinatorNode() {
    const node = this.getNode(),
          bracketedCombinatorNode = node; ///

    return bracketedCombinatorNode;
  }

  unifyStatement(statement, state, context, forward, back) {
    return super.unifyStatement(statement, context, forward, back);
  }

  static name = "BracketedCombinator";
});
