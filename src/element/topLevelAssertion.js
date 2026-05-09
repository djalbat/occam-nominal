"use strict";

import { arrayUtilities } from "necessary";
import { Element, asynchronousUtilities } from "occam-languages";

import { enclose } from "../utilities/context";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { topLevelAssertionStringFromLabelsSignatureSuppositionsAndDeduction } from "../utilities/string";
import { labelsFromJSON,
         deductionFromJSON,
         signatureFromJSON,
         labelsToLabelsJSON,
         hypothesesFromJSON,
         suppositionsFromJSON,
         deductionToDeductionJSON,
         signatureToSignatureJSON,
         hypothesesToHypothesesJSON,
         suppositionsToSuppositionsJSON } from "../utilities/json";

const { reverse } = arrayUtilities,
      { asyncEvery, asyncExtract, asyncForwardsEvery, asyncBackwardsEvery } = asynchronousUtilities;

export default class TopLevelAssertion extends Element {
  constructor(context, string, node, breakPoint, labels, suppositions, deduction, proof, signature, hypotheses) {
    super(context, string, node, breakPoint);

    this.labels = labels;
    this.suppositions = suppositions;
    this.deduction = deduction;
    this.proof = proof;
    this.signature = signature;
    this.hypotheses = hypotheses;
  }

  getLabels() {
    return this.labels;
  }

  getSuppositions() {
    return this.suppositions;
  }

  getDeduction() {
    return this.deduction;
  }

  getProof() {
    return this.proof;
  }

  getSignature() {
    return this.signature;
  }

  getHypotheses() {
    return this.hypotheses;
  }

  setHypotheses(hypotheses) {
    this.hypotheses = hypotheses;
  }

  getSupposition(index) {
    const supposition = this.suppositions[index] || null;

    return supposition;
  }

  isSatisfiable() {
    const satisfiable = false;

    return satisfiable;
  }

  isHypothetical() {
    const hypothesesLength = this.hypotheses.length,
          hypothetical = (hypothesesLength > 0);

    return hypothetical;
  }

  isUnconditional() {
    const suppositionsLength = this.suppositions.length,
          unconditional = (suppositionsLength === 0);

    return unconditional;
  }

  matchMetavariableNode(metavariableNode) {
    const metavariableNodeMatches = this.labels.some((label) => {
      const metavariableNodeMatches = label.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        return true;
      }
    });

    return metavariableNodeMatches;
  }

  async verify(context) {
    let verifies = false;

    const topLevelAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion...`);

    await enclose(async (context) => {
      const labelsVerify = this.verifyLabels(context);

      if (labelsVerify) {
        const suppositionsVerify = await this.verifySuppositions(context);

        if (suppositionsVerify) {
          const deductionVerifies = await this.verifyDeduction(context);

          if (deductionVerifies) {
            const proofVerifies = await this.verifyProof(context);

            if (proofVerifies) {
              verifies = true;
            }
          }
        }
      }
    }, context);

    if (verifies) {
      context.debug(`...verified the '${topLevelAssertionString}' top level assertion.`);
    }

    return verifies;
  }

  verifyLabels(context) {
    let labelsVerify;

    const topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's labels...`);

    labelsVerify = this.labels.every((label) => {
      const labelVerifies = this.verifyLabel(label, context);

      if (labelVerifies) {
        return true;
      }
    });

    if (labelsVerify) {
      context.debug(`...verified the '${topLevelAssertionString}' top level assertion's labels.`);
    }

    return labelsVerify;
  }

  verifyLabel(label, context) {
    let labelVerifies;

    const labelString = label.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's '${labelString}' label...`);

    labelVerifies = label.verify();

    if (labelVerifies) {
      context.debug(`...verified the '${topLevelAssertionString}' top level assertion's '${labelString}' label.`);
    }

    return labelVerifies;
  }

  async verifyProof(context) {
    let proofVerifies;

    if (this.proof === null) {
      proofVerifies = true;
    } else {
      const topLevelAssertionString = this.getString();  ///

      context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's proof...`);

      const statement = this.deduction.getStatement();

      proofVerifies = await this.proof.verify(statement, context);

      if (proofVerifies) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's proof.`);
      }
    }

    return proofVerifies;
  }

  async verifyDeduction(context) {
    let deductionVerifies;

    const deductionString = this.deduction.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's '${deductionString}' deduction...`);

    deductionVerifies = await this.deduction.verify(context);

    if (deductionVerifies) {
      context.debug(`...verified the '${topLevelAssertionString}' top level assertion's '${deductionString}' deduction.`);
    }

    return deductionVerifies;
  }

  async verifySupposition(supposition, context) {
    let suppositionVerifies;

    const suppositionString = supposition.getString(),
          topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's '${suppositionString}' supposition...`);

    suppositionVerifies = await supposition.verify(context)

    if (suppositionVerifies) {
      const subproofOrProofAssertion = supposition;  ////

      context.assignAssignments();

      context.addSubproofOrProofAssertion(subproofOrProofAssertion);
    }

    if (suppositionVerifies) {
      context.debug(`...verified the '${topLevelAssertionString}' top level assertion's '${suppositionString}' supposition.`);
    }

    return suppositionVerifies;
  }

  async verifySuppositions(context) {
    let suppositionsVerify;

    const topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's suppositions...`);

    suppositionsVerify = await asyncForwardsEvery(this.suppositions, async (supposition) => {
      const suppositionVerifies = await this.verifySupposition(supposition, context);

      if (suppositionVerifies) {
        return true;
      }
    });

    if (suppositionsVerify) {
      context.debug(`...verified the '${topLevelAssertionString}' top level assertion's suppositions.`);
    }

    return suppositionsVerify;
  }

  async dischargeHypothesis(hypothesis, context) {
    let hypothesisDischarged;

    await this.break(context);

    const hypothesisString = hypothesis.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Discharding the '${topLevelAssertionString}' top level assertion's '${hypothesisString}' hypothesis... `);

    hypothesisDischarged = hypothesis.discharge(context);

    if (hypothesisDischarged) {
      context.trace(`...discharged the '${topLevelAssertionString}' top level assertion's '${hypothesisString}' hypothesis. `);
    }

    return hypothesisDischarged;
  }

  async dischargeHypotheses(context) {
    const hypotheses = this.getHypotheses(),
          hypothesesDischarged = await asyncEvery(hypotheses, async (hypothesis) => {
            const hypothesisDischarged = await this.dischargeHypothesis(hypothesis, context);

            if (hypothesisDischarged) {
              return true;
            }
          });

    return hypothesesDischarged;
  }

  async unifyStepWithDeduction(step, context) {
    let stepUnifiesWithDeduction = false;

    await this.break(context);

    const stepString = step.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Unifying the '${stepString}' step with the '${topLevelAssertionString}' top level assertion's deduction...`);

    const stepUnifies = this.deduction.unifyStep(step, context);

    if (stepUnifies) {
      stepUnifiesWithDeduction = true;
    }

    if (stepUnifiesWithDeduction) {
      context.debug(`...unified the '${stepString}' step with the '${topLevelAssertionString}' top level assertion's deduction.`);
    }

    return stepUnifiesWithDeduction;
  }

  async unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context) {
    let stepAndSubproofOrProofAssertionsUnify = false;

    const stepUnifiesWithDeduction = await this.unifyStepWithDeduction(step, context);

    if (stepUnifiesWithDeduction) {
      const hypothesesDischarged = await this.dischargeHypotheses(context);

      if (hypothesesDischarged) {
        const subproofOrProofAssertionsUnifiesWithSuppositions = await this.unifySubproofOrProofAssertionsWithSuppositions(subproofOrProofAssertions, context);

        if (subproofOrProofAssertionsUnifiesWithSuppositions) {
          const derivedSubstitutionsResolved = context.areDerivedSubstitutionsResolved();

          if (derivedSubstitutionsResolved) {
            stepAndSubproofOrProofAssertionsUnify = true;
          }
        }
      }
    }

    return stepAndSubproofOrProofAssertionsUnify;
  }

  async unifySubproofOrProofAssertionsWithSupposition(subproofOrProofAssertions, supposition, context) {
    let subproofOrProofAssertionsUnifiesWithSupposition = false;

    await this.break(context);

    if (!subproofOrProofAssertionsUnifiesWithSupposition) {
      const subproofOrProofAssertion = await asyncExtract(subproofOrProofAssertions, async (subproofOrProofAssertion) => {
        const subproofOrProofAssertionUnifies = await supposition.unifySubproofOrProofAssertion(subproofOrProofAssertion, context);

        if (subproofOrProofAssertionUnifies) {
          context.resolveDerivedSubstitutions();

          return true;
        }
      }) || null;

      if (subproofOrProofAssertion !== null) {
        subproofOrProofAssertionsUnifiesWithSupposition = true;
      }
    }

    if (!subproofOrProofAssertionsUnifiesWithSupposition) {
      const suppositionUnifiesIndependently = await supposition.unifyIndependently(context);

      if (suppositionUnifiesIndependently) {
        subproofOrProofAssertionsUnifiesWithSupposition = true;
      }
    }

    return subproofOrProofAssertionsUnifiesWithSupposition;
  }

  async unifySubproofOrProofAssertionsWithSuppositions(subproofOrProofAssertions, context) {
    let subproofOrProofAssertionsUnifiesWithSuppositions;

    subproofOrProofAssertions = reverse(subproofOrProofAssertions); ///

    subproofOrProofAssertionsUnifiesWithSuppositions = await asyncBackwardsEvery(this.suppositions, async (supposition) => {
      const stepUnifiesWithSupposition = await this.unifySubproofOrProofAssertionsWithSupposition(subproofOrProofAssertions, supposition, context);

      if (stepUnifiesWithSupposition) {
        return true;
      }
    });

    return subproofOrProofAssertionsUnifiesWithSuppositions;
  }

  toJSON() {
    const labelsJSON = labelsToLabelsJSON(this.labels),
          deductionJSON = deductionToDeductionJSON(this.deduction),
          suppositionsJSON = suppositionsToSuppositionsJSON(this.suppositions),
          signatureJSON = signatureToSignatureJSON(this.signature),
          hypothesesJSON = hypothesesToHypothesesJSON(this.hypotheses),
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const labels = labelsJSON,  ///
          deduction = deductionJSON,  ///
          suppositions = suppositionsJSON,  ///
          signature = signatureJSON,  ///
          hypotheses = hypothesesJSON,  ///
          json = {
            string,
            breakPoint,
            labels,
            deduction,
            suppositions,
            signature,
            hypotheses
          };

    return json;
  }

  static fromJSON(Class, json, context) {
    const labels = labelsFromJSON(json, context),
          deduction = deductionFromJSON(json, context),
          suppositions = suppositionsFromJSON(json, context),
          signature = signatureFromJSON(json, context),
          hypotheses = hypothesesFromJSON(json, context),
          topLevelAssertionString = topLevelAssertionStringFromLabelsSignatureSuppositionsAndDeduction(labels, signature, suppositions, deduction),
          string = topLevelAssertionString, ///
          node = null,
          breakPoint = breakPointFromJSON(json),
          proof = null,
          topLevelAssertion = new Class(context, string, node, breakPoint, labels, suppositions, deduction, proof, signature, hypotheses);

    return topLevelAssertion;
  }
}
