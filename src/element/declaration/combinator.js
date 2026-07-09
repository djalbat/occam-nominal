"use strict";

import { breakPointUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { breakable } = breakPointUtilities;

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

    this.verifyCombinator(context, (combinatorVerifies) => {
      let verifies = false;

      if (combinatorVerifies) {
        context.addCombinator(this.combinator);

        verifies = true;
      }

      if (verifies) {
        context.debug(`...verified the '${combinatorDeclarationString}' combinator declaration.`);
      }

      continuation(verifies);
    });
  });

  verifyCombinator(context, continuation) {
    const combinatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${combinatorDeclarationString}' combinator declaration's combinator...`);

    this.combinator.verify(context, (combinatorVerifies) => {
      if (combinatorVerifies) {
        context.debug(`...verified the '${combinatorDeclarationString}' combinator declaration's combinator.`);
      }

      continuation(combinatorVerifies);
    });
  }

  static name = "CombinatorDeclaration";
});
