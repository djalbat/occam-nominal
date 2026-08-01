"use strict";

import { arrayUtilities } from "necessary";
import { Element, continuationUtilities } from "occam-languages";

import { define } from "../elements";

const { last } = arrayUtilities,
      { asynchronousEvery } = continuationUtilities;

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

  verify(context, continuation) {
    return asynchronousEvery(this.factOrSubproofs, (factOrSubproof, context, continuation) => {
      return factOrSubproof.verify(context, (factOrSubproofVerifies) => {
        if (factOrSubproofVerifies) {
          context.assignAssignments();

          context.addFactOrSubproof(factOrSubproof);
        }

        return continuation(factOrSubproofVerifies, context);
      });
    }, context, continuation);
  }

  static name = "Derivation";
});

