"use strict";

import { Element, asynchronousUtilities } from "occam-languages";

import { define } from "../elements";
import { enclose } from "../utilities/context";

const { asyncEvery } = asynchronousUtilities;

export default define(class Subproof extends Element {
  constructor(context, string, node, breakPoint, suppositions, subDerivation) {
    super(context, string, node, breakPoint);

    this.suppositions = suppositions;
    this.subDerivation = subDerivation;
  }

  getSuppositions() {
    return this.suppositions;
  }

  getSubDerivation() {
    return this.subDerivation;
  }

  getSubproofNode() {
    const node = this.getNode(),
          subproofNode = node;  ///

    return subproofNode;
  }

  getLastStep() { return this.subDerivation.getLastStep(); }

  getStatements() {
    const lastStep = this.getLastStep(),
          suppositionStatements = this.suppositions.map((supposition) => {
            const suppositionStatement = supposition.getStatement();

            return suppositionStatement;
          }),
          lastStepStatement = lastStep.getStatement(),
          statements = [
            ...suppositionStatements,
            lastStepStatement
          ];

    return statements;
  }

  isProofAssertion() {
    const proofAssertion = false;

    return proofAssertion;
  }

  compareStep(step, context) {
    const comparesToStep = false;

    return comparesToStep;
  }

  async verify(context) {
    let verifies = false;

    await enclose(async (context) => {
      const suppositionsVerify = await this.verifySuppositions(context);

      if (suppositionsVerify) {
        const subDerivationVerifies = await this.verifySubDerivation(context);

        if (subDerivationVerifies) {
          verifies = true;
        }
      }
    }, context);

    return verifies;
  }

  async verifySupposition(supposition, context) {
    const suppositionVerifies = await supposition.verify(context);

    if (suppositionVerifies) {
      const subproofOrProofAssertion = supposition;  ////

      context.assignAssignments(context);

      context.addSubproofOrProofAssertion(subproofOrProofAssertion);
    }

    return suppositionVerifies;
  }

  async verifySuppositions(context) {
    let suppositionsVerify;

    suppositionsVerify = await asyncEvery(this.suppositions, async (supposition) => {
      const suppositionVerifies = await this.verifySupposition(supposition, context);

      if (suppositionVerifies) {
        return true;
      }
    });

    return suppositionsVerify;
  }

  async verifySubDerivation(context) {
    const subDerivationVerifies = await this.subDerivation.verify(context);

    return subDerivationVerifies;
  }

  static name = "Subproof";
});
