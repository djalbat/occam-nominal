"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { enclose } from "../utilities/context";

const { breakable } = breakPointUtilities,
      { asynchronousAll, asynchronousEvery } = continuationUtilities;

export default define(class Section extends Element {
  constructor(context, string, node, breakPoint, hypotheses, declaration, claim) {
    super(context, string, node, breakPoint);

    this.hypotheses = hypotheses;
    this.declaration = declaration;
    this.claim = claim;
  }

  getHypotheses() {
    return this.hypotheses;
  }

  getDeclaration() {
    return this.declaration;
  }

  getClaim() {
    return this.claim;
  }

  getSectionNode() {
    const node = this.getNode(),
          sectionNode = node; ///

    return sectionNode;
  }

  verify = breakable(function (context, continuation) {
    const sectionString = this.getString();  ///

    context.trace(`Verifying the '${sectionString}' section...`);

    return enclose((context) => {
      const verifyClaim = this.verifyClaim.bind(this),
            verifyHypotheses = this.verifyHypotheses.bind(this),
            verifyDeclaration = this.verifyDeclaration.bind(this);

      return asynchronousAll([
        verifyHypotheses,
        verifyDeclaration,
        verifyClaim
      ], context, (verifies) => {
        if (verifies) {
          context.debug(`...verified the '${sectionString}' section.`);
        }

        return continuation(verifies, context);
      });
    }, context);
  });

  verifyClaim(context, continuation) {
    let claimVerifies = true; ///

    if (this.claim === null) {
      return continuation(claimVerifies, context);
    }

    const sectionString = this.getString();  ///

    context.trace(`Verifying the '${sectionString}' section's claim...`);

    const claimSatisfaible = this.claim.isSatisfiable();

    if (claimSatisfaible) {
      const claimString = this.claim.getString();

      claimVerifies = false;

      context.debug(`The satisfiable '${claimString}' claim in not allowed in the '${sectionString}' section.`);

      return continuation(claimVerifies, context);
    }

    this.claim.setHypotheses(this.hypotheses);

    return this.claim.verify(context, (claimVerifies) => {
      if (claimVerifies) {
        context.debug(`...verified the '${sectionString}' section's claim.`);
      }

      return continuation(claimVerifies, context);
    });
  }

  verifyHypotheses(context, continuation) {
    const sectionString = this.getString();  ///

    context.trace(`Verifying the '${sectionString}' section's hypotheses...`);

    return asynchronousEvery(this.hypotheses, (hypothesis, context, continuation) => {
      return hypothesis.verify(context, continuation);
    }, context, (hypothesesVerify) => {
      if (hypothesesVerify) {
        context.assignAssignments();
      }

      if (hypothesesVerify) {
        context.debug(`...verified the '${sectionString}' section's hypotheses.`);
      }

      return continuation(hypothesesVerify, context);
    });
  }

  verifyDeclaration(context, continuation) {
    if (this.declaration === null) {
      const declarationVerifies = true; ///

      return continuation(declarationVerifies, context);
    }

    const sectionString = this.getString();  ///

    context.trace(`Verifying the '${sectionString}' section's declaration...`);

    this.declaration.setHypotheses(this.hypotheses);

    return this.declaration.verify(context, (declarationVerifies) => {
      if (declarationVerifies) {
        context.debug(`...verified the '${sectionString}' section's declaration.`);
      }

      return continuation(declarationVerifies, context);
    });
  }

  static name = "Section";
});
