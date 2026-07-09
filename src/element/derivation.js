"use strict";

import { arrayUtilities } from "necessary";
import { Element, continuationUtilities } from "occam-languages";

import { define } from "../elements";

const { last } = arrayUtilities,
      { every } = continuationUtilities;

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

  verify(context, continuation) {
    every(this.subproofOrProofAssertions, (subproofOrProofAssertion, continuation) => {
      subproofOrProofAssertion.verify(context, (subproofOrProofAssertionVerifies) => {
        if (subproofOrProofAssertionVerifies) {
          context.assignAssignments();

          context.addSubproofOrProofAssertion(subproofOrProofAssertion);
        }

        continuation(subproofOrProofAssertionVerifies);
      });
    }, continuation);
  }

  static name = "Derivation";
});

