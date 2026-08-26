"use strict";

import { arrayUtilities } from "necessary";
import { Element, continuationUtilities } from "occam-languages";

import { define } from "../elements";

const { last } = arrayUtilities,
      { every } = continuationUtilities;

export default define(class Derivation extends Element {
  constructor(context, string, node, breakPoint, factOrSubproofs) {
    super(context, string, node, breakPoint);

    this.factOrSubproofs = factOrSubproofs;
  }

  getFactOrSubproofs() {
    return this.factOrSubproofs;
  }

  getDerivationNode() {
    const node = this.getNode(),
          derivationNode = node;  ///

    return derivationNode;
  }

  getLastStep() {
    const lastFactOrSubproof = last(this.factOrSubproofs),
          lastFact = lastFactOrSubproof,  ///
          lastStep = lastFact;  ///

    return lastStep;
  }

  verify(context, forward, back) {
    return every(this.factOrSubproofs, (factOrSubproof, context, forward, back) => {
      return factOrSubproof.verify(context, (_, back) => {
        context.addFactOrSubproof(factOrSubproof);

        context.assignAssignments();

        return forward(context, back);
      }, back);
    }, context, forward, back);
  }

  static name = "Derivation";
});

