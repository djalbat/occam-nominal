"use strict";

import { Element, asynchronousUtilities } from "occam-languages";

import { define } from "../elements";
import { enclose } from "../utilities/context";

const { asyncEvery } = asynchronousUtilities;

export default define(class Section extends Element {
  constructor(context, string, node, breakPoint, hypotheses, topLevelAssertion) {
    super(context, string, node, breakPoint);

    this.hypotheses = hypotheses;
    this.topLevelAssertion = topLevelAssertion;
  }

  getHypotheses() {
    return this.hypotheses;
  }

  getTopLevelAssertion() {
    return this.topLevelAssertion;
  }

  getSectionNode() {
    const node = this.getNode(),
          sectionNode = node; ///

    return sectionNode;
  }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const sectionString = this.getString();  ///

    context.trace(`Verifying the '${sectionString}' section...`);

    await enclose(async (context) => {
      const hypothesesVerify = await this.verifyHypotheses(context);

      if (hypothesesVerify) {
        context.assignAssignments();

        const topLevelAssertionVerifies = await this.topLevelAssertion.verify(context);

        if (topLevelAssertionVerifies) {
          this.topLevelAssertion.setHypotheses(this.hypotheses);

          verifies = true;
        }
      }
    }, context);

    if (verifies) {
      context.debug(`...verified the '${sectionString}' section.`);
    }

    return verifies;
  }

  async verifyHypotheses(context) {
    const hypothesesVerify = await asyncEvery(this.hypotheses, async (hypothesis) => {
      const hypothesisVerifies = await hypothesis.verify(context);

      if (hypothesisVerifies) {
        return true;
      }
    });

    return hypothesesVerify;
  }

  static name = "Section";
});
