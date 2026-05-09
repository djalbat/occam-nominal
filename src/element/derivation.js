"use strict";

import { arrayUtilities } from "necessary";
import { Element, asynchronousUtilities } from "occam-languages";

import { define } from "../elements";

const { last } = arrayUtilities,
      { asyncEvery } = asynchronousUtilities;

export default define(class Derivation extends Element {
  constructor(context, string, node, breakPoint, subproofOrProofAssertions) {
    super(context, string, node, breakPoint);

    this.subproofOrProofAssertions = subproofOrProofAssertions;
  }

  getSubproofOrProofAssertions() {
    return this.subproofOrProofAssertions;
  }

  getDerivationNode() {
    const node = this.getNode(),
          derivationNode = node;  ///

    return derivationNode;
  }

  getLastStep() {
    const lastSubproofOrProofAssertion = last(this.subproofOrProofAssertions),
          lastProofAssertion = lastSubproofOrProofAssertion,  ///
          lastStep = lastProofAssertion;  ///

    return lastStep;
  }

  async verify(context) {
    let verifies;

    verifies = await asyncEvery(this.subproofOrProofAssertions, async (subproofOrProofAssertion) => { ///
      const subproofOrProofAssertionVerifies = await subproofOrProofAssertion.verify(context);

      if (subproofOrProofAssertionVerifies) {
        context.assignAssignments();

        context.addSubproofOrProofAssertion(subproofOrProofAssertion);

        return true;
      }
    });

    return verifies;
  }

  static name = "Derivation";
});

