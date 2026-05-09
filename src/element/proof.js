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

  async verify(statement, context) {
    let verifies = false;

    await enclose(async (context) => {
      const derivationVerifies = await this.derivation.verify(context);

      if (derivationVerifies) {
        const lastStep = context.getLastStep();

        if (lastStep !== null) {
          const proof = this, ///
                proofStatement = proof.getStatement(),
                proofStatementEqualToStatement = proofStatement.isEqualTo(statement);

          if (proofStatementEqualToStatement) {
            verifies = true;
          }
        }
      }
    }, context);

    return verifies;
  }

  static name = "Proof";
});
