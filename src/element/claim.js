"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { enclose } from "../utilities/context";
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
      { asynchronousAll, asynchronousEvery, asynchronousExtract, asynchronousForwardsEvery, asynchronousBackwardsEvery } = continuationUtilities;

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

  verifyEx(context, continuation) {
    const claimString = this.getString(); ///

    context.trace(`Verifying the '${claimString}' claim...`);

    return enclose((context) => {
      const verifyProof = this.verifyProof.bind(this),
            verifyLabels = this.verifyLabels.bind(this),
            verifyDeduction = this.verifyDeduction.bind(this),
            verifySuppositions = this.verifySuppositions.bind(this);

      return asynchronousAll([
        verifyLabels,
        verifySuppositions,
        verifyDeduction,
        verifyProof
      ], context, (verifies) => {
        if (verifies) {
          context.debug(`...verified the '${claimString}' claim.`);
        }

        return continuation(verifies, context);
      });
    }, context);
  }

  verifyLabels(context, continuation) {
    const claimString = this.getString();  ///

    context.trace(`Verifying the '${claimString}' claim's labels...`);

    const verifyLabel = this.verifyLabel.bind(this);

    return asynchronousEvery(this.labels, verifyLabel, context, (labelsVerify) => {
      if (labelsVerify) {
        context.debug(`...verified the '${claimString}' claim's labels.`);
      }

      return continuation(labelsVerify, context);
    });
  }

  verifyLabel(label, context, continuation) {
    const labelString = label.getString(),
          claimString = this.getString(); ///

    context.trace(`Verifying the '${claimString}' claim's '${labelString}' label...`);

    return label.verify((labelVerifies) => {
      if (labelVerifies) {
        context.debug(`...verified the '${claimString}' claim's '${labelString}' label.`);
      }

      return continuation(labelVerifies, context);
    });
  }

  verifyProof(context, continuation) {
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

  verifyDeduction(context, continuation) {
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

  verifySupposition(supposition, context, continuation) {
    const claimString = this.getString(), ///
          suppositionString = supposition.getString();

    context.trace(`Verifying the '${claimString}' claim's '${suppositionString}' supposition...`);

    return supposition.verify(context, (suppositionVerifies) => {
      if (suppositionVerifies) {
        const factOrSubproof = supposition;  ////

        context.assignAssignments();

        context.addFactOrSubproof(factOrSubproof);
      }

      if (suppositionVerifies) {
        context.debug(`...verified the '${claimString}' claim's '${suppositionString}' supposition.`);
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

    const claimString = this.getString();  ///

    context.trace(`Verifying the '${claimString}' claim's suppositions...`);

    const verifySupposition = this.verifySupposition.bind(this);

    return asynchronousForwardsEvery(this.suppositions, verifySupposition, context, (suppositionsVerify) => {
      if (suppositionsVerify) {
        context.debug(`...verified the '${claimString}' claim's suppositions.`);
      }

      return continuation(suppositionsVerify, context);
    });
  }

  dischargeHypothesis(hypothesis, context, continuation) {
    const claimString = this.getString(), ///
          hypothesisString = hypothesis.getString();

    context.trace(`Discharding the '${claimString}' claim's '${hypothesisString}' hypothesis...`);

    hypothesis.discharge(context, (hypothesisDischarges) => {
      if (hypothesisDischarges) {
        context.trace(`...discharges the '${claimString}' claim's '${hypothesisString}' hypothesis.`);
      }

      return continuation(hypothesisDischarges);
    });
  }

  dischargeHypotheses(context, continuation) {
    const hypotheses = this.getHypotheses(),
          dischargeHypothesis = this.dischargeHypothesis.bind(this);

    return asynchronousEvery(hypotheses, dischargeHypothesis, context, continuation);
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

  unifyStepAndFactOrSubproofs(step, factorSubproofs, context, continuation) {
    return this.unifyStepWithDeduction(step, context, (statementUnifiesWithDeduction) => {
      if (!statementUnifiesWithDeduction) {
        const stepAndFactOrSubproofsUnify = false;

        return continuation(stepAndFactOrSubproofsUnify);
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
  }

  unifyFactOrSubproofsWithSupposition(factorSubproofs, supposition, context, continuation) {
    return asynchronousExtract(factorSubproofs, (factOrSubproof, continuation) => {
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

  unifyFactOrSubproofsWithSuppositions(factorSubproofs, context, continuation) {
    factorSubproofs = reverse(factorSubproofs); ///

    return asynchronousBackwardsEvery(this.suppositions, (supposition, continuation) => {
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
