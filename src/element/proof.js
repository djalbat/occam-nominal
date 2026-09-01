"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { isolate, enclose } from "../utilities/context";

const { cut } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class Proof extends Element {
  constructor(context, string, node, breakPoint, derivation) {
    super(context, string, node, breakPoint);

    this.derivation = derivation;
  }

  getDerivation() {
    return this.derivation;
  }

  getProofNode() {
    const node = this.getNode(),
          proofNode = node; ///

    return proofNode;
  }

  getLastStep() { return this.derivation.getLastStep(); }

  getStatement() {
    const lastStep = this.getLastStep(),
          lastStepStatement = lastStep.getStatement(),
          statement = lastStepStatement; ///

    return statement;
  }

  verify = breakable(function(statement, context, forward, back) {
    forward = cut(forward, back); ///

    return isolate((statement, context, forward, back) => {
      return enclose((context) => {
        return this.derivation.verify(context, (context, back) => {
          const lastStep = context.getLastStep();

          if (lastStep === null) {
            return back();
          }

          const proof = this, ///
                proofStatement = proof.getStatement(),
                proofStatementEqualToStatement = proofStatement.isEqualTo(statement);

          if (!proofStatementEqualToStatement) {
            return back();
          }

          return forward(back);
        }, back);
      }, context);
    }, statement, context, (statement, context, back) => {
      return forward(context, back);
    }, back);
  });

  static name = "Proof";
});
