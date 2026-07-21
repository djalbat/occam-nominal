"use strict";

import { Element } from "occam-languages";
import { arrayUtilities } from "necessary";

import { every } from "../utilities/continuation";
import { define } from "../elements";

const { last } = arrayUtilities;

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
    return every(this.subproofOrProofAssertions, context, (subproofOrProofAssertion, continuation) => {
      subproofOrProofAssertion.verify(context, (subproofOrProofAssertionVerifies) => {
        if (subproofOrProofAssertionVerifies) {
          context.assignAssignments();

          context.addSubproofOrProofAssertion(subproofOrProofAssertion);
        }

        return continuation(subproofOrProofAssertionVerifies);
      });
    }, continuation);
  }

  static name = "Derivation";
});

