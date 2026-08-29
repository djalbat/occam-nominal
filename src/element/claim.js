"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { reconcile } from "../utilities/context";
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
      { every, extract, forwardsEvery, backwardsEvery } = continuationUtilities,
      { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  unifyStepAndFactOrSubproofs = breakable(function (step, factOrSubproofs, context, forward, back) {
    const specificContext = context;  ///

    return reconcile((context) => {
      return this.unifyStepWithDeduction(step, context, (context, back) => {
        return this.unifyFactOrSubproofsWithSuppositions(factOrSubproofs, context, (context, back) => {
          const complexSubstitutionsUnsolved = context.areComplexSubstitutionsUnsolved();

          if (complexSubstitutionsUnsolved) {
            context.debug(`Unable to unify the step and fact or subproofs because thre are unsolved complex substitutions.`);

            return back();
          }

          context = specificContext;  ///

          return forward(context, back);
        }, back);
      }, back);
    }, context);
  });

  verifyLabels(context, forward, back) {
    const claimString = this.getString();  ///

    context.trace(`Verifying the '${claimString}' claim's labels...`);

    const verifyLabel = this.verifyLabel.bind(this);

    return every(this.labels, verifyLabel, context, (context, back) => {
      context.debug(`...verified the '${claimString}' claim's labels.`);

      return forward(context, back);
    }, back);
  }

  verifyLabel(label, context, forward, back) {
    const labelString = label.getString(),
          claimString = this.getString(); ///

    context.trace(`Verifying the '${claimString}' claim's '${labelString}' label...`);

    return label.verify(context, (context, back) => {
      context.debug(`...verified the '${claimString}' claim's '${labelString}' label.`);

      return forward(context, back);
    }, back);
  }

  verifyProof(context, forward, back) {
    if (this.proof === null) {
      return forward(context, back);
    }

    const claimString = this.getString();  ///

    context.trace(`Verifying the '${claimString}' claim's proof...`);

    const statement = this.deduction.getStatement();

    return this.proof.verify(statement, context, (context, back) => {
      context.debug(`...verified the '${claimString}' claim's proof.`);

      return forward(context, back);
    }, back);
  }

  verifyDeduction(context, forward, back) {
    const claimString = this.getString(), ///
          deductionString = this.deduction.getString();

    context.trace(`Verifying the '${claimString}' claim's '${deductionString}' deduction...`);

    return this.deduction.verify(context, (context, back) => {
      context.debug(`...verified the '${claimString}' claim's '${deductionString}' deduction.`);

      return forward(context, back);
    }, back);
  }

  verifySupposition(supposition, context, forward, back) {
    const claimString = this.getString(), ///
          suppositionString = supposition.getString();

    context.trace(`Verifying the '${claimString}' claim's '${suppositionString}' supposition...`);

    return supposition.verify(context, (context, back) => {
      context.debug(`...verified the '${claimString}' claim's '${suppositionString}' supposition.`);

      return forward(context, back);
    }, back);
  }

  verifySuppositions(context, forward, back) {
    const suppositionsLength = this.suppositions.length;

    if (suppositionsLength === 0) {
      return forward(context, back);
    }

    const claimString = this.getString();  ///

    context.trace(`Verifying the '${claimString}' claim's suppositions...`);

    return forwardsEvery(this.suppositions, (supposition, context, forward, back) => {
      return this.verifySupposition(supposition, context, (context, back) => {
        const factOrSubproof = supposition; ///

        context.addFactOrSubproof(factOrSubproof);

        context.assignAssignments();

        return forward(context, back);
      }, back);
    }, context, (context, back) => {
      context.debug(`...verified the '${claimString}' claim's suppositions.`);

      return forward(context, back);
    }, back);
  }

  dischargeHypothesis(hypothesis, context, forward, back) {
    debugger

    const claimString = this.getString(), ///
          hypothesisString = hypothesis.getString();

    context.trace(`Discharging the '${claimString}' claim's '${hypothesisString}' hypothesis...`);

    return hypothesis.discharge(context, (hypothesisDischarges, context) => {
      if (hypothesisDischarges) {
        context.trace(`...discharges the '${claimString}' claim's '${hypothesisString}' hypothesis.`);
      }

      return continuation(hypothesisDischarges, context);
    });
  }

  dischargeHypotheses(context, forward, back) {
    debugger

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

  unifyStepWithDeduction(step, context, forward, back) {
    const stepString = step.getString(),
          claimString = this.getString(),
          deductionString = this.deduction.getString();

    context.trace(`Unifying the '${stepString}' step with the '${claimString}' claim's '${deductionString}' deduction...`);

    return this.deduction.unifyStep(step, context, (context, back) => {
      context.debug(`...unified the '${stepString}' step with the '${claimString}' claim's '${deductionString}' deduction.`);

      return forward(context, back);
    }, back);
  }

  unifyFactOrSubproofsWithSupposition(factOrSubproofs, supposition, context, forward, back) {
    return extract(factOrSubproofs,
      (factOrSubproof, forward, back) => {
        return supposition.unifyFactOrSubproof(factOrSubproof, context, forward, back);
      }, (factOrSubproofs, factOrSubproof, context, back) => {
        return context.solveInferredSubstitutions((back) => {
          return forward(factOrSubproofs, context, back);
        }, back);
      }, (exception) => {
        if(exception) {
          return back(exception);
        }

        return supposition.unifyIndependently(context, (context, back) => {
          return forward(factOrSubproofs, context, back);
        }, back);
      }
    );
  }

  unifyFactOrSubproofsWithSuppositions(factOrSubproofs, context, forward, back) {
    factOrSubproofs = reverse(factOrSubproofs); ///

    return backwardsEvery(this.suppositions, (supposition, factOrSubproofs, context, forward, back) => {
      return this.unifyFactOrSubproofsWithSupposition(factOrSubproofs, supposition, context, forward, back);
    }, factOrSubproofs, context, (factOrSubproofs, context, back) => {
      return forward(context, back);
    }, back);
  }

  toJSON() {
    let json;

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
          hypotheses = hypothesesJSON;  ///

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
