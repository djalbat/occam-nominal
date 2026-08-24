"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { enclose } from "../utilities/context";

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

  verify(statement, context, forward, back) {
    return enclose((context) => {
      return this.derivation.verify(context, ( _, back) => {
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

        return forward(context, back);
      }, back);
    }, context);
  }

  static name = "Proof";
});
