"use strict";

import { arrayUtilities } from "necessary";
import { Element, continuationUtilities } from "occam-languages";

import { define } from "../elements";

const { last } = arrayUtilities,
      { every } = continuationUtilities;

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

  verify(context, continuation) {
    return every(this.factOrSubproofs, (factOrSubproof, context, continuation) => {
      factOrSubproof.verify(context, (factOrSubproofVerifies) => {
        if (factOrSubproofVerifies) {
          context.assignAssignments();

          context.addFactOrSubproof(factOrSubproof);
        }

        return continuation(factOrSubproofVerifies, context);
      });
    }, context, continuation);
  }

  static name = "SubDerivation";
});
