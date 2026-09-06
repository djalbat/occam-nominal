"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";

const { last } = arrayUtilities,
      { every } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

export default define(class SubDerivation extends Element {
  constructor(context, string, node, breakPoint, factOrSubproofs) {
    super(context, string, node, breakPoint);

    this.factOrSubproofs = factOrSubproofs;
  }

  getFactOrSubproofs() {
    return this.factOrSubproofs;
  }

  getSubDerivationNode() {
    const node = this.getNode(),
          subDerivationNode = node; ///

    return subDerivationNode;
  }

  getLastStep() {
    const lastFactOrSubproof = last(this.factOrSubproofs),
          lastProofAssertion = lastFactOrSubproof,  ///
          lastStep = lastProofAssertion;  ///

    return lastStep;
  }

  verify = unbreakable(function (context, forward, back) {
    return every(this.factOrSubproofs, (factOrSubproof, context, forward, back) => {
      return factOrSubproof.verify(context, (context , back) => {
        context.addFactOrSubproof(factOrSubproof);

        context.assignAssignments();

        return forward(context, back);
      }, back);
    }, context, forward, back);
  });

  static name = "SubDerivation";
});
