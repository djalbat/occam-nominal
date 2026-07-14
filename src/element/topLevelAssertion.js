"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { all } from "../utilities/continuation";
import { enclose } from "../utilities/context";
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
      { every, extract, forwardsEvery, backwardsEvery } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  matchMetavariableNode(metavariableNode) {
    const metavariableNodeMatches = this.labels.some((label) => {
      const metavariableNodeMatches = label.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        return true;
      }
    });

    return metavariableNodeMatches;
  }

  verifyEx(context, continuation) {
    const topLevelAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion...`);

    enclose((context) => {
      const verifyProof = this.verifyProof.bind(this),
            verifyLabels = this.verifyLabels.bind(this),
            verifyDeduction = this.verifyDeduction.bind(this),
            verifySuppositions = this.verifySuppositions.bind(this);

      all([
        verifyLabels,
        verifySuppositions,
        verifyDeduction,
        verifyProof
      ], context, (verifies) => {
        if (verifies) {
          context.debug(`...verified the '${topLevelAssertionString}' top level assertion.`);
        }

        continuation(verifies);
      });
    }, context);
  }

  verifyLabels(context, continuation) {
    const topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's labels...`);

    return every(this.labels, (label, continuation) => {
      return this.verifyLabel(label, context, continuation);
    }, (labelsVerify) => {
      if (labelsVerify) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's labels.`);
      }

      continuation(labelsVerify);
    });
  }

  verifyLabel(label, context, continuation) {
    const labelString = label.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's '${labelString}' label...`);

    label.verify((labelVerifies) => {
      if (labelVerifies) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's '${labelString}' label.`);
      }

      continuation(labelVerifies);
    });
  }

  verifyProof(context, continuation) {
    if (this.proof === null) {
      const proofVerifies = true; ///

      continuation(proofVerifies);

      return;
    }

    const topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's proof...`);

    const statement = this.deduction.getStatement();

    this.proof.verify(statement, context, (proofVerifies) => {
      if (proofVerifies) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's proof.`);
      }

      continuation(proofVerifies);
    });
  }

  verifyDeduction(context, continuation) {
    const deductionString = this.deduction.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's '${deductionString}' deduction...`);

    this.deduction.verify(context, (deductionVerifies) => {
      if (deductionVerifies) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's '${deductionString}' deduction.`);
      }

      continuation(deductionVerifies);
    });
  }

  verifySupposition(supposition, context, continuation) {
    const suppositionString = supposition.getString(),
          topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's '${suppositionString}' supposition...`);

    supposition.verify(context, (suppositionVerifies) => {
      if (suppositionVerifies) {
        const subproofOrProofAssertion = supposition;  ////

        context.assignAssignments();

        context.addSubproofOrProofAssertion(subproofOrProofAssertion);
      }

      if (suppositionVerifies) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's '${suppositionString}' supposition.`);
      }

      continuation(suppositionVerifies);
    });
  }

  verifySuppositions(context, continuation) {
    const topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's suppositions...`);

    return forwardsEvery(this.suppositions, (supposition, continuation) => {
      return this.verifySupposition(supposition, context, continuation);
    }, (suppositionsVerify) => {
      if (suppositionsVerify) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's suppositions.`);
      }

      continuation(suppositionsVerify);
    });
  }

  dischargeHypothesis(hypothesis, context) {
    let hypothesisDischarges;

    this.break(context);

    const hypothesisString = hypothesis.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Discharding the '${topLevelAssertionString}' top level assertion's '${hypothesisString}' hypothesis...`);

    hypothesisDischarges = hypothesis.discharge(context);

    if (hypothesisDischarges) {
      context.trace(`...discharges the '${topLevelAssertionString}' top level assertion's '${hypothesisString}' hypothesis.`);
    }

    return hypothesisDischarges;
  }

  dischargeHypotheses(context) {
    const hypotheses = this.getHypotheses(),
          hypothesesDischarges = every(hypotheses, (hypothesis) => {
            const hypothesisDischarges = this.dischargeHypothesis(hypothesis, context);

            if (hypothesisDischarges) {
              return true;
            }
          });

    return hypothesesDischarges;
  }

  unifyStepWithDeduction(step, context) {
    let stepUnifiesWithDeduction = false;

    this.break(context);

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

  unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context) {
    let stepAndSubproofOrProofAssertionsUnify = false;

    const stepUnifiesWithDeduction = this.unifyStepWithDeduction(step, context);

    if (stepUnifiesWithDeduction) {
      const hypothesesDischarges = this.dischargeHypotheses(context);

      if (hypothesesDischarges) {
        const subproofOrProofAssertionsUnifiesWithSuppositions = this.unifySubproofOrProofAssertionsWithSuppositions(subproofOrProofAssertions, context);

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

  unifySubproofOrProofAssertionsWithSupposition(subproofOrProofAssertions, supposition, context) {
    let subproofOrProofAssertionsUnifiesWithSupposition = false;

    this.break(context);

    if (!subproofOrProofAssertionsUnifiesWithSupposition) {
      const subproofOrProofAssertion = extract(subproofOrProofAssertions, (subproofOrProofAssertion) => {
        const subproofOrProofAssertionUnifies = supposition.unifySubproofOrProofAssertion(subproofOrProofAssertion, context);

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
      const suppositionUnifiesIndependently = supposition.unifyIndependently(context);

      if (suppositionUnifiesIndependently) {
        subproofOrProofAssertionsUnifiesWithSupposition = true;
      }
    }

    return subproofOrProofAssertionsUnifiesWithSupposition;
  }

  unifySubproofOrProofAssertionsWithSuppositions(subproofOrProofAssertions, context) {
    let subproofOrProofAssertionsUnifiesWithSuppositions;

    subproofOrProofAssertions = reverse(subproofOrProofAssertions); ///

    subproofOrProofAssertionsUnifiesWithSuppositions = backwardsEvery(this.suppositions, (supposition) => {
      const stepUnifiesWithSupposition = this.unifySubproofOrProofAssertionsWithSupposition(subproofOrProofAssertions, supposition, context);

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
