"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { all } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class CombinatorDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, combinator) {
    super(context, string, node, breakPoint);

    this.combinator = combinator;
  }

  getCombinator() {
    return this.combinator;
  }

  getCombinatorDeclarationNode() {
    const node = this.getNode(),
          combinatorDeclarationNode = node; ///

    return combinatorDeclarationNode;
  }

  verify = breakable(function (context, continuation) {
    const combinatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${combinatorDeclarationString}' combinator declaration...`);

    const verifyCombinator = this.verifyCombinator.bind(this);

    return all([
      verifyCombinator
    ], context, (verifies, context) => {
      if (verifies) {
        context.addCombinator(this.combinator);
      }

      if (verifies) {
        context.debug(`...verified the '${combinatorDeclarationString}' combinator declaration.`);
      }

      return continuation(verifies, context);
    });
  });

  verifyCombinator(context, continuation) {
    const combinatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${combinatorDeclarationString}' combinator declaration's combinator...`);

    return this.combinator.verify(context, (combinatorVerifies) => {
      if (combinatorVerifies) {
        context.debug(`...verified the '${combinatorDeclarationString}' combinator declaration's combinator.`);
      }

      return continuation(combinatorVerifies, context);
    });
  }

  static name = "CombinatorDeclaration";
});
