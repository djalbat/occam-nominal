"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { enclose, reconcile } from "../utilities/context";
import { claimStringFromLabelsSignatureSuppositionsAndDeduction } from "../utilities/string";
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
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities,
      { all, every, extract, forwardsEvery, backwardsEvery } = continuationUtilities;

export default class Claim extends Element {
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

  verifyEx(context, back, forward) {
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
      ], context, back, forward);
    }, context);
  }

  verifyLabels(context, back, forward) {
    const claimString = this.getString();  ///

    context.trace(`Verifying the '${claimString}' claim's labels...`);

    const verifyLabel = this.verifyLabel.bind(this);

    return every(this.labels, verifyLabel, context, back, (context) => {
      context.debug(`...verified the '${claimString}' claim's labels.`);

      return forward(context);
    });
  }

  verifyLabel(label, context, back, forward) {
    const labelString = label.getString(),
          claimString = this.getString(); ///

    context.trace(`Verifying the '${claimString}' claim's '${labelString}' label...`);

    return label.verify(back, () => {
      context.debug(`...verified the '${claimString}' claim's '${labelString}' label.`);

      return forward(context);
    });
  }

  verifyProof(context, back, forward) {
    if (this.proof === null) {
      const proofVerifies = true; ///

      return continuation(proofVerifies, context);
    }

    const claimString = this.getString();  ///

    context.trace(`Verifying the '${claimString}' claim's proof...`);

    const statement = this.deduction.getStatement();

    return this.proof.verify(statement, context, (proofVerifies) => {
      if (proofVerifies) {
        context.debug(`...verified the '${claimString}' claim's proof.`);
      }

      return continuation(proofVerifies, context);
    });
  }

  verifyDeduction(context, back, forward) {
    const claimString = this.getString(), ///
          deductionString = this.deduction.getString();

    context.trace(`Verifying the '${claimString}' claim's '${deductionString}' deduction...`);

    return this.deduction.verify(context, (deductionVerifies) => {
      if (deductionVerifies) {
        context.debug(`...verified the '${claimString}' claim's '${deductionString}' deduction.`);
      }

      return continuation(deductionVerifies, context);
    });
  }

  verifySupposition(supposition, context, back, forward) {
    const claimString = this.getString(), ///
          suppositionString = supposition.getString();

    context.trace(`Verifying the '${claimString}' claim's '${suppositionString}' supposition...`);

    return supposition.verify(context, back, () => {
      const factOrSubproof = supposition;  ////

      context.assignAssignments();

      context.addFactOrSubproof(factOrSubproof);

      context.debug(`...verified the '${claimString}' claim's '${suppositionString}' supposition.`);

      return forward(context);
    });
  }

  verifySuppositions(context, back, forward) {
    const suppositionsLength = this.suppositions.length;

    if (suppositionsLength === 0) {
      return forward(context);
    }

    const claimString = this.getString();  ///

    context.trace(`Verifying the '${claimString}' claim's suppositions...`);

    const verifySupposition = this.verifySupposition.bind(this);

    return forwardsEvery(this.suppositions, verifySupposition, context, back, () => {
      context.debug(`...verified the '${claimString}' claim's suppositions.`);

      return forward(context);
    });
  }

  dischargeHypothesis(hypothesis, context, back, forward) {
    const claimString = this.getString(), ///
          hypothesisString = hypothesis.getString();

    context.trace(`Discharding the '${claimString}' claim's '${hypothesisString}' hypothesis...`);

    return hypothesis.discharge(context, (hypothesisDischarges, context) => {
      if (hypothesisDischarges) {
        context.trace(`...discharges the '${claimString}' claim's '${hypothesisString}' hypothesis.`);
      }

      return continuation(hypothesisDischarges, context);
    });
  }

  dischargeHypotheses(context, back, forward) {
    const hypotheses = this.getHypotheses(),
         hypothesesLength = hypotheses.length;

    if (hypothesesLength === 0) {
      const hypothesesDischarged = true;

      return continuation(hypothesesDischarged, context);
    }

    const claimString = this.getString(); ///

    context.trace(`Discharging the '${claimString}' claim's hypotheses...`);

    const dischargeHypothesis = this.dischargeHypothesis.bind(this);

    return every(hypotheses, dischargeHypothesis, context, (hypothesesDischarged) => {
      if (hypothesesDischarged) {
        context.trace(`...discharged the '${claimString}' claim's hypotheses.`);
      }

      return continuation(hypothesesDischarged, context);
    });
  }

  unifyStepWithDeduction(step, context, back, forward) {
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

      return continuation(stepUnifiesWithDeduction, context);
    });
  }

  unifyStepAndFactOrSubproofs(step, factorSubproofs, context, back, forward) {
    return reconcile((context) => {
      return this.unifyStepWithDeduction(step, context, (statementUnifiesWithDeduction) => {
        if (!statementUnifiesWithDeduction) {
          const stepAndFactOrSubproofsUnify = false;

          return continuation(stepAndFactOrSubproofsUnify, context);
        }

        return this.dischargeHypotheses(context, (hypothesesDischarge) => {
          if (!hypothesesDischarge) {
            const stepAndFactOrSubproofsUnify = false;

            return continuation(stepAndFactOrSubproofsUnify);
          }

          return this.unifyFactOrSubproofsWithSuppositions(factorSubproofs, context, (factorSubproofsUnifiesWithSuppositions) => {
            let stepAndFactOrSubproofsUnify = false;

            if (factorSubproofsUnifiesWithSuppositions) {
              const inferredSubstitutionsSolved = context.areInferredSubstitutionsSolved();

              if (inferredSubstitutionsSolved) {
                stepAndFactOrSubproofsUnify = true;
              }
            }

            return continuation(stepAndFactOrSubproofsUnify);
          });
        });
      });
    }, context);
  }

  unifyFactOrSubproofsWithSupposition(factorSubproofs, supposition, context, back, forward) {
    return extract(factorSubproofs, (factOrSubproof, continuation) => {
      return supposition.unifyFactOrSubproof(factOrSubproof, context, continuation);
    }, (factOrSubproof = null) => {
      if (factOrSubproof !== null) {
        const factorSubproofsUnifiesWithSupposition = true;

        return context.solveInferredSubstitutions(() => {
          return continuation(factorSubproofsUnifiesWithSupposition);
        });
      }

      return supposition.unifyIndependently(context, continuation);
    });
  }

  unifyFactOrSubproofsWithSuppositions(factorSubproofs, context, back, forward) {
    factorSubproofs = reverse(factorSubproofs); ///

    return backwardsEvery(this.suppositions, (supposition, continuation) => {
      return this.unifyFactOrSubproofsWithSupposition(factorSubproofs, supposition, context, continuation);
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
          claimString = claimStringFromLabelsSignatureSuppositionsAndDeduction(labels, signature, suppositions, deduction),
          string = claimString, ///
          node = null,
          breakPoint = breakPointFromJSON(json),
          proof = null,
          claim = new Class(context, string, node, breakPoint, labels, suppositions, deduction, proof, signature, hypotheses);

    return claim;
  }
}
