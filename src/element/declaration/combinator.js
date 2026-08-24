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

  isMalformned() {
    const combinatorDeclarationNode = this.getCombinatorDeclarationNode(),
          malformed = combinatorDeclarationNode.isMalformed();

    return malformed;
  }

  verify = breakable(function (context, forward, back) {
    const combinatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${combinatorDeclarationString}' combinator declaration...`);

    const verifyCombinator = this.verifyCombinator.bind(this);

    return all([
      verifyCombinator
    ], context, (context, back) => {
      context.addCombinator(this.combinator);

      context.debug(`...verified the '${combinatorDeclarationString}' combinator declaration.`);

      return forward(context, back);
    }, back);
  });

  verifyCombinator(context, forward, back) {
    const combinatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${combinatorDeclarationString}' combinator declaration's combinator...`);

    return this.combinator.verify(context, (context, back) => {
      context.debug(`...verified the '${combinatorDeclarationString}' combinator declaration's combinator.`);

      return forward(context, back);
    }, back);
  }

  static name = "CombinatorDeclaration";
});
