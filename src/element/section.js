"use strict";

import { Element } from "occam-languages";

import { every } from "../utilities/continuation";
import { define } from "../elements";
import { enclose } from "../utilities/context";

export default define(class Section extends Element {
  constructor(context, string, node, breakPoint, hypotheses, declaration, topLevelAssertion) {
    super(context, string, node, breakPoint);

    this.hypotheses = hypotheses;
    this.declaration = declaration;
    this.topLevelAssertion = topLevelAssertion;
  }

  getHypotheses() {
    return this.hypotheses;
  }

  getDeclaration() {
    return this.declaration;
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

        if (this.declaration !== null) {
          this.declaration.setHypotheses(this.hypotheses);

          const declarationVerifies = await this.declaration.verify(context);

          if (declarationVerifies) {
            verifies = true;
          }
        }

        if (this.topLevelAssertion !== null) {
          this.topLevelAssertion.setHypotheses(this.hypotheses);

          const topLevelAssertionVerifies = await this.topLevelAssertion.verify(context);

          if (topLevelAssertionVerifies) {
            verifies = true;
          }
        }
      }
    }, context);

    if (verifies) {
      context.debug(`...verified the '${sectionString}' section.`);
    }

    return verifies;
  }

  async verifyHypotheses(context) {
    const hypothesesVerify = await every(this.hypotheses, async (hypothesis) => {
      const hypothesisVerifies = await hypothesis.verify(context);

      if (hypothesisVerifies) {
        return true;
      }
    });

    return hypothesesVerify;
  }

  static name = "Section";
});
