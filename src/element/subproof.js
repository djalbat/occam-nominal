"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { enclose } from "../utilities/context";
import { all, every } from "../utilities/continuation";

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
    let comparesToStep;

    const stepString = step.getString(),
          subproofString = step.getString();

    context.trace(`Comparing the '${stepString}' step to the '${subproofString}' subproof...`);

    comparesToStep = false;

    if (comparesToStep) {
      context.trace(`...compared the '${stepString}' step to the '${subproofString}' subproof.`);
    }

    return comparesToStep;
  }

  compareStatement(statement, context) {
    let comparesToStatement;

    const subproofString = this.getString(),  ///
          statementString = statement.getString();

    context.trace(`Comparing the '${statementString}' statement to the '${subproofString}' subproof...`);

    comparesToStatement = false;

    if (comparesToStatement) {
      context.trace(`...compared the '${statementString}' statement to the '${subproofString}' subproof.`);
    }

    return comparesToStatement;
  }

  verify(context, continuation) {
    enclose((context) => {
      const verifySuppositions = this.verifySuppositions.bind(this),
            verifySubDerivation = this.verifySubDerivation.bind(this);

      return all([
        verifySuppositions,
        verifySubDerivation
      ], context, continuation);
    }, context);
  }

  verifySupposition(supposition, context, continuation) {
    supposition.verify(context, (suppositionVerifies) => {
      if (suppositionVerifies) {
        const subproofOrProofAssertion = supposition;  ////

        context.assignAssignments(context);

        context.addSubproofOrProofAssertion(subproofOrProofAssertion);
      }

      return continuation(suppositionVerifies);
    });
  }

  verifySuppositions(context, continuation) {
    return every(this.suppositions, (supposition, continuation) => {
      return this.verifySupposition(supposition, context, continuation);
    }, continuation);
  }

  verifySubDerivation(context, continuation) {
    return this.subDerivation.verify(context, continuation);
  }

  static name = "Subproof";
});
