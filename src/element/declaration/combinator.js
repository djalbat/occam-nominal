"use strict";

import Declaration from "../declaration";

import { define } from "../../elements";

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

    const combinatorValidates = this.validateCombinator(context);

    if (combinatorValidates) {
      context.addCombinator(this.combinator);

      verifies = true;
    }

    if (verifies) {
      context.debug(`...verified the '${combinatorDeclarationString}' combinator declaration.`);
    }

    return verifies;
  }

  validateCombinator(context) {
    let combinatorValidates;

    const combinatorDeclarationString = this.getString();  ///

    context.trace(`Validating the '${combinatorDeclarationString}' combinator declaration's combinator...`);

    combinatorValidates = this.combinator.validate(context);

    if (combinatorValidates) {
      context.debug(`...validated the '${combinatorDeclarationString}' combinator declaration's combinator.`);
    }

    return combinatorValidates;
  }

  static name = "CombinatorDeclaration";
});
