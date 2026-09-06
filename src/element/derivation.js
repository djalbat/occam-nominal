"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import {unbreakable} from "occam-languages/lib/utilities/breakPoint";

const { last } = arrayUtilities,
      { every } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

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

  verify = unbreakable(function (context, forward, back) {
    return every(this.factOrSubproofs, (factOrSubproof, context, forward, back) => {
      return factOrSubproof.verify(context, (context , back) => {
        context.addFactOrSubproof(factOrSubproof);

        context.assignAssignments();

        return forward(context, back);
      }, back);
    }, context, forward, back);
  });

  static name = "Derivation";
});
