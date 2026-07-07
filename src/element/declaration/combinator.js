"use strict";

import { continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { breakable } = continuationUtilities;

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

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const combinatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${combinatorDeclarationString}' combinator declaration...`);

    const combinatorVerifies = this.verifyCombinator(context);

    if (combinatorVerifies) {
      context.addCombinator(this.combinator);

      verifies = true;
    }

    if (verifies) {
      context.debug(`...verified the '${combinatorDeclarationString}' combinator declaration.`);
    }

    return verifies;
  }

  verifyCombinator(context) {
    let combinatorVerifies;

    const combinatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${combinatorDeclarationString}' combinator declaration's combinator...`);

    combinatorVerifies = this.combinator.verify(context);

    if (combinatorVerifies) {
      context.debug(`...verified the '${combinatorDeclarationString}' combinator declaration's combinator.`);
    }

    return combinatorVerifies;
  }

  static name = "CombinatorDeclaration";
});
