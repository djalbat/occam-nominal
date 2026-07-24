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

    return enclose((context) => {
      const verifyProof = this.verifyProof.bind(this),
            verifyLabels = this.verifyLabels.bind(this),
            verifyDeduction = this.verifyDeduction.bind(this),
            verifySuppositions = this.verifySuppositions.bind(this);

      return all([
        verifyLabels,
        verifySuppositions,
        verifyDeduction,
        verifyProof
      ], context, (verifies) => {
        if (verifies) {
          context.debug(`...verified the '${topLevelAssertionString}' top level assertion.`);
        }

        return continuation(verifies);
      });
    }, context);
  }

  verifyLabels(context, continuation) {
    const topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's labels...`);

    const verifyLabel = this.verifyLabel.bind(this);

    return every(this.labels, verifyLabel, context, (labelsVerify) => {
      if (labelsVerify) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's labels.`);
      }

      return continuation(labelsVerify, context);
    });
  }

  verifyLabel(label, context, continuation) {
    const labelString = label.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's '${labelString}' label...`);

    return label.verify((labelVerifies) => {
      if (labelVerifies) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's '${labelString}' label.`);
      }

      return continuation(labelVerifies);
    });
  }

  verifyProof(context, continuation) {
    if (this.proof === null) {
      const proofVerifies = true; ///

      return continuation(proofVerifies, context);
    }

    const topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's proof...`);

    const statement = this.deduction.getStatement();

    return this.proof.verify(statement, context, (proofVerifies) => {
      if (proofVerifies) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's proof.`);
      }

      return continuation(proofVerifies, context);
    });
  }

  verifyDeduction(context, continuation) {
    const deductionString = this.deduction.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's '${deductionString}' deduction...`);

    return this.deduction.verify(context, (deductionVerifies) => {
      if (deductionVerifies) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's '${deductionString}' deduction.`);
      }

      return continuation(deductionVerifies, context);
    });
  }

  verifySupposition(supposition, context, continuation) {
    const suppositionString = supposition.getString(),
          topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's '${suppositionString}' supposition...`);

    return supposition.verify(context, (suppositionVerifies, context) => {
      if (suppositionVerifies) {
        const subproofOrProofAssertion = supposition;  ////

        context.assignAssignments();

        context.addSubproofOrProofAssertion(subproofOrProofAssertion);
      }

      if (suppositionVerifies) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's '${suppositionString}' supposition.`);
      }

      return continuation(suppositionVerifies, context);
    });
  }

  verifySuppositions(context, continuation) {
    const suppositionsLength = this.suppositions.length;

    if (suppositionsLength === 0) {
      const suppositionsVerify = true;  ///

      return continuation(suppositionsVerify, context);
    }

    const topLevelAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelAssertionString}' top level assertion's suppositions...`);

    const verifySupposition = this.verifySupposition.bind(this);

    return forwardsEvery(this.suppositions, verifySupposition, context, (suppositionsVerify) => {
      if (suppositionsVerify) {
        context.debug(`...verified the '${topLevelAssertionString}' top level assertion's suppositions.`);
      }

      return continuation(suppositionsVerify, context);
    });
  }

  dischargeHypothesis(hypothesis, context, continuation) {
    const hypothesisString = hypothesis.getString(),
          topLevelAssertionString = this.getString(); ///

    context.trace(`Discharding the '${topLevelAssertionString}' top level assertion's '${hypothesisString}' hypothesis...`);

    hypothesis.discharge(context, (hypothesisDischarges) => {
      if (hypothesisDischarges) {
        context.trace(`...discharges the '${topLevelAssertionString}' top level assertion's '${hypothesisString}' hypothesis.`);
      }

      return continuation(hypothesisDischarges);
    });
  }

  dischargeHypotheses(context, continuation) {
    const hypotheses = this.getHypotheses(),
          dischargeHypothesis = this.dischargeHypothesis.bind(this);

    return every(hypotheses, dischargeHypothesis, context, continuation);
  }

  unifyStepWithDeduction(step, context, continuation) {
    const ruleString = this.getString(),
          stepString = step.getString(),
          deductionString = this.deduction.getString();

    context.trace(`Unifying the '${stepString}' step with the '${ruleString}' rule's '${deductionString}' deduction...`);

    return this.deduction.unifyStep(step, context, (stepUnifies) => {
      let stepUnifiesWithDeduction = false;

      if (stepUnifies) {
        stepUnifiesWithDeduction = true;
      }

      if (stepUnifiesWithDeduction) {
        context.debug(`...unified the '${stepString}' step with the '${ruleString}' rule's '${deductionString}' deduction.`);
      }

      return continuation(stepUnifiesWithDeduction);
    });
  }

  unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context, continuation) {
    return this.unifyStepWithDeduction(step, context, (statementUnifiesWithDeduction) => {
      if (!statementUnifiesWithDeduction) {
        const stepAndSubproofOrProofAssertionsUnify = false;

        return continuation(stepAndSubproofOrProofAssertionsUnify);
      }

      return this.dischargeHypotheses(context, (hypothesesDischarge) => {
        if (!hypothesesDischarge) {
          const stepAndSubproofOrProofAssertionsUnify = false;

          return continuation(stepAndSubproofOrProofAssertionsUnify);
        }

        return this.unifySubproofOrProofAssertionsWithSuppositions(subproofOrProofAssertions, context, (subproofOrProofAssertionsUnifiesWithSuppositions) => {
          let stepAndSubproofOrProofAssertionsUnify = false;

          if (subproofOrProofAssertionsUnifiesWithSuppositions) {
            const derivedSubstitutionsResolved = context.areDerivedSubstitutionsResolved();

            if (derivedSubstitutionsResolved) {
              stepAndSubproofOrProofAssertionsUnify = true;
            }
          }

          return continuation(stepAndSubproofOrProofAssertionsUnify);
        });
      });
    });
  }

  unifySubproofOrProofAssertionsWithSupposition(subproofOrProofAssertions, supposition, context, continuation) {
    return extract(subproofOrProofAssertions, (subproofOrProofAssertion, continuation) => {
      return supposition.unifySubproofOrProofAssertion(subproofOrProofAssertion, context, continuation);
    }, (subproofOrProofAssertion = null) => {
      if (subproofOrProofAssertion !== null) {
        const subproofOrProofAssertionsUnifiesWithSupposition = true;

        return context.resolveDerivedSubstitutions(() => {
          return continuation(subproofOrProofAssertionsUnifiesWithSupposition);
        });
      }

      return supposition.unifyIndependently(context, continuation);
    });
  }

  unifySubproofOrProofAssertionsWithSuppositions(subproofOrProofAssertions, context, continuation) {
    subproofOrProofAssertions = reverse(subproofOrProofAssertions); ///

    return backwardsEvery(this.suppositions, (supposition, continuation) => {
      return this.unifySubproofOrProofAssertionsWithSupposition(subproofOrProofAssertions, supposition, context, continuation);
    }, continuation);
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
