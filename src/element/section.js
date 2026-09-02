"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { isolate, enclose } from "../utilities/context";

const { breakable } = breakPointUtilities,
      { cut, all, every } = continuationUtilities;

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

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const sectionString = this.getString();  ///

    context.trace(`Verifying the '${sectionString}' section...`);

    return isolate((context, forward, back) => {
      return enclose((context) => {
        const verifyClaim = this.verifyClaim.bind(this),
              verifyHypotheses = this.verifyHypotheses.bind(this),
              verifyDeclaration = this.verifyDeclaration.bind(this);

        return all([
          verifyHypotheses,
          verifyDeclaration,
          verifyClaim
        ], context, (context, back) => {
          return forward(back);
        }, back);
      }, context);
    }, context, (context, back) => {
      context.debug(`...verified the '${sectionString}' section.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${sectionString}' section.`);

      return back();
    });
  });

  verifyClaim(context, forward, back) {
    if (this.claim === null) {
      return forward(context, back);
    }

    const sectionString = this.getString();  ///

    context.trace(`Verifying the '${sectionString}' section's claim...`);

    const claimSatisfaible = this.claim.isSatisfiable();

    if (claimSatisfaible) {
      const claimString = this.claim.getString();

      context.debug(`The satisfiable '${claimString}' claim in not allowed in the '${sectionString}' section.`);

      return back();
    }

    this.claim.setHypotheses(this.hypotheses);

    return this.claim.verify(context, (context, back) => {
      context.debug(`...verified the '${sectionString}' section's claim.`);

      return forward(context, back);
    }, back);
  }

  verifyHypotheses(context, forward, back) {
    const sectionString = this.getString();  ///

    context.trace(`Verifying the '${sectionString}' section's hypotheses...`);

    return every(this.hypotheses, (hypothesis, context, forward, back) => {
      return hypothesis.verify(context, (context, back) => {
        context.assignAssignments();

        return forward(context, back);
      }, back);
    }, context, (context, back) => {
      context.debug(`...verified the '${sectionString}' section's hypotheses.`);

      return forward(context, back);
    }, back);
  }

  verifyDeclaration(context, forward, back) {
    if (this.declaration === null) {
      return forward(context, back);
    }

    const sectionString = this.getString();  ///

    context.trace(`Verifying the '${sectionString}' section's declaration...`);

    this.declaration.setHypotheses(this.hypotheses);

    return this.declaration.verify(context, (context, back) => {
      context.debug(`...verified the '${sectionString}' section's declaration.`);

      return forward(context, back);
    }, back);
  }

  static name = "Section";
});
