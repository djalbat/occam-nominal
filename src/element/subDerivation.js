"use strict";

import { arrayUtilities } from "necessary";
import { Element, continuationUtilities } from "occam-languages";

import { define } from "../elements";

const { last } = arrayUtilities,
      { every } = continuationUtilities;

export default define(class SubDerivation extends Element {
  constructor(context, string, node, breakPoint, subproofOrProofAssertions) {
    super(context, string, node, breakPoint);

    this.subproofOrProofAssertions = subproofOrProofAssertions;
  }

  getSubproofOrProofAssertions() {
    return this.subproofOrProofAssertions;
  }

  getSubDerivationNode() {
    const node = this.getNode(),
          subDerivationNode = node; ///

    return subDerivationNode;
  }

  getLastStep() {
    const lastSubproofOrProofAssertion = last(this.subproofOrProofAssertions),
          lastProofAssertion = lastSubproofOrProofAssertion,  ///
          lastStep = lastProofAssertion;  ///

    return lastStep;
  }

  async verify(context) {
    let verifies;

    verifies = await every(this.subproofOrProofAssertions, async (subproofOrProofAssertion) => { ///
      const subproofOrProofAssertionVarifies = await subproofOrProofAssertion.verify(context);

      if (subproofOrProofAssertionVarifies) {
        context.assignAssignments();

        context.addSubproofOrProofAssertion(subproofOrProofAssertion);

        return true;
      }
    });

    return verifies;
  }

  static name = "SubDerivation";
});
